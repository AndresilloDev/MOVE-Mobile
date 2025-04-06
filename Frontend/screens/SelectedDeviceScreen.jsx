import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import SensorCard from "../components/SensorCard";
import { getDeviceSensors } from "../api/sensorData.api";
import SensorChartScreen from "../components/SensorChartScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import Loader from "../components/Loader";

const SENSOR_ORDER = ['temperature', 'humidity', 'co2', 'light', 'sound'];

const SelectedDeviceScreen = ({ navigation }) => {
    const route = useRoute();
    const { device } = route.params;
    const [sensors, setSensors] = useState([]);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [loading, setLoading] = useState(true);

    const sortedSensors = useMemo(() => {
        if (!sensors.length) return [];

        return [...sensors].sort((a, b) => {
            const indexA = SENSOR_ORDER.indexOf(a.sensorName.toLowerCase());
            const indexB = SENSOR_ORDER.indexOf(b.sensorName.toLowerCase());
            return indexA - indexB;
        });
    }, [sensors]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sensorRes = await getDeviceSensors(device._id);
                setSensors(sensorRes.data);

                // Seleccionar el sensor de temperatura por defecto
                const tempSensor = sensorRes.data.find(sensor => sensor.sensorName.toLowerCase() === 'temperature');
                if (tempSensor) {
                    setSelectedSensor(tempSensor);
                } else {
                    // Si no se encuentra el sensor de temperatura, seleccionar el primer sensor disponible
                    setSelectedSensor(sensorRes.data[0]);
                }
            } catch (error) {
                console.error("Error al cargar datos del dispositivo:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [device._id]);

    const getSensorDisplayName = useCallback((sensorName) => {
        const nameMap = {
            'temperature': 'Temperatura',
            'humidity': 'Humedad',
            'co2': 'CO₂',
            'light': 'Luz',
            'sound': 'Sonido'
        };

        return nameMap[sensorName.toLowerCase()] || sensorName;
    }, []);

    // Manejadores de eventos
    const handleSensorSelect = useCallback((sensor) => {
        setSelectedSensor(sensor);
    }, []);

    const [startDate, setStartDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 7); // hace 7 días
        return date;
    });

    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleStartDateChange = useCallback((event, date) => {
        setShowStartDatePicker(false);
        if (date) setStartDate(date);
    }, []);

    const handleEndDateChange = useCallback((event, date) => {
        setShowEndDatePicker(false);
        if (date) setEndDate(date);
    }, []);

    return (
        <View className="flex-1">
            <Image
                source={require("../assets/bg.png")}
                className="absolute top-0 left-0 w-full h-full"
                resizeMode="cover"
            />

            <Header navigation={navigation}/>

            <View className="p-4">
                <View className="flex-row items-center ml-2.5">
                    <Icon style={{ marginRight: 8 }} name="home" size={25} color="#000" />
                    <Icon style={{ marginRight: 8 }} name="chevron-forward-sharp" size={25} color="#000" />
                    <Text className="mr-2 text-xl">{device.name}</Text>
                </View>
            </View>

            {loading ? (
                <Loader/>
            ) : (
                <>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="px-4 py-4">
                        {sortedSensors.map(sensor => (
                            <TouchableOpacity
                                key={sensor._id}
                                onPress={() => handleSensorSelect(sensor)}
                                activeOpacity={0.8}
                                className="flex-shrink-0">
                                <SensorCard
                                    sensor={sensor}
                                    isSelected={selectedSensor && selectedSensor._id === sensor._id}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="p-4 flex-row">
                        <View className="flex-1">
                            <Text className="text-left text-lg font-bold">
                                Dispositivo: <Text className="text-lg font-normal">#{device._id}</Text>
                            </Text>
                            <Text className="text-left text-lg font-bold">
                                Nombre: <Text className="text-lg font-normal">{device.name}</Text>
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-right text-lg font-bold">
                                Aula: <Text className="text-lg font-normal">{device.space ? device.space.name : "Sin Aula"}</Text>
                            </Text>
                            <Text className="text-right text-lg font-bold">
                                Docencia: <Text className="text-lg font-normal">{device.building ? device.building.name : "Sin Edificio"}</Text>
                            </Text>
                        </View>
                    </View>

                    <View className="px-4 mt-4 flex-row space-x-4 items-start">
                        {/* Fecha inicio */}
                        <View className="flex-1">
                            <Text className="text-lg font-bold mb-1">Fecha inicio:</Text>
                            <TouchableOpacity
                                className="flex-row items-center border border-gray-300 rounded-md px-3 py-2"
                                onPress={() => setShowStartDatePicker(true)}
                            >
                                <Icon name="calendar-outline" size={20} color="#000" style={{ marginRight: 8 }} />
                                <Text className="text-lg font-normal">{startDate.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            {showStartDatePicker && (
                                <DateTimePicker
                                    value={startDate}
                                    display="default"
                                    onChange={handleStartDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>

                        {/* Fecha fin */}
                        <View className="flex-1">
                            <Text className="text-lg font-bold mb-1">Fecha fin:</Text>
                            <TouchableOpacity
                                className="flex-row items-center border border-gray-300 rounded-md px-3 py-2"
                                onPress={() => setShowEndDatePicker(true)}
                            >
                                <Icon name="calendar-outline" size={20} color="#000" style={{ marginRight: 8 }} />
                                <Text className="text-lg font-normal">{endDate.toLocaleDateString()}</Text>
                            </TouchableOpacity>
                            {showEndDatePicker && (
                                <DateTimePicker
                                    value={endDate}
                                    display="default"
                                    onChange={handleEndDateChange}
                                    maximumDate={new Date()}
                                />
                            )}
                        </View>
                    </View>

                    <View className="px-4 mb-4 mt-8">
                        <Text className="text-xl font-bold mb-2">{getSensorDisplayName(selectedSensor.sensorName)}</Text>
                        {/* Gráfica del sensor seleccionado */}
                        <SensorChartScreen
                            deviceId={device._id}
                            sensor={selectedSensor}
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}/>
                    </View>
                </>
                )}
        </View>
    );
};

export default SelectedDeviceScreen;