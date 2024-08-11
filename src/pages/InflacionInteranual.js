import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/argentinaApiAxiosConfig';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Container, Box, Typography, CircularProgress, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import dayjs from 'dayjs';

// Registrar componentes necesarios de ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const InflacionInteranual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/finanzas/indices/inflacionInteranual');
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
    const labels = filteredData.map(item => dayjs(item.fecha).format('YYYY-MM'));
    const inflacionData = filteredData.map(item => item.valor);

    setChartData({
      labels,
      datasets: [
        {
          label: `Inflación Interanual (%) - ${selectedYear}`,
          data: inflacionData,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    });
  }, [data, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <FormControl variant="outlined" sx={{ mb: 2, minWidth: 120 }}>
              <InputLabel>Año</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange} label="Año">
                {[...new Set(data.map(item => dayjs(item.fecha).year()))].map(year => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ width: '100%', height: 400 }}>
              {chartData.labels ? (
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {

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
                <Typography variant="body1">No hay datos para este año.</Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default InflacionInteranual;
