import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';
import * as Icons from 'react-cryptocoins'; // Importa todos los íconos disponibles

// Función para obtener el ícono de la criptomoneda
const getCryptoIcon = (moneda) => {
  const cryptoName = moneda.charAt(0).toUpperCase() + moneda.slice(1).toLowerCase();
  
  if (Icons[cryptoName]) {
    const CryptoIconComponent = Icons[cryptoName];
    return <CryptoIconComponent size={24} />;
  } else {
    return null; // Devuelve null si no existe el ícono
  }
};

const RendimientosPorEntidad = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntidad, setSelectedEntidad] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/rendimientos');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEntidadChange = (event) => {
    setSelectedEntidad(event.target.value);
  };

  const selectedRendimientos = data.find(item => item.entidad === selectedEntidad)?.rendimientos || [];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <FormControl variant="outlined" sx={{ minWidth: 200, mb: 4 }}>
              <InputLabel>Entidad</InputLabel>
              <Select value={selectedEntidad} onChange={handleEntidadChange} label="Entidad">
                <MenuItem value="">
                  <em>Seleccione una entidad</em>
                </MenuItem>
                {data.map((item) => (
                  <MenuItem key={item.entidad} value={item.entidad}>
                    {item.entidad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedEntidad && (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Moneda</TableCell>
                      <TableCell align="right">APY (%)</TableCell>
                      <TableCell align="right">Fecha</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedRendimientos.map((rendimiento, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getCryptoIcon(rendimiento.moneda)}
                            <Typography sx={{ ml: 1 }}>{rendimiento.moneda}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">{rendimiento.apy}</TableCell>
                        <TableCell align="right">{rendimiento.fecha}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default RendimientosPorEntidad;
