import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const pages = ['Home', 'Acerca de', 'Contacto'];
const indicesPages = [
  { name: 'Inflación Mensual', path: '/inflacion-mensual' },
  { name: 'Inflación Interanual', path: '/inflacion-interanual' },
  { name: 'Índices UVA', path: '/indices-uva' },
  { name: 'Riesgo País', path: '/riesgo-pais' },
  { name: 'Riesgo País (Último)', path: '/riesgo-pais-ultimo' },
];

function ResponsiveNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElIndices, setAnchorElIndices] = React.useState(null);

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
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              Dolar Gaucho
            </Typography>
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
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleOpenIndicesMenu}>
                <Typography textAlign="center">Índices</Typography>
              </MenuItem>
              <Menu
                id="indices-menu"
                anchorEl={anchorElIndices}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElIndices)}
                onClose={handleCloseIndicesMenu}
              >
                {indicesPages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleCloseIndicesMenu}
                    component={Link}
                    to={page.path}
                  >
                    {page.name}
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
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link}
                to={`/${page.toLowerCase().replace(/ /g, '-')}`} 
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{ my: 2, color: 'white', display: 'block' }}
              onClick={handleOpenIndicesMenu}
            >
              Índices
            </Button>
            <Menu
              id="indices-menu"
              anchorEl={anchorElIndices}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElIndices)}
              onClose={handleCloseIndicesMenu}
            >
              {indicesPages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseIndicesMenu}
                  component={Link}
                  to={page.path}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Icons */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ p: 0, mr: 2, color: 'white' }}>
              <RssFeedIcon />
            </IconButton>
            <IconButton sx={{ p: 0, mr: 2, color: 'white' }}>
              <CloseIcon />
            </IconButton>
            <IconButton sx={{ p: 0, mr: 2, color: 'white' }}>
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveNavbar;
