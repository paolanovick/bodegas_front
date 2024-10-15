// src/components/Header.js
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const items = [
    { label: 'Inicio', icon: 'pi pi-fw pi-home', command: () => navigate('/') },
    { label: 'Vinos', icon: 'pi pi-fw pi-list', command: () => navigate('/vinos') },
    { label: 'Bodegas', icon: 'pi pi-fw pi-globe', command: () => navigate('/bodegas') },
    { label: 'Login', icon: 'pi pi-fw pi-sign-in', command: () => navigate('/login') },
    { label: 'VinosUsers', icon: 'pi pi-fw pi-list', command: () => navigate('/vinosUsers') },
  ];

  return <Menubar model={items} />;
};

export default Header;
