import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Hero = () => {
  return (
    <Box 
      sx={{
        backgroundColor: '#F9FAFB',
        // backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/glossy-abstract-3440x1440-9602.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black',
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dolar gaucho
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
            Por el pancho y la coca. Mantente informado.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
