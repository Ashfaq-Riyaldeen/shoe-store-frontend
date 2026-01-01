// src/components/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';
import { orderService } from '../../services/orderService';
import { productService } from '../../services/productService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);

      // Fetch order stats
      const orderStats = await orderService.getOrderStats();

      // Fetch product count
      const productData = await productService.getAllProducts({ limit: 1 });

      // Fetch user count
      let userCount = 0;
      try {
        const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/admin/all`, {
          credentials: 'include',
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          userCount = userData.users?.length || 0;
        }
      } catch (userError) {
        console.error('Error fetching user count:', userError);
      }

      setStats({
        totalOrders: orderStats.totalOrders || 0,
        totalRevenue: orderStats.totalRevenue || 0,
        totalProducts: productData.pagination?.totalProducts || 0,
        totalUsers: userCount,
      });
    } catch (error) {
      setError('Failed to fetch dashboard statistics');
      console.error('Dashboard stats error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `LKR ${stats.totalRevenue.toFixed(2)}`,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: 'success.main',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: 'info.main',
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: 'warning.main',
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <People sx={{ fontSize: 40 }} />,
      color: 'primary.main',
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      {card.title}
                    </Typography>
                    <Typography variant="h4">
                      {card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

