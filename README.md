# 🏡 Infinity Villas – Real Estate Booking Platform

Infinity Villas is a **full-stack MERN-based real estate booking platform** that enables users to discover, list, manage, and book properties with a modern, secure, and performance-optimized experience.

The platform focuses on clean UI, secure authentication, optimized media handling, and a smooth booking workflow.

---

## 🚀 Live Demo
https://real-estate-booking-one.vercel.app/

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Swiper.js
- Redux Toolkit

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication & Media
- JWT (HTTP-only cookies)
- Firebase Authentication (Google OAuth)
- Cloudinary (image upload & optimization)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## ✨ Features

### 👤 Authentication & User Management
- User signup and login (Email & Password)
- Google OAuth authentication
- Secure JWT-based authentication using HTTP-only cookies
- Protected routes for authenticated users
- Profile management:
  - Update username, email, password
  - Upload and update avatar
- Logout and account deletion

---

### 🏠 Property Listings
- Create listings with:
  - Property name & description
  - Address / location
  - Rent or Sale type
  - Bedrooms & bathrooms
  - Parking & furnished options
  - Offers & discounted pricing
  - Up to 6 high-quality images
- Cloudinary-powered image upload and delivery
- Update and delete listings
- View all user-owned listings from profile dashboard

---

## 📅 Booking Features

### 🔍 Property Discovery
- Browse properties by:
  - Rent
  - Sale
  - Special offers
- Optimized image carousel
- Fully detailed property pages with pricing and features

---

### 📖 Booking Flow
- Only authenticated users can initiate booking actions
- Clear price display:
  - Regular price
  - Discounted price (if applicable)
- Booking intent validated on the backend
- Secure booking workflow using protected APIs
- Smooth redirection after booking-related actions

---

### 🧾 Booking Management
- Users can:
  - View their booked or selected properties
  - Access booking-related property details
- Booking data is accessible only to authorized users

---

### 🧑‍💼 Listing Owner Controls
- Listing owners can:
  - Update or delete their listings
  - Manage listing visibility
- Unauthorized booking or listing manipulation is blocked

---

### 🔐 Security
- Cookie-based JWT authentication
- Backend route protection using middleware
- Role-based access control for listings
- Secure handling of user and booking data
- Input validation on all APIs

---

## ⚡ Performance Optimizations
- Cloudinary image transformations (`f_auto`, `q_auto`)
- Lazy loading of images
- Parallel API fetching
- Optimized Swiper rendering
- Reduced unnecessary re-renders

---

## 🎨 UI / UX
- Modern, minimal, and elegant design
- Responsive layout (mobile-first)
- Smooth animations using Framer Motion
- Clean dashboard and listing cards

---

## 📂 Environment Variables

### Frontend (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:4000



