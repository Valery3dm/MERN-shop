import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import CustomRating from '../../components/CustomRating/CustomRating';
import CustomButton from '../../common/CustomButton/CustomButton';

import { Product } from '../../interfaces';

import styles from './ProductPage.module.scss';

const ProductPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${productId}`);
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography variant="h1">Loading...</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          xl={5}
          className={styles.imageWrapper}
        >
          <img src={`${product.image}`} alt={product.name} />
        </Grid>

        <Grid item xs={12} sm={12} md={5} xl={5}>
          <List>
            <ListItemText
              primary={<Typography variant="h5">{product.name}</Typography>}
            />
            <Divider />
            <ListItem alignItems="flex-start" disablePadding divider>
              <CustomRating
                rating={product.rating}
                reviews={product.numReviews}
              />
            </ListItem>
            <ListItemText
              primary={
                <Typography variant="body1">
                  <b>Price:</b> ${product.price}
                </Typography>
              }
            />
            <Divider />
            <ListItemText
              primary={
                <Typography variant="body1">
                  <b>Description:</b> {product.description}
                </Typography>
              }
            />
          </List>
        </Grid>

        <Grid item xs={12} sm={12} md={2} xl={2}>
          <Card className={styles.cardWrapper}>
            <CardContent className={styles.content}>
              <List>
                <ListItem divider>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        className={styles.boldTextCard}
                      >
                        Price:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        className={styles.boldTextCard}
                      >
                        ${product.price}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem alignItems="flex-start" divider>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        className={styles.boldTextCard}
                      >
                        Status:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="body1"
                        className={styles.boldTextCard}
                      >
                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <CustomButton
                    text="Add to cart"
                    disabled={product.countInStock === 0}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
