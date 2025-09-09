// src/components/orders/OrderCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
} from '@mui/material';
import { format } from 'date-fns';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Order ID
            </Typography>
            <Typography variant="body1">
              #{order._id.slice(-8).toUpperCase()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body1">
              {format(new Date(order.createdAt), 'MMM dd, yyyy')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={order.order_status}
              color={getStatusColor(order.order_status)}
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Total
            </Typography>
            <Typography variant="h6" color="primary">
              ${order.total_amount.toFixed(2)}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Items
            </Typography>
            <Typography variant="body1">
              {order.products.length}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to={`/orders/${order._id}`}
              fullWidth
            >
              View Details
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

