import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import { useAppSelector } from '../../hooks/redux';

import CheckoutSteps from '../../components/CheckoutSteps';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);

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

  return(
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          xl={5}
          sx={{ backgroundColor: 'red' }}
        >
          Column
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          xl={5}
          sx={{ backgroundColor: 'blue' }}
        >
          Column
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderPage;
