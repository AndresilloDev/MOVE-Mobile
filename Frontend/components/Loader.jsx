import {View, Text, ActivityIndicator} from "react-native";
import React from "react";

const Loader = () => (
    <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text className="mt-4 text-gray-500 text-base">Cargando...</Text>
    </View>
);

export default Loader;