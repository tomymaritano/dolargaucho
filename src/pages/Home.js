import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import DolarGauchoInfo from '../components/DolarGauchoInfo/DolarGauchoInfo';
const HomePage = () => {
  const [riesgoPais, setRiesgoPais] = useState(null);
  const [dolares, setDolares] = useState({
    oficial: null,
    blue: null,
    contadoConLiquidacion: null,
    tarjeta: null,
    cripto: null,
    mayorista: null,
    bolsa: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const riesgoResponse = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        setRiesgoPais(riesgoResponse.data.valor);

        const dolarResponse = await axios.get('https://dolarapi.com/v1/dolares');
        
        const oficial = dolarResponse.data.find(d => d.nombre === "Oficial") || {};
        const blue = dolarResponse.data.find(d => d.nombre === "Blue") || {};
        const contadoConLiquidacion = dolarResponse.data.find(d => d.nombre === "Contado con liquidación") || {};
        const tarjeta = dolarResponse.data.find(d => d.nombre === "Tarjeta") || {};
        const cripto = dolarResponse.data.find(d => d.nombre === "Cripto") || {};
        const mayorista = dolarResponse.data.find(d => d.nombre === "Mayorista") || {};
        const bolsa = dolarResponse.data.find(d => d.nombre === "Bolsa") || {};

        setDolares({
          oficial: oficial ? `Compra ${oficial.compra} / Venta ${oficial.venta}` : 'No disponible',
          blue: blue ? `Compra ${blue.compra} / Venta ${blue.venta}` : 'No disponible',
          contadoConLiquidacion: contadoConLiquidacion ? `Compra ${contadoConLiquidacion.compra} / Venta ${contadoConLiquidacion.venta}` : 'No disponible',
          tarjeta: tarjeta ? `Compra ${tarjeta.compra} / Venta ${tarjeta.venta}` : 'No disponible',
          cripto: cripto ? `Compra ${cripto.compra} / Venta ${cripto.venta}` : 'No disponible',
          mayorista: mayorista ? `Compra ${mayorista.compra} / Venta ${mayorista.venta}` : 'No disponible',
          bolsa: bolsa ? `Compra ${bolsa.compra} / Venta ${bolsa.venta}` : 'No disponible',
        });
      } catch (error) {
        console.error('Error al obtener los datos generales:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ margin: 0 }}>
        <DolarGauchoInfo
          loading={loading}
          riesgoPais={riesgoPais}
          dolares={dolares}
        />
    </Box>
  );
};

export default HomePage;
