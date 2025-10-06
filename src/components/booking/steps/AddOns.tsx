import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Car, Shield, Gift } from 'lucide-react';
import { BookingStepProps, AddOn } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';

const AddOns: React.FC<BookingStepProps> = ({ nextStep, prevStep }) => {
  const { addOns, updateAddOns, guestSelection } = useBookingStore();
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  // Initialize add-ons if not already set
  useEffect(() => {
    if (addOns.length === 0) {
      const defaultAddOns: AddOn[] = [
        {
          id: 'travel-insurance',
          name: 'Comprehensive Travel Insurance',
          description: 'Full coverage including medical, trip cancellation, and baggage protection',
          price: 150,
          selected: false,
          category: 'insurance',
          perPerson: true,
          quantity: 1,
        },
        {
          id: 'airport-lounge',
          name: 'Airport Lounge Access',
          description: 'Priority access to premium airport lounges for all flights',
          price: 75,
          selected: false,
          category: 'transport',
          perPerson: true,
          quantity: 1,
        },
        {
          id: 'private-transfers',
          name: 'Private Airport Transfers',
          description: 'Luxury private vehicle transfers to/from airports',
          price: 120,
          selected: false,
          category: 'transport',
          perPerson: false,
          quantity: 1,
        },
        {
          id: 'wine-tasting',
          name: 'Premium Wine Tasting Experience',
          description: 'Exclusive wine tasting at local vineyards with sommelier',
          price: 85,
          selected: false,
          category: 'activities',
          perPerson: true,
          quantity: 1,
        },
        {
          id: 'photography-service',
          name: 'Professional Photography',
          description: 'Professional photographer for key moments and group photos',
          price: 200,
          selected: false,
          category: 'activities',
          perPerson: false,
          quantity: 1,
        },
        {
          id: 'golf-lessons',
          name: 'Private Golf Lessons',
          description: 'One-on-one golf instruction with PGA professional',
          price: 100,
          selected: false,
          category: 'activities',
          perPerson: true,
          quantity: 1,
        },
        {
          id: 'spa-package',
          name: 'Luxury Spa Package',
          description: 'Full-day spa experience with massage, treatments, and relaxation',
          price: 180,
          selected: false,
          category: 'activities',
          perPerson: true,
          quantity: 1,
        },
        {
          id: 'cultural-tour',
          name: 'Cultural Heritage Tour',
          description: 'Guided tour of historical sites and cultural landmarks',
          price: 60,
          selected: false,
          category: 'activities',
          perPerson: true,
          quantity: 1,
        },
      ];
      updateAddOns(defaultAddOns);
      setSelectedAddOns(defaultAddOns);
    } else {
      setSelectedAddOns(addOns);
    }
  }, [addOns, updateAddOns]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return <Car className="w-5 h-5" />;
      case 'activities': return <Gift className="w-5 h-5" />;
      case 'insurance': return <Shield className="w-5 h-5" />;
      default: return <Plus className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport': return 'text-blue-600 bg-blue-100';
      case 'activities': return 'text-green-600 bg-green-100';
      case 'insurance': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddOnToggle = (addOnId: string) => {
    const updatedAddOns = selectedAddOns.map(addOn => 
      addOn.id === addOnId 
        ? { ...addOn, selected: !addOn.selected }
        : addOn
    );
    setSelectedAddOns(updatedAddOns);
    updateAddOns(updatedAddOns);
  };

  const handleQuantityChange = (addOnId: string, delta: number) => {
    const updatedAddOns = selectedAddOns.map(addOn => {
      if (addOn.id === addOnId) {
        const newQuantity = Math.max(1, addOn.quantity + delta);
        return { ...addOn, quantity: newQuantity };
      }
      return addOn;
    });
    setSelectedAddOns(updatedAddOns);
    updateAddOns(updatedAddOns);
  };

  const calculateAddOnTotal = () => {
    return selectedAddOns.reduce((total, addOn) => {
      if (addOn.selected) {
        const basePrice = addOn.price * addOn.quantity;
        return addOn.perPerson ? total + (basePrice * guestSelection.totalGuests) : total + basePrice;
      }
      return total;
    }, 0);
  };

  const getSelectedAddOns = () => {
    return selectedAddOns.filter(addOn => addOn.selected);
  };

  const groupedAddOns = selectedAddOns.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  const categoryLabels = {
    transport: 'Transportation',
    activities: 'Activities & Experiences',
    insurance: 'Insurance & Protection',
    other: 'Other Services',
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
          Optional Add-ons
        </h3>
        <p className="text-gray-600">
          Enhance your tour experience with these optional services
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Add-ons List */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedAddOns).map(([category, categoryAddOns]) => (
            <div key={category} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className={`p-2 rounded-lg ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <h4 className="text-lg font-semibold">
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </h4>
              </div>

              <div className="space-y-4">
                {categoryAddOns.map((addOn) => (
                  <motion.div
                    key={addOn.id}
                    className={`border-2 rounded-xl p-4 transition-all ${
                      addOn.selected
                        ? 'border-[#949371] bg-[#949371]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <input
                          type="checkbox"
                          checked={addOn.selected}
                          onChange={() => handleAddOnToggle(addOn.id)}
                          className="w-5 h-5 text-[#949371] focus:ring-[#949371] rounded"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-1">
                              {addOn.name}
                            </h5>
                            <p className="text-sm text-gray-600 mb-3">
                              {addOn.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-gray-500">
                                {addOn.perPerson ? 'Per person' : 'Per booking'}
                              </div>
                              {addOn.selected && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleQuantityChange(addOn.id, -1)}
                                    disabled={addOn.quantity <= 1}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="text-sm font-medium min-w-[2rem] text-center">
                                    {addOn.quantity}
                                  </span>
                                  <button
                                    onClick={() => handleQuantityChange(addOn.id, 1)}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#949371] transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <div className="text-lg font-semibold text-[#949371]">
                              €{addOn.price.toLocaleString()}
                            </div>
                            {addOn.selected && addOn.quantity > 1 && (
                              <div className="text-sm text-gray-500">
                                × {addOn.quantity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          {/* Selected Add-ons Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Selected Add-ons</h4>
            
            {getSelectedAddOns().length === 0 ? (
              <p className="text-gray-500 text-sm">No add-ons selected</p>
            ) : (
              <div className="space-y-3">
                {getSelectedAddOns().map((addOn) => (
                  <div key={addOn.id} className="flex items-center justify-between text-sm">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {addOn.name}
                      </div>
                      {addOn.quantity > 1 && (
                        <div className="text-gray-500">
                          {addOn.perPerson ? `${addOn.quantity} × ${guestSelection.totalGuests} people` : `× ${addOn.quantity}`}
                        </div>
                      )}
                    </div>
                    <div className="text-[#949371] font-semibold ml-2">
                      €{(() => {
                        const basePrice = addOn.price * addOn.quantity;
                        return addOn.perPerson ? basePrice * guestSelection.totalGuests : basePrice;
                      })().toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Total Summary */}
          <div className="bg-gradient-to-br from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Add-ons Total</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Selected Add-ons:</span>
                <span>€{calculateAddOnTotal().toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>€{calculateAddOnTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-white/80">
              * Add-ons are charged per person where indicated
            </div>
          </div>

          {/* Popular Recommendations */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Popular Add-ons</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4 text-[#949371]" />
                <span>Travel Insurance</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Car className="w-4 h-4 text-[#949371]" />
                <span>Private Transfers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Gift className="w-4 h-4 text-[#949371]" />
                <span>Wine Tasting</span>
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
          Continue to Payment
        </button>
      </div>
    </motion.div>
  );
};

export default AddOns;
