import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material';

const CurrencyCalculator = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [conversionType, setConversionType] = useState('buy');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const dolaresResponse = await axios.get('https://dolarapi.com/v1/dolares');
        const cotizacionesResponse = await axios.get('https://dolarapi.com/v1/cotizaciones');

        const combinedCurrencies = [...dolaresResponse.data, ...cotizacionesResponse.data];
        setCurrencies(combinedCurrencies);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConversionTypeChange = (event, newType) => {
    if (newType !== null) {
      setConversionType(newType);
    }
  };

  const calculateConversion = () => {
    const selectedRate = currencies.find(rate => rate.nombre === selectedCurrency);

    if (selectedRate) {
      let conversion;
      if (conversionType === 'buy') {
        conversion = amount / selectedRate.venta; // Compra de divisa
      } else {
        conversion = amount * selectedRate.compra; // Venta de divisa
      }
      setResult(conversion.toFixed(2));
    } else {
      setResult('Moneda no encontrada');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 4, borderRadius: 2, backgroundColor: '#fff', boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
        Calculadora de Divisas
      </Typography>

      <ToggleButtonGroup
        value={conversionType}
        exclusive
        onChange={handleConversionTypeChange}
        sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <ToggleButton value="buy">
          Comprar
        </ToggleButton>
        <ToggleButton value="sell">
          Vender
        </ToggleButton>
      </ToggleButtonGroup>

      <Divider sx={{ mb: 2 }} />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Seleccione Moneda</InputLabel>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {currencies.map((rate, index) => (
            <MenuItem key={index} value={rate.nombre}>{rate.nombre}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Monto"
        type="number"
        fullWidth
        value={amount}
        onChange={handleAmountChange}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" color="primary" fullWidth onClick={calculateConversion} sx={{ fontWeight: 'bold' }}>
        Calcular
      </Button>

      {result !== null && (
        <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: '#333' }}>
          Resultado: ${result}
        </Typography>
      )}
    </Box>
  );
};

export default CurrencyCalculator;
