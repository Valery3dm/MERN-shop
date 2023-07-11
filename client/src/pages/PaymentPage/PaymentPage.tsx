import React, { useState, useEffect } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { savePaymentMethod } from '../../store/slices/cartSlice';

import FormContainer from '../../components/FormContainer/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import CustomButton from '../../common/CustomButton/CustomButton';

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

  const onSubmit = () => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <>
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

        <CustomButton text="Continue" onClick={onSubmit} />
      </>
    </FormContainer>
  );
};

export default PaymentPage;
