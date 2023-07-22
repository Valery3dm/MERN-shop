import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Box,
  Card,
  CardContent,
  ListItemText,
  Divider,
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { useCreateOrderMutation } from '../../store/services/ordersApi';
import { clearCartItems } from '../../store/slices/cartSlice';

import CheckoutSteps from '../../components/CheckoutSteps';
import CustomButton from '../../common/CustomButton';
import Message from '../../common/Message/Message';
import Loader from '../../common/Loader/Loader';

const PlaceOrderPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (
      !cart.shippingAddress.address ||
      cart.shippingAddress.address.length === 0
    ) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err as string);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Typography variant="h4">Place Order</Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          xl={9}
        >
          <List>
            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={<Typography variant="h5">Shipping</Typography>}
              />
              <Box>
                <ListItemText
                  primary={<Typography variant="h6">Address:</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {cart.shippingAddress.address},{' '}
                      {cart.shippingAddress.city},{' '}
                      {cart.shippingAddress.postalCode},{' '}
                      {cart.shippingAddress.country}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>

            <ListItem
              divider
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={<Typography variant="h5">Payment Method</Typography>}
              />
              <Box>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Method:
                    </Typography>
                  }
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {cart.paymentMethod}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>

            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={<Typography variant="h5">Order Items</Typography>}
              />
              {cart.cartItems.length === 0 ? (
                <Message severity="warning">Your cart is empty</Message>
              ) : (
                <List sx={{ width: '100%' }}>
                  {cart.cartItems.map((item) => (
                    <ListItem divider key={item._id}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={2}>
                          <img
                            src={`${item.image}`}
                            alt={item.name}
                            style={{ width: 50 }}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Grid>
                        <Grid item xs={5}>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          xl={3}
        >
          <Card>
            <CardContent>
              <Typography variant="h5">Order Summary</Typography>
              <Divider />
              <List>
                <ListItem divider>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography variant="body1">Items:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${cart.itemsPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography variant="body1">Shipping:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${cart.shippingPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography variant="body1">Tax:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">${cart.taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <Grid
                    container
                    spacing={1}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Grid item>
                      <Typography variant="body1">Total:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${cart.totalPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {error && (
                  <ListItem divider>
                    <Message severity="error">{error as string}</Message>
                  </ListItem>
                )}

                <ListItem>
                  <CustomButton
                    text="Place Order"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  />
                  {isLoading && <Loader />}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderPage;
