import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import { useGetTopProductsQuery } from '../../store/services/productsApi';

import Loader from '../../common/Loader';
import CustomError from '../../common/CustomError';

import styles from './ProductCarousel.module.scss';

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <CustomError error={error} />
      ) : (
        <div className={styles.container}>
          <Slider {...settings}>
            {products && products.map(product => (
              <Box key={product._id} className={styles.item} onClick={() => navigate(`/product/${product._id}`)}>
                <img src={product.image} alt={product.name} className={styles.image}/>
                <Box className={styles.descriptionWrapper}>
                  <Typography variant='h3' className={styles.product}>{product.name}</Typography>
                  <Typography variant='h3' className={styles.product}>${product.price}</Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
