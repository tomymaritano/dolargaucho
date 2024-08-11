import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress, Card, CardContent, Button } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const RiesgoPaisUltimo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await argentinaApiAxiosConfig.get('/finanzas/indices/riesgo-pais/ultimo');
      setData(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
      setError('Hubo un error al cargar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  useEffect(() => {
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
        ) : error ? (
          <Box>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
            <Button variant="contained" color="primary" onClick={fetchData} sx={{ mt: 2 }}>
              Recargar
            </Button>
          </Box>
        ) : data ? (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">
                Fecha: {data.fecha}
              </Typography>
              <Typography variant="h6">
                Riesgo País: {data.valor} puntos
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">No hay datos disponibles.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default RiesgoPaisUltimo;
