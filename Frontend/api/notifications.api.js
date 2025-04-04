import api from "./base.api";

const endpoint = "/notifications";

// Obtener todas las notificaciones NO archivadas
export const getUnfiledNotifications = async () => {
    return await api.get(`${endpoint}/unfiled`);
};

// Obtener todas las notificaciones archivadas
export const getFiledNotifications = async () => {
    return await api.get(`${endpoint}/filed`);
};

// Obtener una notificación por ID
export const getNotification = async (notificationId) => {
    return await api.get(`${endpoint}/${notificationId}`);
};

// Obtener una notificación archivada por ID
export const getFiledNotification = async (notificationId) => {
    return await api.get(`${endpoint}/filed/${notificationId}`);
};

// Crear una nueva notificación
export const createNotification = async (notification) => {
    return await api.post(endpoint, notification);
};

export const fileNotification = async (notificationId) => {
    return await api.put(`${endpoint}/filed/${notificationId}`);
};
