import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, CircularProgress, Fade, Container } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EuroIcon from '@mui/icons-material/Euro';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CotizacionesDos = () => {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dolarapi.com/v1/dolares');
        setCotizaciones(response.data);
      } catch (error) {
        console.error('Error al obtener las cotizaciones:', error);
      }
      setLoading(false);
    };

    fetchCotizaciones();
  }, []);

  const getIcon = (moneda) => {
    switch (moneda) {
      case 'USD':
        return <MonetizationOnIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
      case 'EUR':
        return <EuroIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
      case 'BRL':
        return <CurrencyExchangeIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
      case 'CLP':
        return <CurrencyExchangeIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
      case 'UYU':
        return <CurrencyExchangeIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
      default:
        return <AttachMoneyIcon sx={{ fontSize: 40, color: '#007BFF' }} />;
    }
  };

  return (
    <Container maxWidth={'lg'}>
  <Grid container spacing={4} sx={{ mt: 4 }}>
      {loading ? (
        <Grid item xs={12}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        cotizaciones.map((cotizacion, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Fade in={!loading}>
              <Box
                sx={{
                  textAlign: 'center',
                  padding: 3,
                  backgroundColor: 'gray.50',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0', // Sutil borde gris
                }}
              >
                {getIcon(cotizacion.moneda)}
                <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                  {cotizacion.nombre}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Compra: <strong>{cotizacion.compra.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Venta: <strong>{cotizacion.venta.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</strong>
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 2 }}>
                  Actualizado: {new Date(cotizacion.fechaActualizacion).toLocaleDateString()}
                </Typography>
              </Box>
            </Fade>
          </Grid>
        ))
      )}
    </Grid>
    </Container>
  
  );
};

export default CotizacionesDos;
