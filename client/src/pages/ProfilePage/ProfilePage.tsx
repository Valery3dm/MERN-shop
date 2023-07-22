import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { FaTimes } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useProfileMutation } from '../../store/services/usersApi';
import { setCredentials } from '../../store/slices/authSlice';
import { useGetMyOrdersQuery } from '../../store/services/ordersApi';

import { OrderResponse } from '../../interfaces';

import CustomButton from '../../common/CustomButton/CustomButton';
import Message from '../../common/Message/Message';
import Loader from '../../common/Loader/Loader';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: errorOrders,
  } = useGetMyOrdersQuery('');

  const [name, setName] = useState<string>(userInfo.name);
  const [email, setEmail] = useState<string>(userInfo.email);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err: any) {
        toast.error(err.data?.message || err?.error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3}>
        <Typography variant="h4" component="div" pb={2}>
          User Profile
        </Typography>
        <Box component="form" sx={{ maxWidth: 400 }}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              aria-describedby="name-helper-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormHelperText id="name-helper-text">
              Enter your name
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              Enter your email.
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="pass-input">Password</InputLabel>
            <Input
              id="pass-input"
              type="password"
              aria-describedby="pass-helper-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="pass-helper-text">
              Enter your password
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="confirm-pass-input">
              Confirm password
            </InputLabel>
            <Input
              id="confirm-pass-input"
              type="password"
              aria-describedby="confirm-pass-helper-text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormHelperText id="confirm-pass-helper-text">
              Confirm your password
            </FormHelperText>
          </FormControl>
          <CustomButton
            text="Update"
            onClick={onSubmit}
            disabled={loadingUpdateProfile}
          />
          {loadingUpdateProfile && <Loader />}
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={9}>
        <Typography variant="h4" component="div" pb={2}>
          My Orders
        </Typography>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message severity="error">
            {/* {errorOrders?.data?.message || errorOrders.error} */}
            Error getting orders
          </Message>
        ) : (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">DATE</TableCell>
                  <TableCell align="right">TOTAL</TableCell>
                  <TableCell align="right">PAID</TableCell>
                  <TableCell align="right">DELIVERED</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order: OrderResponse) => (
                  <TableRow
                    key={order._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(order.createdAt).toISOString().split('T')[0]}
                    </TableCell>
                    <TableCell align="right">
                      {order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {order.isPaid ? (
                        new Date(order.paidAt).toISOString().split('T')[0]
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {order.isDelivered ? (
                        new Date(order.deliveredAt).toISOString().split('T')[0]
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Link to={`/order/${order._id}`}>
                        <CustomButton text="details" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
