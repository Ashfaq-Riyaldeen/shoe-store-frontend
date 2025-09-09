import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { fetchProductById } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, isLoading } = useSelector(state => state.products);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    dispatch(addToCart({
      productId: currentProduct._id,
      quantity: 1,
      size: selectedSize,
    }));
  };

  if (!currentProduct) return <div>Loading...</div>;

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img 
            src={currentProduct.productImg} 
            alt={currentProduct.name}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3">{currentProduct.name}</Typography>
          <Typography variant="h5" color="primary" sx={{ my: 2 }}>
            ${currentProduct.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {currentProduct.description}
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Size</InputLabel>
            <Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {currentProduct.attributes.sizes.map(size => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            disabled={currentProduct.quantity === 0}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;