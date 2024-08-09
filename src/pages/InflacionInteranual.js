import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const InflacionInteranual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/indices/inflacionInteranual');
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
          Inflación Interanual
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {data.map((item, index) => (
              <Typography key={index} variant="body1">
                Fecha: {item.fecha} - Inflación Interanual: {item.valor}%
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default InflacionInteranual;
