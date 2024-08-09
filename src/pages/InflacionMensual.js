import React, { useEffect, useState } from 'react';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Container, Box, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';

// Registrar componentes y plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, zoomPlugin);

const InflacionMensualChart = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/indices/inflacion');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter(item => dayjs(item.fecha).year() === selectedYear);

    const labels = filteredData.map(item => dayjs(item.fecha).format('MMMM'));
    const inflationData = filteredData.map(item => item.valor);

    setChartData({
      labels,
      datasets: [
        {
          label: `Inflación Mensual (${selectedYear}) (%)`,
          data: inflationData,
          backgroundColor: 'rgba(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, [selectedYear, data]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Inflación Mensual
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Año</InputLabel>
            <Select value={selectedYear} onChange={handleYearChange} label="Año">
              {[...new Set(data.map(item => dayjs(item.fecha).year()))].map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ width: '100%', height: 400 }}>
        {loading ? (
          <CircularProgress />
        ) : chartData.labels && chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Mes',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Inflación (%)',
                  },
                },
              },
              plugins: {
                zoom: {
                  pan: {
                    enabled: true,
                    mode: 'xy',
                  },
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true,
                    },
                    mode: 'xy',
                  },
                },
              },
            }}
          />
        ) : (
          <Typography variant="body1">No hay datos disponibles para el año seleccionado.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default InflacionMensualChart;
