import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';

import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from '../../../store/services/productsApi';
import { Product } from '../../../interfaces';

import CustomButton from '../../../common/CustomButton/CustomButton';
import Loader from '../../../common/Loader/Loader';
import Message from '../../../common/Message/Message';

const ProductListPage = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct('');
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const deleteHandler = async (id: string) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err: any) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Grid container mb={3}>
        <Grid item xs={12} sm={12} md={9}>
          <Typography variant="h4">Products</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <CustomButton text="Create Product" onClick={createProductHandler} />
        </Grid>
      </Grid>
      {loadingCreate && <Loader />}
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
                <TableCell align="right">PRICE</TableCell>
                <TableCell align="right">CATEGORY</TableCell>
                <TableCell align="right">BRAND</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product: Product) => (
                  <TableRow
                    key={product._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product._id}
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">${product.price}</TableCell>
                    <TableCell align="right">{product.category}</TableCell>
                    <TableCell align="right">{product.brand}</TableCell>
                    <TableCell align="right">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <CustomButton text={<FaEdit />} />
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      <CustomButton
                        text={<FaTrash style={{ color: 'red' }} />}
                        onClick={() => deleteHandler(product._id)}
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

export default ProductListPage;
