import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { saveShippingAddress } from '../../store/slices/cartSlice';

import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';

const ShippingPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useAppSelector((state) => state.cart);

  const [address, setAddress] = useState<string>(
    shippingAddress?.address || '',
  );
  const [city, setCity] = useState<string>(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress?.postalCode || '',
  );
  const [country, setCountry] = useState<string>(
    shippingAddress?.country || '',
  );

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <FormContainer>
      <>
        <CheckoutSteps step1 step2 />

        <Typography variant="h4">Shipping</Typography>
        <Box component="form" autoComplete="off" onSubmit={onSubmitHandler}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="address-input">Address</InputLabel>
            <Input
              id="address-input"
              aria-describedby="address-helper-text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormHelperText id="address-helper-text">
              Enter your address
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="city-input">City</InputLabel>
            <Input
              id="city-input"
              aria-describedby="city-helper-text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <FormHelperText id="city-helper-text">
              Enter your city
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="postal-code-input">Postal code</InputLabel>
            <Input
              id="postal-code-input"
              aria-describedby="postal-code-helper-text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <FormHelperText id="postal-code-helper-text">
              Enter your postal code
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="country-input">Country</InputLabel>
            <Input
              id="country-input"
              aria-describedby="country-helper-text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <FormHelperText id="country-helper-text">
              Confirm your country
            </FormHelperText>
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
      </>
    </FormContainer>
  );
};

export default ShippingPage;
