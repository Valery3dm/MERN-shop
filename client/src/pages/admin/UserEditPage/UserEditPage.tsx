import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../../store/services/usersApi';

import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../common/Loader/Loader';
import Message from '../../../common/Message/Message';
import CustomButton from '../../../common/CustomButton/CustomButton';

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      await updateUser({
          _id: userId,
          name,
          email,
          isAdmin,
        });
      toast.success('User update successfully')
      refetch();
      navigate('/admin/userlist');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <FormContainer>
      <>
        <Typography variant="h4">Edit User</Typography>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message severity="error">{`${error}`}</Message>
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name-input">Name</InputLabel>
              <Input
                id="name-input"
                type="text"
                aria-describedby="name-helper-text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText id="name-helper-text">Enter name</FormHelperText>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <Input
                id="email-input"
                type="text"
                aria-describedby="email-helper-text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormHelperText id="email-helper-text">
                Enter email
              </FormHelperText>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Is Admin"
            />

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <CustomButton
                text="Go back"
                onClick={() => navigate('/admin/userlist')}
              />
              <CustomButton text="Update" onClick={onSubmit} />
            </Box>
          </Box>
        )}
      </>
    </FormContainer>
  );
};

export default UserEditPage;
