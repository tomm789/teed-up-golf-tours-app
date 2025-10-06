// Booking related types
export interface BookingState {
  currentStep: number;
  totalSteps: number;
  tourId: string;
  tourTitle: string;
  tourDates: string;
  guestSelection: GuestSelection;
  travellerInfo: TravellerInfo[];
  roomSelection: RoomSelection;
  addOns: AddOn[];
  paymentInfo: PaymentInfo;
  termsAccepted: boolean;
  isLoading: boolean;
  errors: Record<string, string>;
}

export interface GuestSelection {
  totalGuests: number;
  golfers: number;
  nonGolfers: number;
  roomsNeeded: number;
  roomTypes: {
    double: number;
    single: number;
  };
}

export interface TravellerInfo {
  id: string;
  type: 'primary' | 'guest';
  isGolfer: boolean;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    passportExpiry: string;
  };
  golfInfo?: {
    handicap: string;
    preferredTeeTime: string;
    dietaryRequirements: string;
    medicalConditions: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
}

export interface RoomSelection {
  roomPreferences: {
    smokingPreference: 'non-smoking' | 'smoking' | 'no-preference';
    bedType: 'double' | 'twin' | 'no-preference';
    specialRequests: string;
  };
  roomUpgrades: {
    selected: boolean;
    upgradeType: 'all-hotels' | 'specific-hotels';
    selectedHotels: string[];
    totalUpgradeCost: number;
  };
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  category: 'transport' | 'activities' | 'insurance' | 'other';
  perPerson: boolean;
  quantity: number;
}

export interface PaymentInfo {
  method: 'credit-card' | 'bank-transfer' | 'paypal';
  billingAddress: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone: string;
  };
  creditCard?: {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    cardholderName: string;
  };
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  component: string;
  isCompleted: boolean;
  isActive: boolean;
  isAccessible: boolean;
}

export interface BookingSummary {
  tourDetails: {
    title: string;
    dates: string;
    duration: string;
  };
  guestBreakdown: {
    totalGuests: number;
    golfers: number;
    nonGolfers: number;
  };
  pricing: {
    basePrice: number;
    roomUpgrades: number;
    addOns: number;
    taxes: number;
    total: number;
    currency: string;
  };
  travellers: TravellerInfo[];
  rooms: {
    type: string;
    count: number;
    upgrade: boolean;
  }[];
}

// Component props types
export interface BookingStepProps {
  tour: any; // Tour object
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export interface TravellerFormProps {
  traveller: TravellerInfo;
  travellerIndex: number;
  isPrimary: boolean;
  updateTraveller: (index: number, updates: Partial<TravellerInfo>) => void;
  errors: Record<string, string>;
}

export interface GuestSelectionProps extends BookingStepProps {
  tour: {
    id: string;
    title: string;
    dates: string;
    pricing: {
      double: number;
      single: number;
      nonGolfer: number;
      currency: string;
    };
  };
}

export interface RoomSelectionProps extends BookingStepProps {
  tour: {
    pricing: {
      upgrades?: {
        double: number;
        single: number;
        nonGolfer: number;
      };
    };
  };
}

export interface PaymentProps extends BookingStepProps {
  bookingSummary: BookingSummary;
}

export interface BookingSummaryProps {
  bookingSummary: BookingSummary;
  onEdit: (step: number) => void;
}

// Validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}
