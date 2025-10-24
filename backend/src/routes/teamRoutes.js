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
