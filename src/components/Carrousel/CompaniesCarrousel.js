import React from 'react';
import Slider from 'react-slick';
import { Container, Box, Typography } from '@mui/material';

const companies = [
  { name: 'Lemon Cash', url: 'https://yt3.googleusercontent.com/4E7vWzbgz70xgIkGWkv8Wn_3qynEz6hI-ueDWN5oERDU2YXh_HVnAEPJ-qzbF4t976VWN-kpjFQ=s900-c-k-c0x00ffffff-no-rj' },
  { name: 'Uala', url: 'https://i.ytimg.com/vi/MhiXVHGsYKU/maxresdefault.jpg' },
  { name: 'Belo', url: 'https://belo.app/images/og.png' },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CompaniesCarousel = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#007BFF' }}>
        Empresas Argentinas de Tecnología que Apoyo
      </Typography>
      <Slider {...settings}>
        {companies.map((company, index) => (
          <Box key={index} sx={{ textAlign: 'center', p: 2 }}>
            <a href={company.url} target="_blank" rel="noopener noreferrer">
              <img 
                src={company.url} 
                alt={company.name} 
                style={{ 
                  width: '340px', 
                  height: '200px', 
                  objectFit: 'cover', 
                  borderRadius: '8px', 
                  margin: '0 auto' 
                }} 
              />
            </a>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
              {company.name}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default CompaniesCarousel;
