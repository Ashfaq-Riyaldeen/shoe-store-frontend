// src/pages/Checkout.js - NO TAX, FREE SHIPPING
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { createOrder, clearOrderSuccess } from '../store/orderSlice';
import { clearCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, orderSuccess, error } = useSelector((state) => state.orders);

  const [orderSummary, setOrderSummary] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    // Calculate order summary - Always free shipping, no tax
    const shipping = 0; // Always free
    const finalTotal = total + shipping; // No tax

    setOrderSummary({
      subtotal: total,
      shipping,
      total: finalTotal,
    });
  }, [items, total, navigate]);

  useEffect(() => {
    if (orderSuccess) {
      toast.success('Order placed successfully!');
      dispatch(clearCart());
      dispatch(clearOrderSuccess());
      navigate('/orders');
    }
  }, [orderSuccess, dispatch, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          size: item.size,
        })),
        // Let backend calculate all totals
      };

      await dispatch(createOrder(orderData)).unwrap();
    } catch (error) {
      toast.error(error.message || 'Failed to place order');
    }
  };

  if (!orderSummary) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>
            
            <List>
              {items.map((item) => (
                <ListItem key={item._id} sx={{ py: 2 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={item.product?.img}
                      variant="square"
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.product?.name}
                    secondary={`Size: ${item.size} | Qty: ${item.quantity}`}
                    sx={{ ml: 2 }}
                  />
                  <Typography variant="h6">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Shipping Address */}
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Shipping Address
            </Typography>
            {user?.address && (
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body1">
                  {user.address.street}<br />
                  {user.address.city}, {user.address.state} {user.address.postal_code}<br />
                  {user.address.country}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Order Total */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Order Total
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>LKR {orderSummary.subtotal.toFixed(2)}</Typography>
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
              <Typography variant="h6">LKR {orderSummary.total.toFixed(2)}</Typography>
            </Box>

            <Alert severity="success" sx={{ mb: 2 }}>
              🎉 Free shipping on all orders!
            </Alert>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePlaceOrder}
              disabled={isLoading}
              sx={{ mb: 2 }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Place Order'}
            </Button>

            <Typography variant="body2" color="text.secondary" align="center">
              By placing this order, you agree to our terms and conditions.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;