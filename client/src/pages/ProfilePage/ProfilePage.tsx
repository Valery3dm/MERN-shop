import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useProfileMutation } from '../../store/services/usersApi';
import { setCredentials } from '../../store/slices/authSlice';

import Loader from '../../common/Loader/Loader';
import CustomButton from '../../common/CustomButton/CustomButton';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err: any) {
        toast.error(err.data?.message || err?.error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3}>
        <Box component="form">
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

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="confirm-pass-input">
              Confirm password
            </InputLabel>
            <Input
              id="confirm-pass-input"
              type="password"
              aria-describedby="confirm-pass-helper-text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormHelperText id="confirm-pass-helper-text">
              Confirm your password
            </FormHelperText>
          </FormControl>
        </Box>

        <CustomButton
          text="Update"
          onClick={onSubmit}
          disabled={loadingUpdateProfile}
        />
        {loadingUpdateProfile && <Loader />}
      </Grid>

      <Grid item xs={12} sm={12} md={9}>
        Column
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
