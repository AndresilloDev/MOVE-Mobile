import {Dimensions, Image, ScrollView, Text, View} from "react-native";
import {LineChart} from "react-native-chart-kit";
import SensorCard from "../components/SensorCard";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

const SelectedDeviceScreen = ({ navigation }) => {
  // Datos simulados para los sensores
  const mockSensors = [
    {
      nombre: "Temperatura",
      actual: 22,
      umbral_inf: 22,
      umbral_sup: 28,
      lim_inf: 0,
      lim_sup: 40,
    },
    {
      nombre: "Humedad",
      actual: 55,
      umbral_inf: 30,
      umbral_sup: 70,
      lim_inf: 0,
      lim_sup: 100,
    },
    {
      nombre: "Co2",
      actual: 450,
      umbral_inf: 350,
      umbral_sup: 1000,
      lim_inf: 0,
      lim_sup: 2000,
    },
    {
      nombre: "Ruido",
      actual: 65,
      umbral_inf: 30,
      umbral_sup: 80,
      lim_inf: 0,
      lim_sup: 120,
    },
  ];

  // Datos de la gráfica simulada
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [24, 22, 19, 23, 27, 30, 32, 31, 29, 25, 21, 24],
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(66, 133, 244, ${opacity})`,
      },
    ],
  };

  return (
    <View className="flex-1">
      <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-full"
        resizeMode="cover"
      />

      <Header navigation={navigation} />

        <View className="p-4">
          <View className="flex-row items-center ml-2.5">
			<Icon style={{ marginRight: 8 }} name="home" size={25} color="#000" />
			<Icon style={{ marginRight: 8 }} name="chevron-forward-sharp" size={25} color="#000" />
			<Text className="mr-2 text-xl">Notificaciones</Text>
			<Icon style={{ marginRight: 8 }} name="chevron-forward-sharp" size={25} color="#000" />
			<Text className="text-xl">Temperatura</Text>
          </View>
        </View>
      

      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-4">
        {mockSensors.map((sensor, index) => (
          <SensorCard key={index} sensor={sensor} />
        ))}
      </ScrollView>

      <View className="p-4 flex-row">
        <View className="flex-1">
          <Text className="text-left text-lg font-bold">
            Dispositivo: <Text style={{ fontWeight: "normal" }}>#42035</Text>
          </Text>
          <Text className="text-left text-lg font-bold">
            Nombre: <Text style={{ fontWeight: "normal" }}>D4 - CC11</Text>
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-right text-lg font-bold">
            Aula: <Text style={{ fontWeight: "normal" }}>CC11</Text>
          </Text>
          <Text className="text-right text-lg font-bold">
            Docencia: <Text style={{ fontWeight: "normal" }}>D4</Text>
          </Text>
        </View>
      </View>

      {/* Gráfica de Temperatura */}
      <View className="px-4 mb-4 mt-8">
        <Text className="text-xl font-bold mb-2">Temperatura (últimos 12 meses)</Text>
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          yAxisSuffix="°C"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#f0f4f8",
            backgroundGradientTo: "#d9e2ec",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "3", strokeWidth: "1", stroke: "#1e3a8a" },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>

    </View>
  );
};

export default SelectedDeviceScreen;
