import React from 'react';
import { Container } from '@mui/material';
import ExchangeRates from '../components/ExchangesRates';

const Home = () => (
  <Container maxWidth="xl">
    <ExchangeRates />
  </Container>
);

export default Home;
