import React from 'react';

import { Grid } from '@mui/material';

import { products } from '../products';
import ProductCard from '../components/ProductCard';

const HamePage = () => {
  return (
    <>
      <h1>Latest Product</h1>
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
