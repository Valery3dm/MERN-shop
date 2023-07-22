import React, { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  InputAdornment,
  TextField,
} from '@mui/material';

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../../store/services/productsApi';

import FormContainer from '../../../components/FormContainer/FormContainer';
import Loader from '../../../common/Loader/Loader';
import Message from '../../../common/Message/Message';
import CustomButton from '../../../common/CustomButton/CustomButton';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {

    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err: any) {
        toast.error(err?.data?.message || err?.message);
      }
    }
  };

  const onSubmit = async () => {
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result: any = await updateProduct(updatedProduct);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Product update');
      navigate('/admin/productlist');
    }
  };

  return (
    <FormContainer>
      <>
        <Typography variant="h4">Edit Product</Typography>
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
              <InputLabel htmlFor="price-input">Price</InputLabel>
              <Input
                id="price-input"
                type="number"
                aria-describedby="price-helper-text"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <FormHelperText id="price-helper-text">
                Enter price
              </FormHelperText>
            </FormControl>

            {loadingUpload ? (
              <Loader />
            ) : (
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="file-input">Image location</InputLabel>
                <Input
                  id="file-input"
                  type="text"
                  aria-describedby="file-helper-text"
                  value={image}
                  disabled
                />
                <TextField
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    uploadFileHandler(e)
                  }
                  variant="outlined"
                  label="Upload File"
                  fullWidth
                  sx={{ marginTop: '20px' }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            )}

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="brand-input">Brand</InputLabel>
              <Input
                id="brand-input"
                type="text"
                aria-describedby="brand-helper-text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <FormHelperText id="brand-helper-text">
                Enter brand
              </FormHelperText>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="countInStock-input">
                Count In Stock
              </InputLabel>
              <Input
                id="countInStock-input"
                type="number"
                aria-describedby="countInStock-helper-text"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              />
              <FormHelperText id="countInStock-helper-text">
                Enter countInStock
              </FormHelperText>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="category-input">Category</InputLabel>
              <Input
                id="category-input"
                type="text"
                aria-describedby="category-helper-text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <FormHelperText id="category-helper-text">
                Enter category
              </FormHelperText>
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <TextField
                id="description-helper-text"
                label="Description"
                multiline
                rows={6}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormHelperText id="description-helper-text">
                Enter description
              </FormHelperText>
            </FormControl>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <CustomButton
                text="Go back"
                onClick={() => navigate('/admin/productlist')}
              />
              <CustomButton text="Update" onClick={onSubmit} />
            </Box>
          </Box>
        )}
      </>
    </FormContainer>
  );
};

export default ProductEditPage;
