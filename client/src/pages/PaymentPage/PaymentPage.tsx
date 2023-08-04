import React, { useState, useEffect } from 'react';
import {
  Box,
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { savePaymentMethod } from '../../store/slices/cartSlice';

import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <Box component="form" autoComplete="off" onSubmit={onSubmitHandler}>
        <CheckoutSteps step1 step2 step3 />

        <Typography variant="h4">Payment Method</Typography>

        <FormControl>
          <RadioGroup
            aria-labelledby="payment-method-radio-buttons-group-label"
            defaultValue="PayPal"
            name="radio-buttons-group"
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="PayPal"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'black',
            width: '100%',
            '&:hover': { backgroundColor: '#616161' },
          }}
        >
          Continue
        </Button>
      </Box>
    </FormContainer>
  );
};

export default PaymentPage;
