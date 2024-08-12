import React, { useEffect, useState } from 'react';
import { Box,  CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const OtherExchangesRates = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCotizaciones = async () => {
      try {
        const response = await axios.get('https://dolarapi.com/v1/cotizaciones');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchCotizaciones();
  }, []);

  return (
    <>
      <Box sx={{ mb: 4 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Moneda</TableCell>
                  <TableCell align="right">Compra</TableCell>
                  <TableCell align="right">Venta</TableCell>
                  {/* <TableCell align="right">Fecha</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.moneda}
                    </TableCell>
                    <TableCell align="right">{item.compra}</TableCell>
                    <TableCell align="right">{item.venta}</TableCell>
                    {/* <TableCell align="right">{item.fechaActualizacion}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};

export default OtherExchangesRates;
