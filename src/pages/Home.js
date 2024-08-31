import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, CircularProgress} from '@mui/material';
import { Fade } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TweetsEmbed from '../components/Twitter/TweetsEmbed';
import CompaniesCarousel from '../components/Carrousel/CompaniesCarrousel';

const HomePage = () => {
  const [riesgoPais, setRiesgoPais] = useState(null);
  const [precioDolarOficial, setPrecioDolarOficial] = useState(null);
  const [precioDolarBlue, setPrecioDolarBlue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const riesgoResponse = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        setRiesgoPais(riesgoResponse.data.valor);

        const dolarResponse = await axios.get('https://dolarapi.com/v1/dolares');
        const dolarOficial = dolarResponse.data.find(d => d.nombre === "Dólar Oficial");
        const dolarBlue = dolarResponse.data.find(d => d.nombre === "Blue");
        setPrecioDolarOficial(dolarOficial ? `Compra ${dolarOficial.compra} / Venta ${dolarOficial.venta}` : 'No disponible');
        setPrecioDolarBlue(dolarBlue ? `Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}` : 'No disponible');
      } catch (error) {
        console.error('Error al obtener los datos generales:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenido a Dolar Gaucho
        </Typography>
        <Typography variant="body1">
          Información actualizada sobre el riesgo país, los tipos de cambio del dólar, y más.
        </Typography>
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
                border: '1px solid #e0e0e0', // Sutil borde gris
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
                border: '1px solid #e0e0e0', // Sutil borde gris
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
                border: '1px solid #e0e0e0', // Sutil borde gris
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
<Box>
  <CompaniesCarousel />
</Box>
   <Box>
<TweetsEmbed />
   </Box>
    </>
    
  );
};

export default HomePage;
