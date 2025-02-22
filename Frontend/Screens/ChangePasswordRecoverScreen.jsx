import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordRecoverScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                source={require("../assets/fondo.jpg")}
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}
                resizeMode="cover"
            />
            <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }}>
                <Image
                    source={require("../assets/logo.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#000000' }}>
                    Confirmar tu cuenta
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                    {[...Array(5)].map((_, index) => (
                        <TextInput
                            key={index}
                            style={{
                                width: 50,
                                height: 50,
                                borderWidth: 1,
                                borderColor: 'black',
                                textAlign: 'center',
                                fontSize: 24,
                                marginHorizontal: 5,
                                borderRadius: 10,
                                backgroundColor: 'white',
                            }}
                            maxLength={1}
                            keyboardType="numeric"
                        />
                    ))}
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#DEFF35',
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 10,
                        width: 180,
                        paddingVertical: 12,
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate("NextScreen")}
                >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}>
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePasswordRecoverScreen;