'use client';

import { useState } from 'react';
import { generateBookingPdf } from '@/lib/generateBookingPdf';
import { useCalculatorStore, RoomSharing, FlightType } from '@/store/useCalculatorStore';
import { MOCK_HOTELS } from '@/mock-data/hotels';
import {
    Calculator,
    Users,
    MapPin,
    Plane,
    Tag,
    CheckCircle2,
    ArrowRight,
    Hotel as HotelIcon,
    Star,
} from 'lucide-react';
import BookingSuccessCard from '@/components/BookingSuccessCard';

export default function CustomBuilderPage() {
    const store = useCalculatorStore();
    const calculations = store.getCalculations();
    const [couponInput, setCouponInput] = useState('');
    const [showSummaryModal, setShowSummaryModal] = useState(false);
    const [showSuccessCard, setShowSuccessCard] = useState(false);
    const [bookingRef, setBookingRef] = useState('');

    const makkahHotels = MOCK_HOTELS.filter((h) => h.city === 'Makkah');
    const madinahHotels = MOCK_HOTELS.filter((h) => h.city === 'Madinah');

    const selectedMakkah = MOCK_HOTELS.find((h) => h.id === store.makkahHotelId);
    const selectedMadinah = MOCK_HOTELS.find((h) => h.id === store.madinahHotelId);

    // Generate booking reference like: UMR-2026-A4F9
    const generateBookingRef = () => {
        const year = new Date().getFullYear();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `UMR-${year}-${random}`;
    };

    const handleConfirmBooking = () => {
        const ref = generateBookingRef();
        setBookingRef(ref);
        setShowSummaryModal(false);
        // Small delay for a smooth transition
        setTimeout(() => setShowSuccessCard(true), 150);
    };

    const handleDownloadPdf = () => {
        generateBookingPdf({
            bookingRef,
            passengers: store.passengers,
            durationDays: store.durationDays,
            makkahHotel: selectedMakkah?.name || 'N/A',
            madinahHotel: selectedMadinah?.name || 'N/A',
            sharingType: store.sharingType,
            flightType: store.flightType,
            pricePerPerson: calculations.finalPricePerPerson,
            grandTotal: calculations.grandTotal,
            hotelSubtotal: calculations.hotelSubtotalPerPerson,
            flightCost: calculations.flightCostPerPerson,
            visaCost: calculations.visaCostPerPerson,
            groupDiscount: calculations.groupDiscountPerPerson,
            couponCode: store.appliedCoupon || undefined,
            couponDiscount: calculations.couponDiscountPerPerson,
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Title */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Calculator className="w-6 h-6 text-emerald-600" /> Dynamic Custom Package Builder
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Customize passengers, hotel stays, room sharing, and flights with real-time price estimation.
                        </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs text-emerald-800 font-medium">
                        ✨ Live pricing updates automatically
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Main Builder Form Section */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Step 1: Travelers & Duration */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Users className="w-5 h-5 text-emerald-600" /> Step 1: Travelers &amp; Duration
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600 uppercase">
                                        Number of Passengers
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => store.setPassengers(Math.max(1, store.passengers - 1))}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-colors"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={store.passengers}
                                            onChange={(e) =>
                                                store.setPassengers(Math.max(1, parseInt(e.target.value) || 1))
                                            }
                                            className="w-full text-center py-2 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-emerald-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => store.setPassengers(store.passengers + 1)}
                                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {store.passengers >= 3 && (
                                        <p className="text-[11px] text-emerald-600 font-semibold">
                                            🎉 Group discount active (৳2,500 off / person)
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-600 uppercase">
                                        Total Package Duration
                                    </label>
                                    <select
                                        value={store.durationDays}
                                        onChange={(e) => store.setDurationDays(parseInt(e.target.value))}
                                        className="w-full py-2.5 px-3 border border-slate-200 rounded-xl font-semibold text-slate-800 bg-white outline-none focus:border-emerald-500 text-xs sm:text-sm"
                                    >
                                        <option value={10}>10 Days (Express Package)</option>
                                        <option value={14}>14 Days (Standard Package)</option>
                                        <option value={21}>21 Days (Extended Stay)</option>
                                        <option value={28}>28 Days (Full Month)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Makkah Hotel Selection */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <MapPin className="w-5 h-5 text-emerald-600" /> Step 2: Choose Makkah Hotel
                            </h2>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {makkahHotels.map((hotel) => {
                                    const isSelected = store.makkahHotelId === hotel.id;
                                    return (
                                        <div
                                            key={hotel.id}
                                            onClick={() => store.setMakkahHotelId(hotel.id)}
                                            className={`cursor-pointer rounded-xl border overflow-hidden transition-all flex flex-col justify-between ${isSelected
                                                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/30 shadow-md'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                                }`}
                                        >
                                            <div className="relative h-24 sm:h-32 w-full bg-slate-100">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={hotel.imageUrl}
                                                    alt={hotel.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute top-2 right-2 bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                                                    <Star className="w-3 h-3 fill-slate-900" /> {hotel.rating}★
                                                </span>
                                            </div>
                                            <div className="p-2.5 sm:p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                                                        {hotel.name}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                                                        {hotel.locationName}
                                                    </p>
                                                </div>
                                                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs gap-1">
                                                    <span className="font-semibold text-emerald-700">
                                                        📍 {hotel.distanceMeters}m to Haram
                                                    </span>
                                                    <span className="font-black text-slate-900">
                                                        ৳{hotel.basePricePerNight.toLocaleString()}/N
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3: Madinah Hotel Selection */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <HotelIcon className="w-5 h-5 text-emerald-600" /> Step 3: Choose Madinah Hotel
                            </h2>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {madinahHotels.map((hotel) => {
                                    const isSelected = store.madinahHotelId === hotel.id;
                                    return (
                                        <div
                                            key={hotel.id}
                                            onClick={() => store.setMadinahHotelId(hotel.id)}
                                            className={`cursor-pointer rounded-xl border overflow-hidden transition-all flex flex-col justify-between ${isSelected
                                                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/30 shadow-md'
                                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                                }`}
                                        >
                                            <div className="relative h-24 sm:h-32 w-full bg-slate-100">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={hotel.imageUrl}
                                                    alt={hotel.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute top-2 right-2 bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-sm">
                                                    <Star className="w-3 h-3 fill-slate-900" /> {hotel.rating}★
                                                </span>
                                            </div>
                                            <div className="p-2.5 sm:p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                                                        {hotel.name}
                                                    </h3>
                                                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
                                                        {hotel.locationName}
                                                    </p>
                                                </div>
                                                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs gap-1">
                                                    <span className="font-semibold text-emerald-700">
                                                        📍 {hotel.distanceMeters}m to Masjid Nabawi
                                                    </span>
                                                    <span className="font-black text-slate-900">
                                                        ৳{hotel.basePricePerNight.toLocaleString()}/N
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 4: Room Occupancy & Flights */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                                <Plane className="w-5 h-5 text-emerald-600" /> Step 4: Room Sharing &amp; Airline Choice
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                                        Room Occupancy Type
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {(['Quad', 'Triple', 'Double', 'Single'] as RoomSharing[]).map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => store.setSharingType(type)}
                                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${store.sharingType === type
                                                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {type} Room
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                                        Airline Preference
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        {(['Direct SV/BG', 'Connecting Transit', 'None'] as FlightType[]).map(
                                            (flight) => (
                                                <button
                                                    key={flight}
                                                    type="button"
                                                    onClick={() => store.setFlightType(flight)}
                                                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${store.flightType === flight
                                                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    {flight}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Live Calculator Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-20 bg-white p-5 sm:p-6 rounded-2xl border border-emerald-200 shadow-xl space-y-4">
                            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex justify-between items-center">
                                <span>Real-Time Estimation</span>
                                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold uppercase">
                                    Instant Calc
                                </span>
                            </h2>

                            <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Hotels Subtotal:</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{calculations.hotelSubtotalPerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Flight Ticket:</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{calculations.flightCostPerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Visa &amp; Insurance:</span>
                                    <span className="font-semibold text-slate-800">
                                        ৳{calculations.visaCostPerPerson.toLocaleString()}
                                    </span>
                                </div>

                                {calculations.groupDiscountPerPerson > 0 && (
                                    <div className="flex justify-between text-emerald-600 font-semibold">
                                        <span>Group Discount:</span>
                                        <span>-৳{calculations.groupDiscountPerPerson.toLocaleString()}</span>
                                    </div>
                                )}

                                {store.appliedCoupon && (
                                    <div className="flex justify-between text-emerald-600 font-semibold">
                                        <span>Coupon ({store.appliedCoupon}):</span>
                                        <span>
                                            -৳{calculations.couponDiscountPerPerson.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Promo Code Input */}
                            <div className="pt-3 border-t border-slate-100 space-y-1.5">
                                <label className="block text-xs font-bold text-slate-600 flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5 text-amber-500" /> Apply Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. UMRAH2026"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl uppercase font-bold outline-none focus:border-emerald-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => store.applyCoupon(couponInput)}
                                        className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {store.couponError && (
                                    <p className="text-[11px] text-rose-500 font-medium">
                                        {store.couponError}
                                    </p>
                                )}
                            </div>

                            {/* Final Totals */}
                            <div className="pt-3 border-t border-slate-100 space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-bold text-slate-500 uppercase">
                                        Per Person Price
                                    </span>
                                    <span className="text-base font-bold text-slate-900">
                                        ৳{calculations.finalPricePerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                                    <span className="text-xs sm:text-sm font-extrabold text-emerald-900">
                                        Total ({store.passengers} Pax)
                                    </span>
                                    <span className="text-lg sm:text-xl font-black text-emerald-700">
                                        ৳{calculations.grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowSummaryModal(true)}
                                className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2"
                            >
                                <span>Get Quotation &amp; Book</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quotation Summary Modal */}
            {showSummaryModal && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
                    onClick={() => setShowSummaryModal(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl border border-slate-100"
                    >
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Package Quotation Summary
                        </h3>
                        <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                            <p>
                                <strong>Passengers:</strong> {store.passengers} Person(s)
                            </p>
                            <p>
                                <strong>Duration:</strong> {store.durationDays} Days
                            </p>
                            <p>
                                <strong>Makkah Hotel:</strong> {selectedMakkah?.name || 'Selected Hotel'}
                            </p>
                            <p>
                                <strong>Madinah Hotel:</strong> {selectedMadinah?.name || 'Selected Hotel'}
                            </p>
                            <p>
                                <strong>Room Occupancy:</strong> {store.sharingType} Sharing
                            </p>
                            <p>
                                <strong>Flight:</strong> {store.flightType}
                            </p>
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-xs space-y-1 mt-2">
                                <p>Per Person: ৳{calculations.finalPricePerPerson.toLocaleString()}</p>
                                <p className="text-sm font-extrabold text-emerald-700">
                                    Total Price: ৳{calculations.grandTotal.toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => setShowSummaryModal(false)}
                                className="px-4 py-2 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                            >
                                Modify
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmBooking}
                                className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Success Card */}
            {showSuccessCard && (
                <BookingSuccessCard
                    bookingRef={bookingRef}
                    passengers={store.passengers}
                    durationDays={store.durationDays}
                    makkahHotel={selectedMakkah?.name || 'N/A'}
                    madinahHotel={selectedMadinah?.name || 'N/A'}
                    sharingType={store.sharingType}
                    flightType={store.flightType}
                    grandTotal={calculations.grandTotal}
                    onClose={() => setShowSuccessCard(false)}
                    onDownload={handleDownloadPdf}
                />
            )}
        </div>
    );
}