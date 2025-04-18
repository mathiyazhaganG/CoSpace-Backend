# CoSpace Backend

CoSpace is a backend system for managing co-working spaces, including booking seats, managing spaces, and user authentication.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Endpoints](#endpoints)
- [Future Enhancements](#future-enhancements)

---

## Introduction
CoSpace Backend provides APIs for managing co-working spaces. It allows users to book seats, view available spaces, and manage bookings. Admins can create spaces and manage bookings.

---

## Features
- User registration and login with role-based access (`user` and `admin`).
- Book seats for specific time slots.
- View available seats in a space.
- Admin functionality to create spaces with seats.
- Fetch user-specific and all bookings.

---

## Technologies Used
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: `cookie-parser`, `cors`
- **Environment Variables**: `dotenv`

---

## Setup Instructions

### Prerequisites
- Node.js installed on your system.
- MongoDB instance running locally or on the cloud.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/cospace-backend.git
   cd cospace-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. The server should now be running on `http://localhost:5000`.

---

## API Documentation

### Authentication
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`

### Endpoints
- **Spaces**: `GET /api/spaces`
- **Book Seat**: `POST /api/bookings`
- **View Bookings**: `GET /api/bookings`
- **Admin Create Space**: `POST /api/admin/spaces`

---

### Middleware
- **Authentication-User**: `UserAuth.js`
- **Authentication-Admin**: `AdminAuth.js`


---

