import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Hero = ({ title }) => {
  return (
    <Box sx={{ backgroundColor: 'primary.secondary', py: 6, color: 'white' }}>
      <Container maxWidth="xl">
        <Typography variant="h1" component="h1" align="start">
          {title}
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
