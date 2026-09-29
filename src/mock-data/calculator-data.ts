export interface HotelOption {
    id: string;
    name: string;
    city: 'Makkah' | 'Madinah';
    location: string;
    distanceMeter: number;
    rating: number;
    pricePerNightMultiplier: number;
}

export const MOCK_HOTELS: HotelOption[] = [
    // Makkah
    { id: 'm1', name: 'Pullman Zamzam Makkah', city: 'Makkah', location: 'Clock Tower', distanceMeter: 50, rating: 5, pricePerNightMultiplier: 1.8 },
    { id: 'm2', name: 'Swissôtel Makkah', city: 'Makkah', location: 'Ajyad', distanceMeter: 100, rating: 5, pricePerNightMultiplier: 1.6 },
    { id: 'm3', name: 'Le Méridien Towers', city: 'Makkah', location: 'Kudai', distanceMeter: 1500, rating: 4, pricePerNightMultiplier: 1.0 },
    // Madinah
    { id: 'md1', name: 'Dar Al Taqwa Hotel', city: 'Madinah', location: 'Central Northern Area', distanceMeter: 50, rating: 5, pricePerNightMultiplier: 1.7 },
    { id: 'md2', name: 'Anwar Al Madinah Mōvenpick', city: 'Madinah', location: 'Central Area', distanceMeter: 150, rating: 5, pricePerNightMultiplier: 1.5 },
    { id: 'md3', name: 'Pullman Zamzam Madina', city: 'Madinah', location: 'Central Area', distanceMeter: 300, rating: 4, pricePerNightMultiplier: 1.1 },
];

export const SHARING_MULTIPLIERS = {
    QUAD: { label: 'Quad Sharing (৪ জন/রুম)', multiplier: 1.0 },
    TRIPLE: { label: 'Triple Sharing (৩ জন/রুম)', multiplier: 1.2 },
    DOUBLE: { label: 'Double/Twin (২ জন/রুম)', multiplier: 1.4 },
    SINGLE: { label: 'Single Room (১ জন)', multiplier: 2.0 },
};

export const MOCK_COUPONS: Record<string, { discountAmount: number; minPassengers: number }> = {
    'UMRAH2026': { discountAmount: 5000, minPassengers: 1 },
    'RAMADANOFFER': { discountAmount: 10000, minPassengers: 2 },
    'FAMILYDISCOUNT': { discountAmount: 15000, minPassengers: 3 },
};