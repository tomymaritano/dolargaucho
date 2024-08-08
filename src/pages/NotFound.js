import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => (
  <Container>
    <Typography variant="h1" component="h1" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" component="p">
      Sorry, the page you are looking for does not exist.
    </Typography>
  </Container>
);

export default NotFound;
