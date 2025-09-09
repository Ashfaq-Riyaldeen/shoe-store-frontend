// src/services/productService.js
import api from './api';

export const productService = {
  getAllProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
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

  getAvailableColors: async () => {
    const response = await api.get('/products/colors');
    return response.data;
  },
};

