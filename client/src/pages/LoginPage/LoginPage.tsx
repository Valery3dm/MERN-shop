import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import FormContainer from '../../components/FormContainer/FormContainer';
import CustomButton from '../../common/CustomButton/CustomButton';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = () => {
    console.log('submit');
  };

  return (
    <FormContainer>
      <>
        <Typography variant="h4">Sign In</Typography>
        <>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
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
              aria-describedby="pass-helper-text"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="pass-helper-text">
              Enter your password
            </FormHelperText>
          </FormControl>
          <CustomButton text="Sign In" onClick={onSubmit} />
        </>
        <Box display={'flex'} margin={1}>
          <Typography>New Customer?</Typography>
          <Link to={'/register'}>
            <Typography
              sx={{
                padding: '0 10px',
                transition: 'all .2s ease-in-out',
                '&:hover': { transform: 'scale(1.2)' },
              }}
            >
              Register
            </Typography>
          </Link>
        </Box>
      </>
    </FormContainer>
  );
};

export default LoginPage;
