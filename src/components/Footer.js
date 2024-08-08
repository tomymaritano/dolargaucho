import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Dolar Gaucho
            </Typography>
            <Typography variant="body2">
              Tu fuente confiable de información financiera en Argentina.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block">
              Home
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block">
              Acerca de
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block">
              Contacto
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" href="https://www.linkedin.com" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Dolar Gaucho. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
