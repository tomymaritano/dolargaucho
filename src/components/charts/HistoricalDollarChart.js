import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/argentinaApiAxiosConfig';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Container, Box, Typography, FormControl, TextField, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

// Registrar componentes y plugins
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, zoomPlugin);

const HistoricalDollarChart = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState([dayjs().startOf('year'), dayjs()]);
  const [selectedCasa, setSelectedCasa] = useState('all');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/cotizaciones/dolares');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter(item => {
      const itemDate = dayjs(item.fecha);
      const dateMatches = itemDate.isBetween(selectedDate[0], selectedDate[1], null, '[]');
      const casaMatches = selectedCasa === 'all' || item.casa === selectedCasa;
      return dateMatches && casaMatches;
    });

    const labels = filteredData.map(item => dayjs(item.fecha).format('DD/MM/YYYY'));
    const ventaData = filteredData.map(item => item.venta);
    const compraData = filteredData.map(item => item.compra);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Cotización Venta ($)',
          data: ventaData,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 2,
        },
        {
          label: 'Cotización Compra ($)',
          data: compraData,
          fill: false,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 2,
        },
      ],
    });
  }, [selectedDate, selectedCasa, data]);

  const handleDateChange = (newDate) => {
    setSelectedDate([newDate.startOf('month'), newDate.endOf('month')]);
  };

  const handleCasaChange = (event) => {
    setSelectedCasa(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Cotización Histórica del Dólar
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <DatePicker
              label="Seleccionar Mes"
              views={['year', 'month']}
              value={selectedDate[0]}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <TextField
                select
                label="Casa"
                value={selectedCasa}
                onChange={handleCasaChange}
              >
                <MenuItem value="all">Todas</MenuItem>
                {[...new Set(data.map(item => item.casa))].map(casa => (
                  <MenuItem key={casa} value={casa}>
                    {casa}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Box>
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
                      text: 'Cotización ($)',
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
            <Typography variant="body1">Cargando datos...</Typography>
          )}
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default HistoricalDollarChart;
