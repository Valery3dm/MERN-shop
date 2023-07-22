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
  Badge,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useLogoutMutation } from '../../store/services/usersApi';
import { logout } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import styles from './Header.module.scss';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [logoutApiCall] = useLogoutMutation();

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();

    try {
      await logoutApiCall('User').unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  const desktopBar = (): JSX.Element => (
    <Link to="/" className={styles.logoDesktopNav}>
      <StoreIcon className={styles.logoIcon} />
      <Typography noWrap className={styles.logoText}>
        MERN-Shop
      </Typography>
    </Link>
  );

  const mobileBar = (): JSX.Element => (
    <Link to="/" className={styles.logoMobileNav}>
      <StoreIcon className={styles.logoIcon} />
      <Typography noWrap className={styles.logoText}>
        MERN - S
      </Typography>
    </Link>
  );

  const unAuthorizedUser = (): JSX.Element => (
    <Box
      className={styles.unAuthorized}
      sx={{
        display: { xs: 'flex' },
        flexDirection: 'row',
      }}
    >
      <Badge
        color="secondary"
        className={styles.menuOptionBtn}
        badgeContent={cartItems.length}
        onClick={() => {
          navigate('/cart');
          setAnchorElUser(null);
        }}
        max={99}
        showZero
      >
        <ShoppingCartIcon sx={{ mr: 0.5 }} />
        <Typography textAlign="center" color="white">
          Cart
        </Typography>
      </Badge>
      <Box className={styles.menuOptionBtn} onClick={() => {
        navigate('/login');
        setAnchorElUser(null);
      }}>
        <PersonIcon sx={{ mr: 0.5, ml: 2 }} />
        <Typography textAlign="center" color="white">
          Sign In
        </Typography>
      </Box>
    </Box>
  );

  const authorizedUser = (): JSX.Element => (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Avatar>U</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '44px' }}
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
        <Badge
          color="secondary"
          className={styles.menuOptionBtn}
          badgeContent={cartItems.length}
          onClick={() => {
            navigate('/cart');
            setAnchorElUser(null);
          }}
          max={99}
          showZero
        >
          <Typography
            textAlign="start"
            color="black"
            onClick={handleCloseUserMenu}
            sx={{
              px: 2,
              '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
            }}
          >
            Cart
          </Typography>
        </Badge>
        <Typography
          textAlign="start"
          onClick={() => {
            navigate('/profile');
            setAnchorElUser(null);
          }}
          sx={{
            px: 2,
            '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
          }}
        >
          Profile
        </Typography>
        {userInfo.isAdmin && (
          <Typography
            textAlign="start"
            onClick={() => {
              navigate('/admin/productlist');
              setAnchorElUser(null);
            }}
            sx={{
              px: 2,
              '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
            }}
          >
            Products
          </Typography>
        )}
        {userInfo.isAdmin && (
          <Typography
            textAlign="start"
            onClick={() => {
              navigate('/admin/userlist');
              setAnchorElUser(null);
            }}
            sx={{
              px: 2,
              '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
            }}
          >
            Users
          </Typography>
        )}
        {userInfo.isAdmin && (
          <Typography
            textAlign="start"
            onClick={() => {
              navigate('/admin/orderlist');
              setAnchorElUser(null);
            }}
            sx={{
              px: 2,
              '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
            }}
          >
            Orders
          </Typography>
        )}
        <Typography
          textAlign="start"
          onClick={handleLogout}
          sx={{
            px: 2,
            '&:hover': { cursor: 'pointer', textDecoration: 'underline' },
          }}
        >
          Logout
        </Typography>
      </Menu>
    </Box>
  );

  return (
    <AppBar position="static" className={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.contentWrapper}>
          <Box>
            {desktopBar()}
            {mobileBar()}
          </Box>
          <Box>{userInfo ? authorizedUser() : unAuthorizedUser()}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
