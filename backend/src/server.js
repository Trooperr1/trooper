import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

// Import routes
import appointmentRoutes from './routes/appointmentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Coiffure Melimelo API',
    version: '1.0.0',
    endpoints: {
      appointments: '/api/appointments',
      services: '/api/services',
      team: '/api/team',
      contact: '/api/contact',
      health: '/api/health',
    },
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🔧 Coiffure Melimelo API Server                        ║
  ║                                                           ║
  ║   🚀 Server running on port ${PORT}                         ║
  ║   📡 Environment: ${process.env.NODE_ENV || 'development'}                     ║
  ║   🌐 API URL: http://localhost:${PORT}                      ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

export default app;
