// src/components/cart/CartItem.js
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    
    try {
      await onUpdateQuantity(item._id, newQuantity);
    } catch (error) {
      // Revert quantity on error
      setQuantity(item.quantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    setIsUpdating(true);
    try {
      await onRemoveItem(item._id);
    } catch (error) {
      setIsUpdating(false);
    }
  };

  return (
    <Card sx={{ display: 'flex', mb: 2, opacity: isUpdating ? 0.6 : 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 120, height: 120, objectFit: 'cover' }}
        image={item.product?.img || '/placeholder-shoe.jpg'}
        alt={item.product?.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3">
              {item.product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Size: {item.size}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
              ${item.price?.toFixed(2)}
            </Typography>
          </Box>
          
          <IconButton 
            onClick={handleRemoveItem}
            color="error"
            disabled={isUpdating}
          >
            <Delete />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isUpdating}
          >
            <Remove />
          </IconButton>
          
          <TextField
            size="small"
            value={quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              if (value !== quantity) {
                handleQuantityChange(value);
              }
            }}
            inputProps={{
              min: 1,
              max: 10,
              style: { textAlign: 'center', width: '60px' }
            }}
            disabled={isUpdating}
          />
          
          <IconButton
            size="small"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10 || isUpdating}
          >
            <Add />
          </IconButton>

          <Typography variant="body2" sx={{ ml: 2 }}>
            Subtotal: ${(item.price * quantity).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CartItem;

