import React from 'react';
import { Container } from '@mui/material';
import ExchangeRates from '../components/ExchangesRates';
import FinancialNews from '../components/FinancialNews';

const Home = () => (
  <Container maxWidth="xl">
    <ExchangeRates />
    <FinancialNews />
  </Container>
);

export default Home;
