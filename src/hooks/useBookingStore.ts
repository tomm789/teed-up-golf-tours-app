import { create } from 'zustand';
import { BookingState, TravellerInfo, GuestSelection, RoomSelection, AddOn, PaymentInfo } from '@/data/types/booking';

interface BookingStore extends BookingState {
  // Actions
  initializeBooking: (tourId: string, tourTitle: string, tourDates: string) => void;
  updateGuestSelection: (guestSelection: Partial<GuestSelection>) => void;
  addTraveller: () => void;
  removeTraveller: (index: number) => void;
  updateTraveller: (index: number, updates: Partial<TravellerInfo>) => void;
  updateRoomSelection: (roomSelection: Partial<RoomSelection>) => void;
  updateAddOns: (addOns: AddOn[]) => void;
  updatePaymentInfo: (paymentInfo: Partial<PaymentInfo>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setTermsAccepted: (accepted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  resetBooking: () => void;
}

const initialTravellerInfo: TravellerInfo = {
  id: '',
  type: 'primary',
  isGolfer: true,
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
  },
  golfInfo: {
    handicap: '',
    preferredTeeTime: '',
    dietaryRequirements: '',
    medicalConditions: '',
  },
  emergencyContact: {
    name: '',
    relationship: '',
    phone: '',
    email: '',
  },
};

const initialGuestSelection: GuestSelection = {
  totalGuests: 1,
  golfers: 1,
  nonGolfers: 0,
  roomsNeeded: 1,
  roomTypes: {
    double: 1,
    single: 0,
  },
};

const initialRoomSelection: RoomSelection = {
  roomPreferences: {
    smokingPreference: 'non-smoking',
    bedType: 'no-preference',
    specialRequests: '',
  },
  roomUpgrades: {
    selected: false,
    upgradeType: 'all-hotels',
    selectedHotels: [],
    totalUpgradeCost: 0,
  },
};

const initialPaymentInfo: PaymentInfo = {
  method: 'credit-card',
  billingAddress: {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    phone: '',
  },
};

const initialBookingState: BookingState = {
  currentStep: 1,
  totalSteps: 6,
  tourId: '',
  tourTitle: '',
  tourDates: '',
  guestSelection: initialGuestSelection,
  travellerInfo: [initialTravellerInfo],
  roomSelection: initialRoomSelection,
  addOns: [],
  paymentInfo: initialPaymentInfo,
  termsAccepted: false,
  isLoading: false,
  errors: {},
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  ...initialBookingState,

  initializeBooking: (tourId: string, tourTitle: string, tourDates: string) => {
    set({
      ...initialBookingState,
      tourId,
      tourTitle,
      tourDates,
      currentStep: 1,
    });
  },

  updateGuestSelection: (guestSelection: Partial<GuestSelection>) => {
    const currentState = get();
    const newGuestSelection = { ...currentState.guestSelection, ...guestSelection };
    
    // Update traveller info based on guest selection
    const newTravellerInfo = [...currentState.travellerInfo];
    
    // Add or remove travellers as needed
    while (newTravellerInfo.length < newGuestSelection.totalGuests) {
      const newTraveller: TravellerInfo = {
        ...initialTravellerInfo,
        id: `traveller-${newTravellerInfo.length + 1}`,
        type: newTravellerInfo.length === 0 ? 'primary' : 'guest',
      };
      newTravellerInfo.push(newTraveller);
    }
    
    while (newTravellerInfo.length > newGuestSelection.totalGuests) {
      newTravellerInfo.pop();
    }
    
    // Update golfer status for each traveller
    let golfersAssigned = 0;
    newTravellerInfo.forEach((traveller, index) => {
      if (index < newGuestSelection.golfers) {
        traveller.isGolfer = true;
        golfersAssigned++;
      } else {
        traveller.isGolfer = false;
      }
    });
    
    set({
      guestSelection: newGuestSelection,
      travellerInfo: newTravellerInfo,
    });
  },

  addTraveller: () => {
    const currentState = get();
    const newTraveller: TravellerInfo = {
      ...initialTravellerInfo,
      id: `traveller-${currentState.travellerInfo.length + 1}`,
      type: 'guest',
      isGolfer: false, // New travellers default to non-golfers
    };
    
    set({
      travellerInfo: [...currentState.travellerInfo, newTraveller],
      guestSelection: {
        ...currentState.guestSelection,
        totalGuests: currentState.guestSelection.totalGuests + 1,
        nonGolfers: currentState.guestSelection.nonGolfers + 1,
      },
    });
  },

  removeTraveller: (index: number) => {
    const currentState = get();
    if (index === 0 || currentState.travellerInfo.length <= 1) return; // Can't remove primary traveller or last traveller
    
    const newTravellerInfo = currentState.travellerInfo.filter((_, i) => i !== index);
    const removedTraveller = currentState.travellerInfo[index];
    
    set({
      travellerInfo: newTravellerInfo,
      guestSelection: {
        ...currentState.guestSelection,
        totalGuests: currentState.guestSelection.totalGuests - 1,
        golfers: removedTraveller.isGolfer 
          ? currentState.guestSelection.golfers - 1 
          : currentState.guestSelection.golfers,
        nonGolfers: removedTraveller.isGolfer 
          ? currentState.guestSelection.nonGolfers 
          : currentState.guestSelection.nonGolfers - 1,
      },
    });
  },

  updateTraveller: (index: number, updates: Partial<TravellerInfo>) => {
    const currentState = get();
    const newTravellerInfo = [...currentState.travellerInfo];
    newTravellerInfo[index] = { ...newTravellerInfo[index], ...updates };
    
    set({ travellerInfo: newTravellerInfo });
  },

  updateRoomSelection: (roomSelection: Partial<RoomSelection>) => {
    set(state => ({
      roomSelection: { ...state.roomSelection, ...roomSelection },
    }));
  },

  updateAddOns: (addOns: AddOn[]) => {
    set({ addOns });
  },

  updatePaymentInfo: (paymentInfo: Partial<PaymentInfo>) => {
    set(state => ({
      paymentInfo: { ...state.paymentInfo, ...paymentInfo },
    }));
  },

  setCurrentStep: (step: number) => {
    set({ currentStep: step });
  },

  nextStep: () => {
    const currentState = get();
    if (currentState.currentStep < currentState.totalSteps) {
      set({ currentStep: currentState.currentStep + 1 });
    }
  },

  prevStep: () => {
    const currentState = get();
    if (currentState.currentStep > 1) {
      set({ currentStep: currentState.currentStep - 1 });
    }
  },

  setTermsAccepted: (accepted: boolean) => {
    set({ termsAccepted: accepted });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (field: string, error: string) => {
    set(state => ({
      errors: { ...state.errors, [field]: error },
    }));
  },

  clearError: (field: string) => {
    set(state => {
      const newErrors = { ...state.errors };
      delete newErrors[field];
      return { errors: newErrors };
    });
  },

  resetBooking: () => {
    set(initialBookingState);
  },
}));
