import React, { FC, useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  Tooltip,
  Avatar,
} from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header: FC = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
  };

  const desktopBar = (): JSX.Element => (
    <>
      <StoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        MERN-Shop
      </Typography>
    </>
  );

  const mobileBar = (): JSX.Element => (
    <>
      <StoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        MERN - S
      </Typography>
    </>
  );

  const unAuthorizedUser = (): JSX.Element => (
    <Box
      sx={{
        marginLeft: 'auto',
        display: { xs: 'flex' },
        flexDirection: 'row',
      }}
    >
      <ShoppingCartIcon sx={{ mr: 1 }} />
      <Typography textAlign="center" color="white">
        cart
      </Typography>
      <PersonIcon sx={{ mr: 1 }} />
      <Typography textAlign="center" color="white">
        sign In
      </Typography>
    </Box>
  );

  const authorizedUser = (): JSX.Element => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <Typography
          textAlign="center"
          color="black"
          onClick={handleCloseUserMenu}
        >
          Cart
        </Typography>
        <Typography textAlign="center" onClick={handleLogout}>
          Logout
        </Typography>
      </Menu>
    </Box>
  );

  return (
    <header>
      <AppBar position="static" sx={{ background: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {desktopBar()}
              {mobileBar()}
            </Box>
            <Box>
              {false ? unAuthorizedUser() : authorizedUser()}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default Header;
