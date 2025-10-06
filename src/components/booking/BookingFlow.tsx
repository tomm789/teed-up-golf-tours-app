import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, User, Home, CreditCard, FileText } from 'lucide-react';
import { useBookingStore } from '@/hooks/useBookingStore';
import { BookingStep } from '@/data/types/booking';
import GuestSelection from './steps/GuestSelection';
import TravellerInfo from './steps/TravellerInfo';
import RoomSelection from './steps/RoomSelection';
import AddOns from './steps/AddOns';
import Payment from './steps/Payment';
import BookingSummary from './steps/BookingSummary';
import { Tour } from '@/data/types';

interface BookingFlowProps {
  tour: Tour;
  isOpen: boolean;
  onClose: () => void;
}

const BookingFlow: React.FC<BookingFlowProps> = ({ tour, isOpen, onClose }) => {
  const {
    currentStep,
    totalSteps,
    initializeBooking,
    nextStep,
    prevStep,
    setCurrentStep,
    isLoading,
  } = useBookingStore();

  const [bookingSteps, setBookingSteps] = useState<BookingStep[]>([
    {
      id: 1,
      title: 'Guest Selection',
      description: 'Choose number of guests and rooms',
      component: 'guest-selection',
      isCompleted: false,
      isActive: true,
      isAccessible: true,
    },
    {
      id: 2,
      title: 'Traveller Information',
      description: 'Personal details for each guest',
      component: 'traveller-info',
      isCompleted: false,
      isActive: false,
      isAccessible: false,
    },
    {
      id: 3,
      title: 'Room Selection',
      description: 'Room preferences and upgrades',
      component: 'room-selection',
      isCompleted: false,
      isActive: false,
      isAccessible: false,
    },
    {
      id: 4,
      title: 'Add-ons',
      description: 'Optional extras and services',
      component: 'add-ons',
      isCompleted: false,
      isActive: false,
      isAccessible: false,
    },
    {
      id: 5,
      title: 'Payment',
      description: 'Payment method and billing',
      component: 'payment',
      isCompleted: false,
      isActive: false,
      isAccessible: false,
    },
    {
      id: 6,
      title: 'Review & Confirm',
      description: 'Review your booking details',
      component: 'summary',
      isCompleted: false,
      isActive: false,
      isAccessible: false,
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      initializeBooking(tour.id, tour.title, tour.dates);
    }
  }, [isOpen, tour, initializeBooking]);

  useEffect(() => {
    // Update step accessibility
    setBookingSteps(prev => prev.map(step => ({
      ...step,
      isActive: step.id === currentStep,
      isAccessible: step.id <= currentStep,
      isCompleted: step.id < currentStep,
    })));
  }, [currentStep]);

  const getStepIcon = (step: BookingStep) => {
    if (step.isCompleted) return <Check className="w-5 h-5" />;
    if (step.isActive) {
      switch (step.id) {
        case 1: return <User className="w-5 h-5" />;
        case 2: return <User className="w-5 h-5" />;
        case 3: return <Home className="w-5 h-5" />;
        case 4: return <FileText className="w-5 h-5" />;
        case 5: return <CreditCard className="w-5 h-5" />;
        case 6: return <Check className="w-5 h-5" />;
        default: return <div className="w-5 h-5 rounded-full bg-gray-300" />;
      }
    }
    return <div className="w-5 h-5 rounded-full bg-gray-300" />;
  };

  const renderCurrentStep = () => {
    const currentStepData = bookingSteps.find(step => step.id === currentStep);
    if (!currentStepData) return null;

    const commonProps = {
      tour,
      nextStep,
      prevStep,
      goToStep: setCurrentStep,
      bookingState: useBookingStore.getState(),
      updateBookingState: () => {
        // This will be handled by individual components using the store directly
      },
    };

    switch (currentStepData.component) {
      case 'guest-selection':
        return <GuestSelection {...commonProps} />;
      case 'traveller-info':
        return <TravellerInfo {...commonProps} />;
      case 'room-selection':
        return <RoomSelection {...commonProps} />;
      case 'add-ons':
        return <AddOns {...commonProps} />;
      case 'payment':
        return <Payment {...commonProps} bookingSummary={{
          tourDetails: { title: tour.title, dates: tour.dates, duration: tour.duration },
          guestBreakdown: { totalGuests: 1, golfers: 1, nonGolfers: 0 },
          pricing: { basePrice: 0, roomUpgrades: 0, addOns: 0, taxes: 0, total: 0, currency: 'EUR' },
          travellers: [],
          rooms: []
        }} />;
      case 'summary':
        return <BookingSummary {...commonProps} />;
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    // Add validation logic here based on current step
    switch (currentStep) {
      case 1: // Guest Selection
        return true; // Basic validation
      case 2: // Traveller Info
        return true; // Validate all required fields
      case 3: // Room Selection
        return true;
      case 4: // Add-ons
        return true;
      case 5: // Payment
        return true; // Validate payment info
      case 6: // Summary
        return true;
      default:
        return false;
    }
  };

  const canGoBack = () => currentStep > 1;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#222136] to-[#949371] text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Book Your Tour</h2>
                <p className="text-white/90">{tour.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Navigation */}
          <div className="bg-gray-50 p-4 border-b">
            <div className="flex items-center justify-between">
              {bookingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      step.isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : step.isActive
                        ? 'bg-[#949371] border-[#949371] text-white'
                        : step.isAccessible
                        ? 'bg-white border-gray-300 text-gray-600 hover:border-[#949371]'
                        : 'bg-gray-100 border-gray-200 text-gray-400'
                    }`}
                  >
                    {getStepIcon(step)}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`text-sm font-medium ${
                      step.isActive ? 'text-[#949371]' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </div>
                  {index < bookingSteps.length - 1 && (
                    <div className="hidden sm:block w-8 h-0.5 bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={!canGoBack() || isLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  canGoBack() && !isLoading
                    ? 'text-gray-600 hover:bg-gray-200'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>

              <button
                onClick={nextStep}
                disabled={!canProceedToNext() || isLoading}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  canProceedToNext() && !isLoading
                    ? 'bg-[#949371] text-white hover:bg-[#7a7a5a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {currentStep === totalSteps ? 'Complete Booking' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingFlow;
