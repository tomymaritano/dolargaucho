import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, CircularProgress, Button } from '@mui/material';

const HomePage = () => {
  const [riesgoPais, setRiesgoPais] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [precioDolarOficial, setPrecioDolarOficial] = useState(null);
  const [precioDolarBlue, setPrecioDolarBlue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [riesgoResponse, noticiasResponse, dolarResponse] = await Promise.all([
          axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo'),
          axios.get('https://newsapi.org/v2/everything', {
            params: {
              q: 'finanzas argentina',
              language: 'es',
              sortBy: 'publishedAt',
              apiKey: 'e0b74c362e164eda95da7698e1d0bcee' // Reemplaza con tu clave de API real
            }
          }),
          axios.get('https://dolarapi.com/v1/dolares')
        ]);
        setRiesgoPais(riesgoResponse.data.valor);
        setNoticias(noticiasResponse.data.articles);

        // Filtra y establece el precio del dólar oficial y blue
        const dolarOficial = dolarResponse.data.find(d => d.nombre === "Oficial");
        const dolarBlue = dolarResponse.data.find(d => d.nombre === "Blue");
        setPrecioDolarOficial(dolarOficial ? `Compra ${dolarOficial.compra} / Venta  ${dolarOficial.venta}` : 'No disponible');
        setPrecioDolarBlue(dolarBlue ? `Compra ${dolarBlue.compra} / Venta ${dolarBlue.venta}` : 'No disponible');
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {/* Riesgo País */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Riesgo País</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FF2626' }}>{riesgoPais || 'No disponible'}</Typography>}
          </Box>
        </Grid>

        {/* Dólar Oficial */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Dólar Oficial</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'green' }}>{precioDolarOficial || 'No disponible'}</Typography>}
          </Box>
        </Grid>

        {/* Dólar Blue */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center', border: '1px solid gray', borderRadius: '5px' }}>
            <Typography variant="h6" color="textSecondary">Dólar Blue</Typography>
            {loading ? <CircularProgress /> : <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#007BFF' }}>{precioDolarBlue || 'No disponible'}</Typography>}
          </Box>
        </Grid>
      </Grid>

      {/* Noticias Financieras */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Últimas Noticias Financieras</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {noticias.slice(0, 12).map((noticia, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', background: '#F5F5F5' }}>
                  <Typography variant="h6" gutterBottom>{noticia.title}</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ flexGrow: 1 }}>
                    {noticia.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button size='small' variant="outlined" href={noticia.url} target="_blank" rel="noopener">
                      Leer más
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </Container>
  );
};

export default HomePage;
