import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { obtenerBodegaPorNombre } from '../../services/BodegaService';

const BuscarBodegaPorNombre = () => {
    const [nombre, setNombre] = useState('');
    const [bodega, setBodega] = useState(null);

    const buscarBodega = async () => {
        try {
            const response = await obtenerBodegaPorNombre(nombre);
            setBodega(response.data);
        } catch (error) {
            console.error('Error al buscar la bodega:', error);
        }
    };

    return (
        <div className="p-mt-4">
            <h2>Buscar Bodega por Nombre</h2>
            <div className="p-grid">
                <div className="p-col">
                    <InputText 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        placeholder="Nombre de la Bodega" 
                    />
                </div>
                <div className="p-col">
                    <Button label="Buscar" icon="pi pi-search" onClick={buscarBodega} />
                </div>
            </div>

            {bodega && (
                <div className="p-mt-4">
                    <h3>Resultados</h3>
                    <p><strong>Nombre:</strong> {bodega.nombre}</p>
                    <p><strong>Vinos:</strong> {bodega.vinos ? bodega.vinos.length : 0}</p>
                </div>
            )}
        </div>
    );
};

export default BuscarBodegaPorNombre;
