import { useState } from 'react';
import { Grid, MenuItem, Select, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { Box } from '@mui/material';

import { useGetProductsQuery } from '../../store/services/productsApi';

import ProductCard from '../../components/ProductCard';
import CustomError from '../../common/CustomError';
import Loader from '../../common/Loader';
import ProductCarousel from '../../components/ProductCarousel';
import Paginate from '../../components/Paginate';
import Search from '../../components/Search';
import { sortList } from '../../constants';

import styles from './HamePage.module.scss';

const HamePage = () => {
  const { pageNumber, keyword } = useParams();
  const [sortValue, setSortValue] = useState<string>('default');
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: Number(pageNumber),
    sortValue,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <CustomError error={error} />;
  }

  return (
    <>
      <Box className={styles.searchMobile}>
        <Search />
      </Box>
      {!keyword && <ProductCarousel />}
      <Box className={styles.productListHeader}>
        <Typography variant="h4">Latest Product</Typography>
        <Select
          labelId="qty-select-label"
          id="qty-select"
          value={sortValue}
          label="QTY"
          onChange={(e) => setSortValue(e.target.value)}
        >
          {sortList.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={3}>
        {data &&
          data.products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
              <ProductCard {...product} />
            </Grid>
          ))}
      </Grid>
      {data && (
        <Paginate page={data.page} pages={data.pages} keyword={keyword} />
      )}
    </>
  );
};

export default HamePage;
