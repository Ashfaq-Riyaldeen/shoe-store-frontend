// src/components/products/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardMedia
        component={Link}
        to={`/products/${product._id}`}
        sx={{
          height: 250,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textDecoration: 'none',
        }}
        image={product.productImg || '/placeholder-shoe.jpg'}
        title={product.name}
      />
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          to={`/products/${product._id}`}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {product.categories?.map((category) => (
            <Chip
              key={category}
              label={category}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
          LKR {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
        >
          {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

