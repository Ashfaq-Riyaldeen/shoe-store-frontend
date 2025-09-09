// src/pages/OrderHistory.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import OrderCard from '../components/orders/OrderCard';
import { fetchUserOrders } from '../store/orderSlice';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

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

  if (!orders || orders.length === 0) {
    return (
      <Container>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Order History
        </Typography>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No orders yet
          </Typography>
          <Typography variant="body1" color="text.secondary">
            When you place your first order, it will appear here.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Order History
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        You have {orders.length} order{orders.length !== 1 ? 's' : ''}
      </Typography>

      <Box>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </Box>
    </Container>
  );
};

export default OrderHistory;