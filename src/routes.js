import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> {/* Redirección */}
      <Route path="/home" element={<Layout><Home /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/profile" element={<Layout><Profile /></Layout>} />
      <Route path="/inflacion-mensual" element={<Layout><InflacionMensual /></Layout>} />
      <Route path="/inflacion-interanual" element={<Layout><InflacionInteranual /></Layout>} />
      <Route path="/indices-uva" element={<Layout><IndicesUVA /></Layout>} />
      <Route path="/riesgo-pais" element={<Layout><RiesgoPais /></Layout>} />
      <Route path="/riesgo-pais-ultimo" element={<Layout><RiesgoPaisUltimo /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
};

export default AppRoutes;
