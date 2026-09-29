'use client';

import { useEffect } from 'react';
import { X, MapPin, Navigation } from 'lucide-react';
import { Hotel } from '@/mock-data/hotels';

interface Props {
    hotel: Hotel;
    kaaba: { lat: number; lng: number };
    onClose: () => void;
}

export default function HotelMapModal({ hotel, kaaba, onClose }: Props) {
    // Lock body scroll while modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Estimate walking time (~80 meters per minute average)
    const walkMinutes = Math.max(1, Math.round(hotel.distanceMeters / 80));

    // Google Maps Embed URL — shows a marker at the hotel location
    const mapEmbedUrl = `https://www.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=16&output=embed`;

    // Directions URL — from hotel to Kaaba (or Masjid an-Nabawi)
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${hotel.latitude},${hotel.longitude}&destination=${kaaba.lat},${kaaba.lng}&travelmode=walking`;

    return (
        <div
            className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={onClose}
        >
            <div
                className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-4 border-b">
                    <div className="flex-1 pr-2">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-tight">
                            {hotel.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {hotel.locationName}, {hotel.city}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Distance Badge */}
                <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-100 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        <MapPin className="w-3.5 h-3.5" />
                        {hotel.distanceMeters}m from{' '}
                        {hotel.city === 'Makkah' ? 'Masjid al-Haram (Kaaba)' : 'Masjid an-Nabawi'}
                    </div>
                    <div className="flex items-center gap-1.5 bg-white text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                        🚶 ~{walkMinutes} min walk
                    </div>
                </div>

                {/* Map Embed */}
                <div className="relative w-full aspect-[4/3] sm:aspect-video bg-slate-100">
                    <iframe
                        title={`Map of ${hotel.name}`}
                        src={mapEmbedUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>

                {/* Footer Actions */}
                <div className="p-4 flex flex-col sm:flex-row gap-2 border-t bg-slate-50">
                    <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <Navigation className="w-4 h-4" />
                        Get Walking Directions
                    </a>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-lg border border-slate-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}