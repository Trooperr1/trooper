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
