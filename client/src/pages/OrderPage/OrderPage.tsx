import React from 'react';
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

import { useGetOrderDetailsQuery } from '../../store/services/ordersApi';

import Message from '../../common/Message/Message';
import Loader from '../../common/Loader/Loader';

const OrderPage = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  console.log(order);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message severity="error">{error as string}</Message>;
  }

  return (
    <>
      <Typography variant="h4">Order {order?._id}</Typography>

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
                <Message severity="success">{`Delivered on ${order.deliveredAt}`}</Message>
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
                <Message severity="success">{`Paid on ${order.paidAt}`}</Message>
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
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                  {/* TODO: PAY ORDER PLACEHOLDER */}
                  {/* MARK AS DELIVERED PLACEHOLDER */}
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
