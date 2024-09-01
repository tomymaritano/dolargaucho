import React from "react";
import Slider from "react-slick";
import { Container, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  { url: 'https://via.placeholder.com/800x400?text=Image+1', alt: 'Image 1' },
  { url: 'https://via.placeholder.com/800x400?text=Image+2', alt: 'Image 2' },
  { url: 'https://via.placeholder.com/800x400?text=Image+3', alt: 'Image 3' },
  { url: 'https://via.placeholder.com/800x400?text=Image+4', alt: 'Image 4' },
  { url: 'https://via.placeholder.com/800x400?text=Image+5', alt: 'Image 5' },
  { url: 'https://via.placeholder.com/800x400?text=Image+6', alt: 'Image 6' },
];

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{ ...style, display: 'block', color: '#007BFF', fontSize: '40px', zIndex: 10, marginLeft: '10px' }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, display: 'block', color: '#007BFF', fontSize: '40px', zIndex: 10, marginRight: '10px' }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

function SimpleSlider() {
  return (
    <Container maxWidth="lg">
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index}>
            <img 
              src={image.url} 
              alt={image.alt} 
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
              }} 
            />
          </Box>
        ))}
      </Slider>
    </Container>
  );
}

export default SimpleSlider;
