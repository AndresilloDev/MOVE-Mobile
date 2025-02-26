import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

import SettingIcon from "../assets/icons/settings.png";
import NotificationIcon from "../assets/icons/notificacion.png";
import NotificationAlertIcon from "../assets/icons/notification_alert.png";

// Convierte ángulos polares a coordenadas cartesianas
const polarToCartesian = (center, radius, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180; // Empieza en -90° (izquierda)
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
      {createArc(-90, (lowerCritical / 100) * 180 - 90, "#FF5E5E")} // Crítico bajo
      {createArc(
        (lowerCritical / 100) * 180 - 90,
        (upperCritical / 100) * 180 - 90,
        "#3EE6AF"
      )} // Zona segura
      {createArc((upperCritical / 100) * 180 - 90, 90, "#FF5E5E")} // Crítico alto

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

const SensorCard = ({ sensor = {} }) => {
  // Datos temporales simulados
  sensor = {
    nombre: sensor.nombre || "Temperatura",
    actual: sensor.actual ?? 24,
    umbral_inf: sensor.umbral_inf ?? 18,
    umbral_sup: sensor.umbral_sup ?? 34,
    lim_inf: sensor.lim_inf ?? 0,
    lim_sup: sensor.lim_sup ?? 100,
  };

  const umbralExceeded =
    (sensor.umbral_sup && sensor.actual > sensor.umbral_sup) ||
    (sensor.umbral_inf && sensor.actual < sensor.umbral_inf);

  const [isUmbralExceeded] = useState(umbralExceeded);

  const getFormattedValue = (sensor) => {
    switch (sensor.nombre) {
      case "Temperatura":
        return `${sensor.actual}°C`;
      case "Humedad":
      case "Co2":
        return `${sensor.actual}%`;
      case "Ruido":
        return `${sensor.actual}dB`;
      default:
        return `${sensor.actual}`;
    }
  };

  // Convertir el valor actual en porcentaje
  const percentage =
    ((sensor.actual - sensor.lim_inf) / (sensor.lim_sup - sensor.lim_inf)) *
    100;

  return (
    <View className="w-80 h-60 mx-2 rounded-2xl bg-gray-100 p-3 shadow-md">
      {/* Encabezado */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">{sensor.nombre}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity>
            <Image source={SettingIcon} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={isUmbralExceeded ? NotificationAlertIcon : NotificationIcon}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dial semicircular */}
      <View className="items-center">
        <SemiCircularDial
          percentage={percentage}
          lowerCritical={20}
          upperCritical={80}
        />
        <Text className="text-2xl font-semibold mt-2">
          {getFormattedValue(sensor)}
        </Text>
        <Text className="text-gray-500">Actual</Text>
        <View className="flex-row justify-between w-full mt-2">
          <Text className="text-sm">Min: {sensor.lim_inf}</Text>
          <Text className="text-sm">Max: {sensor.lim_sup}</Text>
        </View>
      </View>
    </View>
  );
};

export default SensorCard;
