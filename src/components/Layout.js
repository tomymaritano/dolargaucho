import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import CryptoMarquee from './CryptoMarquee';
import Hero from './Hero';
import Footer from './Footer';

const Layout = ({ children }) => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/home':
                return 'Inicio';
            case '/dashboard':
                return 'Dashboard';
            case '/profile':
                return 'Perfil';
            case '/inflacion-mensual':
                return 'Inflación Mensual';
            case '/inflacion-interanual':
                return 'Inflación Interanual';
            case '/indices-uva':
                return 'Índices UVA';
            case '/riesgo-pais':
                return 'Riesgo País';
            case '/riesgo-pais-ultimo':
                return 'Riesgo País (Último)';
            case '/tasas-plazo-fijo':
                return 'Tasas Plazo Fijo';

            case '/tasas-30-dias':
                return 'Depositos a 30 Dias';
            default:
                return 'Página no encontrada';
        }
    };

    return (
        <>
            <CryptoMarquee />
            <Navbar />
            <Hero title={getPageTitle()} />
            <Container maxWidth="xl">
                <Box mt={8} py={4} sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 0 }}>
                    {children}
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Layout;
