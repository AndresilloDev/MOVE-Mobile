import api from './base.api';

const endpoint = '/auth';

export const login = async (credentials) => {
    return await api.post(`${endpoint}/login`, credentials);
}; 

export const logout = async () => {
    return await api.post(`${endpoint}/logout`);
};

export const checkAuth = async () => {
    return await api.get(`${endpoint}/checkAuth`);
}