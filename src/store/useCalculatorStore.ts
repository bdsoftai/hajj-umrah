import { create } from 'zustand';
import { MOCK_HOTELS, Hotel } from '@/mock-data/hotels';
import { MOCK_COUPONS } from '@/mock-data/coupons';

export type RoomSharing = 'Quad' | 'Triple' | 'Double' | 'Single';
export type FlightType = 'Direct SV/BG' | 'Connecting Transit' | 'None';

interface CalculatorState {
    passengers: number;
    durationDays: number;
    makkahHotelId: string;
    madinahHotelId: string;
    sharingType: RoomSharing;
    flightType: FlightType;
    visaCostPerPerson: number;
    appliedCoupon: string | null;
    couponDiscount: number;
    couponError: string | null;

    // Actions
    setPassengers: (count: number) => void;
    setDurationDays: (days: number) => void;
    setMakkahHotelId: (id: string) => void;
    setMadinahHotelId: (id: string) => void;
    setSharingType: (type: RoomSharing) => void;
    setFlightType: (flight: FlightType) => void;
    applyCoupon: (code: string) => void;
    removeCoupon: () => void;

    // Computed Values
    getCalculations: () => {
        baseMakkahCost: number;
        baseMadinahCost: number;
        sharingMultiplier: number;
        hotelSubtotalPerPerson: number;
        flightCostPerPerson: number;
        visaCostPerPerson: number;
        subtotalPerPerson: number;
        groupDiscountPerPerson: number;
        couponDiscountPerPerson: number;
        finalPricePerPerson: number;
        grandTotal: number;
    };
}

const ROOM_MULTIPLIERS: Record<RoomSharing, number> = {
    Quad: 1.0,
    Triple: 1.2,
    Double: 1.4,
    Single: 2.0,
};

const FLIGHT_COSTS: Record<FlightType, number> = {
    'Direct SV/BG': 75000,
    'Connecting Transit': 62000,
    None: 0,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
    passengers: 2,
    durationDays: 14,
    makkahHotelId: 'm3',
    madinahHotelId: 'd2',
    sharingType: 'Quad',
    flightType: 'Direct SV/BG',
    visaCostPerPerson: 25000,
    appliedCoupon: null,
    couponDiscount: 0,
    couponError: null,

    setPassengers: (count) => set({ passengers: Math.max(1, count) }),
    setDurationDays: (days) => set({ durationDays: Math.max(7, days) }),
    setMakkahHotelId: (id) => set({ makkahHotelId: id }),
    setMadinahHotelId: (id) => set({ madinahHotelId: id }),
    setSharingType: (type) => set({ sharingType: type }),
    setFlightType: (flight) => set({ flightType: flight }),

    applyCoupon: (code) => {
        const cleanCode = code.trim().toUpperCase();
        const coupon = MOCK_COUPONS[cleanCode];

        if (!coupon) {
            set({ couponError: 'Invalid coupon code. Try UMRAH2026 or RAMADANOFFER', couponDiscount: 0, appliedCoupon: null });
            return;
        }

        let discount = coupon.discountAmount;
        if (coupon.type === 'percentage' && coupon.percentage) {
            const currentSubtotal = get().getCalculations().subtotalPerPerson;
            discount = (currentSubtotal * coupon.percentage) / 100;
        }

        set({
            appliedCoupon: cleanCode,
            couponDiscount: discount,
            couponError: null,
        });
    },

    removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0, couponError: null }),

    getCalculations: () => {
        const state = get();
        const makkahHotel = MOCK_HOTELS.find((h) => h.id === state.makkahHotelId) || MOCK_HOTELS[0];
        const madinahHotel = MOCK_HOTELS.find((h) => h.id === state.madinahHotelId) || MOCK_HOTELS[4];

        const makkahNights = Math.ceil(state.durationDays * 0.6);
        const madinahNights = state.durationDays - makkahNights;

        const multiplier = ROOM_MULTIPLIERS[state.sharingType];
        const makkahNightRate = makkahHotel.basePricePerNight * multiplier;
        const madinahNightRate = madinahHotel.basePricePerNight * multiplier;

        const baseMakkahCost = makkahNightRate * makkahNights;
        const baseMadinahCost = madinahNightRate * madinahNights;
        const hotelSubtotalPerPerson = baseMakkahCost + baseMadinahCost;

        const flightCostPerPerson = FLIGHT_COSTS[state.flightType];
        const visaCostPerPerson = state.visaCostPerPerson;

        const subtotalPerPerson = hotelSubtotalPerPerson + flightCostPerPerson + visaCostPerPerson;

        // Group discount: ৳2,500 per person discount for 3+ passengers
        const groupDiscountPerPerson = state.passengers >= 3 ? 2500 : 0;
        const couponDiscountPerPerson = state.couponDiscount;

        const finalPricePerPerson = Math.max(0, subtotalPerPerson - groupDiscountPerPerson - couponDiscountPerPerson);
        const grandTotal = finalPricePerPerson * state.passengers;

        return {
            baseMakkahCost,
            baseMadinahCost,
            sharingMultiplier: multiplier,
            hotelSubtotalPerPerson,
            flightCostPerPerson,
            visaCostPerPerson,
            subtotalPerPerson,
            groupDiscountPerPerson,
            couponDiscountPerPerson,
            finalPricePerPerson,
            grandTotal,
        };
    },
}));