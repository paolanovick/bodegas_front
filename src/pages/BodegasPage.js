import React from 'react';
import Header from '../components/Header'; // Importa el Header
import PaginacionBodega from '../components/componentsBodega/paginacionBodega'; // Componente de paginación
import BuscarBodegaPorNombre from '../components/componentsBodega/buscarBodegaPorNombre'; // Componente de búsqueda por nombre
import BuscarBodegaPorId from '../components/componentsBodega/buscarBodegaPorId'; // Componente de búsqueda por ID

const BodegasPage = () => {
  return (
    <div>
      
      <div className="p-mt-5 p-p-4" style={{ backgroundColor: '#f4f4f9', borderRadius: '10px' }}>
        <h1 className="p-text-center p-mb-4">Gestión de Bodegas</h1>

        {/* Fila para mostrar las búsquedas de bodega por nombre y por ID */}
        <div className="p-grid p-justify-between">
          <div className="p-col-6">
            <BuscarBodegaPorNombre />
          </div>
          <div className="p-col-6">
            <BuscarBodegaPorId />
          </div>
        </div>

        {/* Componente de paginación de bodegas */}
        <PaginacionBodega />
      </div>
    </div>
  );
};

export default BodegasPage;
