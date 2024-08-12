import React, { useEffect, useState } from 'react';
import { Container, Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Avatar } from '@mui/material';
import argentinaApiAxiosConfig from '../api/argentinaApiAxiosConfig';

const TasasPlazoFijo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await argentinaApiAxiosConfig.get('/finanzas/tasas/plazoFijo');
        setData(response.data);
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
          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Entidad</TableCell>
                  <TableCell align="right">TNA </TableCell>
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
      </Box>
    </Container>
  );
};

export default TasasPlazoFijo;
