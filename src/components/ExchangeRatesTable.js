import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const ExchangeRatesTable = () => {
  const [dolares, setDolares] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dolaresResponse = await axiosInstance.get('/dolares');
        const cotizacionesResponse = await axiosInstance.get('/cotizaciones');
        setDolares(dolaresResponse.data);
        setCotizaciones(cotizacionesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Box mb={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Compra</TableCell>
                <TableCell>Venta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dolares.map((rate, index) => (
                <TableRow key={index}>
                  <TableCell>{rate.nombre}</TableCell>
                  <TableCell>${rate.compra}</TableCell>
                  <TableCell>${rate.venta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ExchangeRatesTable;
