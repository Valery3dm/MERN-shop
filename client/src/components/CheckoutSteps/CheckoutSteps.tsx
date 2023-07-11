import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { CheckoutStepsProps } from './CheckoutSteps.types';

const CheckoutSteps = ({ step1, step2, step3, step4 }: CheckoutStepsProps) => {
  const navigate = useNavigate();

  const breadcrumbs = [
    step1 ? (
      <Typography
        key="1"
        color="body1"
        sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
        onClick={(e) => navigate('/login')}
      >
        Login
      </Typography>
    ) : (
      <Typography key="1" color="text.primary">
        Login
      </Typography>
    ),
    step2 ? (
      <Typography
        key="2"
        color="body1"
        sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
        onClick={(e) => navigate('/shipping')}
      >
        Shipping
      </Typography>
    ) : (
      <Typography key="2" color="text.primary">
        Shipping
      </Typography>
    ),
    step3 ? (
      <Typography
        key="3"
        color="body1"
        sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
        onClick={(e) => navigate('/payment')}
      >
        Payment
      </Typography>
    ) : (
      <Typography key="3" color="text.primary">
        Payment
      </Typography>
    ),
    step4 ? (
      <Typography
        key="4"
        color="body1"
        sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
        onClick={(e) => navigate('/placeorder')}
      >
        Place Order
      </Typography>
    ) : (
      <Typography key="1" color="text.primary">
        Place Order
      </Typography>
    ),
  ];

  return (
    <Stack spacing={2} sx={{ my: 3 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};

export default CheckoutSteps;
