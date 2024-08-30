import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MoreIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import logo from '../assets/images/logo.png';

const pages = ['Home'];
const indicesPages = [
  { name: 'Inflación Mensual', path: '/inflacion-mensual', icon: <TrendingUpIcon /> },
  { name: 'Inflación Interanual', path: '/inflacion-interanual', icon: <ShowChartIcon /> },
  { name: 'Índices UVA', path: '/indices-uva', icon: <BarChartIcon /> },
  { name: 'Riesgo País', path: '/riesgo-pais', icon: <AttachMoneyIcon /> },
];
const tasasPages = [
  { name: 'Tasas Plazo Fijo', path: '/tasas-plazo-fijo', icon: <PercentIcon /> },
  { name: 'Tasas a 30 Días', path: '/tasas-30-dias', icon: <PercentIcon /> },
];

function ResponsiveNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElIndices, setAnchorElIndices] = React.useState(null);
  const [anchorElTasas, setAnchorElTasas] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenIndicesMenu = (event) => {
    setAnchorElIndices(event.currentTarget);
  };

  const handleCloseIndicesMenu = () => {
    setAnchorElIndices(null);
  };

  const handleOpenTasasMenu = (event) => {
    setAnchorElTasas(event.currentTarget);
  };

  const handleCloseTasasMenu = () => {
    setAnchorElTasas(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box
              component="img"
              src={logo}
              alt="Dolar Gaucho Logo"
              sx={{
                height: 40,
                mr: 2,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            />
          </Link>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                zIndex: 1300, // Asegura que esté por encima del AppBar
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component={Link} to={`/${page.toLowerCase().replace(/ /g, '-')}`}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleOpenIndicesMenu}>
                <Typography textAlign="center">Índices</Typography>
                <ExpandMoreIcon sx={{ ml: 1 }} />
              </MenuItem>
              <Menu
                id="indices-menu"
                anchorEl={anchorElIndices}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElIndices)}
                onClose={handleCloseIndicesMenu}
                sx={{
                  zIndex: 1300, // Asegura que esté por encima del AppBar
                  mt: 1, // Margen para evitar superposición
                }}
              >
                {indicesPages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseIndicesMenu}
                    component={Link}
                    to={page.path}
                  >
                    {page.icon}
                    <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <MenuItem onClick={handleOpenTasasMenu}>
                <Typography textAlign="center">Tasas</Typography>
                <ExpandMoreIcon sx={{ ml: 1 }} />
              </MenuItem>
              <Menu
                id="tasas-menu"
                anchorEl={anchorElTasas}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElTasas)}
                onClose={handleCloseTasasMenu}
                sx={{
                  zIndex: 1300, // Asegura que esté por encima del AppBar
                  mt: 1, // Margen para evitar superposición
                }}
              >
                {tasasPages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseTasasMenu}
                    component={Link}
                    to={page.path}
                  >
                    {page.icon}
                    <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', transition: 'color 0.3s' }}
                component={Link}
                to={`/${page.toLowerCase().replace(/ /g, '-')}`}
                onMouseOver={(e) => e.currentTarget.style.color = 'lightgreen'}
                onMouseOut={(e) => e.currentTarget.style.color = 'white'}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }}
              onClick={handleOpenIndicesMenu}
              onMouseOver={(e) => e.currentTarget.style.color = 'lightgreen'}
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              Índices
              <ExpandMoreIcon sx={{ ml: 1 }} />
            </Button>
            <Menu
              id="indices-menu"
              anchorEl={anchorElIndices}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElIndices)}
              onClose={handleCloseIndicesMenu}
              sx={{
                zIndex: 1300, // Asegura que esté por encima del AppBar
                mt: 1, // Margen para evitar superposición
              }}
            >
              {indicesPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseIndicesMenu}
                  component={Link}
                  to={page.path}
                >
                  {page.icon}
                  <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Button
              sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center', transition: 'color 0.3s' }}
              onClick={handleOpenTasasMenu}
              onMouseOver={(e) => e.currentTarget.style.color = 'lightgreen'}
              onMouseOut={(e) => e.currentTarget.style.color = 'white'}
            >
              Tasas
              <ExpandMoreIcon sx={{ ml: 1 }} />
            </Button>
            <Menu
              id="tasas-menu"
              anchorEl={anchorElTasas}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElTasas)}
              onClose={handleCloseTasasMenu}
              sx={{
                zIndex: 1300, // Asegura que esté por encima del AppBar
                mt: 1, // Margen para evitar superposición
              }}
            >
              {tasasPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseTasasMenu}
                  component={Link}
                  to={page.path}
                >
                  {page.icon}
                  <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Icons */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ p: 0, mr: 2, color: 'white', transition: 'color 0.3s', '&:hover': { color: 'lightgreen' } }}>
              <RssFeedIcon />
            </IconButton>
            <IconButton sx={{ p: 0, mr: 2, color: 'white', transition: 'color 0.3s', '&:hover': { color: 'lightgreen' } }}>
              <MoreIcon />
            </IconButton>
            <IconButton sx={{ p: 0, mr: 2, color: 'white', transition: 'color 0.3s', '&:hover': { color: 'lightgreen' } }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveNavbar;
