import React, { useEffect, useState } from 'react';
import cryptoAxiosInstance from '../api/cryptoAxiosConfig';
import { Box, Typography } from '@mui/material';
import Marquee from 'react-fast-marquee';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const CryptoMarquee = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await cryptoAxiosInstance.get('/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px 0' }}>
      <Marquee gradient={false} speed={40} pauseOnHover>
        {cryptoData.map((coin) => (
          <Box key={coin.id} sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
            <img src={coin.image} alt={coin.name} width="20" height="20" style={{ marginRight: 8 }} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 1 }}>
              {coin.name} (${coin.current_price.toFixed(2)})
            </Typography>
            {coin.price_change_percentage_24h >= 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'green', marginLeft: 1 }}>
                <ArrowUpwardIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'red', marginLeft: 1 }}>
                <ArrowDownwardIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Typography>
              </Box>
            )}
          </Box>
        ))}
      </Marquee>
    </Box>
  );
};

export default CryptoMarquee;
