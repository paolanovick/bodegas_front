import React, { useState } from 'react';
import { obtenerBodegaPorId } from '../../services/BodegaService'; // Importar el servicio necesario
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const BuscarBodegaPorId = () => {
  const [bodegaId, setBodegaId] = useState('');
  const [bodega, setBodega] = useState(null);

  const handleBuscar = async () => {
    try {
      const response = await obtenerBodegaPorId(bodegaId);
      setBodega(response.data);
    } catch (error) {
      console.error('Error al buscar bodega por ID:', error);
      setBodega(null);
    }
  };

  return (
    <div className="p-field">
      <label htmlFor="bodegaId">Buscar Bodega por ID</label>
      <InputText 
        id="bodegaId" 
        value={bodegaId} 
        onChange={(e) => setBodegaId(e.target.value)} 
        placeholder="Ingresa el ID de la bodega"
      />
      <Button label="Buscar" icon="pi pi-search" onClick={handleBuscar} className="p-ml-2" />
      {bodega && (
        <div className="p-mt-2">
          <strong>Nombre:</strong> {bodega.nombre}
        </div>
      )}
    </div>
  );
};

export default BuscarBodegaPorId;
