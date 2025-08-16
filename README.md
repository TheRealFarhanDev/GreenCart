# 🛒 GreenCart

A modern, full-stack e-commerce platform built with React and Node.js, featuring user shopping experiences and seller management capabilities.

## 🌐 Live Demo

**Frontend Application**: [https://greencart-frontend-blond.vercel.app/](https://greencart-frontend-blond.vercel.app/)

Experience the full GreenCart e-commerce platform with a responsive, modern interface built with React and Tailwind CSS.

## 🔑 Demo Credentials

**Admin Account** (for testing purposes):
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

> ⚠️ **Note**: These credentials are for demonstration and testing purposes only. Please do not use them in production environments.

## ✨ Features

### 🛍️ User Features
- **Product Browsing**: Browse products by category with detailed product information
- **Shopping Cart**: Add/remove items and manage cart contents
- **User Authentication**: Secure login and registration system
- **Order Management**: Track and view order history
- **Address Management**: Save and manage delivery addresses
- **Responsive Design**: Mobile-first design with Tailwind CSS

### 🏪 Seller Features
- **Product Management**: Add and manage product listings
- **Order Processing**: View and manage incoming orders
- **Seller Dashboard**: Dedicated interface for business operations
- **Inventory Control**: Track product availability and stock

### 🔧 Technical Features
- **Real-time Updates**: Live cart and order updates
- **Payment Integration**: Stripe payment processing
- **Image Management**: Cloudinary integration for product images
- **Secure API**: JWT authentication and bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - User notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Stripe** - Payment processing
- **Cloudinary** - Cloud image management
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
GreenCart/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
├── server/                  # Node.js backend application
│   ├── routes/             # API route definitions
│   ├── controllers/        # Business logic handlers
│   ├── models/             # Database models
│   ├── middlewares/        # Custom middleware functions
│   ├── config/             # Configuration files
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- Stripe account (for payments)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GreenCart
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both `server/` and `frontend/` directories:
   
   **Server (.env)**
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the development servers**

   **Backend (Terminal 1)**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend (Terminal 2)**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📱 API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/is-auth` - verify user login
- `GET /api/user/logout` - User Logout



### Product Routes
- `GET /api/product/all` - Get all products
- `GET /api/product/id` - Get product by ID
- `POST /api/product/add` - Add new product (seller only)
- `PUT /api/product/id` - Update product (seller only)

### Cart Routes
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

### Order Routes
- `POST /api/order/create` - Create new order
- `GET /api/order/my-orders` - Get user orders
- `GET /api/order/seller-orders` - Get seller orders

## 🎨 UI Components

The application features a clean, modern interface built with:
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean aesthetics with Tailwind CSS
- **Interactive Elements**: Smooth animations and transitions
- **User Experience**: Intuitive navigation and workflows

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all inputs
- **Secure Headers**: Proper security headers implementation

## 🚀 Deployment

### Frontend (Vercel)
- Configured with `vercel.json` for easy deployment
- Automatic builds on git push
- Global CDN distribution

### Backend (Vercel)
- Serverless deployment configuration
- Environment variable management
- Automatic scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using modern web technologies**
