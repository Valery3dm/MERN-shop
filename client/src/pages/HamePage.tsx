import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';

import { useGetProductsQuery } from '../store/services/productsApi';
import CustomError from '../common/CustomError';
import ProductCard from '../components/ProductCard';
import Loader from '../common/Loader';
import Paginate from '../components/Paginate';

const HamePage = () => {
  const {pageNumber} = useParams();
  const { data, isLoading, error } = useGetProductsQuery(Number(pageNumber));

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <>
      <Typography variant="h4">Latest Product</Typography>
      <Grid container spacing={3}>
        {data &&
          data.products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
              <ProductCard {...product} />
            </Grid>
          ))}
      </Grid>
      {data && <Paginate page={data.page} pages={data.pages}/>}
    </>
  );
};

export default HamePage;
