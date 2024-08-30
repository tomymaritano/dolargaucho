import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, CircularProgress } from '@mui/material';

const HomePage = () => {
  const [riesgoPais, setRiesgoPais] = useState(null);
  const [precioDolarOficial, setPrecioDolarOficial] = useState(null);
  const [precioDolarBlue, setPrecioDolarBlue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const riesgoResponse = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        setRiesgoPais(riesgoResponse.data.valor);

        const dolarResponse = await axios.get('https://dolarapi.com/v1/dolares');
        const dolarOficial = dolarResponse.data.find(d => d.nombre === "Oficial");
        const dolarBlue = dolarResponse.data.find(d => d.nombre === "Blue");
        setPrecioDolarOficial(dolarOficial ? `Compra ${dolarOficial.compra} / Venta ${dolarOficial.venta}` : 'No disponible');
        setPrecioDolarBlue(dolarBlue ? `Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}` : 'No disponible');
      } catch (error) {
        console.error('Error al obtener los datos generales:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  return (
    <Container maxWidth="xl">
      {/* Introducción */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>Bienvenido a la Plataforma de Finanzas Argentinas</Typography>
        <Typography variant="body1">Aquí encontrarás información actualizada sobre el riesgo país, los tipos de cambio del dólar y las últimas noticias financieras de Argentina. Utiliza nuestra plataforma para tomar decisiones informadas y mantenerse al día con las fluctuaciones del mercado financiero.</Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Riesgo País */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Riesgo País</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FF2626' }}>{riesgoPais || 'No disponible'}</Typography>}
          </Box>
        </Grid>

        {/* Dólar Oficial */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Dólar Oficial</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>{precioDolarOficial || 'No disponible'}</Typography>}
          </Box>
        </Grid>

        {/* Dólar Blue */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Dólar Blue</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#007BFF' }}>{precioDolarBlue || 'No disponible'}</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
