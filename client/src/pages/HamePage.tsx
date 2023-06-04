import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';

import { Product } from '../interfaces';

import ProductCard from '../components/ProductCard';

const HamePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Typography variant="h4">Latest Product</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HamePage;
