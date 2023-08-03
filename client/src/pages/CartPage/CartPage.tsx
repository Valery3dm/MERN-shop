import React from 'react';
import {
  Box,
  Grid,
  List,
  Card,
  Button,
  Select,
  Divider,
  ListItem,
  MenuItem,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

import CustomButton from '../../common/CustomButton/CustomButton';
import Message from '../../common/Message/Message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToCart, removeFromCart } from '../../store/slices/cartSlice';

import styles from './CartPage.module.scss';

const CartPage = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const countItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <Message severity="info">
        <Box>
          <Typography>Cart list is empty</Typography>
          <Typography onClick={() => navigate(-1)} className={styles.backBtn}>
            Go Back
          </Typography>
        </Box>
      </Message>
    );
  }

  const desktopView = () => (
    <List className={styles.desktopView}>
      {cartItems.map((item) => (
        <Box key={item._id} component="div">
          <ListItem disablePadding>
            <Grid container spacing={3} alignItems={'center'}>
              <Grid item xs={3}>
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  style={{ width: 150 }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">{item.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5">${item.price}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Select
                  labelId="qty-select-label"
                  id="qty-select"
                  value={item.qty}
                  label="QTY"
                  onChange={(e) =>
                    dispatch(addToCart({ ...item, qty: e.target.value }))
                  }
                >
                  {Array.from(
                    { length: item.countInStock },
                    (_, index) => index,
                  ).map((num) => (
                    <MenuItem key={num + 1} value={num + 1}>
                      {num + 1}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={1}>
                <ListItemButton
                  className={styles.actionDesktopBtn}
                  onClick={() => dispatch(removeFromCart(item))}
                >
                  <DeleteIcon />
                </ListItemButton>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </Box>
      ))}
    </List>
  );

  const mobileView = () => (
    <Box component="div" className={styles.mobileView}>
      {cartItems.map((item) => (
        <Card key={item._id} className={styles.card}>
          <Box className={styles.imageWrapper}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              className={styles.image}
            />
          </Box>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className={styles.name}
            >
              {item.name}
            </Typography>
            <Typography variant="h4" component="div">
              ${item.price}
            </Typography>
          </CardContent>
          <CardActions className={styles.cardAction}>
            <Select
              labelId="qty-select-label"
              id="qty-select"
              value={item.qty}
              label="QTY"
              onChange={(e) =>
                dispatch(addToCart({ ...item, qty: e.target.value }))
              }
            >
              {Array.from(
                { length: item.countInStock },
                (_, index) => index,
              ).map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
            <Button className={styles.actionBtn}>
              <DeleteIcon
                className={styles.deleteIcon}
                onClick={() => dispatch(removeFromCart(item))}
              />
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );

  const sideCard = () => (
    <Card>
      <CardContent>
        <List>
          <ListItemText
            primary={
              <Typography variant="h6">{`Subtotal (${countItems}) items`}</Typography>
            }
          />
          <ListItemText
            primary={
              <Typography variant="body2">{`$${totalPrice.toFixed(
                2,
              )}`}</Typography>
            }
          />
          <Divider />
          <ListItem>
            <CustomButton
              text="Proceed To Checkout"
              onClick={() =>
                navigate(
                  userInfo === null ? '/login?redirect=shipping' : '/shipping',
                )
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Typography variant="h3">Shopping Cart</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={9}>
          {desktopView()}
          {mobileView()}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          {sideCard()}
        </Grid>
      </Grid>
    </>
  );
};

export default CartPage;
