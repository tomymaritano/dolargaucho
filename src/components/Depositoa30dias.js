import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const TasasDepositos30Dias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/tasas/depositos30Dias');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Tasas de Depósitos a 30 Días
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Entidad</TableCell>
                  <TableCell align="right">Tasa (TNA Clientes)</TableCell>
                  <TableCell align="right">Monto Promedio</TableCell>
                  <TableCell align="right">Tasa Preferencial</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.entidad}</TableCell>
                    <TableCell align="right">{item.valor}%</TableCell>
                    <TableCell align="right">{item.valor}</TableCell>
                    <TableCell align="right">{item.tasaPreferencial}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default TasasDepositos30Dias;
