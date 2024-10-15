import React, { useEffect, useState } from 'react';
import { getAllVinos } from '../services/vinoServices';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Galleria } from 'primereact/galleria';
import 'primeflex/primeflex.css';
import './VinosUsers.css'; // Asegúrate de agregar estilos personalizados

const VinosUsers = () => {
  const [vinos, setVinos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchVinos();
  }, []);

  const fetchVinos = async () => {
    try {
      const data = await getAllVinos();
      setVinos(data);
    } catch (error) {
      console.error('Error al cargar los vinos:', error);
    }
  };

  const renderHeader = (vino) => (
    <div>
      <h3>{vino.nombre}</h3>
      <p>{vino.tipo}</p>
      <Rating value={4} readOnly stars={5} cancel={false} />
    </div>
  );

  const renderFooter = (vino) => (
    <div className="p-d-flex p-jc-between p-ai-center">
      <Button label="Ver Detalles" icon="pi pi-info-circle" className="p-button-info" />
      <Button label="Añadir al Carrito" icon="pi pi-shopping-cart" className="p-button-success" />
    </div>
  );

  const renderImageItem = (vino) => (
    <img 
      src={`https://picsum.photos/300/400?random=${Math.floor(Math.random() * 1000)}`} 
      alt={vino.nombre} 
      style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px' }} 
    />
  );

  const responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3 },
    { breakpoint: '768px', numVisible: 2 },
    { breakpoint: '560px', numVisible: 1 }
  ];

  return (
    <div className="p-grid p-justify-center p-mt-4" style={{ backgroundColor: '#f9f9f9', padding: '2rem' }}>
      <h1 className="p-text-center p-mb-5" style={{ color: '#333', fontWeight: 'bold' }}>Nuestra Selección de Vinos</h1>
      <Galleria 
        value={vinos} 
        activeIndex={activeIndex} 
        onItemChange={(e) => setActiveIndex(e.index)} 
        responsiveOptions={responsiveOptions}
        numVisible={4} 
        item={renderImageItem} 
        circular 
        fullScreen 
        transitionInterval={3000}
        style={{ maxWidth: '800px', marginBottom: '2rem' }}
      />
      <div className="p-grid p-ai-center vinos-grid">
        {vinos.map((vino) => (
          <div key={vino._id} className="p-col-12 p-md-6 p-lg-3 vino-card">
            <Card
              title={renderHeader(vino)}
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', marginBottom: '2rem', padding: '1rem' }}
              footer={renderFooter(vino)}
              className="vino-card"
            >
              <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Bodega: {vino.bodega?.nombre || 'Sin bodega asociada'}</p>
              <p>Precio: ${vino.precio || 'Consultar'}</p>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VinosUsers;
