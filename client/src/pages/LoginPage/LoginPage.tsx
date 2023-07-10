import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { useLoginMutation } from '../../store/services/usersApi';
import { setCredentials } from '../../store/slices/authSlice';

import FormContainer from '../../components/FormContainer/FormContainer';
import CustomButton from '../../common/CustomButton/CustomButton';
import Loader from '../../common/Loader/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const onSubmit = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err: any) {
      toast.error(err.data?.message || err?.error)
    }
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
          <CustomButton text="Sign In" onClick={onSubmit} disabled={isLoading}/>
          {isLoading && <Loader />}
        </>
        <Box display={'flex'} margin={1}>
          <Typography>New Customer?</Typography>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
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
