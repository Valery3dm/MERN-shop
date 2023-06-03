import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material';

import { ProductProps } from './ProductCard.types';

import styles from './ProductCard.module.scss';

const ProductCard = ({ name, image, price }: ProductProps) => {
  return (
    <Card className={styles.card}>
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
          <Typography gutterBottom variant="h4" component="div">
            ${price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
