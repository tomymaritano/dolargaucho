import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

// Registrar los componentes y plugins necesarios para el gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale, zoomPlugin);

const TasasDepositos30Dias = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/tasas/depositos30Dias');
        const rawData = response.data;

        // Ordenar los datos por fecha ascendente
        const sortedData = rawData.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

        setData(sortedData);

        const labels = sortedData.map(item => item.fecha);
        const valores = sortedData.map(item => item.valor);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Tasa (%)',
              data: valores,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.6)',
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.4,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleResetZoom = () => {
    if (chartInstance) {
      chartInstance.resetZoom();
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Line
              data={chartData}
              options={{
                responsive: true,
                scales: {
                  x: {
                    type: 'category',
                    title: {
                      display: true,
                      text: 'Fecha',
                    },
                    grid: {
                      display: true,
                    },
                    afterBuildTicks: (scale) => {
                      // Ajusta la vista inicial para mostrar los últimos 30 días
                      if (chartInstance) {
                        const dataLength = scale.ticks.length;
                        if (dataLength > 30) {
                          const maxTick = scale.ticks[dataLength - 1];
                          const minTick = scale.ticks[dataLength - 30];
                          scale.min = minTick.value;
                          scale.max = maxTick.value;
                        }
                      }
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Tasa (%)',
                    },
                    grid: {
                      display: true,
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Tasas de Depósitos a 30 Días',
                  },
                  zoom: {
                    pan: {
                      enabled: true,
                      mode: 'x', // Habilitar solo desplazamiento horizontal
                    },
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: 'x', // Habilitar solo zoom horizontal
                      onZoomComplete({ chart }) {
                        const zoomRange = chart.scales.x.max - chart.scales.x.min;
                        if (zoomRange > 30) {
                          chart.resetZoom();
                        }
                      },
                    },
                  },
                },
              }}
              ref={(ref) => setChartInstance(ref)}
            />
            <Button onClick={handleResetZoom} sx={{ mt: 2 }}>
              Restablecer Zoom
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default TasasDepositos30Dias;
