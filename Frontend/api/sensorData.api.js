import io from 'socket.io-client';
import api from './base.api';

const endpoint = '/sensorData';
//const SOCKET_URL = 'http://move-api-env.eba-jjywtyd3.us-east-1.elasticbeanstalk.com/api';
const SOCKET_URL = 'http://192.168.1.85:3000/api';

// Create socket connection
const socket = io(SOCKET_URL);

export const getDeviceSensors = async (deviceId) => {
    return await api.get(`${endpoint}/${deviceId}/sensors`);
};

export const getAllSensorDataInRange = async (deviceId, params) => {
    const { start, end, sensorName } = params || {};

    return await api.get(`${endpoint}/${deviceId}/sensors/data`, {
        params: {
            start: start || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            end: end || new Date().toISOString(),
            sensorName
        }
    });
};

// Lectura en tiempo real de los datos
export const listenToSensorUpdates = (callback) => {
    socket.on('sensor-update', (data) => {
        callback(data);
    });

    return () => {
        socket.off('sensor-update');
    };
};