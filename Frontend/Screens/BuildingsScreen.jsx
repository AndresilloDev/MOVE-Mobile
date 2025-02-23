import { Button, Text, View } from "react-native"

const BuildingsScreen = ({ navigation }) => {
    return (
        <View>
            <Text>Hola</Text>
            <Button title="ir a los salones" onPress={() => navigation.navigate("Classrooms")} /> 
        </View>
    )
}

export default BuildingsScreen;