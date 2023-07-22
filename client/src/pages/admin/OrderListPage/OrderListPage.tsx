import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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

import { useGetOrdersQuery } from '../../../store/services/ordersApi';

import Loader from '../../../common/Loader';
import Message from '../../../common/Message';
import CustomButton from '../../../common/CustomButton';

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery('');

  return (
    <>
      <Typography variant="h4">Orders</Typography>
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
                <TableCell align="right">USER</TableCell>
                <TableCell align="right">DATE</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PAID</TableCell>
                <TableCell align="right">DELIVERED</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow
                  key={order._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="right">
                    {order.user && order.user.name}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(order.createdAt).toISOString().split('T')[0]}
                  </TableCell>
                  <TableCell align="right">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {order.isPaid ? (
                      new Date(order.paidAt).toISOString().split('T')[0]
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toISOString().split('T')[0]
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/order/${order._id}`}>
                      <CustomButton text="details" />
                    </Link>
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

export default OrderListPage;
