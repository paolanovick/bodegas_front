// src/components/RegisterForm.js
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { createUser } from '../services/userService';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleRegister = async () => {
    try {
      const userData = { name, email, password };
      await createUser(userData);
      setMessage('Usuario registrado con éxito');
    } catch (err) {
      setMessage('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registrar Usuario</h2>
      {message && <p>{message}</p>}
      <div>
        <InputText 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nombre" 
        />
      </div>
      <div>
        <InputText 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
        />
      </div>
      <div>
        <InputText 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
      </div>
      <Button label="Registrar" onClick={handleRegister} />
    </div>
  );
};

export default RegisterForm;
