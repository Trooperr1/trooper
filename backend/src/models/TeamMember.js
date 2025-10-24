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
