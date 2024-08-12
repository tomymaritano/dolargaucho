import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Paper } from '@mui/material';

const DolarAmbito = () => {
  const [dolares, setDolares] = useState([]);

  useEffect(() => {
    const fetchDolares = async () => {
      try {
        const response = await axios.get("https://dolarapi.com/v1/ambito/dolares");
        setDolares(response.data);
      } catch (error) {
        console.error("Error fetching Dolar Ambito data:", error);
      }
    };

    fetchDolares();
  }, []);

  return (
    <Box sx={{ maxWidth: 'xl', margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cotización del Dólar según Ámbito
      </Typography>
      <Grid container spacing={2}>
        {dolares.map((dolar, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: 'center',
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {dolar.nombre}
              </Typography>
              <Typography variant="body1" sx={{ color: '#4caf50' }}>
                Compra: ${parseFloat(dolar.compra).toFixed(2)}
              </Typography>
              <Typography variant="body1" sx={{ color: '#f44336' }}>
                Venta: ${parseFloat(dolar.venta).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DolarAmbito;
