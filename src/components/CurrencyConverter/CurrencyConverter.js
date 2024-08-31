import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Stack, Paper, IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem, Box, Grid, Divider } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RefreshIcon from '@mui/icons-material/Refresh';
import { grey, green, blue, red } from '@mui/material/colors';

function CurrencyConverter() {
    const [amount, setAmount] = useState('');
    const [currencyType, setCurrencyType] = useState('');
    const [rates, setRates] = useState([]);
    const [isARS2USD, setIsARS2USD] = useState(true);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://dolarapi.com/v1/dolares');
                setRates(response.data);
            } catch (error) {
                console.error('Error fetching rates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleCurrencyTypeChange = (event) => {
        setCurrencyType(event.target.value);
    };

    const swapCurrency = () => {
        setIsARS2USD(!isARS2USD);
        setResult(null);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    };

    const calculateConversion = () => {
        const selectedRate = rates.find(rate => rate.casa === currencyType);
        if (!selectedRate) {
            setResult({ error: 'Rate not available' });
            return;
        }

        let calcResultCompra, calcResultVenta;
        if (isARS2USD) {
            calcResultCompra = amount / selectedRate.venta;
            calcResultVenta = amount / selectedRate.compra;
        } else {
            calcResultCompra = amount * selectedRate.compra;
            calcResultVenta = amount * selectedRate.venta;
        }

        setResult({
            amount: formatNumber(amount),
            fromCurrency: isARS2USD ? 'ARS' : 'USD',
            toCurrency: isARS2USD ? 'USD' : 'ARS',
            rateCompra: formatNumber(selectedRate.compra),
            rateVenta: formatNumber(selectedRate.venta),
            calcResultCompra: formatNumber(calcResultCompra),
            calcResultVenta: formatNumber(calcResultVenta),
            exchangeName: selectedRate.nombre,
        });
    };

    const handleRefreshRates = () => {
        setLoading(true);
        setRates([]);
        setCurrencyType('');
        setAmount('');
        setResult(null);
        const fetchRates = async () => {
            try {
                const response = await axios.get('https://dolarapi.com/v1/dolares');
                setRates(response.data);
            } catch (error) {
                console.error('Error fetching rates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    };

    return (
        <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', borderRadius: 2, backgroundColor: grey[50], boxShadow: 'none' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ color: blue[700] }}>Currency Converter</Typography>
                <Tooltip title="Refresh Rates">
                    <IconButton onClick={handleRefreshRates} disabled={loading}>
                        <RefreshIcon sx={{ color: blue[700] }} />
                    </IconButton>
                </Tooltip>
            </Stack>

            <FormControl fullWidth margin="normal">
                <Stack direction="row" alignItems="center">
                    <TextField
                        label={isARS2USD ? "Monto en Pesos ARS" : "Monto en Dólares USD"}
                        variant="outlined"
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        sx={{ borderRadius: 2, flexGrow: 1 }}
                    />
                    <Tooltip title="Cambiar ARS/USD">
                        <IconButton onClick={swapCurrency} sx={{ marginLeft: 1 }}>
                            <SwapHorizIcon sx={{ color: grey[700] }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="currency-type-label">Tipo de Dólar</InputLabel>
                <Select
                    labelId="currency-type-label"
                    value={currencyType}
                    onChange={handleCurrencyTypeChange}
                    label="Tipo de Dólar"
                    disabled={loading}
                    sx={{ borderRadius: 2, backgroundColor: grey[100], boxShadow: 'none' }}
                >
                    <MenuItem value="" disabled>
                        Selecciona Tipo de Dólar
                    </MenuItem>
                    {rates.map((rate, index) => (
                        <MenuItem key={`${rate.casa}-${index}`} value={rate.casa}>
                            {rate.nombre} (Compra: {formatNumber(rate.compra)}, Venta: {formatNumber(rate.venta)})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={calculateConversion}
                sx={{ borderRadius: 2, backgroundColor: blue[900], color: 'white', boxShadow: 'none', marginTop: 2 }}
                disabled={loading || !currencyType || !amount}
            >
                Convertir
            </Button>

            {result && (
                <Box sx={{ mt: 4, padding: 3, backgroundColor: grey[100], borderRadius: 2, border: `1px solid ${grey[300]}` }}>
                    <Typography variant="h6" sx={{ mb: 2, color: blue[700] }}>Resultado de la Conversión</Typography>
                    {result.error ? (
                        <Typography color="error">{result.error}</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ color: green[700], mb: 1 }}>
                                    {result.amount} {result.fromCurrency} a {result.toCurrency}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" sx={{ color: green[800], fontWeight: 'bold' }}>
                                    {`Compra: ${result.calcResultCompra} ${result.toCurrency}`}
                                </Typography>
                                <Typography variant="body2">
                                    {`Valor: ${result.rateCompra}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1" sx={{ color: red[800], fontWeight: 'bold' }}>
                                    {`Venta: ${result.calcResultVenta} ${result.toCurrency}`}
                                </Typography>
                                <Typography variant="body2" >
                                    {`Valor: ${result.rateVenta}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider sx={{ my: 2, backgroundColor: grey[300] }} />
                                <Typography variant="body2">
                                    {`Tipo de cambio basado en ${result.exchangeName}`}
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            )}
        </Paper>
    );
}

export default CurrencyConverter;
