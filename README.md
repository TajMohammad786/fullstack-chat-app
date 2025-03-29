
# Real-Time Chat Application

A full-stack chat application built with modern web technologies featuring real-time messaging, user authentication, and a responsive UI.

## Features

- Real-time messaging using Socket.IO
- User authentication and authorization
- Online user status tracking
- Message history
- Theme customization
- Responsive design for all devices
- Image sharing in chats

## Tech Stack

### Frontend
- React.js - UI library
- Zustand - State management
- Socket.IO Client - Real-time communication
- TailwindCSS & DaisyUI - Styling
- Vite - Build tool

### Backend
- Express.js - Web framework
- MongoDB - Database
- Socket.IO - Real-time server
- JWT - Authentication
- Bcrypt - Password hashing

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

3. Set up environment variables in `.env`:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:

Frontend (development):
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Main Features Explained

### Authentication
- Secure user registration and login
- JWT-based authentication
- Password hashing for security

### Real-time Features
- Instant messaging
- Online status indicators
- Typing indicators
- Read receipts

### Chat Features
- One-on-one messaging
- Image sharing
- Message history
- User search

### UI/UX
- Multiple themes support
- Responsive design
- Loading states
- Error handling with toast notifications

## Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── lib/
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── socket/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License

## Acknowledgments

- Built with React.js and Express.js
- Styled with TailwindCSS and DaisyUI
- Real-time features powered by Socket.IO
