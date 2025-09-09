// src/pages/Admin.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import {
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  Assessment,
} from '@mui/icons-material';
import AdminDashboard from '../components/admin/AdminDashboard';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Admin = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Admin Panel
      </Typography>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            aria-label="admin panel tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              icon={<Dashboard />}
              label="Dashboard"
              id="admin-tab-0"
              aria-controls="admin-tabpanel-0"
            />
            <Tab
              icon={<Inventory />}
              label="Products"
              id="admin-tab-1"
              aria-controls="admin-tabpanel-1"
            />
            <Tab
              icon={<ShoppingCart />}
              label="Orders"
              id="admin-tab-2"
              aria-controls="admin-tabpanel-2"
            />
            <Tab
              icon={<People />}
              label="Users"
              id="admin-tab-3"
              aria-controls="admin-tabpanel-3"
            />
          </Tabs>
        </Box>

        <TabPanel value={currentTab} index={0}>
          <AdminDashboard />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <ProductManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <OrderManagement />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <UserManagement />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Admin;

