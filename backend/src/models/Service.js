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
