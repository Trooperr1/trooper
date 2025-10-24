# BACKEND - ALL FILES FOR COPY-PASTE

## Setup Instructions

1. Create a folder named "backend"
2. Run: `cd backend && npm init -y`
3. Copy each file below to its respective location
4. Run: `npm install`
5. Run: `npm run seed` (to populate database)
6. Run: `npm run dev` (to start server)

---

## File: backend/package.json

```json
{
  "name": "coiffure-melimelo-backend",
  "version": "1.0.0",
  "description": "Backend API for Coiffure Melimelo barber shop",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "seed": "node src/utils/seeder.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["barber", "appointment", "api"],
  "author": "Coiffure Melimelo",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-validator": "^7.3.0",
    "mongoose": "^8.19.2",
    "nodemailer": "^7.0.10"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

---

## File: backend/.env

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/coiffure-melimelo

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@coiffuremelimelo.ch

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# WhatsApp API (optional)
WHATSAPP_API_KEY=your-whatsapp-api-key
WHATSAPP_PHONE_NUMBER=+41765971395
```

---

## File: backend/.gitignore

```
# Dependencies
node_modules/

# Environment Variables
.env

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Build
dist/
build/
```

---

## File: backend/src/config/database.js

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```


## File: backend/src/controllers/appointmentController.js

```javascript
import Appointment from '../models/Appointment.js';
import { validationResult } from 'express-validator';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      customerName,
      customerPhone,
      customerEmail,
      barber,
      appointmentDate,
      appointmentTime,
      service,
      message,
    } = req.body;

    // Check if appointment slot is already taken
    const existingAppointment = await Appointment.findOne({
      'barber.name': barber.name,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked',
      });
    }

    const appointment = await Appointment.create({
      customerName,
      customerPhone,
      customerEmail,
      barber,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      service,
      message,
    });

    res.status(201).json({
      success: true,
      data: appointment,
      message: 'Appointment created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public (should be protected in production)
export const getAppointments = async (req, res) => {
  try {
    const { barber, date, status, page = 1, limit = 10 } = req.query;

    const query = {};

    if (barber) {
      query['barber.name'] = barber;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.appointmentDate = { $gte: startDate, $lte: endDate };
    }

    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Appointment.countDocuments(query);

    res.status(200).json({
      success: true,
      data: appointments,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Public
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Public (should be protected in production)
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
      message: 'Appointment updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Public (should be protected in production)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get available time slots for a barber on a specific date
// @route   GET /api/appointments/availability/:barber/:date
// @access  Public
export const getAvailableSlots = async (req, res) => {
  try {
    const { barber, date } = req.params;

    // Business hours: 9:00 AM to 7:00 PM (except Monday and Sunday)
    const dayOfWeek = new Date(date).getDay();

    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Closed on Sundays and Mondays',
      });
    }

    // Generate all possible time slots (30-minute intervals)
    const allSlots = [];
    const startHour = dayOfWeek === 6 ? 8.5 : 9; // Saturday starts at 8:30
    const endHour = dayOfWeek === 6 ? 18 : 19; // Saturday ends at 18:00

    for (let hour = startHour; hour < endHour; hour += 0.5) {
      const hours = Math.floor(hour);
      const minutes = (hour % 1) * 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      allSlots.push(timeString);
    }

    // Get booked appointments
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const bookedAppointments = await Appointment.find({
      'barber.name': barber,
      appointmentDate: { $gte: startDate, $lte: endDate },
      status: { $in: ['pending', 'confirmed'] },
    }).select('appointmentTime');

    const bookedSlots = bookedAppointments.map(apt => apt.appointmentTime);

    // Filter out booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    res.status(200).json({
      success: true,
      data: availableSlots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
```


## File: backend/src/controllers/contactController.js

```javascript
import Contact from '../models/Contact.js';
import { validationResult } from 'express-validator';

// @desc    Create new contact message
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      data: contact,
      message: 'Message sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (should be protected in production)
export const getContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private (should be protected in production)
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    // Mark as read if it's new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update contact message (reply)
// @route   PUT /api/contact/:id
// @access  Private (should be protected in production)
export const updateContact = async (req, res) => {
  try {
    const { status, reply } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    if (status) contact.status = status;
    if (reply) contact.reply = reply;

    await contact.save();

    res.status(200).json({
      success: true,
      data: contact,
      message: 'Contact message updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (should be protected in production)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
```


## File: backend/src/controllers/serviceController.js

```javascript
import Service from '../models/Service.js';
import { validationResult } from 'express-validator';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const { isActive } = req.query;

    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const services = await Service.find(query).sort({ order: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (should be protected in production)
export const createService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (should be protected in production)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: service,
      message: 'Service updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (should be protected in production)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
```


## File: backend/src/controllers/teamController.js

```javascript
import TeamMember from '../models/TeamMember.js';
import { validationResult } from 'express-validator';

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const { isActive } = req.query;

    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const teamMembers = await TeamMember.find(query).sort({ order: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
export const getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create new team member
// @route   POST /api/team
// @access  Private (should be protected in production)
export const createTeamMember = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const teamMember = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      data: teamMember,
      message: 'Team member created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (should be protected in production)
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
      message: 'Team member updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (should be protected in production)
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
```


## File: backend/src/middleware/errorHandler.js

```javascript
// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
```


## File: backend/src/middleware/notFound.js

```javascript
// Not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFound;
```


## File: backend/src/models/Appointment.js

```javascript
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    barber: {
      name: {
        type: String,
        required: [true, 'Barber name is required'],
      },
      phone: {
        type: String,
        required: true,
      },
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    appointmentTime: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });
appointmentSchema.index({ 'barber.name': 1 });
appointmentSchema.index({ status: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
```


## File: backend/src/models/Contact.js

```javascript
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
    reply: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
contactSchema.index({ status: 1, createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
```


## File: backend/src/models/Service.js

```javascript
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Service price is required'],
    },
    currency: {
      type: String,
      default: 'CHF',
    },
    duration: {
      type: Number, // in minutes
      default: 30,
    },
    icon: {
      type: String,
      default: '✂️',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
serviceSchema.index({ isActive: 1, order: 1 });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
```


## File: backend/src/models/TeamMember.js

```javascript
import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Team member name is required'],
      trim: true,
    },
    experience: {
      type: Number, // years of experience
      required: [true, 'Experience is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    photoUrl: {
      type: String,
      trim: true,
    },
    specialties: [{
      type: String,
      trim: true,
    }],
    bio: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    workingHours: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: true },
      sunday: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
teamMemberSchema.index({ isActive: 1, order: 1 });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

export default TeamMember;
```


## File: backend/src/routes/appointmentRoutes.js

```javascript
import express from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAvailableSlots,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Validation middleware
const appointmentValidation = [
  body('customerName').trim().notEmpty().withMessage('Name is required'),
  body('customerPhone').trim().notEmpty().withMessage('Phone is required'),
  body('customerEmail').optional().isEmail().withMessage('Invalid email format'),
  body('barber.name').notEmpty().withMessage('Barber name is required'),
  body('barber.phone').notEmpty().withMessage('Barber phone is required'),
  body('appointmentDate').notEmpty().withMessage('Date is required'),
  body('appointmentTime').notEmpty().withMessage('Time is required'),
  body('service').notEmpty().withMessage('Service is required'),
];

// Routes
router.post('/', appointmentValidation, createAppointment);
router.get('/', getAppointments);
router.get('/availability/:barber/:date', getAvailableSlots);
router.get('/:id', getAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
```


## File: backend/src/routes/contactRoutes.js

```javascript
import express from 'express';
import { body } from 'express-validator';
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';

const router = express.Router();

// Validation middleware
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

// Routes
router.post('/', contactValidation, createContact);
router.get('/', getContacts);
router.get('/:id', getContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
```


## File: backend/src/routes/serviceRoutes.js

```javascript
import express from 'express';
import { body } from 'express-validator';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();

// Validation middleware
const serviceValidation = [
  body('name').trim().notEmpty().withMessage('Service name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
];

// Routes
router.get('/', getServices);
router.get('/:id', getService);
router.post('/', serviceValidation, createService);
router.put('/:id', updateService);
router.delete('/:id', deleteService);

export default router;
```


## File: backend/src/routes/teamRoutes.js

```javascript
import express from 'express';
import { body } from 'express-validator';
import {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../controllers/teamController.js';

const router = express.Router();

// Validation middleware
const teamMemberValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('experience').isNumeric().withMessage('Experience must be a number'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('whatsappNumber').trim().notEmpty().withMessage('WhatsApp number is required'),
];

// Routes
router.get('/', getTeamMembers);
router.get('/:id', getTeamMember);
router.post('/', teamMemberValidation, createTeamMember);
router.put('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;
```


## File: backend/src/services/emailService.js

```javascript
import nodemailer from 'nodemailer';

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: appointment.customerEmail,
      subject: 'Confirmation de Rendez-vous - Coiffure Melimelo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Confirmation de Rendez-vous</h2>
          <p>Bonjour ${appointment.customerName},</p>
          <p>Votre rendez-vous a été confirmé avec succès:</p>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Barbier:</strong> ${appointment.barber.name}</p>
            <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('fr-CH')}</p>
            <p><strong>Heure:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Service:</strong> ${appointment.service}</p>
          </div>
          <p>Nous avons hâte de vous accueillir!</p>
          <p>Pour toute question, contactez-nous au: ${appointment.barber.phone}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Coiffure Melimelo<br>
            Rue des Draizes 61<br>
            2000 Neuchâtel<br>
            Switzerland
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send contact form notification to admin
export const sendContactNotification = async (contact) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `Nouveau Message de Contact - ${contact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Nouveau Message de Contact</h2>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Nom:</strong> ${contact.name}</p>
            <p><strong>Email:</strong> ${contact.email}</p>
            ${contact.phone ? `<p><strong>Téléphone:</strong> ${contact.phone}</p>` : ''}
            ${contact.subject ? `<p><strong>Sujet:</strong> ${contact.subject}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Reçu le: ${new Date().toLocaleString('fr-CH')}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send new appointment notification to barber
export const sendBarberNotification = async (appointment) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER, // In production, this should be the barber's email
      subject: `Nouveau Rendez-vous - ${appointment.customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Nouveau Rendez-vous</h2>
          <p>Bonjour ${appointment.barber.name},</p>
          <p>Un nouveau rendez-vous a été créé:</p>
          <div style="background: #f5f5f5; padding: 20px; border-left: 4px solid #d4af37;">
            <p><strong>Client:</strong> ${appointment.customerName}</p>
            <p><strong>Téléphone:</strong> ${appointment.customerPhone}</p>
            ${appointment.customerEmail ? `<p><strong>Email:</strong> ${appointment.customerEmail}</p>` : ''}
            <p><strong>Date:</strong> ${new Date(appointment.appointmentDate).toLocaleDateString('fr-CH')}</p>
            <p><strong>Heure:</strong> ${appointment.appointmentTime}</p>
            <p><strong>Service:</strong> ${appointment.service}</p>
            ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ''}
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Reçu le: ${new Date().toLocaleString('fr-CH')}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Barber notification sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
};
```


## File: backend/src/utils/seeder.js

```javascript
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import TeamMember from '../models/TeamMember.js';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Initial services data
const services = [
  {
    name: 'La Coupe',
    description: 'Coupe sur mesure adaptée à votre style et morphologie. Consultation personnalisée incluse.',
    price: 25,
    currency: 'CHF',
    duration: 30,
    icon: '✂️',
    order: 1,
  },
  {
    name: 'La Barbe',
    description: 'Taille et modelage professionnel de la barbe. Finitions précises au rasoir.',
    price: 17,
    currency: 'CHF',
    duration: 20,
    icon: '🪒',
    order: 2,
  },
  {
    name: 'Coupe + Barbe',
    description: 'Forfait complet : coupe de cheveux et taille de barbe. Le combo parfait.',
    price: 40,
    currency: 'CHF',
    duration: 45,
    icon: '💈',
    order: 3,
  },
  {
    name: 'La Coloration',
    description: 'Coloration professionnelle. Produits de qualité pour un résultat impeccable.',
    price: 30,
    currency: 'CHF',
    duration: 60,
    icon: '🎨',
    order: 4,
  },
  {
    name: 'Enfants',
    description: 'Coupe spéciale pour les enfants dans une ambiance conviviale et rassurante.',
    price: 20,
    currency: 'CHF',
    duration: 25,
    icon: '👶',
    order: 5,
  },
  {
    name: 'Shampooing & Séchage',
    description: 'Lavage professionnel et séchage soigné pour un résultat parfait.',
    price: 10,
    currency: 'CHF',
    duration: 15,
    icon: '🧴',
    order: 6,
  },
  {
    name: 'Épilation au Fil',
    description: 'Épilation précise au fil traditionnel. Technique douce et efficace.',
    price: 10,
    currency: 'CHF',
    duration: 15,
    icon: '✨',
    order: 7,
  },
];

// Initial team members data
const teamMembers = [
  {
    name: 'Kamaran',
    experience: 20,
    phone: '+41788700244',
    whatsappNumber: '9647701540481',
    email: 'kamaran@coiffuremelimelo.ch',
    photoUrl: 'https://i.imgur.com/Bn6KMCd.jpeg',
    specialties: ['Coupe Moderne', 'Dégradé', 'Barbe'],
    bio: 'Barbier passionné avec 20 ans d\'expérience',
    order: 1,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
  {
    name: 'Hassan Duske',
    experience: 25,
    phone: '+41765320878',
    whatsappNumber: '41765320878',
    email: 'hassan@coiffuremelimelo.ch',
    photoUrl: 'https://i.imgur.com/O1l7ccG.jpeg',
    specialties: ['Coupe Classique', 'Coloration', 'Rasage Traditionnel'],
    bio: 'Maître barbier avec 25 ans d\'expérience internationale',
    order: 2,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
  {
    name: 'Shuana Arif',
    experience: 5,
    phone: '+41765971395',
    whatsappNumber: '41765971395',
    email: 'rahimshuana@gmail.com',
    photoUrl: 'https://i.imgur.com/GmEHC3F.jpeg',
    specialties: ['Coupe Moderne', 'Épilation au Fil', 'Style Tendance'],
    bio: 'Jeune barbier dynamique avec un œil pour les tendances actuelles',
    order: 3,
    workingHours: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  },
];

// Seed data
const seedData = async () => {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await Service.deleteMany();
    await TeamMember.deleteMany();
    console.log('✓ Cleared existing data');

    // Insert services
    await Service.insertMany(services);
    console.log('✓ Services seeded');

    // Insert team members
    await TeamMember.insertMany(teamMembers);
    console.log('✓ Team members seeded');

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
connectDB().then(() => {
  seedData();
});
```

