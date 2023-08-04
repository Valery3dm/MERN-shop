import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  Button,
  InputLabel,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { useLoginMutation } from '../../store/services/usersApi';
import { setCredentials } from '../../store/slices/authSlice';

import FormContainer from '../../components/FormContainer';
import Loader from '../../common/Loader';

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

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err: any) {
      toast.error(err.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      <>
        <Typography variant="h4">Sign In</Typography>
        <Box component="form" autoComplete="off" onSubmit={onSubmitHandler}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              type="email"
              aria-describedby="email-helper-text"
              value={email}
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
              type="password"
              aria-describedby="pass-helper-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="pass-helper-text">
              Enter your password
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{
              backgroundColor: 'black',
              width: '100%',
              '&:hover': { backgroundColor: '#616161' },
            }}
          >
            Sign In
          </Button>
          {isLoading && <Loader />}
        </Box>
        <Box display={'flex'} margin={1}>
          <Typography>New Customer?</Typography>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <Typography
              sx={{
                padding: '0 10px',
                '&:hover': { textDecoration: 'underline' },
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
