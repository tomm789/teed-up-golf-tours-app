import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bed, Wifi, Car, Coffee, Shield, Check } from 'lucide-react';
import { RoomSelectionProps } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';

const RoomSelection: React.FC<RoomSelectionProps> = ({ nextStep, prevStep }) => {
  const { roomSelection, updateRoomSelection, guestSelection } = useBookingStore();
  const [selectedUpgradeType, setSelectedUpgradeType] = useState<'all-hotels' | 'specific-hotels'>('all-hotels');
  const [selectedHotels, setSelectedHotels] = useState<string[]>([]);

  const hotels = [
    {
      id: 'portobay',
      name: 'Hotel PortoBay Liberdade',
      location: 'Lisbon, Portugal',
      image: '/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_02_Image_0002.jpg',
      upgradePrice: 935,
      features: ['City Center', '5-Star Luxury', 'Spa & Wellness', 'Fine Dining'],
    },
    {
      id: 'quintadolago',
      name: 'Hotel Quinta Do Lago',
      location: 'Algarve, Portugal',
      image: '/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_04_Image_0002.jpg',
      upgradePrice: 935,
      features: ['Beachfront', 'Golf Resort', 'Pool Complex', 'Water Sports'],
    },
    {
      id: 'kempinski',
      name: 'Hotel Kempinski Bahia',
      location: 'Costa del Sol, Spain',
      image: '/assets/2025-Teed-Up-Portugal-Spain-Itinerary-hosted-by-Sandy-Baltussen_Page_08_Image_0002.jpg',
      upgradePrice: 935,
      features: ['Mediterranean Views', 'Private Beach', 'Luxury Spa', 'Gourmet Restaurants'],
    },
  ];

  const handleRoomPreferenceChange = (field: string, value: string) => {
    updateRoomSelection({
      roomPreferences: {
        ...roomSelection.roomPreferences,
        [field]: value,
      },
    });
  };

  const handleUpgradeToggle = (enabled: boolean) => {
    updateRoomSelection({
      roomUpgrades: {
        ...roomSelection.roomUpgrades,
        selected: enabled,
        upgradeType: selectedUpgradeType,
        selectedHotels: selectedHotels,
        totalUpgradeCost: enabled ? calculateUpgradeCost() : 0,
      },
    });
  };

  const handleHotelSelection = (hotelId: string) => {
    const newSelectedHotels = selectedHotels.includes(hotelId)
      ? selectedHotels.filter(id => id !== hotelId)
      : [...selectedHotels, hotelId];
    
    setSelectedHotels(newSelectedHotels);
    updateRoomSelection({
      roomUpgrades: {
        ...roomSelection.roomUpgrades,
        selectedHotels: newSelectedHotels,
        totalUpgradeCost: calculateUpgradeCost(newSelectedHotels),
      },
    });
  };

  const calculateUpgradeCost = (hotels: string[] = selectedHotels) => {
    if (selectedUpgradeType === 'all-hotels') {
      return (guestSelection.roomTypes.double * 935) + (guestSelection.roomTypes.single * 1625);
    } else {
      return hotels.length * ((guestSelection.roomTypes.double * 935) + (guestSelection.roomTypes.single * 1625));
    }
  };

  const getUpgradeDescription = () => {
    if (selectedUpgradeType === 'all-hotels') {
      return 'Upgrade all rooms at all hotels';
    } else {
      return `Upgrade rooms at ${selectedHotels.length} selected hotels`;
    }
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
          Room Selection & Preferences
        </h3>
        <p className="text-gray-600">
          Customize your accommodation preferences and optional upgrades
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Room Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Preferences */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bed className="w-6 h-6 text-[#949371]" />
              <h4 className="text-lg font-semibold">Room Preferences</h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Smoking Preference
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'non-smoking', label: 'Non-Smoking' },
                    { value: 'smoking', label: 'Smoking' },
                    { value: 'no-preference', label: 'No Preference' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="smokingPreference"
                        value={option.value}
                        checked={roomSelection.roomPreferences.smokingPreference === option.value}
                        onChange={(e) => handleRoomPreferenceChange('smokingPreference', e.target.value)}
                        className="w-4 h-4 text-[#949371] focus:ring-[#949371]"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Bed Type Preference
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'double', label: 'Double Bed' },
                    { value: 'twin', label: 'Twin Beds' },
                    { value: 'no-preference', label: 'No Preference' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="bedType"
                        value={option.value}
                        checked={roomSelection.roomPreferences.bedType === option.value}
                        onChange={(e) => handleRoomPreferenceChange('bedType', e.target.value)}
                        className="w-4 h-4 text-[#949371] focus:ring-[#949371]"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                value={roomSelection.roomPreferences.specialRequests}
                onChange={(e) => handleRoomPreferenceChange('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
                placeholder="Any special room requests (high floor, connecting rooms, etc.)"
              />
            </div>
          </div>

          {/* Room Upgrades */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-[#D2CB97]" />
              <h4 className="text-lg font-semibold">Room Upgrades</h4>
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={roomSelection.roomUpgrades.selected}
                  onChange={(e) => handleUpgradeToggle(e.target.checked)}
                  className="w-5 h-5 text-[#D2CB97] focus:ring-[#D2CB97] rounded"
                />
                <span className="text-lg font-medium">Enable Room Upgrades</span>
              </label>
              <p className="text-sm text-gray-600 ml-8 mt-1">
                Upgrade to premium rooms with enhanced amenities and views
              </p>
            </div>

            {roomSelection.roomUpgrades.selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {/* Upgrade Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upgrade Scope
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'all-hotels', label: 'Upgrade at all hotels', description: 'Apply upgrades to all hotels in the tour' },
                      { value: 'specific-hotels', label: 'Select specific hotels', description: 'Choose which hotels to upgrade' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="upgradeType"
                          value={option.value}
                          checked={selectedUpgradeType === option.value}
                          onChange={(e) => setSelectedUpgradeType(e.target.value as 'all-hotels' | 'specific-hotels')}
                          className="w-4 h-4 text-[#D2CB97] focus:ring-[#D2CB97] mt-1"
                        />
                        <div>
                          <div className="text-gray-700 font-medium">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Hotel Selection (if specific hotels chosen) */}
                {selectedUpgradeType === 'specific-hotels' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Hotels to Upgrade
                    </label>
                    <div className="grid gap-4">
                      {hotels.map((hotel) => (
                        <div
                          key={hotel.id}
                          className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                            selectedHotels.includes(hotel.id)
                              ? 'border-[#D2CB97] bg-[#D2CB97]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleHotelSelection(hotel.id)}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{hotel.name}</h5>
                              <p className="text-sm text-gray-600">{hotel.location}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {hotel.features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-[#D2CB97]">
                                +€{hotel.upgradePrice}
                              </div>
                              <div className="text-xs text-gray-500">per room</div>
                            </div>
                            {selectedHotels.includes(hotel.id) ? (
                              <Check className="w-6 h-6 text-[#D2CB97]" />
                            ) : (
                              <div className="w-6 h-6 border-2 border-gray-300 rounded-full" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upgrade Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Upgrade Summary</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Upgrade Type:</span>
                      <span>{getUpgradeDescription()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Upgrade Cost:</span>
                      <span className="font-semibold text-[#D2CB97]">
                        €{calculateUpgradeCost().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Room Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Room Summary</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Rooms:</span>
                <span>{guestSelection.roomsNeeded}</span>
              </div>
              <div className="flex justify-between">
                <span>Double/Twin Rooms:</span>
                <span>{guestSelection.roomTypes.double}</span>
              </div>
              <div className="flex justify-between">
                <span>Single Rooms:</span>
                <span>{guestSelection.roomTypes.single}</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Room Upgrades:</span>
                  <span>€{calculateUpgradeCost().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">What's Included</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#949371]" />
                <span>Complimentary WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#949371]" />
                <span>Daily Breakfast</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#949371]" />
                <span>Airport Transfers</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#949371]" />
                <span>24/7 Concierge</span>
              </div>
            </div>
          </div>
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

        <button
          onClick={nextStep}
          className="px-8 py-3 bg-[#949371] text-white rounded-xl hover:bg-[#7a7a5a] transition-colors font-medium"
        >
          Continue to Add-ons
        </button>
      </div>
    </motion.div>
  );
};

export default RoomSelection;
