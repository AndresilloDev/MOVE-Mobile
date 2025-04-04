import React, {useEffect, useState} from "react";
import {Animated, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const severityIcons = {
  success: "check-circle",
  error: "error",
  info: "info",
  warning: "warning",
};

const severityColors = {
  success: "#4CAF50",
  error: "#F44336",
  info: "#2196F3",
  warning: "#FFC107",
};

export const Notification = ({ open, severity, message, handleClose }) => {
  const [visible, setVisible] = useState(open);
  const [progress, setProgress] = useState(new Animated.Value(100));

  useEffect(() => {
    setVisible(open);

    if (open) {
      setProgress(new Animated.Value(100));

      const interval = setInterval(() => {
        Animated.timing(progress, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: false,
        }).start();
      }, 100);

      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, handleClose]);

  if (!visible) return null;

  return (
    <View style={[styles.notification, { borderColor: severityColors[severity] }]}>
      <View style={styles.content}>
        <Icon name={severityIcons[severity]} size={24} color={severityColors[severity]} />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Icon name="close" size={20} color="#9E9E9E" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progress,
            {
              backgroundColor: severityColors[severity],
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 300,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  progressBar: {
    width: "100%",
    height: 4,
    marginTop: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
  },
});
