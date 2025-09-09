// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from '@mui/material';
import {
  LocalShipping,
  Security,
  SupportAgent,
  Star,
} from '@mui/icons-material';
import { productService } from '../services/productService';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getAllProducts({ limit: 4 });
        setFeaturedProducts(response.products || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const features = [
    {
      icon: <LocalShipping sx={{ fontSize: 40 }} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Payment',
      description: 'Your payment information is safe with us',
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40 }} />,
      title: '24/7 Support',
      description: 'Get help whenever you need it',
    },
    {
      icon: <Star sx={{ fontSize: 40 }} />,
      title: 'Quality Guarantee',
      description: 'Premium quality shoes with warranty',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(45deg, #000000 30%, #333333 90%)',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Step Into Elegance
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Discover our curated collection of premium footwear that combines 
                comfort, style, and sophistication.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/products"
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/about"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  textAlign: 'center',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                  },
                }}
              >
                {/* Placeholder for hero image */}
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Typography variant="h6" sx={{ opacity: 0.7 }}>
                    Hero Image Placeholder
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Why Choose Stride & Style?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Shop by Category
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                component={Link}
                to="/products?category=Men"
                sx={{
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 250,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" color="text.secondary">
                    Men's Shoes
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Men's Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discover our sophisticated collection of men's footwear
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                component={Link}
                to="/products?category=Women"
                sx={{
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 250,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" color="text.secondary">
                    Women's Shoes
                  </Typography>
                </CardMedia>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    Women's Collection
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Elegant and comfortable shoes for every occasion
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Featured Products Section */}
        {!isLoading && featuredProducts.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Featured Products
            </Typography>
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <Card
                    component={Link}
                    to={`/products/${product._id}`}
                    sx={{
                      textDecoration: 'none',
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
                      sx={{
                        height: 200,
                        bgcolor: 'grey.200',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      image={product.productImg || '/placeholder-shoe.jpg'}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h4" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="h6" color="primary">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/products"
              >
                View All Products
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;

