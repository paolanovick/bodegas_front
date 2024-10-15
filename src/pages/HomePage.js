// src/pages/HomePage.js
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

const HomePage = () => {
    return (
        <div className="p-grid p-align-center p-justify-center" style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '2rem' }}>
            <div className="p-col-12 p-md-8">
                <Card 
                    title="Bienvenido a la API de Gestión de Vinos"
                    subTitle="Organiza, gestiona y optimiza tu inventario de bodegas y vinos"
                    style={{ textAlign: 'center', padding: '2rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}
                >
                    <div style={{ marginBottom: '2rem' }}>
                    <Image 
                        src="/assets/pao.jpg"  
                        alt="Foto de la alumna" 
                        width="150" 
                        style={{ borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} 
                        preview 
                    />

                    </div>
                    <Button label="Ver Vinos" className="p-button-rounded p-button-info" onClick={() => window.location.href = "/vinosUsers"} style={{ marginRight: '1rem' }} />
                    <Button label="Login" className="p-button-rounded p-button-secondary" onClick={() => window.location.href = "/login"} />
                </Card>
            </div>
            <div className="p-col-12 p-md-6 footer" style={{ textAlign: 'center', marginTop: '2rem', color: '#555' }}>
                <p><strong>Nombre y Apellido:</strong> Paola Novick</p>
                <p><strong>Materia:</strong> Aplicaciones Hibridas</p>
                <p><strong>Docente:</strong> Camila Carballo</p>
                <p><strong>Comisión:</strong> DWN4AV</p>
            </div>
        </div>
    );
};

export default HomePage;
