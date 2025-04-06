import {View} from "react-native";
import React from "react";

const Loader = () => (
    <View className="flex-1 inset-0 flex justify-center items-center">
        <View className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </View>
)

export default Loader;