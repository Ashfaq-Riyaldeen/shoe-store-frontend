// src/components/products/ProductFilters.js
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
} from '@mui/material';
import { productService } from '../../services/productService';

const ProductFilters = ({ filters, onFiltersChange, onApplyFilters }) => {
  const [availableSizes, setAvailableSizes] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const sizesData = await productService.getAvailableSizes();
        setAvailableSizes(sizesData.availableSizes);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    onFiltersChange(updatedFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      size: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    onFiltersChange(clearedFilters);
    onApplyFilters();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search products..."
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
            >
              <MenuItem value="">All Sizes</MenuItem>
              {availableSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            label="Min Price"
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            fullWidth
            label="Max Price"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={`${filters.sortBy}-${filters.sortOrder}`}
              onChange={(e) => {
                const [sortBy, sortOrder] = e.target.value.split('-');
                const updatedFilters = { ...filters, sortBy, sortOrder };
                onFiltersChange(updatedFilters);
              }}
            >
              <MenuItem value="createdAt-desc">Newest First</MenuItem>
              <MenuItem value="createdAt-asc">Oldest First</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="name-asc">Name: A to Z</MenuItem>
              <MenuItem value="name-desc">Name: Z to A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={onApplyFilters}>
          Apply Filters
        </Button>
        <Button variant="outlined" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>
    </Paper>
  );
};

export default ProductFilters;

