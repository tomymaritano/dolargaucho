import React, { useEffect, useState } from 'react';
import {
  Container, Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab
} from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const FondosDeInversion = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('rentaVariable');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get(`/finanzas/fci/${selectedCategory}/ultimo`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setTabValue(newValue);
    const categories = ['rentaVariable', 'rentaFija', 'rentaMixta'];
    setSelectedCategory(categories[newValue]);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Fondos de Inversión
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Tabs value={tabValue} onChange={handleCategoryChange} aria-label="categorías de fondos">
              <Tab label="Renta Variable" />
              <Tab label="Renta Fija" />
              <Tab label="Renta Mixta" />
            </Tabs>

            <TableContainer sx={{ mt: 4, borderRadius: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white' }}>Fondo</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>VCP</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>CCP</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Patrimonio</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Horizonte</TableCell>
                    <TableCell align="right" sx={{ color: 'white' }}>Fecha</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((fondo, index) => (
                    <TableRow key={index} hover>
                      <TableCell component="th" scope="row">
                        {fondo.fondo}
                      </TableCell>
                      <TableCell align="right">{fondo.vcp}</TableCell>
                      <TableCell align="right">{fondo.ccp}</TableCell>
                      <TableCell align="right">{fondo.patrimonio}</TableCell>
                      <TableCell align="right">{fondo.horizonte}</TableCell>
                      <TableCell align="right">{fondo.fecha}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default FondosDeInversion;
