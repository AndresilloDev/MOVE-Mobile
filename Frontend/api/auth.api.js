import api from './base.api';

const endpoint = '/auth';

export const login = async (user, password) => {
    return await api.post(`${endpoint}/login`, {
        user: user,
        password: password
    });
}; 

export const logout = async () => {
    return await api.post(`${endpoint}/logout`);
};

export const checkAuth = async () => {
    return await api.get(`${endpoint}/checkAuth`);
}

export const recoverPassword = async (user) => {
    return await api.post(`${endpoint}/recoverPassword`, {
        user: user,
    })
}

export const changePassword = async (password, token, user) => {
    return await api.post(`${endpoint}/changePassword`, {
        password: password,
        token: token,
        user: user
    })
}