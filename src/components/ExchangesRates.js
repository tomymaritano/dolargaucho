import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/divisasAxiosConfig';
import { Container, Typography, Grid, Paper, Box, Avatar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ExchangeRates = () => {
  const [dolares, setDolares] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dolaresResponse = await axiosInstance.get('/dolares');
        const cotizacionesResponse = await axiosInstance.get('/cotizaciones');
        
        // Transformar nombres
        const transformedDolares = dolaresResponse.data.map(rate => {
          if (rate.nombre === 'Contado con liquidación') {
            return { ...rate, nombre: 'CCL' };
          }
          if (rate.nombre === 'Bolsa') {
            return { ...rate, nombre: 'MEP' };
          }
          return rate;
        });

        const transformedCotizaciones = cotizacionesResponse.data.map(rate => {
          if (rate.nombre === 'Contado con liquidación') {
            return { ...rate, nombre: 'CCL' };
          }
          if (rate.nombre === 'Bolsa') {
            return { ...rate, nombre: 'MEP' };
          }
          return rate;
        });

        setDolares(transformedDolares);
        setCotizaciones(transformedCotizaciones);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getIcon = (nombre) => {
    switch (nombre) {
      case 'CCL':
        return <TrendingUpIcon sx={{ fontSize: 40, color: 'green' }} />;
      case 'MEP':
        return <TrendingDownIcon sx={{ fontSize: 40, color: 'blue' }} />;
      default:
        return <AttachMoneyIcon sx={{ fontSize: 40, color: 'grey' }} />;
    }
  };

  return (
    <Box>
      <Typography variant='h2' gutterBottom> Cotizaciones</Typography>
      <Grid container spacing={3}>
        {dolares.map((rate, index) => (
          <Grid item xs={12} key={index}>
            <Box elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ bgcolor: 'transparent', mr: 2 }}>
                                    {getIcon(rate.nombre)}
                </Avatar>
                <Typography variant="h6" component="h6" sx={{ fontWeight: 'bold' }}>
                  Dolar {rate.nombre}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary" sx={{ mr: 2 }}>
                  Compra: <Typography variant="body1" component="span" fontWeight='bold' color="success.main">${rate.compra}</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Venta: <Typography variant="body1" component="span" fontWeight='bold' color="success.main">${rate.venta}</Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExchangeRates;
