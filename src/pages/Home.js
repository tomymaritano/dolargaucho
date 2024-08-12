import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, CircularProgress, Button } from '@mui/material';

const HomePage = () => {
  const [riesgoPais, setRiesgoPais] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loadingRiesgoPais, setLoadingRiesgoPais] = useState(true);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  useEffect(() => {
    const fetchRiesgoPais = async () => {
      try {
        const response = await axios.get('https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo');
        setRiesgoPais(response.data.valor);
        setLoadingRiesgoPais(false);
      } catch (error) {
        console.error('Error al obtener el Riesgo País:', error);
        setLoadingRiesgoPais(false);
      }
    };

    const fetchNoticias = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything',
          {
            params: {
              q: 'finanzas argentina',
              language: 'es',
              sortBy: 'publishedAt',
              apiKey: 'e0b74c362e164eda95da7698e1d0bcee',
            },
          }
        );
        setNoticias(response.data.articles);
        setLoadingNoticias(false);
      } catch (error) {
        console.error('Error al obtener las noticias financieras:', error);
        setLoadingNoticias(false);
      }
    };

    fetchRiesgoPais();
    fetchNoticias();
  }, []);

  return (
    <Container maxWidth="xl">

      {/* Información Financiera */}
      <Grid container spacing={0}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, textAlign: 'center',background: '#F5F5F5' }}>
            <Typography variant="h6" color="textSecondary">Riesgo País</Typography>
            {loadingRiesgoPais ? (
              <CircularProgress />
            ) : (
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {riesgoPais !== null ? riesgoPais : 'No disponible'}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Noticias Financieras */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Últimas Noticias Financieras</Typography>
        {loadingNoticias ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {noticias.slice(0, 12).map((noticia, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column',background: '#F5F5F5' }}>
                  {noticia.image}
                  <Typography variant="h6" gutterBottom>{noticia.title}</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ flexGrow: 1 }}>
                    {noticia.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button size='small' variant="solid" color="primary" href={noticia.url} target="_blank" rel="noopener">
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
