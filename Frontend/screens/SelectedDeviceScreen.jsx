import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import SensorCard from "../components/SensorCard";
import {getAllSensorDataInRange, getDeviceSensors} from "../api/sensorData.api";
import DateTimePicker from "@react-native-community/datetimepicker";
import Loader from "../components/Loader";
import {LineChart} from "react-native-chart-kit";

const SENSOR_COLORS = {
    temperature: "#FF5733",
    humidity: "#33A1FF",
    co2: "#5733FF",
    light: "#FFD133",
    sound: "#33FF57"
};

const SENSOR_UNITS = {
    temperature: '°C',
    humidity: '%',
    co2: 'ppm',
    light: 'lux',
    sound: 'dB'
};


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

    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!selectedSensor || !startDate || !endDate || !device._id) return;
            try {
                const start = new Date(startDate).toISOString();
                const end = new Date(endDate).toISOString();
                const response = await getAllSensorDataInRange(device._id, {
                    start,
                    end,
                    sensorName: selectedSensor.sensorName,
                });

                const rawData = response.data?.[0]?.data ?? [];

                if (rawData.length === 0) {
                    setChartData(null);
                    return;
                }

                const firstTimestamp = new Date(rawData[0].time);
                if (startDate < firstTimestamp) {
                    setStartDate(firstTimestamp);
                    return;
                }

                const totalPoints = 7;
                const step = Math.floor(rawData.length / totalPoints);
                const sampledData = [];

                for (let i = 0; i < totalPoints; i++) {
                    const index = i * step;
                    if (rawData[index]) {
                        sampledData.push(rawData[index]);
                    }
                }

                const formatted = sampledData.map(item => ({
                    label: new Date(item.time).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                    }),
                    value: item.value
                }));

                setChartData({
                    labels: formatted.map(d => d.label),
                    datasets: [{
                        data: formatted.map(d => d.value),
                        color: (opacity = 1) => SENSOR_COLORS[selectedSensor.sensorName] ?? '#000000',
                    }],
                    yAxisMin: 0,
                });
            } catch (error) {
                console.error("Error al cargar datos históricos:", error);
                setChartData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [selectedSensor, startDate, endDate, device._id]);

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
                        <View className="w-8"></View>
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
                        {/* Gráfica directamente aquí */}

                        {chartData && chartData.datasets[0].data.length > 0 ? (
                            <LineChart
                                data={chartData}
                                height={220}
                                yAxisSuffix={SENSOR_UNITS[selectedSensor.sensorName] ?? '°C'}
                                width={Dimensions.get("window").width - 32}
                                bezier
                                chartConfig={{
                                    backgroundColor: "#ffffff",
                                    backgroundGradientFrom: "#f0f4f8",
                                    backgroundGradientTo: "#d9e2ec",
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(34, 94, 168, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: { borderRadius: 16 },
                                    propsForDots: {
                                        r: "3",
                                        strokeWidth: "1",
                                        stroke: "#000000",
                                    },
                                    propsForLabels: {
                                        fontSize: 9,
                                    },
                                    yAxisMin: 0,
                                }}
                                style={{ borderRadius: 16 }}
                            />
                        ) : (
                            <View className="items-center justify-center mt-8">
                                <Text className="text-gray-500">No hay datos disponibles en este rango.</Text>
                            </View>
                        )}
                    </View>
                </>
                )}
        </View>
    );
};

export default SelectedDeviceScreen;