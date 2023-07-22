import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormHelperText,
} from '@mui/material';

import { useAppSelector } from '../../hooks/redux';
import { useCreateReviewMutation } from '../../store/services/productsApi';

import { ReviewsSectionProps } from './ReviewsSection.type';

import CustomRating from '../../components/CustomRating';
import CustomButton from '../../common/CustomButton';
import Message from '../../common/Message';
import Loader from '../../common/Loader';

const ReviewsSection = ({ product, productId, refetch }: ReviewsSectionProps) => {
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const onSubmit = async () => {
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={8}>
        <Box sx={{ maxWidth: '650px' }}>
          <Typography variant="h4">Reviews</Typography>
          {product.reviews.length === 0 && (
            <Message severity="info">No Reviews</Message>
          )}
          <List>
            {product.reviews.map((review) => (
              <ListItem alignItems="flex-start" divider key={review._id}>
                <List>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2">{review.name}</Typography>
                    }
                  />
                  <ListItem alignItems="flex-start">
                    <CustomRating rating={review.rating} />
                  </ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" paragraph>
                        {new Date(review.createdAt).toISOString().split('T')[0]}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={
                      <Typography variant="body2">{review.comment}</Typography>
                    }
                  />
                </List>
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <Box sx={{ maxWidth: '650px' }}>
          <Typography variant="h4">Write a Customer Review</Typography>
          {loadingProductReview && <Loader />}

          {userInfo ? (
            <Box component="form" noValidate autoComplete="off">
              <FormControl fullWidth>
                <InputLabel id="rating-simple-select-label">Rating</InputLabel>
                <Select
                  labelId="rating-simple-select-label"
                  id="rating-simple-select"
                  value={rating || ''}
                  label="Rating"
                  onChange={(e) => setRating(e.target.value as number | null)}
                >
                  <MenuItem value="">Choose...</MenuItem>
                  <MenuItem value={1}>1 - Poor</MenuItem>
                  <MenuItem value={2}>2 - Fair</MenuItem>
                  <MenuItem value={3}>3 - Good</MenuItem>
                  <MenuItem value={4}>4 - Very Good</MenuItem>
                  <MenuItem value={5}>5 - Excellent</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                <TextField
                  id="comment-helper-text"
                  label="Comment"
                  multiline
                  rows={3}
                  defaultValue={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <FormHelperText id="comment-helper-text">
                  Enter comment
                </FormHelperText>
              </FormControl>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                <CustomButton text="Update" onClick={onSubmit} />
              </Box>
            </Box>
          ) : (
            <Message severity="info">
              <Typography variant="body1">
                Please <Link to="/login">sign in</Link> to write a review
              </Typography>
            </Message>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default ReviewsSection;
