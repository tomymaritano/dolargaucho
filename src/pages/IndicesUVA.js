import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const IndicesUVA = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/indices/uva');
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
          Índices UVA
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {data.map((item, index) => (
              <Typography key={index} variant="body1">
                Fecha: {item.fecha} - Valor UVA: {item.valor}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default IndicesUVA;
