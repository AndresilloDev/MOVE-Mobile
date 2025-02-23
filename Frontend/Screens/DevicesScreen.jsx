import { Button, Text, View } from "react-native"

const DevicesScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Hola</Text>
            <Button title="ir al dispo seleccionado" onPress={() => navigation.navigate("SelectedDevice"/*, {selectedDevice}*/)} /> 
        </View>
    )
}

export default DevicesScreen;