// Type Definitions for the Elite Plumbing Website

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  category: 'emergency' | 'residential' | 'commercial' | 'maintenance';
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'emergency';
  description: string;
  beforeImage: string;
  afterImage: string;
  completionDate: string;
  location: string;
  challenges?: string[];
  solutions?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  certifications: string[];
  experience: number;
}

export interface BookingFormData {
  serviceType: string;
  date: Date | null;
  timeSlot: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  description: string;
  emergencyService: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Stat {
  id: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  icon: string;
}
