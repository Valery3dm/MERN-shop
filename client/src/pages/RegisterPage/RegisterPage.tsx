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

import { useRegisterMutation } from '../../store/services/usersApi';
import { setCredentials } from '../../store/slices/authSlice';

import FormContainer from '../../components/FormContainer/FormContainer';
import CustomButton from '../../common/CustomButton/CustomButton';
import Loader from '../../common/Loader/Loader';

const RegisterPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err: any) {
        toast.error(err.data?.message || err?.error)
      }
    }
  };

  return (
    <FormContainer>
      <>
        <Typography variant="h4">Sign Up</Typography>
        <>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name-input">Name</InputLabel>
            <Input
              id="name-input"
              aria-describedby="name-helper-text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormHelperText id="name-helper-text">
              Enter your name
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email-input">Email address</InputLabel>
            <Input
              id="email-input"
              aria-describedby="email-helper-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText id="email-helper-text">
              Enter your email
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="pass-input">Password</InputLabel>
            <Input
              id="pass-input"
              type='password'
              aria-describedby="pass-helper-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="pass-helper-text">
              Enter your password
            </FormHelperText>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="confirm-pass-input">Confirm password</InputLabel>
            <Input
              id="confirm-pass-input"
              type='password'
              aria-describedby="confirm-pass-helper-text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormHelperText id="confirm-pass-helper-text">
              Confirm your password
            </FormHelperText>
          </FormControl>

          <CustomButton text="Sign Up" onClick={onSubmit} disabled={isLoading}/>
          {isLoading && <Loader />}
        </>
        <Box display={'flex'} margin={1}>
          <Typography>Already have an account</Typography>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            <Typography
              sx={{
                padding: '0 10px',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Login
            </Typography>
          </Link>
        </Box>
      </>
    </FormContainer>
  );
};

export default RegisterPage;
