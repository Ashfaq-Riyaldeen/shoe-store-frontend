// src/pages/ProductDetails.js - UPDATED: Free shipping messaging
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBack,
  LocalShipping,
  Security,
  Refresh,
} from '@mui/icons-material';
import { fetchProductById, clearCurrentProduct } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentProduct, isLoading, error } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { isLoading: cartLoading } = useSelector(state => state.cart);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct && currentProduct.attributes.sizes.length > 0) {
      setSelectedSize(currentProduct.attributes.sizes[0]);
    }
  }, [currentProduct]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (quantity > currentProduct.quantity) {
      toast.error(`Only ${currentProduct.quantity} items available`);
      return;
    }

    try {
      await dispatch(addToCart({
        productId: currentProduct._id,
        quantity,
        size: selectedSize,
      })).unwrap();
      
      toast.success(`${currentProduct.name} added to cart!`);
    } catch (error) {
      toast.error(error.message || 'Failed to add item to cart');
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= Math.min(10, currentProduct.quantity)) {
      setQuantity(newQuantity);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert 
          severity="error" 
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => dispatch(fetchProductById(id))}
            >
              <Refresh />
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!currentProduct) {
    return (
      <Container>
        <Alert severity="info">Product not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ overflow: 'hidden' }}>
            <Box
              component="img"
              src={currentProduct.productImg || '/placeholder-shoe.jpg'}
              alt={currentProduct.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 600,
                objectFit: 'cover',
                borderRadius: 1,
              }}
              onError={(e) => {
                e.target.src = '/placeholder-shoe.jpg';
              }}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {currentProduct.name}
            </Typography>

            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
              LKR {currentProduct.price.toFixed(2)}
            </Typography>

            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              {currentProduct.categories?.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  sx={{ mr: 1 }}
                  variant="outlined"
                />
              ))}
            </Box>

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.7 }}>
              {currentProduct.description}
            </Typography>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }}>
              {currentProduct.quantity > 0 ? (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {currentProduct.quantity} items in stock
                </Alert>
              ) : (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Out of stock
                </Alert>
              )}
            </Box>

            {/* Size Selection */}
            {currentProduct.attributes.sizes.length > 0 && (
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Size</InputLabel>
                <Select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  label="Size"
                >
                  {currentProduct.attributes.sizes.map(size => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Color */}
            {currentProduct.attributes.color && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Color: <strong>{currentProduct.attributes.color}</strong>
                </Typography>
              </Box>
            )}

            {/* Quantity Selector */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Quantity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Remove />
                </IconButton>
                
                <Typography
                  variant="h6"
                  sx={{
                    minWidth: 40,
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    py: 1,
                    px: 2,
                  }}
                >
                  {quantity}
                </Typography>
                
                <IconButton
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= Math.min(10, currentProduct.quantity)}
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Free Shipping Message */}
            <Alert severity="success" sx={{ mb: 3 }}>
              🎉 Free shipping included with your order!
            </Alert>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={currentProduct.quantity === 0 || cartLoading}
              sx={{ mb: 3, py: 1.5 }}
            >
              {cartLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : currentProduct.quantity === 0 ? (
                'Out of Stock'
              ) : (
                'Add to Cart'
              )}
            </Button>

            {/* Product Features */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <LocalShipping color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2">Free Shipping</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Security color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2">Secure Payment</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent sx={{ textAlign: 'center', py: 2 }}>
                    <Refresh color="primary" sx={{ mb: 1 }} />
                    <Typography variant="body2">Easy Returns</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
