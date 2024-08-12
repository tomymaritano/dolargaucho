import React, { useEffect, useState } from 'react';
import {
  Container, Box,  CircularProgress, Tabs, Tab, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const FondosDeInversion = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('rentaVariable');
  const [tabValue, setTabValue] = useState(0);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState('fondo'); // Ordenar por nombre de fondo por defecto

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get(`/finanzas/fci/${selectedCategory}/ultimo`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setTabValue(newValue);
    const categories = ['rentaVariable', 'rentaFija', 'rentaMixta', 'otros'];
    setSelectedCategory(categories[newValue]);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getHorizonteColor = (horizonte) => {
    if (!horizonte) return 'black';
    switch (horizonte.toLowerCase()) {
      case 'corto':
        return 'green';
      case 'medio':
        return 'orange';
      case 'alto':
        return 'red';
      case 'flex':
        return 'blue';
      default:
        return 'black';
    }
  };

  const formatNumber = (number) => {
    if (number === null || number === undefined) return '-';
    return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
  };

const sortedData = data.sort((a, b) => {
  if (orderBy === 'fondo') {
    return orderDirection === 'asc'
      ? a.fondo.localeCompare(b.fondo)
      : b.fondo.localeCompare(a.fondo);
  } else if (orderBy === 'fecha') {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
  } else {
    return orderDirection === 'asc'
      ? (a[orderBy] || 0) - (b[orderBy] || 0)
      : (b[orderBy] || 0) - (a[orderBy] || 0);
  }
});


const getSortIcon = (property) => {
  return orderBy === property ? (
    orderDirection === 'asc' ? (
      <ArrowUpward style={{ fontSize: '1rem' }} />
    ) : (
      <ArrowDownward style={{ fontSize: '1rem' }} />
    )
  ) : null;
};


  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Tabs value={tabValue} onChange={handleCategoryChange} aria-label="categorías de fondos">
              <Tab label="Renta Variable" />
              <Tab label="Renta Fija" />
              <Tab label="Renta Mixta" />
              <Tab label="Otros" />
            </Tabs>

            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'fondo'}
                        direction={orderDirection}
                        onClick={() => handleSortRequest('fondo')}
                        IconComponent={() => getSortIcon('fondo')}
                      >
                        Fondo
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === 'vcp'}
                        direction={orderDirection}
                        onClick={() => handleSortRequest('vcp')}
                        IconComponent={() => getSortIcon('vcp')}
                      >
                        VCP
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === 'ccp'}
                        direction={orderDirection}
                        onClick={() => handleSortRequest('ccp')}
                        IconComponent={() => getSortIcon('ccp')}
                      >
                        CCP
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === 'patrimonio'}
                        direction={orderDirection}
                        onClick={() => handleSortRequest('patrimonio')}
                        IconComponent={() => getSortIcon('patrimonio')}
                      >
                        Patrimonio
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Horizonte</TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={orderBy === 'fecha'}
                        direction={orderDirection}
                        onClick={() => handleSortRequest('fecha')}
                        IconComponent={() => getSortIcon('fecha')}
                      >
                        Fecha
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData.map((fondo, index) => (
                    <TableRow key={index} hover>
                      <TableCell component="th" scope="row">
                        {fondo.fondo}
                      </TableCell>
                      <TableCell align="right">{formatNumber(fondo.vcp)}</TableCell>
                      <TableCell align="right">{formatNumber(fondo.ccp)}</TableCell>
                      <TableCell align="right">{formatNumber(fondo.patrimonio)}</TableCell>
                      <TableCell align="right" sx={{ color: getHorizonteColor(fondo.horizonte) }}>
                        {fondo.horizonte || '-'}
                      </TableCell>
                      <TableCell align="right">{fondo.fecha || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default FondosDeInversion;
