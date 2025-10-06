import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit, Download, Mail, Calendar, Users, Home, CreditCard } from 'lucide-react';
import { BookingStepProps, BookingSummary as BookingSummaryType } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';

const BookingSummary: React.FC<BookingStepProps> = ({ tour, goToStep }) => {
  const { 
    travellerInfo, 
    guestSelection, 
    roomSelection, 
    addOns, 
    paymentInfo,
    setLoading 
  } = useBookingStore();
  
  const [bookingSummary, setBookingSummary] = useState<BookingSummaryType | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    // Generate booking summary
    const summary: BookingSummaryType = {
      tourDetails: {
        title: tour.title,
        dates: tour.dates,
        duration: tour.duration,
      },
      guestBreakdown: {
        totalGuests: guestSelection.totalGuests,
        golfers: guestSelection.golfers,
        nonGolfers: guestSelection.nonGolfers,
      },
      pricing: {
        basePrice: calculateBasePrice(),
        roomUpgrades: calculateRoomUpgrades(),
        addOns: calculateAddOnsTotal(),
        taxes: calculateTaxes(),
        total: 0, // Will be calculated
        currency: 'EUR',
      },
      travellers: travellerInfo,
      rooms: [
        {
          type: 'Double/Twin',
          count: guestSelection.roomTypes.double,
          upgrade: roomSelection.roomUpgrades.selected,
        },
        {
          type: 'Single',
          count: guestSelection.roomTypes.single,
          upgrade: roomSelection.roomUpgrades.selected,
        },
      ],
    };

    // Calculate total
    summary.pricing.total = summary.pricing.basePrice + 
                           summary.pricing.roomUpgrades + 
                           summary.pricing.addOns + 
                           summary.pricing.taxes;

    setBookingSummary(summary);
  }, [tour, travellerInfo, guestSelection, roomSelection, addOns]);

  const calculateBasePrice = () => {
    return (guestSelection.golfers * tour.pricing.double) + 
           (guestSelection.nonGolfers * tour.pricing.nonGolfer);
  };

  const calculateRoomUpgrades = () => {
    if (!roomSelection.roomUpgrades.selected) return 0;
    
    const doubleUpgrade = guestSelection.roomTypes.double * 935;
    const singleUpgrade = guestSelection.roomTypes.single * 1625;
    return doubleUpgrade + singleUpgrade;
  };

  const calculateAddOnsTotal = () => {
    return addOns.reduce((total, addOn) => {
      if (addOn.selected) {
        const basePrice = addOn.price * addOn.quantity;
        return addOn.perPerson ? total + (basePrice * guestSelection.totalGuests) : total + basePrice;
      }
      return total;
    }, 0);
  };

  const calculateTaxes = () => {
    const subtotal = calculateBasePrice() + calculateRoomUpgrades() + calculateAddOnsTotal();
    return Math.round(subtotal * 0.1); // 10% tax
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGeneratingPDF(false);
      // In a real implementation, this would generate and download a PDF
      alert('Booking confirmation PDF generated!');
    }, 2000);
  };

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    // Simulate email sending
    setTimeout(() => {
      setIsSendingEmail(false);
      alert('Booking confirmation sent to your email!');
    }, 2000);
  };

  const handleCompleteBooking = async () => {
    setLoading(true);
    
    // Simulate booking completion
    setTimeout(() => {
      setLoading(false);
      alert('Booking completed successfully! You will receive a confirmation email shortly.');
      // In a real implementation, this would redirect to a success page or close the modal
    }, 3000);
  };

  if (!bookingSummary) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#949371]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto"
    >
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--tu-navy)' }}>
          Booking Summary
        </h3>
        <p className="text-gray-600">
          Please review your booking details before final confirmation
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Tour Details</h4>
              <button
                onClick={() => goToStep(1)}
                className="flex items-center gap-2 text-[#949371] hover:text-[#7a7a5a] transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#949371]" />
                <div>
                  <div className="font-medium">{bookingSummary.tourDetails.title}</div>
                  <div className="text-sm text-gray-600">{bookingSummary.tourDetails.dates}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#D2CB97]" />
                <div className="text-sm text-gray-600">
                  {bookingSummary.guestBreakdown.totalGuests} guests • {bookingSummary.guestBreakdown.golfers} golfers • {bookingSummary.guestBreakdown.nonGolfers} non-golfers
                </div>
              </div>
            </div>
          </div>

          {/* Traveller Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Traveller Information</h4>
              <button
                onClick={() => goToStep(2)}
                className="flex items-center gap-2 text-[#949371] hover:text-[#7a7a5a] transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-4">
              {bookingSummary.travellers.map((traveller, index) => (
                <div key={traveller.id} className="border-l-4 border-[#949371] pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    {index === 0 ? (
                      <Users className="w-4 h-4 text-[#949371]" />
                    ) : traveller.isGolfer ? (
                      <Users className="w-4 h-4 text-[#D2CB97]" />
                    ) : (
                      <Users className="w-4 h-4 text-[#222136]" />
                    )}
                    <span className="font-medium">
                      {traveller.personalInfo.firstName} {traveller.personalInfo.lastName}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({traveller.isGolfer ? 'Golfer' : 'Non-Golfer'})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {traveller.personalInfo.email} • {traveller.personalInfo.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Configuration */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Room Configuration</h4>
              <button
                onClick={() => goToStep(3)}
                className="flex items-center gap-2 text-[#949371] hover:text-[#7a7a5a] transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-[#222136]" />
                <div>
                  <div className="font-medium">Room Preferences</div>
                  <div className="text-sm text-gray-600">
                    {roomSelection.roomPreferences.smokingPreference} • {roomSelection.roomPreferences.bedType}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {bookingSummary.rooms.map((room, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium">{room.type}</div>
                    <div className="text-sm text-gray-600">{room.count} rooms</div>
                    {room.upgrade && (
                      <div className="text-xs text-[#949371] font-medium">Upgraded</div>
                    )}
                  </div>
                ))}
              </div>
              {roomSelection.roomPreferences.specialRequests && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-1">Special Requests:</div>
                  <div className="text-sm text-blue-700">{roomSelection.roomPreferences.specialRequests}</div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Add-ons */}
          {addOns.filter(addOn => addOn.selected).length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Selected Add-ons</h4>
                <button
                  onClick={() => goToStep(4)}
                  className="flex items-center gap-2 text-[#949371] hover:text-[#7a7a5a] transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                {addOns.filter(addOn => addOn.selected).map((addOn) => (
                  <div key={addOn.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <div className="font-medium">{addOn.name}</div>
                      <div className="text-sm text-gray-600">
                        {addOn.perPerson ? `${addOn.quantity} × ${guestSelection.totalGuests} people` : `× ${addOn.quantity}`}
                      </div>
                    </div>
                    <div className="font-semibold text-[#949371]">
                      €{(() => {
                        const basePrice = addOn.price * addOn.quantity;
                        return addOn.perPerson ? basePrice * guestSelection.totalGuests : basePrice;
                      })().toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Payment Information</h4>
              <button
                onClick={() => goToStep(5)}
                className="flex items-center gap-2 text-[#949371] hover:text-[#7a7a5a] transition-colors"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-[#D2CB97]" />
                <div>
                  <div className="font-medium capitalize">{paymentInfo.method.replace('-', ' ')}</div>
                  <div className="text-sm text-gray-600">
                    {paymentInfo.billingAddress.firstName} {paymentInfo.billingAddress.lastName}
                  </div>
                </div>
              </div>
              {paymentInfo.method === 'credit-card' && paymentInfo.creditCard && (
                <div className="text-sm text-gray-600">
                  **** **** **** {paymentInfo.creditCard.cardNumber.slice(-4)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Pricing Summary */}
          <div className="bg-gradient-to-br from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Booking Total</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Price:</span>
                <span>€{bookingSummary.pricing.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Room Upgrades:</span>
                <span>€{bookingSummary.pricing.roomUpgrades.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons:</span>
                <span>€{bookingSummary.pricing.addOns.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>€{bookingSummary.pricing.taxes.toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>€{bookingSummary.pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Booking Actions</h4>
            <div className="space-y-3">
              <button
                onClick={handleGeneratePDF}
                disabled={isGeneratingPDF}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Mail className="w-4 h-4" />
                {isSendingEmail ? 'Sending...' : 'Send to Email'}
              </button>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Important Information</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div>• Booking confirmation will be sent via email</div>
              <div>• Payment will be processed immediately</div>
              <div>• Cancellation policy applies</div>
              <div>• Contact us for any changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Confirmation Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleCompleteBooking}
          className="px-12 py-4 bg-[#949371] text-white rounded-xl hover:bg-[#7a7a5a] transition-colors font-semibold text-lg"
        >
          Confirm & Complete Booking
        </button>
        <p className="text-sm text-gray-500 mt-2">
          By clicking confirm, you agree to our terms and conditions
        </p>
      </div>
    </motion.div>
  );
};

export default BookingSummary;
