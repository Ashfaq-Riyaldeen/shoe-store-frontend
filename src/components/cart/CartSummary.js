// src/components/cart/CartSummary.js - NO TAX, FREE SHIPPING
import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Box,
  Button,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ items, total, onClearCart }) => {
  const navigate = useNavigate();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = 0; // Always free shipping
  const finalTotal = total + shipping; // No tax

  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Items ({itemCount})</Typography>
        <Typography>LKR {total.toFixed(2)}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Shipping</Typography>
        <Typography color="success.main" fontWeight="bold">
          FREE
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">LKR {finalTotal.toFixed(2)}</Typography>
      </Box>

      <Alert severity="success" sx={{ mb: 2 }}>
        🎉 Free shipping on all orders!
      </Alert>
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => navigate('/checkout')}
        disabled={items.length === 0}
        sx={{ mb: 1 }}
      >
        Proceed to Checkout
      </Button>
      
      <Button
        fullWidth
        variant="outlined"
        onClick={onClearCart}
        disabled={items.length === 0}
      >
        Clear Cart
      </Button>
    </Paper>
  );
};

export default CartSummary;