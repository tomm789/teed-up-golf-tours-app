import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, AlertTriangle } from 'lucide-react';
import { BookingStepProps, TravellerInfo as TravellerInfoType } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';
import TravellerForm from '../forms/TravellerForm';

const TravellerInfo: React.FC<BookingStepProps> = ({ nextStep, prevStep }) => {
  const { travellerInfo, updateTraveller } = useBookingStore();
  const [activeTraveller, setActiveTraveller] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateTraveller = (traveller: TravellerInfoType, index: number): boolean => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!traveller.personalInfo.firstName.trim()) {
      newErrors[`traveller_${index}_firstName`] = 'First name is required';
    }
    if (!traveller.personalInfo.lastName.trim()) {
      newErrors[`traveller_${index}_lastName`] = 'Last name is required';
    }
    if (!traveller.personalInfo.email.trim()) {
      newErrors[`traveller_${index}_email`] = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(traveller.personalInfo.email)) {
      newErrors[`traveller_${index}_email`] = 'Please enter a valid email';
    }
    if (!traveller.personalInfo.phone.trim()) {
      newErrors[`traveller_${index}_phone`] = 'Phone number is required';
    }
    if (!traveller.personalInfo.dateOfBirth) {
      newErrors[`traveller_${index}_dateOfBirth`] = 'Date of birth is required';
    }
    if (!traveller.personalInfo.nationality.trim()) {
      newErrors[`traveller_${index}_nationality`] = 'Nationality is required';
    }
    if (!traveller.personalInfo.passportNumber.trim()) {
      newErrors[`traveller_${index}_passportNumber`] = 'Passport number is required';
    }
    if (!traveller.personalInfo.passportExpiry) {
      newErrors[`traveller_${index}_passportExpiry`] = 'Passport expiry date is required';
    }

    // Emergency contact validation
    if (!traveller.emergencyContact.name.trim()) {
      newErrors[`traveller_${index}_emergencyName`] = 'Emergency contact name is required';
    }
    if (!traveller.emergencyContact.phone.trim()) {
      newErrors[`traveller_${index}_emergencyPhone`] = 'Emergency contact phone is required';
    }

    // Golf-specific validation
    if (traveller.isGolfer && traveller.golfInfo) {
      if (!traveller.golfInfo.handicap.trim()) {
        newErrors[`traveller_${index}_handicap`] = 'Handicap is required for golfers';
      }
    }

    setValidationErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let allValid = true;
    travellerInfo.forEach((traveller, index) => {
      if (!validateTraveller(traveller, index)) {
        allValid = false;
      }
    });

    if (allValid) {
      nextStep();
    }
  };

  const getTravellerIcon = (traveller: TravellerInfoType, index: number) => {
    if (index === 0) return <User className="w-5 h-5" />;
    if (traveller.isGolfer) return <User className="w-5 h-5" />;
    return <User className="w-5 h-5" />;
  };

  const hasValidationErrors = (index: number) => {
    return Object.keys(validationErrors).some(key => key.startsWith(`traveller_${index}_`));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--tu-navy)' }}>
          Traveller Information
        </h3>
        <p className="text-gray-600">
          Please provide details for each traveller in your group
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Traveller Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
            <h4 className="font-semibold mb-4 text-gray-900">Travellers</h4>
            <div className="space-y-2">
              {travellerInfo.map((traveller, index) => (
                <button
                  key={traveller.id}
                  onClick={() => setActiveTraveller(index)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    activeTraveller === index
                      ? 'bg-[#949371] text-white'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    activeTraveller === index ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {getTravellerIcon(traveller, index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${
                      activeTraveller === index ? 'text-white' : 'text-gray-900'
                    }`}>
                      {traveller.type === 'primary' ? 'Primary Contact' : `Guest ${index}`}
                    </div>
                    <div className={`text-xs ${
                      activeTraveller === index ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {traveller.isGolfer ? 'Golfer' : 'Non-Golfer'}
                    </div>
                    {hasValidationErrors(index) && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-500">Incomplete</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>
                  {travellerInfo.filter((_, index) => !hasValidationErrors(index)).length} / {travellerInfo.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#949371] h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(travellerInfo.filter((_, index) => !hasValidationErrors(index)).length / travellerInfo.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Traveller Form */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTraveller}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TravellerForm
                traveller={travellerInfo[activeTraveller]}
                travellerIndex={activeTraveller}
                isPrimary={activeTraveller === 0}
                updateTraveller={updateTraveller}
                errors={validationErrors}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-4">
          {activeTraveller > 0 && (
            <button
              onClick={() => setActiveTraveller(activeTraveller - 1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Previous Traveller
            </button>
          )}
          
          {activeTraveller < travellerInfo.length - 1 ? (
            <button
              onClick={() => setActiveTraveller(activeTraveller + 1)}
              className="px-6 py-3 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-xl transition-colors"
            >
              Next Traveller
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#949371] text-white hover:bg-[#7a7a5a] rounded-xl transition-colors font-medium"
            >
              Continue to Room Selection
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TravellerInfo;
