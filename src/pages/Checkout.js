import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { orderService } from '../services/orderService';

const Checkout = () => {
  const { items, total } = useSelector(state => state.cart);
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = ['Review Order', 'Shipping Info', 'Confirm Order'];

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        products: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          size: item.size
        })),
        total_amount: total
      };
      
      await orderService.createOrder(orderData);
      // Redirect to success page
    } catch (error) {
      console.error('Order failed:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Implementation details for each step */}
    </Container>
  );
};

export default Checkout;