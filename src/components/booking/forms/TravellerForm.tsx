import React from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, AlertTriangle, UserPlus } from 'lucide-react';
import { TravellerFormProps } from '@/data/types/booking';

const TravellerForm: React.FC<TravellerFormProps> = ({
  traveller,
  travellerIndex,
  isPrimary,
  updateTraveller,
  errors,
}) => {
  const handleInputChange = (section: string, field: string, value: string) => {
    const sectionData = traveller[section as keyof typeof traveller] as any;
    updateTraveller(travellerIndex, {
      [section]: {
        ...sectionData,
        [field]: value,
      },
    });
  };

  const getError = (field: string) => {
    return errors[`traveller_${travellerIndex}_${field}`];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
        <div className="flex items-center gap-3">
          {isPrimary ? (
            <User className="w-6 h-6" />
          ) : traveller.isGolfer ? (
            <User className="w-6 h-6" />
          ) : (
            <UserPlus className="w-6 h-6" />
          )}
          <div>
            <h4 className="text-xl font-semibold">
              {isPrimary ? 'Primary Contact' : `Guest ${travellerIndex}`}
            </h4>
            <p className="text-white/80">
              {traveller.isGolfer ? 'Golfer' : 'Non-Golfer'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#949371]" />
            <h5 className="font-semibold text-gray-900">Personal Information</h5>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={traveller.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                    getError('firstName') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter first name"
                />
                {getError('firstName') && (
                  <p className="text-red-500 text-xs mt-1">{getError('firstName')}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={traveller.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                    getError('lastName') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter last name"
                />
                {getError('lastName') && (
                  <p className="text-red-500 text-xs mt-1">{getError('lastName')}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={traveller.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('email') ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter email address"
              />
              {getError('email') && (
                <p className="text-red-500 text-xs mt-1">{getError('email')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={traveller.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('phone') ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter phone number"
              />
              {getError('phone') && (
                <p className="text-red-500 text-xs mt-1">{getError('phone')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                value={traveller.personalInfo.dateOfBirth}
                onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('dateOfBirth') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {getError('dateOfBirth') && (
                <p className="text-red-500 text-xs mt-1">{getError('dateOfBirth')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality *
              </label>
              <select
                value={traveller.personalInfo.nationality}
                onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('nationality') ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select nationality</option>
                <option value="Australian">Australian</option>
                <option value="New Zealand">New Zealand</option>
                <option value="American">American</option>
                <option value="Canadian">Canadian</option>
                <option value="British">British</option>
                <option value="Irish">Irish</option>
                <option value="South African">South African</option>
                <option value="Other">Other</option>
              </select>
              {getError('nationality') && (
                <p className="text-red-500 text-xs mt-1">{getError('nationality')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Passport Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#D2CB97]" />
            <h5 className="font-semibold text-gray-900">Passport Information</h5>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passport Number *
              </label>
              <input
                type="text"
                value={traveller.personalInfo.passportNumber}
                onChange={(e) => handleInputChange('personalInfo', 'passportNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('passportNumber') ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter passport number"
              />
              {getError('passportNumber') && (
                <p className="text-red-500 text-xs mt-1">{getError('passportNumber')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passport Expiry Date *
              </label>
              <input
                type="date"
                value={traveller.personalInfo.passportExpiry}
                onChange={(e) => handleInputChange('personalInfo', 'passportExpiry', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('passportExpiry') ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {getError('passportExpiry') && (
                <p className="text-red-500 text-xs mt-1">{getError('passportExpiry')}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Golf Information (only for golfers) */}
      {traveller.isGolfer && traveller.golfInfo && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-[#D2CB97]" />
            <h5 className="font-semibold text-gray-900">Golf Information</h5>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Golf Handicap *
              </label>
              <select
                value={traveller.golfInfo.handicap}
                onChange={(e) => handleInputChange('golfInfo', 'handicap', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                  getError('handicap') ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select handicap</option>
                <option value="0-5">0-5 (Scratch to 5)</option>
                <option value="6-10">6-10</option>
                <option value="11-15">11-15</option>
                <option value="16-20">16-20</option>
                <option value="21-25">21-25</option>
                <option value="26-30">26-30</option>
                <option value="30+">30+</option>
                <option value="beginner">Beginner</option>
              </select>
              {getError('handicap') && (
                <p className="text-red-500 text-xs mt-1">{getError('handicap')}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Tee Time
              </label>
              <select
                value={traveller.golfInfo.preferredTeeTime}
                onChange={(e) => handleInputChange('golfInfo', 'preferredTeeTime', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
              >
                <option value="">No preference</option>
                <option value="early">Early morning (7:00-9:00)</option>
                <option value="morning">Morning (9:00-11:00)</option>
                <option value="afternoon">Afternoon (11:00-14:00)</option>
                <option value="late">Late afternoon (14:00+)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Requirements
              </label>
              <textarea
                value={traveller.golfInfo.dietaryRequirements}
                onChange={(e) => handleInputChange('golfInfo', 'dietaryRequirements', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
                placeholder="Any dietary restrictions or preferences"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical Conditions
              </label>
              <textarea
                value={traveller.golfInfo.medicalConditions}
                onChange={(e) => handleInputChange('golfInfo', 'medicalConditions', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
                placeholder="Any medical conditions we should be aware of"
              />
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#222136]" />
          <h5 className="font-semibold text-gray-900">Emergency Contact</h5>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Name *
            </label>
            <input
              type="text"
              value={traveller.emergencyContact.name}
              onChange={(e) => handleInputChange('emergencyContact', 'name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                getError('emergencyName') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter emergency contact name"
            />
            {getError('emergencyName') && (
              <p className="text-red-500 text-xs mt-1">{getError('emergencyName')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship *
            </label>
            <select
              value={traveller.emergencyContact.relationship}
              onChange={(e) => handleInputChange('emergencyContact', 'relationship', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
            >
              <option value="">Select relationship</option>
              <option value="spouse">Spouse/Partner</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              <option value="sibling">Sibling</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Phone *
            </label>
            <input
              type="tel"
              value={traveller.emergencyContact.phone}
              onChange={(e) => handleInputChange('emergencyContact', 'phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                getError('emergencyPhone') ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter emergency contact phone"
            />
            {getError('emergencyPhone') && (
              <p className="text-red-500 text-xs mt-1">{getError('emergencyPhone')}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Emergency Contact Email
            </label>
            <input
              type="email"
              value={traveller.emergencyContact.email}
              onChange={(e) => handleInputChange('emergencyContact', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
              placeholder="Enter emergency contact email"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TravellerForm;
