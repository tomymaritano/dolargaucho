import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const RiesgoPaisUltimo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/indices/riesgo-pais/ultimo');
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
          Riesgo País (Último)
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Typography variant="body1">
              Fecha: {data?.fecha} - Riesgo País: {data?.valor} puntos
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default RiesgoPaisUltimo;
