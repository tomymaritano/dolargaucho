import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';

function ExchangeRates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get('https://dolarapi.com/v1/cotizaciones');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, backgroundColor: theme.palette.background.default, borderRadius: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center', fontWeight: 'bold', color: theme.palette.text.primary }}>
        Cotizaciones del Dólar
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: 'gray.50', boxShadow: 'none', borderRadius: 2 }}>
        <Table aria-label="exchange rates table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Moneda</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Casa</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Compra</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Venta</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: theme.palette.common.white }}>Fecha de Actualización</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((rate, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                <TableCell>{rate.moneda}</TableCell>
                <TableCell>{rate.nombre}</TableCell>
                <TableCell>{rate.casa}</TableCell>
                <TableCell sx={{ color: theme.palette.success.main, fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(rate.compra)}
                </TableCell>
                <TableCell sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
                  {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(rate.venta)}
                </TableCell>
                <TableCell>{new Date(rate.fechaActualizacion).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ExchangeRates;
