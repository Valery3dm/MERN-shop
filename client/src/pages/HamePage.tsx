import { Grid, Typography } from '@mui/material';

import { productsApi } from '../store/services/productsApi';
import CustomError from '../common/CustomError';
import ProductCard from '../components/ProductCard';

const HamePage = () => {
  const {
    data: products,
    isLoading,
    error,
  } = productsApi.useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <CustomError error={error} />
  }

  return (
    <>
      <Typography variant="h4">Latest Product</Typography>
      <Grid container spacing={3}>
        {products &&
          products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
              <ProductCard {...product} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default HamePage;
