import {Image, Text, TouchableOpacity, View} from "react-native";
import Svg, {Circle, Path} from "react-native-svg";

import SettingIcon from "../assets/icons/settings.png";
import NotificationIcon from "../assets/icons/notificacion.png";

// Convierte ángulos polares a coordenadas cartesianas
const polarToCartesian = (center, radius, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  };
};

const SemiCircularDial = ({
  percentage,
  size = 150,
  lowerCritical = 20,
  upperCritical = 80,
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const createArc = (startAngle, endAngle, color) => {
    const start = polarToCartesian(center, radius, startAngle);
    const end = polarToCartesian(center, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return (
      <Path
        d={`M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
      />
    );
  };

  // Posición actual del indicador
  const indicatorPosition = polarToCartesian(
    center,
    radius,
    (percentage / 100) * 180 - 90
  );

  return (
    <Svg width={size} height={size / 2}>
      {/* Secciones del dial */}
      {createArc(-90, (lowerCritical / 100) * 180 - 90, "#FF5E5E")}
      {createArc(
        (lowerCritical / 100) * 180 - 90,
        (upperCritical / 100) * 180 - 90,
        "#3EE6AF"
      )}
      {createArc((upperCritical / 100) * 180 - 90, 90, "#FF5E5E")}

      {/* Indicador de posición actual */}
      <Circle
        cx={indicatorPosition.x}
        cy={indicatorPosition.y}
        r={6}
        fill="#000"
      />
    </Svg>
  );
};

const SensorCard = ({ sensor, isSelected }) => {
  // Obtener el último valor del sensor
  const latestValue = sensor?.data?.[sensor?.data?.length - 1]?.value ?? 0;

  // Obtener los umbrales (del sensor o pasados explícitamente)
  const { lower, upper } =  sensor?.thresholds || {};

  // Definir rangos min/max para cada tipo de sensor
  const sensorRanges = {
    'temperature': { min: 0, max: 50 },
    'humidity': { min: 0, max: 100 },
    'co2': { min: 0, max: 3000 },
    'light': { min: 0, max: 3000 },
    'sound': { min: 0, max: 420 }
  };

  // Obtener el rango para este tipo de sensor (o usar valores por defecto)
  const sensorType = sensor?.sensorName?.toLowerCase() || '';
  const { min = 0, max = 100 } = sensorRanges[sensorType] || {};

  // Determinar el color del gauge basado en thresholds
  const getValueColor = () => {
    if (lower !== undefined && upper !== undefined) {
      if (latestValue < lower || latestValue > upper) return '#e74c3c'; // Rojo si está fuera de rango
      return '#2ecc71'; // Verde si está en rango óptimo
    } else if (upper !== undefined) {
      return latestValue > upper ? '#e74c3c' : '#2ecc71';
    } else if (lower !== undefined) {
      return latestValue < lower ? '#e74c3c' : '#2ecc71';
    }
    return '#2ecc71'; // Verde por defecto si no hay umbrales
  };

  // Configurar los arcos en base a los thresholds y al rango del sensor
  const configureArcs = () => {
    // Si no hay umbrales, usar un arco simple verde
    if (lower === undefined && upper === undefined) {
      return {
        colorArray: ['#2ecc71'],
        subArcs: [{ limit: max, color: '#2ecc71' }]
      };
    }

    // Si solo hay umbral superior
    if (lower === undefined && upper !== undefined) {
      return {
        colorArray: ['#2ecc71', '#e74c3c'],
        subArcs: [
          { limit: upper, color: '#2ecc71' },
          { limit: max, color: '#e74c3c' }
        ]
      };
    }

    // Si solo hay umbral inferior
    if (lower !== undefined && upper === undefined) {
      return {
        colorArray: ['#e74c3c', '#2ecc71'],
        subArcs: [
          { limit: lower, color: '#e74c3c' },
          { limit: max, color: '#2ecc71' }
        ]
      };
    }

    // Si hay ambos umbrales
    return {
      colorArray: ['#e74c3c', '#2ecc71', '#e74c3c'],
      subArcs: [
        { limit: lower, color: '#e74c3c' },
        { limit: upper, color: '#2ecc71' },
        { limit: max, color: '#e74c3c' }
      ]
    };
  };

  const sensorNameTranslations = {
    'light': 'Luz',
    'humidity': 'Humedad',
    'temperature': 'Temperatura',
    'co2': 'CO₂',
    'sound': 'Sonido'
  };

  const translatedName = sensorNameTranslations[sensorType] || sensor?.sensorName || '';

  // Unidades para cada tipo de sensor
  const sensorUnits = {
    'temperature': '°C',
    'humidity': '%',
    'light': 'lux',
    'co2': 'ppm',
    'sound': 'dB'
  };

  // Obtener la unidad para este sensor
  const unit = sensorUnits[sensorType] || '';

  // Determinar el estado del sensor
  const getSensorStatus = () => {
    if (lower !== undefined && upper !== undefined) {
      if (latestValue < lower || latestValue > upper) return 'Umbral superado';
    } else if (upper !== undefined && latestValue > upper) {
      return 'Umbral superado';
    } else if (lower !== undefined && latestValue < lower) {
      return 'Umbral superado';
    }
    return 'Normal';
  };

  const sensorStatus = getSensorStatus();

  return (
    <View className={`w-80 h-60 mx-2 rounded-2xl bg-gray-100 p-3 shadow-md
          ${isSelected ? 'border border-blue-500 shadow-md' : 'border-gray-200'}`}>
      {/* Encabezado */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">{translatedName}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity>
            <Image
                source={NotificationIcon}
                className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={SettingIcon} className="w-6 h-6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dial semicircular */}
      <View className="items-center">
        <SemiCircularDial
            percentage={(latestValue - min) / (max - min) * 100}
            lowerCritical={(lower - min) / (max - min) * 100}
            upperCritical={(upper - min) / (max - min) * 100}
        />

        {/* Valor actual */}
        <Text className="text-xl font-semibold text-gray-800 mt-2" style={{ color: getValueColor() }}>
          {`${Number(latestValue).toFixed(1)} ${unit}`}
        </Text>

        {/* Mostrar umbrales si existen */}
        {(lower !== undefined || upper !== undefined) && (
            <View className="flex-row justify-between w-full px-4 mt-2">
              {lower !== undefined && (
                  <Text className="text-xs text-gray-500">Min: {lower} {unit}</Text>
              )}
              <View className="flex-1" />
              {upper !== undefined && (
                  <Text className="text-xs text-gray-500">Max: {upper} {unit}</Text>
              )}
            </View>
        )}

        {/* Indicador de estado */}
        <View className="mt-3">
          <View
              className={`flex-row items-center px-2.5 py-0.5 rounded-full ${
                  sensorStatus === 'Normal'
                      ? 'bg-green-100'
                      : 'bg-red-100'
              }`}>
            <View
                className={`h-2 w-2 rounded-full mr-1 ${
                    sensorStatus === 'Normal'
                        ? 'bg-green-400'
                        : 'bg-red-400'
                }`}
            />
            <Text
                className={`text-sm font-medium ${
                    sensorStatus === 'Normal'
                        ? 'text-green-800'
                        : 'text-red-800'
                }`}>
              {sensorStatus}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SensorCard;