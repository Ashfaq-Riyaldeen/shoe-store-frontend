// src/pages/About.js
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        About Stride & Style
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Founded with a passion for exceptional footwear, Stride & Style has been 
          dedicated to providing customers with the perfect blend of comfort, quality, 
          and style. We believe that the right pair of shoes can transform not just 
          your outfit, but your entire day.
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our carefully curated collection features premium materials, expert 
          craftsmanship, and timeless designs that cater to every lifestyle and 
          occasion. From casual everyday wear to elegant formal shoes, we have 
          something for everyone.
        </Typography>
        <Typography variant="body1">
          At Stride & Style, we're more than just a shoe store – we're your 
          partners in stepping confidently into every moment of your life.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Quality First
              </Typography>
              <Typography variant="body1">
                We source only the finest materials and work with skilled artisans 
                to ensure every pair meets our high standards.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Customer Focused
              </Typography>
              <Typography variant="body1">
                Your satisfaction is our priority. We provide exceptional service 
                and support to ensure you find the perfect fit.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                Style & Comfort
              </Typography>
              <Typography variant="body1">
                We believe you shouldn't have to choose between looking good and 
                feeling comfortable. Our shoes deliver both.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;