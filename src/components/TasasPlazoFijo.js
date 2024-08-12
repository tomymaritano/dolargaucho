import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, useMediaQuery, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

// Registrar componentes y plugins necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TasasPlazoFijo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});
  
  // Media queries para detectar el dispositivo
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTabletOrDesktop = useMediaQuery('(min-width:600px)');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/tasas/plazoFijo');
        setData(response.data);

        // Preparar datos para el gráfico
        const labels = response.data.map(item => item.entidad);
        const tnaClientes = response.data.map(item => item.tnaClientes);

        setChartData({
          labels,
          datasets: [
            {
              label: 'TNA (%)',
              data: tnaClientes,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
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

  return (
    <Container maxWidth="xl">
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {isMobile && (
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Entidad</TableCell>
                      <TableCell align="right">TNA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar src={item.logo} alt={item.entidad} style={{ width: 70 }} />
                        </TableCell>
                        <TableCell>{item.entidad}</TableCell>
                        <TableCell align="right">{item.tnaClientes}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {isTabletOrDesktop && (
              <Bar
                data={chartData}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'right',
                    },
                    title: {
                      display: true,
                      text: 'Tasas de Plazo Fijo por Entidad',
                    },
                  },
                  scales: {
                    x: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'TNA (%)',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Entidad',
                      },
                    },
                  },
                }}
              />
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default TasasPlazoFijo;
