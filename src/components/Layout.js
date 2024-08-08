import React from 'react';
import { Container, Box } from '@mui/material';
import Navbar from './Navbar';
import CryptoMarquee from './CryptoMarquee';
import Hero from './Hero';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <CryptoMarquee />
            <Navbar />
            <Hero />
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
