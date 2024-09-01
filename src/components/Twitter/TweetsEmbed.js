import React from 'react';
import Slider from 'react-slick';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { Container, Box, Typography } from '@mui/material';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const tweetIds = [
  "1829707710826270962",
  "1829182448019845360",
  "1829707710826270962",
  "1823061998558757211",
  "1829648385340788998",
  "1829675699013333165",
  // Añade aquí más IDs de tweets
];

// Custom arrow components for the slider
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowBackIosIcon
      className={className}
      style={{ ...style, display: 'block', color: '#007BFF', fontSize: '40px', zIndex: 10 }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowForwardIosIcon
      className={className}
      style={{ ...style, display: 'block', color: '#007BFF', fontSize: '40px', zIndex: 10 }}
      onClick={onClick}
    />
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
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

const TweetsSection = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#007BFF' }}>
        Lo último en X
      </Typography>
      <Slider {...settings}>
        {tweetIds.slice(0, 12).map((tweetId, index) => (
          <Box key={index} sx={{ p: 2 }}>
            <TwitterTweetEmbed tweetId={tweetId} />
          </Box>
        ))}
      </Slider>
    </Container>
  );
};

export default TweetsSection;
