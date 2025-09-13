<!-- README.md -->
# Stride & Style Frontend ok

A modern, elegant e-commerce frontend for a premium shoe store built with React, Material-UI, and Redux Toolkit.

## Features

- **Authentication System** - User registration, login, and JWT-based authentication
- **Product Catalog** - Browse products with advanced filtering and search
- **Shopping Cart** - Add, remove, and manage cart items
- **Checkout Process** - Streamlined order placement
- **User Profile** - Manage personal information and view order history
- **Admin Panel** - Product, order, and user management
- **Responsive Design** - Works on all device sizes
- **Modern UI** - Clean, elegant design with Material-UI

## Tech Stack

- **Frontend:** React 18, Material-UI 5, Redux Toolkit
- **Routing:** React Router 6
- **HTTP Client:** Axios
- **State Management:** Redux with RTK Query
- **Styling:** Material-UI with custom theme
- **Notifications:** React Toastify

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running on http://localhost:5000

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd stride-style-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

The application will open at http://localhost:3000

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── store/             # Redux store and slices
├── services/          # API services
├── utils/             # Utility functions
├── theme/             # Material-UI theme
└── App.js             # Main application component
```

## API Integration

The frontend integrates with the following backend endpoints:

- **Authentication:** `/api/auth/*`
- **Products:** `/api/products/*`
- **Cart:** `/api/cart/*`
- **Orders:** `/api/orders/*`
- **Users:** `/api/users/*`

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_APP_NAME` - Application name
- `REACT_APP_VERSION` - Application version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.