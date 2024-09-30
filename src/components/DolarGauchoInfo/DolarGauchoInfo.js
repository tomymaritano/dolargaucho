import React from 'react';
import { Container, Box, Typography, Grid, CircularProgress, Fade } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const DolarGauchoInfo = ({ loading, riesgoPais, dolares }) => {
    const dolarTipos = [
        { nombre: 'Oficial', valor: dolares.oficial, color: 'green' },
        { nombre: 'Blue', valor: dolares.blue, color: '#007BFF' },
        { nombre: 'Contado con Liquidación', valor: dolares.contadoConLiquidacion, color: '#FF5733' },
        { nombre: 'Tarjeta', valor: dolares.tarjeta, color: '#FFC300' },
        { nombre: 'Cripto', valor: dolares.cripto, color: '#28B463' },
        { nombre: 'Mayorista', valor: dolares.mayorista, color: '#884EA0' },
        { nombre: 'Bolsa', valor: dolares.bolsa, color: '#1F618D' },
    ];

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} minWidth={'100%'}>
                {/* Riesgo País */}
                <Grid item xs={12} md={12}>
                    <Fade in={!loading}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 3,
                                backgroundColor: 'gray.50',
                                borderRadius: 2,
                                border: '1px solid #e0e0e0',
                            }}
                        >
                            <TrendingUpIcon sx={{ fontSize: 40, color: '#FF2626' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                Riesgo País
                            </Typography>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                    {riesgoPais || 'No disponible'}
                                </Typography>
                            )}
                        </Box>
                    </Fade>
                </Grid>

                {/* Tipos de Dólares */}
                {dolarTipos.map((dolar, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Fade in={!loading}>
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    padding: 3,
                                    backgroundColor: 'gray.50',
                                    borderRadius: 2,
                                    border: '1px solid #e0e0e0',
                                }}
                            >
                                <AttachMoneyIcon sx={{ fontSize: 40, color: dolar.color }} />
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                    {dolar.nombre}
                                </Typography>
                                {loading ? (
                                    <CircularProgress />
                                ) : (
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {dolar.valor || 'No disponible'}
                                    </Typography>
                                )}
                            </Box>
                        </Fade>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DolarGauchoInfo;
