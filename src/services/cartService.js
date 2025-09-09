// src/services/cartService.js
import api from './api';

export const cartService = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (cartData) => {
    const response = await api.post('/cart/add', cartData);
    return response.data;
  },

  updateCartItem: async (itemData) => {
    const response = await api.put('/cart/update', itemData);
    return response.data;
  },

  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  },
};

