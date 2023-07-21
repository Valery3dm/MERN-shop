import React from 'react';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../store/services/usersApi';

import Loader from '../../../common/Loader';
import Message from '../../../common/Message';
import CustomButton from '../../../common/CustomButton';

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery('');
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('User deleted');
      } catch (err: any) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Typography variant="h4">Users</Typography>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message severity="error">{`${error}`}</Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">NAME</TableCell>
                <TableCell align="right">EMAIL</TableCell>
                <TableCell align="right">ADMIN</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: any) => (
                <TableRow
                  key={user._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </TableCell>
                  <TableCell align="right">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`admin/user/${user._id}/edit`}>
                      <CustomButton text={<FaEdit />} />
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <CustomButton
                      text={<FaTrash />}
                      onClick={() => deleteHandler(user._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserListPage;
