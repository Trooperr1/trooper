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
