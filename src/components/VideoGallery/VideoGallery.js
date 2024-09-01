import React from 'react';
import ReactPlayer from 'react-player';
import { Container, Box, Typography, Grid } from '@mui/material';

const videos = [
  { url: 'https://www.youtube.com/live/iyOq8DhaMYw?si=ycmPfZkNmkLSDivr', title: 'Video 1' },
  { url: 'https://www.youtube.com/live/iyOq8DhaMYw?si=ycmPfZkNmkLSDivr', title: 'Video 2' },
  { url: 'https://www.youtube.com/live/iyOq8DhaMYw?si=ycmPfZkNmkLSDivr', title: 'Video 3' },
  { url: 'https://www.youtube.com/live/iyOq8DhaMYw?si=ycmPfZkNmkLSDivr', title: 'Video 4' },
  { url: 'https://www.youtube.com/live/iyOq8DhaMYw?si=ycmPfZkNmkLSDivr', title: 'Video 5' },
];

const VideoGallery = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: '#007BFF' }}>
        Galería de Videos
      </Typography>
      <Grid container spacing={4}>
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ textAlign: 'center' }}>
              <ReactPlayer 
                url={video.url} 
                controls 
                width="100%" 
                height="200px" 
                style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }} 
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                {video.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VideoGallery;
