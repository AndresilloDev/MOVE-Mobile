import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import SettingIcon from "../assets/icons/settings.png";
import NotificationIcon from "../assets/icons/notificacion.png";
import NotificationAlertIcon from "../assets/icons/notification_alert.png";

const SensorCard = ({ sensor = {} }) => {
    /*Temporal*/
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

  const [isUmbralExceeded, setIsUmbralExceeded] = useState(umbralExceeded);

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

  return (
    <View className="w-64 border rounded-2xl bg-gray-100 p-3 shadow-md">
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

      <View className="items-center">
        <Text className="text-2xl font-semibold">{getFormattedValue(sensor)}</Text>
        <Text className="text-gray-500">Actual</Text>
      </View>
    </View>
  );
};

export default SensorCard;
