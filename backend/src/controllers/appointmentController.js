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
