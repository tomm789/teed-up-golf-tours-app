import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Building, Lock, Check, Shield } from 'lucide-react';
import { PaymentProps } from '@/data/types/booking';
import { useBookingStore } from '@/hooks/useBookingStore';

const Payment: React.FC<PaymentProps> = ({ bookingSummary, nextStep, prevStep }) => {
  const { paymentInfo, updatePaymentInfo, setTermsAccepted, termsAccepted } = useBookingStore();
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentMethodChange = (method: 'credit-card' | 'bank-transfer' | 'paypal') => {
    updatePaymentInfo({ method });
    setPaymentErrors({});
  };

  const handleBillingAddressChange = (field: string, value: string) => {
    updatePaymentInfo({
      billingAddress: {
        ...paymentInfo.billingAddress,
        [field]: value,
      },
    });
    // Clear error when user starts typing
    if (paymentErrors[`billing_${field}`]) {
      setPaymentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`billing_${field}`];
        return newErrors;
      });
    }
  };

  const handleCreditCardChange = (field: string, value: string) => {
    updatePaymentInfo({
      creditCard: {
        ...paymentInfo.creditCard!,
        [field]: value,
      },
    });
    // Clear error when user starts typing
    if (paymentErrors[`card_${field}`]) {
      setPaymentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`card_${field}`];
        return newErrors;
      });
    }
  };

  const validatePaymentInfo = (): boolean => {
    const errors: Record<string, string> = {};

    // Billing address validation
    const requiredBillingFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'postcode', 'country', 'phone'];
    requiredBillingFields.forEach(field => {
      if (!paymentInfo.billingAddress[field as keyof typeof paymentInfo.billingAddress]?.trim()) {
        errors[`billing_${field}`] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Credit card validation (if credit card is selected)
    if (paymentInfo.method === 'credit-card') {
      if (!paymentInfo.creditCard) {
        errors['payment_method'] = 'Credit card information is required';
      } else {
        const requiredCardFields = ['cardNumber', 'expiryMonth', 'expiryYear', 'cvv', 'cardholderName'];
        requiredCardFields.forEach(field => {
          if (!paymentInfo.creditCard![field as keyof typeof paymentInfo.creditCard]?.trim()) {
            errors[`card_${field}`] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
          }
        });

        // Additional credit card validation
        if (paymentInfo.creditCard.cardNumber && !/^\d{16}$/.test(paymentInfo.creditCard.cardNumber.replace(/\s/g, ''))) {
          errors['card_cardNumber'] = 'Please enter a valid 16-digit card number';
        }
        if (paymentInfo.creditCard.cvv && !/^\d{3,4}$/.test(paymentInfo.creditCard.cvv)) {
          errors['card_cvv'] = 'Please enter a valid CVV';
        }
      }
    }

    // Terms acceptance validation
    if (!termsAccepted) {
      errors['terms'] = 'You must accept the terms and conditions';
    }

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatePaymentInfo()) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      nextStep();
    }, 2000);
  };


  const getError = (field: string) => {
    return paymentErrors[field];
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
          Payment Information
        </h3>
        <p className="text-gray-600">
          Secure payment processing with industry-standard encryption
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-6 h-6 text-[#949371]" />
              <h4 className="text-lg font-semibold">Payment Method</h4>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'credit-card',
                  label: 'Credit Card',
                  description: 'Visa, Mastercard, American Express',
                  icon: <CreditCard className="w-6 h-6" />,
                },
                {
                  value: 'bank-transfer',
                  label: 'Bank Transfer',
                  description: 'Direct bank transfer (processed within 3-5 business days)',
                  icon: <Building className="w-6 h-6" />,
                },
                {
                  value: 'paypal',
                  label: 'PayPal',
                  description: 'Pay securely with your PayPal account',
                  icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.068-.348c-.979-5.05-4.349-6.797-8.647-6.797h-2.19c-.524 0-.968.382-1.05.9L8.69 20.597h4.616c.524 0 .968-.382 1.05-.9l1.12-7.106h2.19c2.57 0 4.578-.543 5.69-1.81 1.01-1.15 1.304-2.42 1.012-4.287z"/>
                  </svg>,
                },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentInfo.method === method.value
                      ? 'border-[#949371] bg-[#949371]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={paymentInfo.method === method.value}
                    onChange={(e) => handlePaymentMethodChange(e.target.value as any)}
                    className="w-5 h-5 text-[#949371] focus:ring-[#949371]"
                  />
                  <div className="text-[#949371]">{method.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{method.label}</div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentInfo.method === 'credit-card' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-6 h-6 text-[#D2CB97]" />
                <h4 className="text-lg font-semibold">Credit Card Information</h4>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.creditCard?.cardholderName || ''}
                    onChange={(e) => handleCreditCardChange('cardholderName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('card_cardholderName') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Name as it appears on card"
                  />
                  {getError('card_cardholderName') && (
                    <p className="text-red-500 text-xs mt-1">{getError('card_cardholderName')}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.creditCard?.cardNumber || ''}
                    onChange={(e) => handleCreditCardChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('card_cardNumber') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {getError('card_cardNumber') && (
                    <p className="text-red-500 text-xs mt-1">{getError('card_cardNumber')}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Month *
                    </label>
                    <select
                      value={paymentInfo.creditCard?.expiryMonth || ''}
                      onChange={(e) => handleCreditCardChange('expiryMonth', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                        getError('card_expiryMonth') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {getError('card_expiryMonth') && (
                      <p className="text-red-500 text-xs mt-1">{getError('card_expiryMonth')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Year *
                    </label>
                    <select
                      value={paymentInfo.creditCard?.expiryYear || ''}
                      onChange={(e) => handleCreditCardChange('expiryYear', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                        getError('card_expiryYear') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={String(year).slice(-2)}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    {getError('card_expiryYear') && (
                      <p className="text-red-500 text-xs mt-1">{getError('card_expiryYear')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.creditCard?.cvv || ''}
                      onChange={(e) => handleCreditCardChange('cvv', e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                        getError('card_cvv') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123"
                      maxLength={4}
                    />
                    {getError('card_cvv') && (
                      <p className="text-red-500 text-xs mt-1">{getError('card_cvv')}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Billing Address */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Building className="w-6 h-6 text-[#222136]" />
              <h4 className="text-lg font-semibold">Billing Address</h4>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.billingAddress.firstName}
                    onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_firstName') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter first name"
                  />
                  {getError('billing_firstName') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_firstName')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.billingAddress.lastName}
                    onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_lastName') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter last name"
                  />
                  {getError('billing_lastName') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_lastName')}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={paymentInfo.billingAddress.company || ''}
                  onChange={(e) => handleBillingAddressChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  value={paymentInfo.billingAddress.address1}
                  onChange={(e) => handleBillingAddressChange('address1', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                    getError('billing_address1') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter street address"
                />
                {getError('billing_address1') && (
                  <p className="text-red-500 text-xs mt-1">{getError('billing_address1')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  type="text"
                  value={paymentInfo.billingAddress.address2 || ''}
                  onChange={(e) => handleBillingAddressChange('address2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent"
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.billingAddress.city}
                    onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_city') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter city"
                  />
                  {getError('billing_city') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_city')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.billingAddress.state}
                    onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_state') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter state"
                  />
                  {getError('billing_state') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_state')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.billingAddress.postcode}
                    onChange={(e) => handleBillingAddressChange('postcode', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_postcode') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter postcode"
                  />
                  {getError('billing_postcode') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_postcode')}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country *
                  </label>
                  <select
                    value={paymentInfo.billingAddress.country}
                    onChange={(e) => handleBillingAddressChange('country', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_country') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select country</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                  {getError('billing_country') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_country')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={paymentInfo.billingAddress.phone}
                    onChange={(e) => handleBillingAddressChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#949371] focus:border-transparent ${
                      getError('billing_phone') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {getError('billing_phone') && (
                    <p className="text-red-500 text-xs mt-1">{getError('billing_phone')}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className={`w-5 h-5 text-[#949371] focus:ring-[#949371] rounded mt-1 ${
                  getError('terms') ? 'border-red-500' : ''
                }`}
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-[#949371] hover:underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#949371] hover:underline">
                    Privacy Policy
                  </a>
                  . I understand that this booking is subject to the cancellation policy and payment terms.
                </span>
                {getError('terms') && (
                  <p className="text-red-500 text-xs mt-1">{getError('terms')}</p>
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#949371] to-[#7a7a5a] text-white rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4">Payment Summary</h4>
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
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>€{bookingSummary.pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Security Features</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#949371]" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#949371]" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#949371]" />
                <span>Secure Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={isProcessing}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-colors font-medium ${
            isProcessing
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-[#949371] text-white hover:bg-[#7a7a5a]'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Complete Booking
              <Check className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default Payment;
