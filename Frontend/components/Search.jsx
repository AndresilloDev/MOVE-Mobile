import {TextInput, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const Search = ({ searchQuery, setSearchQuery, onSearch }) => {
    return (
        <View className="items-center mt-2 py-2 px-1">
            <View className="flex-row items-center w-11/12 h-10 border border-black rounded-xl bg-white">
                <TextInput
                    className="flex-1 h-full pl-3"
                    placeholder="Buscar..."
                    placeholderTextColor={"gray"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity className="bg-[rgba(222,255,53,0.8)] w-10 h-full justify-center items-center rounded-r-xl"
                    onPress={onSearch}
                >
                    <Icon name="search" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}