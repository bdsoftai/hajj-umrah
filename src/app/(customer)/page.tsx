'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCalculatorStore, RoomSharing, FlightType } from '@/store/useCalculatorStore';
import { MOCK_HOTELS } from '@/mock-data/hotels';
import {
    Calculator, Users, MapPin, Plane, Tag, CheckCircle2, ArrowRight,
    Star, ImageOff, Check,
} from 'lucide-react';

export default function CustomBuilderPage() {
    const store = useCalculatorStore();
    const calculations = store.getCalculations();
    const [couponInput, setCouponInput] = useState('');
    const [showSummaryModal, setShowSummaryModal] = useState(false);

    const makkahHotels = MOCK_HOTELS.filter((h) => h.city === 'Makkah');
    const madinahHotels = MOCK_HOTELS.filter((h) => h.city === 'Madinah');

    const selectedMakkah = makkahHotels.find((h) => h.id === store.makkahHotelId);
    const selectedMadinah = madinahHotels.find((h) => h.id === store.madinahHotelId);

    return (
        <div className="min-h-screen bg-slate-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                        <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
                        Dynamic Custom Package Builder
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 mt-1">
                        Select your preferred Makkah &amp; Madinah hotels, room sharing, and flights to see real-time price calculations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Main Controls */}
                    <div className="lg:col-span-8 space-y-5 sm:space-y-6">

                        {/* Step 1: Passengers & Duration */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-emerald-600" /> Step 1: Travelers &amp; Duration
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                                        Number of Passengers
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => store.setPassengers(Math.max(1, store.passengers - 1))}
                                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md font-bold text-slate-700 transition-colors"
                                            aria-label="Decrease passengers"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min={1}
                                            value={store.passengers}
                                            onChange={(e) =>
                                                store.setPassengers(Math.max(1, parseInt(e.target.value) || 1))
                                            }
                                            className="w-full text-center py-2 border rounded-md font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                        <button
                                            onClick={() => store.setPassengers(store.passengers + 1)}
                                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-md font-bold text-slate-700 transition-colors"
                                            aria-label="Increase passengers"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {store.passengers >= 3 && (
                                        <p className="text-xs text-emerald-600 font-semibold mt-1">
                                            🎉 Group discount active (৳2,500 off/person)
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                                        Total Duration (Days)
                                    </label>
                                    <select
                                        value={store.durationDays}
                                        onChange={(e) => store.setDurationDays(parseInt(e.target.value))}
                                        className="w-full py-2 px-3 border rounded-md font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option value={10}>10 Days (Quick Umrah)</option>
                                        <option value={14}>14 Days (Standard)</option>
                                        <option value={21}>21 Days (Extended)</option>
                                        <option value={28}>28 Days (Full Month)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Step 2A: Makkah Hotel */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-emerald-600" /> Step 2: Makkah Hotel &amp; Haram Distance
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {makkahHotels.map((hotel) => (
                                    <HotelSelectCard
                                        key={hotel.id}
                                        hotel={hotel}
                                        selected={store.makkahHotelId === hotel.id}
                                        onSelect={() => store.setMakkahHotelId(hotel.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step 2B: Madinah Hotel */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <MapPin className="w-5 h-5 text-emerald-600" /> Step 2B: Madinah Hotel &amp; Masjid Distance
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {madinahHotels.map((hotel) => (
                                    <HotelSelectCard
                                        key={hotel.id}
                                        hotel={hotel}
                                        selected={store.madinahHotelId === hotel.id}
                                        onSelect={() => store.setMadinahHotelId(hotel.id)}
                                        masjidLabel="Masjid an-Nabawi"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Room Sharing & Transport */}
                        <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <Plane className="w-5 h-5 text-emerald-600" /> Step 3: Room Sharing &amp; Flight Details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                                        Room Sharing Occupancy
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {(['Quad', 'Triple', 'Double', 'Single'] as RoomSharing[]).map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => store.setSharingType(type)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${store.sharingType === type
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
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">
                                        Airline Option
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                        {(['Direct SV/BG', 'Connecting Transit', 'None'] as FlightType[]).map((flight) => (
                                            <button
                                                key={flight}
                                                onClick={() => store.setFlightType(flight)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${store.flightType === flight
                                                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {flight}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Live Price Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-20 bg-white p-4 sm:p-6 rounded-xl border border-emerald-200 shadow-xl space-y-4">
                            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 border-b pb-3 flex justify-between items-center">
                                <span>Live Bill Summary</span>
                                <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-bold uppercase">
                                    Real-Time
                                </span>
                            </h2>

                            <div className="space-y-2 text-sm text-slate-600">
                                <div className="flex justify-between">
                                    <span>Hotels Accommodation:</span>
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
                                        <span>−৳{calculations.groupDiscountPerPerson.toLocaleString()}</span>
                                    </div>
                                )}

                                {store.appliedCoupon && (
                                    <div className="flex justify-between text-emerald-600 font-semibold">
                                        <span>Coupon ({store.appliedCoupon}):</span>
                                        <span>−৳{calculations.couponDiscountPerPerson.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>

                            {/* Promo Code */}
                            <div className="pt-2 border-t">
                                <label className="block text-xs font-bold text-slate-600 mb-1 flex items-center gap-1">
                                    <Tag className="w-3.5 h-3.5 text-amber-500" /> Have a Promo Code?
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="e.g. UMRAH2026"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border rounded-md uppercase font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <button
                                        onClick={() => store.applyCoupon(couponInput)}
                                        className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {store.couponError && (
                                    <p className="text-xs text-rose-500 mt-1">{store.couponError}</p>
                                )}
                            </div>

                            {/* Totals */}
                            <div className="pt-4 border-t space-y-1">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Price Per Person</span>
                                    <span className="text-lg font-bold text-slate-900">
                                        ৳{calculations.finalPricePerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                                    <span className="text-sm font-extrabold text-emerald-900">
                                        Grand Total ({store.passengers} Pax)
                                    </span>
                                    <span className="text-lg sm:text-xl font-extrabold text-emerald-700">
                                        ৳{calculations.grandTotal.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowSummaryModal(true)}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
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
                    className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setShowSummaryModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                            <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Package Quotation Summary
                        </h3>

                        <div className="space-y-2 text-sm text-slate-700">
                            <p><strong>Passengers:</strong> {store.passengers} Person(s)</p>
                            <p><strong>Duration:</strong> {store.durationDays} Days</p>
                            <p><strong>Makkah Hotel:</strong> {selectedMakkah?.name || '—'}</p>
                            <p><strong>Madinah Hotel:</strong> {selectedMadinah?.name || '—'}</p>
                            <p><strong>Room Occupancy:</strong> {store.sharingType} Sharing</p>
                            <p><strong>Flight:</strong> {store.flightType}</p>

                            <div className="p-3 bg-slate-50 rounded-lg font-mono text-xs space-y-1 mt-2">
                                <p>Per Person: ৳{calculations.finalPricePerPerson.toLocaleString()}</p>
                                <p className="text-sm font-bold text-emerald-700">
                                    Total Price: ৳{calculations.grandTotal.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2">
                            <button
                                onClick={() => setShowSummaryModal(false)}
                                className="px-4 py-2 bg-slate-200 text-slate-800 font-bold text-xs rounded-lg hover:bg-slate-300 transition-colors"
                            >
                                Close &amp; Modify
                            </button>
                            <button
                                onClick={() => alert('Quotation PDF feature initialized!')}
                                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------------------------------------------
   Reusable Hotel Select Card (inline component)
--------------------------------------------- */
function HotelSelectCard({
    hotel,
    selected,
    onSelect,
    masjidLabel = 'Masjid al-Haram',
}: {
    hotel: (typeof import('@/mock-data/hotels').MOCK_HOTELS)[number];
    selected: boolean;
    onSelect: () => void;
    masjidLabel?: string;
}) {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer rounded-lg border overflow-hidden transition-all ${selected
                ? 'border-emerald-600 bg-emerald-50/40 shadow-md ring-1 ring-emerald-500'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
        >
            {/* Thumbnail */}
            <div className="relative w-full aspect-[16/9] bg-slate-100">
                {!imgError ? (
                    <Image
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageOff className="w-6 h-6" />
                    </div>
                )}

                {/* Rating badge */}
                <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-white" /> {hotel.rating}
                </span>

                {/* Selected check */}
                {selected && (
                    <span className="absolute top-2 right-2 bg-emerald-600 text-white rounded-full p-1 shadow">
                        <Check className="w-3.5 h-3.5" />
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="p-3">
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{hotel.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{hotel.locationName}</p>
                <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-700">
                        📍 {hotel.distanceMeters}m from {masjidLabel}
                    </span>
                    <span className="font-bold text-slate-800">
                        ৳{hotel.basePricePerNight.toLocaleString()}/night
                    </span>
                </div>
            </div>
        </div>
    );
}