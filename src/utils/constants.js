// src/utils/constants.js
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: (id) => `/products/${id}`,
    GET_BY_CATEGORY: (category) => `/products/category/${category}`,
    CREATE: '/products',
    UPDATE: (id) => `/products/${id}`,
    DELETE: (id) => `/products/${id}`,
    SIZES: '/products/sizes',
    COLORS: '/products/colors',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: (itemId) => `/cart/item/${itemId}`,
    CLEAR: '/cart/clear',
  },
  ORDERS: {
    CREATE: '/orders',
    GET_USER_ORDERS: '/orders/my-orders',
    GET_BY_ID: (id) => `/orders/${id}`,
    GET_ALL: '/orders/admin/all',
    UPDATE_STATUS: (id) => `/orders/${id}/status`,
    STATS: '/orders/admin/stats',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: (id) => `/users/change-password/${id}`,
    GET_ALL: '/users/admin/all',
  },
};

export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export const CATEGORIES = {
  MEN: 'Men',
  WOMEN: 'Women',
};

