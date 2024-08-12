import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/divisasAxiosConfig';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ExchangeRates = () => {
  const [dolares, setDolares] = useState([]);
  const [setCotizaciones] = useState([]);

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
  }, [setDolares, setCotizaciones]);

  const getIcon = (nombre) => {
    switch (nombre) {
      case 'CCL':
        return <TrendingUpIcon sx={{ fontSize: 24, color: 'green' }} />;
      case 'MEP':
        return <TrendingDownIcon sx={{ fontSize: 24, color: 'blue' }} />;
      default:
        return <AttachMoneyIcon sx={{ fontSize: 24, color: 'grey' }} />;
    }
  };

  return (
    <Box maxWidth="xl">
      <TableContainer>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Moneda</TableCell>
              <TableCell align="center">Compra</TableCell>
              <TableCell align="center">Venta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dolares.map((rate, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center' }}>
                  {getIcon(rate.nombre)}
                  <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                    Dolar {rate.nombre}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" fontWeight='bold' color="success.main">
                    ${rate.compra.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1" fontWeight='bold' color="success.main">
                    ${rate.venta.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExchangeRates;
