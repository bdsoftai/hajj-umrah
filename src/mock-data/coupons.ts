export interface Coupon {
    code: string;
    discountAmount: number;
    type: 'fixed' | 'percentage';
    percentage?: number;
    description: string;
    minPassengers?: number;
}

export const MOCK_COUPONS: Record<string, Coupon> = {
    UMRAH2026: {
        code: 'UMRAH2026',
        discountAmount: 5000,
        type: 'fixed',
        description: '৳5,000 Flat Discount on Umrah Bookings',
    },
    RAMADANOFFER: {
        code: 'RAMADANOFFER',
        discountAmount: 10000,
        type: 'fixed',
        description: '৳10,000 Special Ramadan Season Discount',
    },
    EARLYBIRD: {
        code: 'EARLYBIRD',
        discountAmount: 0,
        type: 'percentage',
        percentage: 5,
        description: '5% Off Early Bird Special Discount',
    },
};