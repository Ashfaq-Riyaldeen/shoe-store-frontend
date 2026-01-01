// src/services/productService.js
import api from './api';

export const productService = {
  getAllProducts: async (params = {}) => {
    // Filter out empty string values to avoid sending unnecessary params
    const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const response = await api.get('/products', { params: filteredParams });
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getAvailableSizes: async () => {
    const response = await api.get('/products/sizes');
    return response.data;
  },
};

