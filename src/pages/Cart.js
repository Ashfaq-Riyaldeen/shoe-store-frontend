// src/pages/Cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  CircularProgress,
  Button,
  Paper,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../store/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items, total, isLoading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      await dispatch(updateCartItem({ itemId, quantity })).unwrap();
      toast.success('Cart updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        await dispatch(clearCart()).unwrap();
        toast.success('Cart cleared successfully');
      } catch (error) {
        toast.error(error.message || 'Failed to clear cart');
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Please log in to view your cart
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Paper>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!items || items.length === 0) {
    return (
      <Container>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/products"
            size="large"
          >
            Start Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box>
            {items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary
            items={items}
            total={total}
            onClearCart={handleClearCart}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

