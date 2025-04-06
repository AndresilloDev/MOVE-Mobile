import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getAllSensorDataInRange } from "../api/sensorData.api";

const screenWidth = Dimensions.get("window").width;

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

const SensorChartScreen = ({ sensor, startDate, endDate, deviceId, setStartDate }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!sensor || !startDate || !endDate || !deviceId) return;
            try {
                const start = new Date(startDate).toISOString();
                const end = new Date(endDate).toISOString();
                const response = await getAllSensorDataInRange(deviceId, {
                    start,
                    end,
                    sensorName: sensor.sensorName,
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
                        color: (opacity = 1) => SENSOR_COLORS[sensor.sensorName] ?? '#000000', // Usamos el color del sensor
                    }],
                    yAxisMin: 0,
                });
            } catch (error) {
                console.error("Error al cargar datos históricos:", error);
                setChartData(null);
            }
        };

        fetchHistoricalData();
    }, [sensor, startDate, endDate, deviceId]);

    if (!chartData || chartData.datasets[0].data.length === 0) {
        return (
            <View className="items-center justify-center mt-8">
                <Text className="text-gray-500">No hay datos disponibles en este rango.</Text>
            </View>
        );
    }

    return (
        <View>
            <LineChart
                data={chartData}
                height={220}
                yAxisSuffix={SENSOR_UNITS[sensor.sensorName] ?? '°C'}
                width={screenWidth - 32}
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
                style={{ borderRadius: 16 }}/>
        </View>
    );
};

export default SensorChartScreen;