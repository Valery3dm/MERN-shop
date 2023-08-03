import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from '../../store/services/ordersApi';
import { useAppSelector } from '../../hooks/redux';

import Message from '../../common/Message/Message';
import Loader from '../../common/Loader/Loader';
import CustomButton from '../../common/CustomButton/CustomButton';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery('');

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending' as SCRIPT_LOADING_STATE,
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  // const onApproveTest = async () => {
  //   orderId && (await payOrder({ orderId, details: { payer: {} } }));
  //   refetch();
  //   toast.success('Payment successful');
  // };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      if (orderId) {
        try {
          await payOrder({ orderId, details });
          refetch();
          toast.success('Payment successful');
        } catch (err: any) {
          toast.error(err?.data?.message || err?.message);
        }
      } else {
        toast.error('This order does not available anymore');
      }
    });
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order?.totalPrice,
            },
          },
        ],
      })
      .then((orderId: string) => {
        return orderId;
      });
  };

  const onError = (err: any) => {
    toast.error(err.message);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message severity="error">{error as string}</Message>;
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err: any) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        Order {order?._id}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} xl={9}>
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
                  primary={<Typography variant="h6">Name:</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">{order?.user.name}</Typography>
                  }
                />
              </Box>
              <Box>
                <ListItemText
                  primary={<Typography variant="h6">Email:</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">{order?.user.email}</Typography>
                  }
                />
              </Box>
              <Box>
                <ListItemText
                  primary={<Typography variant="h6">Address:</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {order?.shippingAddress.address},{' '}
                      {order?.shippingAddress.city},{' '}
                      {order?.shippingAddress.postalCode},{' '}
                      {order?.shippingAddress.country}
                    </Typography>
                  }
                />
              </Box>
              {order?.isDelivered ? (
                <Message severity="success">{`Delivered on ${
                  new Date(order.deliveredAt).toISOString().split('T')[0]
                }`}</Message>
              ) : (
                <Message severity="warning">Not Delivered</Message>
              )}
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
                  primary={<Typography variant="h6">Method:</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">
                      {order?.paymentMethod}
                    </Typography>
                  }
                />
              </Box>
              {order?.isPaid ? (
                <Message severity="success">{`Paid on ${
                  new Date(order.paidAt).toISOString().split('T')[0]
                }`}</Message>
              ) : (
                <Message severity="warning">Not Paid</Message>
              )}
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
              <List>
                {order?.orderItems.map((item) => (
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
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Grid>
                      <Grid item xs={5}>
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={12} md={4} xl={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Order Summary</Typography>
              <Divider />
              <List>
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
                      <Typography variant="body1">Items:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${order?.itemsPrice}
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
                        ${order?.shippingPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

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
                      <Typography variant="body1">Tax:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${order?.taxPrice}
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
                      <Typography variant="body1">Total:</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        ${order?.totalPrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  {!order?.isPaid && (
                    <Box sx={{ width: '100%' }}>
                      {loadingPay && <Loader />}

                      {isPending ? (
                        <Loader />
                      ) : (
                        <Box>
                          {/* <CustomButton
                            text="Test Pay Order"
                            onClick={onApproveTest}
                          /> */}
                          <Box>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  )}
                </ListItem>
                <ListItem>
                  {loadingDeliver && <Loader />}

                  {userInfo &&
                    userInfo.isAdmin &&
                    order?.isPaid &&
                    !order.isDelivered && (
                      <CustomButton
                        text="Mark as Delivered"
                        onClick={deliverOrderHandler}
                      />
                    )}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderPage;
