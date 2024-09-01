import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import TweetsEmbed from '../components/Twitter/TweetsEmbed';
import HeroSlider from '../components/Hero/HeroSlider';
import VideoGallery from '../components/VideoGallery/VideoGallery';
import DiscordGroups from '../components/Discord/Discord';
import DolarGauchoInfo from '../components/DolarGauchoInfo/DolarGauchoInfo';
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
    <Box sx={{ margin: 5 }}>
      <Box sx={{ mb: 4 }}>
        <DolarGauchoInfo
          loading={loading}
          riesgoPais={riesgoPais}
          precioDolarOficial={precioDolarOficial}
          precioDolarBlue={precioDolarBlue}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <VideoGallery />
      </Box>
      <Box sx={{ mb: 4 }}>
        <DiscordGroups />
      </Box>
      <Box sx={{ mb: 4 }}>
        <CompaniesCarousel />
      </Box>
      <Box sx={{ mb: 4 }}>
        <TweetsEmbed />
      </Box>
    </Box>
  );
};

export default HomePage;
