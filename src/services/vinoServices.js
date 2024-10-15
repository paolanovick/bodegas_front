import axios from 'axios';

const API_URL = 'http://localhost:3000/vinos'; // La URL de tu API para vinos

// Obtener todos los vinos
export const getAllVinos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vinos:", error);
    throw error;
  }
};

// Crear un nuevo vino
export const createVino = async (vino) => {
  try {
    const response = await axios.post(API_URL, vino);
    return response.data;
  } catch (error) {
    console.error("Error al crear vino:", error);
    throw error;
  }
};

// Actualizar un vino por ID
export const updateVino = async (id, vino) => {
  try {
    const response = await axios.put(`${API_URL}/id/${id}`, vino);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar vino:", error);
    throw error;
  }
};

// Eliminar un vino por ID
export const deleteVino = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar vino:", error);
    throw error;
  }
};

// Obtener un vino por ID
export const getVinoById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vino por ID:", error);
    throw error;
  }
};

// Obtener un vino por nombre
export const getVinoByNombre = async (nombre) => {
  try {
    const response = await axios.get(`${API_URL}/nombre/${nombre}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener vino por nombre:", error);
    throw error;
  }
};





/////////////////////////////



// Obtener vinos por tipo
export const getVinosByTipo = async (tipo) => {
    try {
      const response = await axios.get(`http://localhost:3000/vinos/tipo/${tipo}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener vinos por tipo:', error);
      throw error;
    }
  };

  

  // Obtener vinos con ordenamiento
export const getVinosConOrden = async (campo = 'nombre', orden = 'asc') => {
    try {
      const response = await axios.get(`http://localhost:3000/vinos/orden?campo=${campo}&orden=${orden}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener vinos con ordenamiento:", error);
      throw error;
    }
  };

  

  export const getVinosConPaginado = async (page, limit) => {
    try {
      const response = await axios.get(`${API_URL}/pagina?page=${page}&limit=${limit}`);
      return response.data;  // Devolver los datos de la respuesta
    } catch (error) {
      console.error('Error al obtener vinos paginados:', error);
      throw error;
    }
  };