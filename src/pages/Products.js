// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import { fetchProducts, setFilters } from '../store/productSlice';
import { addToCart } from '../store/cartSlice';
import { toast } from 'react-toastify';

const Products = () => {
  const dispatch = useDispatch();
  const {
    products,
    isLoading,
    error,
    pagination,
    filters,
  } = useSelector((state) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page: currentPage }));
  }, [dispatch, currentPage]);

  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleApplyFilters = () => {
    setCurrentPage(1);
    dispatch(fetchProducts({ ...filters, page: 1 }));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    if (!product.attributes.sizes || product.attributes.sizes.length === 0) {
      toast.error('This product has no available sizes');
      return;
    }
    
    // For demo purposes, we'll add the first available size
    // In a real app, you'd want to show a size selector
    const defaultSize = product.attributes.sizes[0];
    
    dispatch(addToCart({
      productId: product._id,
      quantity: 1,
      size: defaultSize,
    }));
    
    toast.success(`${product.name} added to cart!`);
  };

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Our Products
      </Typography>

      <ProductFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Showing {products.length} of {pagination.totalProducts} products
          </Typography>

          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>

          {pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;