import React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { SiDiscord } from 'react-icons/si';

const discordGroups = [
  { name: 'Crypto Finance Group', url: 'https://discord.gg/tu-grupo1', description: 'Join discussions on crypto investments.' },
  { name: 'Blockchain Devs', url: 'https://discord.gg/tu-grupo2', description: 'Collaborate with blockchain developers.' },
  { name: 'NFT Traders', url: 'https://discord.gg/tu-grupo3', description: 'Explore the world of NFTs and trading.' },
];

const DiscordGroups = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#f9f9f9', borderRadius: '10px', padding: '20px' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: '#007BFF',
          textShadow: '0px 0px 10px rgba(0, 123, 255, 0.3)'
        }}
      >
        Join Our Crypto & Finance Discord Groups
      </Typography>
      <Grid container spacing={4}>
        {discordGroups.map((group, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box 
              sx={{
                textAlign: 'center',
                padding: 3,
                backgroundColor: '#ffffff',
                borderRadius: 2,
                border: '1px solid #ddd',
                transition: 'transform 0.3s ease-in-out',
                boxShadow: '0px 0px 15px rgba(0, 123, 255, 0.1)',
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  borderColor: '#007BFF',
                  boxShadow: '0px 0px 30px rgba(0, 123, 255, 0.3)',
                }
              }}
            >
              <SiDiscord size={50} style={{ color: '#007BFF', marginBottom: '15px' }} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                }}
              >
                {group.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', mb: 2 }}>
                {group.description}
              </Typography>
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: '#007BFF', 
                  color: '#ffffff', 
                  fontWeight: 'bold', 
                  '&:hover': { backgroundColor: '#0056b3' }
                }}
                href={group.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DiscordGroups;
