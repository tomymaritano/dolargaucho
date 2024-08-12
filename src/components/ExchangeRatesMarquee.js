import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/divisasAxiosConfig';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';

const FineMarquee = () => {
  const [dolares, setDolares] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/dolares');

        // Suponiendo que la API devuelve datos ordenados por fecha
        const sortedData = response.data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        setDolares(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentageChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px 0' }}>
      <Marquee gradient={false} speed={20} pauseOnHover direction="right">
        {dolares.map((rate, index) => {
          const previousRate = index > 0 ? dolares[index - 1] : null;
          const compraChange = previousRate ? calculatePercentageChange(rate.compra, previousRate.compra) : null;
          const ventaChange = previousRate ? calculatePercentageChange(rate.venta, previousRate.venta) : null;

          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginRight: 4 }}>
              <Typography variant="caption" sx={{ marginRight: 2, fontWeight: 'bold' }}>
                Dólar {rate.nombre}:
              </Typography>
              <Typography variant="caption" sx={{ color: 'black', marginRight: 2 }}>
                Compra: ${rate.compra ? rate.compra.toFixed(2) : 'N/A'} 
                {compraChange !== null && (
                  <Typography variant="caption" sx={{ color: compraChange > 0 ? 'green' : 'red', marginLeft: 1 }}>
                    ({compraChange > 0 ? '+' : ''}{compraChange.toFixed(2)}%)
                  </Typography>
                )}
              </Typography>
              <Typography variant="caption" sx={{ color: 'black' }}>
                Venta: ${rate.venta ? rate.venta.toFixed(2) : 'N/A'} 
                {ventaChange !== null && (
                  <Typography variant="caption" sx={{ color: ventaChange > 0 ? 'green' : 'red', marginLeft: 1 }}>
                    ({ventaChange > 0 ? '+' : ''}{ventaChange.toFixed(2)}%)
                  </Typography>
                )}
              </Typography>
            </Box>
          );
        })}
      </Marquee>
    </Box>
  );
};

export default FineMarquee;
