import axios from 'axios';

const baseUrl = 'http://localhost:3000/bodegas';

export const obtenerBodegas = () => axios.get(baseUrl);
export const obtenerBodegaPorId = (id) => axios.get(`${baseUrl}/${id}`);
export const crearBodega = (data) => axios.post(baseUrl, data);
export const actualizarBodega = (id, data) => axios.put(`${baseUrl}/${id}`, data);
export const eliminarBodega = (id) => axios.delete(`${baseUrl}/${id}`);
export const agregarVinoABodega = (id, vinoId) => axios.put(`${baseUrl}/${id}/agregar-vino`, { vinoId });
export const eliminarVinoDeBodega = (id, vinoId) => axios.put(`${baseUrl}/${id}/eliminar-vino`, { vinoId });
export const obtenerBodegasConPaginado = (page, limit) => axios.get(`${baseUrl}/pagina?page=${page}&limit=${limit}`);
export const obtenerBodegaPorNombre = (nombre) => {
    return axios.get(`http://localhost:3000/bodegas/nombre/${nombre}`);
  };
  
