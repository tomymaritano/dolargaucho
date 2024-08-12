import React from 'react';
import * as Icons from 'react-cryptocoins'; // Importa todos los íconos disponibles

const getCryptoIcon = (moneda) => {
  const cryptoName = moneda.toLowerCase();
  
  if (Icons[cryptoName]) {
    const CryptoIconComponent = Icons[cryptoName];
    return <CryptoIconComponent size={24} />;
  } else {
    // Puedes usar un icono genérico si no se encuentra el específico
    return <span>Icono no disponible</span>;
  }
};

export default getCryptoIcon;
