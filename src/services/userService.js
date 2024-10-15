// src/services/userService.js
import axios from 'axios';

const API_URL = "http://localhost:3000/usuarios"; // Cambia según tu servidor

// Servicio para crear un nuevo usuario
export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
};

// Servicio para obtener todos los usuarios
export const getAllUsers = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para obtener un usuario por ID
export const getUserById = async (id, token) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para iniciar sesión
export const loginUser = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

// Servicio para actualizar un usuario
export const updateUser = async (id, userData, token) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Servicio para eliminar un usuario
export const deleteUser = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
