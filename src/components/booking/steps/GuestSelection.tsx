import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Users, Bed } from 'lucide-react';
import { GuestSelectionProps } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';

const GuestSelection: React.FC<GuestSelectionProps> = ({ tour, nextStep }) => {
  const { guestSelection, updateGuestSelection } = useBookingStore();

  const handleGuestCountChange = (type: 'total' | 'golfers' | 'nonGolfers', delta: number) => {
    const newGuestSelection = { ...guestSelection };

    switch (type) {
      case 'total':
        newGuestSelection.totalGuests = Math.max(1, Math.min(8, newGuestSelection.totalGuests + delta));
        // Adjust golfers/non-golfers proportionally
        const golferRatio = newGuestSelection.golfers / guestSelection.totalGuests;
        newGuestSelection.golfers = Math.max(0, Math.min(newGuestSelection.totalGuests, Math.round(newGuestSelection.totalGuests * golferRatio)));
        newGuestSelection.nonGolfers = newGuestSelection.totalGuests - newGuestSelection.golfers;
        break;
      case 'golfers':
        newGuestSelection.golfers = Math.max(0, Math.min(newGuestSelection.totalGuests, newGuestSelection.golfers + delta));
        newGuestSelection.nonGolfers = newGuestSelection.totalGuests - newGuestSelection.golfers;
        break;
      case 'nonGolfers':
        newGuestSelection.nonGolfers = Math.max(0, Math.min(newGuestSelection.totalGuests, newGuestSelection.nonGolfers + delta));
        newGuestSelection.golfers = newGuestSelection.totalGuests - newGuestSelection.nonGolfers;
        break;
    }

    // Calculate rooms needed
    newGuestSelection.roomsNeeded = Math.ceil(newGuestSelection.totalGuests / 2);
    newGuestSelection.roomTypes.double = Math.max(0, newGuestSelection.totalGuests - newGuestSelection.roomTypes.single);
    newGuestSelection.roomTypes.single = Math.max(0, newGuestSelection.roomTypes.single);

    updateGuestSelection(newGuestSelection);
  };

  const calculateBasePrice = () => {
    const golferPrice = guestSelection.golfers * tour.pricing.double;
    const nonGolferPrice = guestSelection.nonGolfers * tour.pricing.nonGolfer;
    return golferPrice + nonGolferPrice;
  };

  const calculateRoomUpgrade = () => {
    const singleUpgrade = guestSelection.roomTypes.single * 1625; // €1,625 single upgrade
    const doubleUpgrade = guestSelection.roomTypes.double * 935; // €935 double upgrade
    return singleUpgrade + doubleUpgrade;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--tu-navy)' }}>
          Guest Selection
        </h3>
        <p className="text-gray-600">
          Tell us about your group size and golf preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Guest Count Selection */}
        <div className="space-y-6">
          {/* Total Guests */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#949371]" />
              <h4 className="text-lg font-semibold">Total Guests</h4>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleGuestCountChange('total', -1)}
                disabled={guestSelection.totalGuests <= 1}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: 'var(--tu-navy)' }}>
                  {guestSelection.totalGuests}
                </div>
                <div className="text-sm text-gray-500">guests</div>
              </div>
              <button
                onClick={() => handleGuestCountChange('total', 1)}
                disabled={guestSelection.totalGuests >= 8}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Golfers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#D2CB97]" />
            <h4 className="text-lg font-semibold">Golfers</h4>
          </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleGuestCountChange('golfers', -1)}
                disabled={guestSelection.golfers <= 0}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#D2CB97] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#D2CB97]">
                  {guestSelection.golfers}
                </div>
                <div className="text-sm text-gray-500">golfers</div>
              </div>
              <button
                onClick={() => handleGuestCountChange('golfers', 1)}
                disabled={guestSelection.golfers >= guestSelection.totalGuests}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#D2CB97] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              €{tour.pricing.double.toLocaleString()} per golfer
            </div>
          </div>

          {/* Non-Golfers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#222136]" />
              <h4 className="text-lg font-semibold">Non-Golfers</h4>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleGuestCountChange('nonGolfers', -1)}
                disabled={guestSelection.nonGolfers <= 0}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#222136] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#222136]">
                  {guestSelection.nonGolfers}
                </div>
                <div className="text-sm text-gray-500">non-golfers</div>
              </div>
              <button
                onClick={() => handleGuestCountChange('nonGolfers', 1)}
                disabled={guestSelection.nonGolfers >= guestSelection.totalGuests}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#222136] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              €{tour.pricing.nonGolfer.toLocaleString()} per non-golfer
            </div>
          </div>
        </div>

        {/* Room Selection & Pricing */}
        <div className="space-y-6">
          {/* Room Types */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bed className="w-6 h-6 text-[#949371]" />
              <h4 className="text-lg font-semibold">Room Configuration</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Double/Twin Rooms
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleGuestCountChange('total', -2)}
                    disabled={guestSelection.roomTypes.double <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-lg font-semibold">
                    {guestSelection.roomTypes.double} rooms
                  </span>
                  <button
                    onClick={() => {
                      const newSelection = { ...guestSelection };
                      if (newSelection.roomTypes.double < guestSelection.roomsNeeded) {
                        newSelection.roomTypes.double += 1;
                        newSelection.roomTypes.single = Math.max(0, newSelection.roomTypes.single - 1);
                        updateGuestSelection(newSelection);
                      }
                    }}
                    disabled={guestSelection.roomTypes.double >= guestSelection.roomsNeeded}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Single Rooms
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      const newSelection = { ...guestSelection };
                      if (newSelection.roomTypes.single > 0) {
                        newSelection.roomTypes.single -= 1;
                        newSelection.roomTypes.double += 1;
                        updateGuestSelection(newSelection);
                      }
                    }}
                    disabled={guestSelection.roomTypes.single <= 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-lg font-semibold">
                    {guestSelection.roomTypes.single} rooms
                  </span>
                  <button
                    onClick={() => {
                      const newSelection = { ...guestSelection };
                      if (newSelection.roomTypes.double > 0 && newSelection.roomTypes.single < guestSelection.roomsNeeded) {
                        newSelection.roomTypes.single += 1;
                        newSelection.roomTypes.double -= 1;
                        updateGuestSelection(newSelection);
                      }
                    }}
                    disabled={guestSelection.roomTypes.double <= 0 || guestSelection.roomTypes.single >= guestSelection.roomsNeeded}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  +€{1625} per single room
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gradient-to-br from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Pricing Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>€{calculateBasePrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Room Upgrades:</span>
                <span>€{calculateRoomUpgrade().toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>€{(calculateBasePrice() + calculateRoomUpgrade()).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-white/80">
              * Prices are per person. Final pricing includes taxes and fees.
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#949371] text-white rounded-xl hover:bg-[#7a7a5a] transition-colors font-medium"
        >
          Continue to Traveller Information
        </button>
      </div>
    </motion.div>
  );
};

export default GuestSelection;
