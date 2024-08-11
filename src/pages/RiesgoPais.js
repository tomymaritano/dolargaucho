import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/argentinaApiAxiosConfig';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Container, Box, Typography, CircularProgress, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Registrar componentes y plugins de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const RiesgoPais = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState([dayjs().startOf('year'), dayjs()]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/finanzas/indices/riesgo-pais');
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
    const filteredData = data.filter(item => {
      const itemDate = dayjs(item.fecha);
      return itemDate.isBetween(selectedDate[0], selectedDate[1], null, '[]');
    });

    const labels = filteredData.map(item => dayjs(item.fecha).format('DD/MM/YYYY'));
    const riesgoValues = filteredData.map(item => item.valor);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Riesgo País (puntos)',
          data: riesgoValues,
          fill: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    });
  }, [data, selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate([newDate.startOf('month'), newDate.endOf('month')]);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <DatePicker
                  label="Seleccionar Fecha"
                  views={['year', 'month']}
                  value={selectedDate[0]}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box sx={{ width: '100%', height: 400 }}>
                {chartData.labels ? (
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: 'Fecha',
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Riesgo País (puntos)',
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
                  <Typography variant="body1">No hay datos para la fecha seleccionada.</Typography>
                )}
              </Box>
            </>
          )}
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default RiesgoPais;
