import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'

import CustomRating from '../CustomRating/CustomRating';

import { ProductProps } from './ProductCard.types';

import styles from './ProductCard.module.scss';

const ProductCard = ({ _id, name, image, rating, numReviews, price }: ProductProps) => {
  const navigate = useNavigate()
  return (
    <Card className={styles.card} onClick={() => navigate(`/product/${_id}`)}>
      <CardActionArea>
        <Box className={styles.imageWrapper}>
          <CardMedia
            component="img"
            className={styles.image}
            image={image}
            alt={name}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className={styles.name}>
            {name}
          </Typography>
          <CustomRating rating={rating} reviews={numReviews} />
          <Typography gutterBottom variant="h4" component="div">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
