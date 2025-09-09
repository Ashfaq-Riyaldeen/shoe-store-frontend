// src/components/common/ErrorBoundary.js
import React from 'react';
import { Alert, Container } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Alert severity="error">
            Something went wrong. Please refresh the page.
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}