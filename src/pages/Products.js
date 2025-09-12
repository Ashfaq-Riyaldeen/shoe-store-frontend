// src/pages/Products.js - FIXED: Handle URL category parameters
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const {
    products,
    isLoading,
    error,
    pagination,
    filters,
  } = useSelector((state) => state.products);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFiltersSet, setInitialFiltersSet] = useState(false);

  // Parse URL parameters and set initial filters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialFilters = {};

    // Check for category parameter
    const category = urlParams.get('category');
    if (category && ['Men', 'Women'].includes(category)) {
      initialFilters.category = category;
    }

    // Check for other possible parameters
    const search = urlParams.get('search');
    if (search) {
      initialFilters.search = search;
    }

    const minPrice = urlParams.get('minPrice');
    if (minPrice) {
      initialFilters.minPrice = minPrice;
    }

    const maxPrice = urlParams.get('maxPrice');
    if (maxPrice) {
      initialFilters.maxPrice = maxPrice;
    }

    const color = urlParams.get('color');
    if (color) {
      initialFilters.color = color;
    }

    const size = urlParams.get('size');
    if (size) {
      initialFilters.size = size;
    }

    // Only update filters if there are URL parameters
    if (Object.keys(initialFilters).length > 0) {
      dispatch(setFilters(initialFilters));
    }

    setInitialFiltersSet(true);
  }, [location.search, dispatch]);

  // Fetch products when filters change or page changes
  useEffect(() => {
    if (initialFiltersSet) {
      dispatch(fetchProducts({ ...filters, page: currentPage }));
    }
  }, [dispatch, currentPage, filters, initialFiltersSet]);

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

  const handleAddToCart = async (product) => {
    if (!product.attributes.sizes || product.attributes.sizes.length === 0) {
      toast.error('This product has no available sizes');
      return;
    }
    
    // For demo purposes, we'll add the first available size
    // In a real app, you'd want to show a size selector
    const defaultSize = product.attributes.sizes[0];
    
    try {
      await dispatch(addToCart({
        productId: product._id,
        quantity: 1,
        size: defaultSize,
      })).unwrap();
      
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error(error.message || 'Failed to add item to cart');
    }
  };

  // Show loading while initial filters are being set
  if (!initialFiltersSet) {
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

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Our Products
        {filters.category && (
          <Typography 
            variant="h5" 
            component="span" 
            color="primary" 
            sx={{ ml: 2, fontWeight: 'normal' }}
          >
            - {filters.category}'s Collection
          </Typography>
        )}
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
            {filters.category ? (
              <>
                Showing {products.length} of {pagination.totalProducts} {filters.category.toLowerCase()}'s products
              </>
            ) : (
              <>
                Showing {products.length} of {pagination.totalProducts} products
              </>
            )}
          </Typography>

          {products.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                No products found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your filters to see more results.
              </Typography>
            </Box>
          ) : (
            <>
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
        </>
      )}
    </Container>
  );
};

export default Products;