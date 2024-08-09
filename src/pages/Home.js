import React from 'react';
import { Container } from '@mui/material';
import ExchangeRates from '../components/ExchangesRates';
import HistoricalDollarChart from '../components/charts/HistoricalDollarChart';

const Home = () => (
  <Container maxWidth="xl">
    <ExchangeRates />
    <HistoricalDollarChart />
  </Container>
);

export default Home;
