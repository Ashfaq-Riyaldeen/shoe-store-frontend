// src/components/cart/CartSummary.js
import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ items, total, onClearCart }) => {
  const navigate = useNavigate();
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total > 100 ? 0 : 10; // Free shipping over $100
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shipping + tax;

  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Items ({itemCount})</Typography>
        <Typography>${total.toFixed(2)}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>Shipping</Typography>
        <Typography>
          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography>Tax</Typography>
        <Typography>${tax.toFixed(2)}</Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">${finalTotal.toFixed(2)}</Typography>
      </Box>

      {total > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {shipping > 0 && `Spend $${(100 - total).toFixed(2)} more for free shipping!`}
        </Typography>
      )}
      
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

