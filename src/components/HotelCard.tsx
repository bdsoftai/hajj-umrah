'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Star, ImageOff } from 'lucide-react';
import { Hotel } from '@/mock-data/hotels';
import HotelMapModal from './HotelMapModal';

interface Props {
    hotel: Hotel;
}

export default function HotelCard({ hotel }: Props) {
    const [imgError, setImgError] = useState(false);
    const [showMap, setShowMap] = useState(false);

    // Kaaba coordinates for distance reference
    const KAABA = { lat: 21.4225, lng: 39.8262 };

    return (
        <>
            <div className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                    {!imgError ? (
                        <Image
                            src={hotel.imageUrl}
                            alt={hotel.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                            <ImageOff className="w-8 h-8 mb-1" />
                            <span className="text-[10px] font-medium">No Image</span>
                        </div>
                    )}

                    {/* Rating badge */}
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Star className="w-3 h-3 fill-white" /> {hotel.rating}
                    </div>

                    {/* Distance badge */}
                    <div className="absolute bottom-2 left-2 bg-emerald-600/95 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow">
                        <MapPin className="w-3 h-3" />
                        {hotel.distanceMeters}m from{' '}
                        {hotel.city === 'Makkah' ? 'Masjid al-Haram' : 'Masjid an-Nabawi'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-3 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-tight">
                        {hotel.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {hotel.locationName}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                        {hotel.city}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] text-slate-400 uppercase font-semibold">From</p>
                            <p className="text-sm font-extrabold text-slate-900">
                                ৳{hotel.basePricePerNight.toLocaleString()}
                                <span className="text-[10px] font-medium text-slate-500">/night</span>
                            </p>
                        </div>
                    </div>

                    {/* View Location Button */}
                    <button
                        onClick={() => setShowMap(true)}
                        className="mt-3 w-full py-2 bg-slate-900 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-md transition-colors flex items-center justify-center gap-1.5"
                    >
                        <MapPin className="w-3.5 h-3.5" />
                        View Location
                    </button>
                </div>
            </div>

            {/* Map Modal */}
            {showMap && (
                <HotelMapModal
                    hotel={hotel}
                    kaaba={KAABA}
                    onClose={() => setShowMap(false)}
                />
            )}
        </>
    );
}