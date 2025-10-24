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
