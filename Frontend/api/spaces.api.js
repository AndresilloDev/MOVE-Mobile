import api from "./base.api";

const endpoint = "/spaces";

//Obtiene todos los espacios
export const getSpaces = async () => {
    return await api.get(endpoint);
}

//Obtiene un espacio
export const getSpace = async (id) => {
    return await api.get(`/${endpoint}/${id}`);
}

//Crea un espacio
export const createSpace = async (space) => {
    return await api.post(endpoint, space);
}

//Actualiza un espacio

export const updateSpace = async (id, space) => {
    return await api.put(`/${endpoint}/${id}`, space);
}

//Elimina un espacio;
//NOTA: El eliminado es lógico, no físico
//NOTA: No se puede eliminar un espacio si tiene dispositivos
export const deleteSpace = async (id) => {
    return await api.delete(`/${endpoint}/${id}`);
}

//Obtiene la cantidad de dispositivos dentro de un espacio
export const getSpaceDevices = async (id) => {
    return await api.get(`/${endpoint}/${id}/devices`);
}