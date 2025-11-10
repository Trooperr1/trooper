import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, User, FileText } from 'lucide-react';
import { SERVICES, TIME_SLOTS } from '../utils/constants';
import type { BookingFormData } from '../types';

type Step = 1 | 2 | 3 | 4 | 5;

export default function Booking() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedService, setSelectedService] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = (data: BookingFormData) => {
    console.log('Booking Data:', {
      ...data,
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    });
    setIsSubmitted(true);
  };

  const steps = [
    { number: 1, title: 'Select Service', icon: <FileText /> },
    { number: 2, title: 'Choose Date', icon: <Calendar /> },
    { number: 3, title: 'Select Time', icon: <Clock /> },
    { number: 4, title: 'Your Details', icon: <User /> },
    { number: 5, title: 'Confirm', icon: <CheckCircle /> },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== '';
      case 2:
        return selectedDate !== undefined;
      case 3:
        return selectedTimeSlot !== '';
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed() && currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  // Disable past dates
  const disabledDays = { before: new Date() };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full card text-center"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Thank you for choosing Elite Plumbing Pro. We've received your booking request
            and will contact you shortly to confirm your appointment.
          </p>
          <div className="glass-dark p-6 rounded-xl text-left mb-8">
            <h3 className="font-bold text-xl mb-4">Booking Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Service:</span>
                <span className="font-semibold">
                  {SERVICES.find(s => s.id === selectedService)?.title}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="font-semibold">
                  {selectedDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time:</span>
                <span className="font-semibold">{selectedTimeSlot}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
              setSelectedService('');
              setSelectedDate(undefined);
              setSelectedTimeSlot('');
            }}
            className="btn-primary"
          >
            Make Another Booking
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-display font-bold mb-4">
            Book Your <span className="gradient-text">Service</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Schedule your plumbing service in just a few simple steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  {/* Step Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= step.number
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50'
                        : 'bg-dark-700 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                        currentStep > step.number ? 'bg-primary-500' : 'bg-dark-700'
                      }`}
                    ></div>
                  )}
                </div>

                {/* Step Label - Hidden on mobile */}
                <p
                  className={`text-sm mt-2 hidden md:block transition-colors ${
                    currentStep >= step.number ? 'text-white font-semibold' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          className="card max-w-3xl mx-auto"
          layout
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6">Select a Service</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedService === service.id
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-700 hover:border-primary-500/50 bg-dark-700/30'
                      }`}
                    >
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{service.description}</p>
                      <p className="text-primary-400 font-semibold">{service.price}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Choose Date */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6">Choose a Date</h2>
                <div className="flex justify-center">
                  <div className="booking-calendar bg-dark-700/50 p-6 rounded-xl">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      modifiersClassNames={{
                        selected: 'bg-primary-500 text-white',
                        today: 'text-primary-400 font-bold',
                      }}
                      className="text-white"
                    />
                  </div>
                </div>
                {selectedDate && (
                  <p className="text-center mt-6 text-lg">
                    Selected:{' '}
                    <span className="font-bold text-primary-400">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 3: Select Time */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6">Select Time Slot</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedTimeSlot === slot
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-dark-700 hover:border-primary-500/50 bg-dark-700/30'
                      }`}
                    >
                      <Clock className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                      <p className="font-semibold text-center">{slot}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Your Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6">Your Information</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
                      <input
                        {...register('firstName', { required: true })}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.firstName && (
                        <span className="text-red-400 text-sm">Required</span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
                      <input
                        {...register('lastName', { required: true })}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.lastName && (
                        <span className="text-red-400 text-sm">Required</span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                        type="email"
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.email && <span className="text-red-400 text-sm">Valid email required</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <input
                        {...register('phone', { required: true })}
                        type="tel"
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.phone && <span className="text-red-400 text-sm">Required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Address *</label>
                    <input
                      {...register('address', { required: true })}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                    {errors.address && <span className="text-red-400 text-sm">Required</span>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        {...register('city', { required: true })}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.city && <span className="text-red-400 text-sm">Required</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                      <input
                        {...register('zipCode', { required: true })}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                      {errors.zipCode && <span className="text-red-400 text-sm">Required</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Problem Description *
                    </label>
                    <textarea
                      {...register('description', { required: true })}
                      rows={4}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:border-primary-500 focus:outline-none resize-none"
                      placeholder="Please describe your plumbing issue..."
                    ></textarea>
                    {errors.description && <span className="text-red-400 text-sm">Required</span>}
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 5: Confirm */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-bold mb-6">Confirm Your Booking</h2>
                <div className="space-y-6">
                  <div className="glass-dark p-6 rounded-xl">
                    <h3 className="font-bold text-xl mb-4">Booking Summary</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <FileText className="w-6 h-6 text-primary-400 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Service</p>
                          <p className="font-semibold text-lg">
                            {SERVICES.find(s => s.id === selectedService)?.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Calendar className="w-6 h-6 text-primary-400 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Date</p>
                          <p className="font-semibold text-lg">
                            {selectedDate?.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="w-6 h-6 text-primary-400 flex-shrink-0" />
                        <div>
                          <p className="text-gray-400 text-sm">Time</p>
                          <p className="font-semibold text-lg">{selectedTimeSlot}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
                    <p className="text-sm text-gray-300">
                      By confirming this booking, you agree to our terms of service. We'll send you
                      a confirmation email and contact you within 24 hours to confirm the appointment.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-dark-700">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn-secondary flex items-center gap-2 ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`btn-primary flex items-center gap-2 ${
                  !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit(onSubmit)} className="btn-primary flex items-center gap-2">
                Confirm Booking
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Custom CSS for Calendar */}
      <style>{`
        .rdp {
          --rdp-cell-size: 45px;
          --rdp-accent-color: #1890ff;
          --rdp-background-color: rgba(24, 144, 255, 0.1);
        }

        .rdp-day_selected {
          background-color: #1890ff !important;
          color: white !important;
        }

        .rdp-button:hover:not([disabled]) {
          background-color: rgba(24, 144, 255, 0.2);
        }

        .rdp-day_today {
          font-weight: bold;
          color: #1890ff;
        }
      `}</style>
    </div>
  );
}
