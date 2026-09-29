'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Download, Mail, X, PartyPopper } from 'lucide-react';

interface BookingSuccessCardProps {
    bookingRef: string;
    passengers: number;
    durationDays: number;
    makkahHotel: string;
    madinahHotel: string;
    sharingType: string;
    flightType: string;
    grandTotal: number;
    onClose: () => void;
    onDownload: () => void;
}

export default function BookingSuccessCard({
    bookingRef,
    passengers,
    durationDays,
    makkahHotel,
    madinahHotel,
    sharingType,
    flightType,
    grandTotal,
    onClose,
    onDownload,
}: BookingSuccessCardProps) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const t = setTimeout(() => setAnimate(true), 50);
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            clearTimeout(t);
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-[60] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-500 ease-out ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
                    }`}
            >
                {/* Top gradient banner */}
                <div className="relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 px-6 pt-8 pb-10 text-center">
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* Animated check circle */}
                    <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg ring-4 ring-white/30 animate-[bounceIn_0.6s_ease-out]">
                        <CheckCircle2 className="w-9 h-9 text-emerald-600" strokeWidth={2.5} />
                    </div>

                    <h2 className="mt-4 text-lg sm:text-xl font-extrabold text-white flex items-center justify-center gap-2">
                        <PartyPopper className="w-5 h-5" />
                        Booking Confirmed!
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-50 mt-1">
                        Your Umrah package has been successfully reserved.
                    </p>
                </div>

                {/* Reference pill — overlapping banner */}
                <div className="px-6 -mt-5">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-md px-4 py-3 text-center">
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Booking Reference
                        </p>
                        <p className="text-base sm:text-lg font-black text-emerald-700 tracking-widest mt-0.5">
                            {bookingRef}
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="px-6 py-5 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between text-slate-600">
                        <span>Passengers:</span>
                        <span className="font-semibold text-slate-900">{passengers} Person(s)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Duration:</span>
                        <span className="font-semibold text-slate-900">{durationDays} Days</span>
                    </div>
                    <div className="flex justify-between text-slate-600 gap-2">
                        <span className="shrink-0">Makkah:</span>
                        <span className="font-semibold text-slate-900 text-right line-clamp-1">
                            {makkahHotel}
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600 gap-2">
                        <span className="shrink-0">Madinah:</span>
                        <span className="font-semibold text-slate-900 text-right line-clamp-1">
                            {madinahHotel}
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Room & Flight:</span>
                        <span className="font-semibold text-slate-900">
                            {sharingType} • {flightType}
                        </span>
                    </div>

                    <div className="pt-3 mt-3 border-t border-dashed border-slate-200 flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-500 uppercase">Total Paid</span>
                        <span className="text-lg sm:text-xl font-black text-emerald-700">
                            ৳{grandTotal.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Email note */}
                <div className="mx-6 mb-4 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                    <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <p className="text-[11px] sm:text-xs text-blue-800 leading-snug">
                        A confirmation email with your full itinerary and voucher has been sent to your registered email address.
                    </p>
                </div>

                {/* Actions */}
                <div className="px-6 pb-6 flex flex-col sm:flex-row gap-2">
                    <button
                        onClick={onDownload}
                        className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Inline keyframes for bounce-in animation */}
            <style jsx>{`
                @keyframes bounceIn {
                    0% {
                        transform: scale(0.5);
                        opacity: 0;
                    }
                    60% {
                        transform: scale(1.1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
}