import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import InflacionMensual from './pages/InflacionMensual';
import InflacionInteranual from './pages/InflacionInteranual';
import IndicesUVA from './pages/IndicesUVA';
import RiesgoPais from './pages/RiesgoPais';
import RiesgoPaisUltimo from './pages/RiesgoPaisUltimo';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import TasasPlazoFijo from './components/TasasPlazoFijo';
import TasasDepositos30Dias from './components/Depositoa30dias';
import RendimientosEntidades from './pages/RendimientosEntidades';
import RentaVariable from './pages/RentaVariable';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/inflacion-mensual" element={<Layout><InflacionMensual /></Layout>} />
      <Route path="/inflacion-interanual" element={<Layout><InflacionInteranual /></Layout>} />
      <Route path="/indices-uva" element={<Layout><IndicesUVA /></Layout>} />
      <Route path="/riesgo-pais" element={<Layout><RiesgoPais /></Layout>} />
      <Route path="/riesgo-pais-ultimo" element={<Layout><RiesgoPaisUltimo /></Layout>} />
      <Route path="/tasas-plazo-fijo" element={<Layout><TasasPlazoFijo /></Layout>} />
       <Route path="/tasas-30-dias" element={<Layout><TasasDepositos30Dias /></Layout>} />
       <Route path="/rendimientos-entidades" element={<Layout><RendimientosEntidades /></Layout>} />
       <Route path="/renta-variable" element={<Layout><RentaVariable /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

export default AppRoutes;
