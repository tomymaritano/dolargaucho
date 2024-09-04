import React from 'react';
import { Container, Box, Typography, Grid, CircularProgress, Fade } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import HeroSlider from '../Hero/HeroSlider'

const DolarGauchoInfo = ({ loading, riesgoPais, precioDolarOficial, precioDolarBlue }) => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1">
                    Bienvenido a Dolar Gaucho
                </Typography>
                <Typography variant="body1">
                    Información actualizada sobre el riesgo país, los tipos de cambio del dólar, y más.
                </Typography>
            </Box>
            <Box sx={{ mb: 8 }}>
                {/* <HeroSlider /> */}
            </Box>
            <Grid container spacing={2}>
                {/* Riesgo País */}
                <Grid item xs={12} md={4}>
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

                {/* Dólar Oficial */}
                <Grid item xs={12} md={4}>
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
                            <AttachMoneyIcon sx={{ fontSize: 40, color: 'green' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                Dólar Oficial
                            </Typography>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    {precioDolarOficial || 'No disponible'}
                                </Typography>
                            )}
                        </Box>
                    </Fade>
                </Grid>

                {/* Dólar Blue */}
                <Grid item xs={12} md={4}>
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
                            <AttachMoneyIcon sx={{ fontSize: 40, color: '#007BFF' }} />
                            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                Dólar Blue
                            </Typography>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                    {precioDolarBlue || 'No disponible'}
                                </Typography>
                            )}
                        </Box>
                    </Fade>
                </Grid>
            </Grid>

        </Container>
    );
};

export default DolarGauchoInfo;
