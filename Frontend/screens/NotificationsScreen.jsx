import React, {useState, useEffect, useCallback} from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { getUnfiledNotifications, getFiledNotifications } from "../api/notifications.api";
import { useNotification } from "../context/NotificationContext";
import { Search } from "../components/Search";
import Loader from "../components/Loader";

const NotificationCard = ({ notification, navigation }) => (
    <TouchableOpacity
        className="bg-white p-4 rounded-lg shadow-md flex-col justify-between mb-4 mx-6"
        onPress={() => navigation.navigate("SelectedNotification", { id: notification._id })}
    >
        <View className="mb-2">
            <Text className="font-bold text-gray-800 text-lg">{notification.sensor}</Text>
            <Text className="text-base text-gray-600">{notification.nombre}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
            <Text className="text-sm text-gray-500">Dispositivo: {notification.dispositivo}</Text>
            <Text className="text-sm text-gray-500">{notification.fecha}</Text>
        </View>
    </TouchableOpacity>
);

const NotificationsScreen = () => {
    const navigation = useNavigation();
    const { getError } = useNotification();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFiled, setShowFiled] = useState(false);

        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = showFiled
                    ? await getFiledNotifications()
                    : await getUnfiledNotifications();

                const formattedData = response.data.map(notification => ({
                    fecha: new Date(notification.date).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }),
                    dispositivo: `#${notification.device}`,
                    nombre: notification.name,
                    sensor: notification.sensor,
                    _id: notification._id,
                    ...notification,
                }));
                setNotifications(formattedData);
            } catch (error) {
                console.error("Error al obtener notificaciones:", error);
                getError("Error al obtener las notificaciones");
            } finally {
                setLoading(false);
            }
        };

    useFocusEffect(
        useCallback(() => {
            fetchNotifications();
        }, [showFiled])
    );

    const handleSearch = (text) => {
        setSearchQuery(text);
    };

    const filteredNotifications = notifications.filter(notification =>
        notification.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.dispositivo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.sensor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View className="flex-1 bg-gray-100">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                style={{ width: "600%", height: "100%" }}
                resizeMode="cover"
            />

            <Header navigation={navigation} />

            {/* Breadcrumb Navigation */}
            <View className="m-4 ml-6 flex-row items-center">
                <Icon name="home" size={25} color="#000" className="mr-2" />
                <Icon name="chevron-forward-sharp" size={25} color="#000" className="mr-2" />
                <Text className="text-xl">{showFiled ? "Notificaciones Archivadas" : "Notificaciones"}</Text>
            </View>

            {/* Search Bar */}
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />

            {/* Notifications List */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    <FlatList
                        data={filteredNotifications}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <NotificationCard
                                notification={item}
                                navigation={navigation}
                            />
                        )}
                        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-500">
                                No hay notificaciones{searchQuery ? " que coincidan con la búsqueda" : ""}
                            </Text>
                        }
                    />

                    {/* Switch between filed/unfiled notifications */}
                    <TouchableOpacity
                        className="absolute bottom-5 right-5 bg-[rgba(222,255,53,0.8)] w-12 h-12 rounded-full items-center justify-center shadow-sm shadow-black"
                        onPress={() => setShowFiled(!showFiled)}
                    >
                        <Icon
                            name={showFiled ? "archive" : "mail"}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </>
            )}
            <StatusBar style="dark" />
        </View>
    );
};

export default NotificationsScreen;