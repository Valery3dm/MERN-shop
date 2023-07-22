import React from 'react';
import { Box, Rating, Typography } from '@mui/material';

import { CustomRatingProps } from './CustomRating.types';

import styles from './CustomRating.module.scss';

const CustomRating = ({rating, reviews}: CustomRatingProps) => {
  return (
    <Box className={styles.ratingWrapper}>
      <Rating name="size-medium" value={rating} precision={0.5} readOnly />
      {reviews && <Typography className={styles.reviewText}>{reviews} reviews</Typography>}
    </Box>
  );
};

export default CustomRating;
