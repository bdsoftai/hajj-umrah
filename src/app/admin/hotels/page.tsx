'use client';

import { useState } from 'react';
import { MOCK_HOTELS, Hotel } from '@/mock-data/hotels';
import { Hotel as HotelIcon, Plus, MapPin, Save } from 'lucide-react';

export default function AdminHotelsPage() {
    const [hotels, setHotels] = useState<Hotel[]>(MOCK_HOTELS);
    const [name, setName] = useState('');
    const [city, setCity] = useState<'Makkah' | 'Madinah'>('Makkah');
    const [locationName, setLocationName] = useState('');
    const [distanceMeters, setDistanceMeters] = useState('');
    const [basePrice, setBasePrice] = useState('');

    const handleAddHotel = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !distanceMeters || !basePrice) return;

        const newHotel: Hotel = {
            id: Date.now().toString(),
            name,
            city,
            locationName,
            distanceMeters: parseInt(distanceMeters),
            rating: 4,
            basePricePerNight: parseInt(basePrice),
            imageUrl: '/images/default.jpg',
            latitude: 0,
            longitude: 0
        };

        setHotels([newHotel, ...hotels]);
        setName('');
        setLocationName('');
        setDistanceMeters('');
        setBasePrice('');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <HotelIcon className="w-6 h-6 text-emerald-600" /> Hotel Location & Distance Management
                    </h1>
                    <p className="text-xs text-slate-500">Define Haram proximity distances (in meters) to auto-calculate rate multipliers.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Entry Form */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Plus className="w-4 h-4 text-emerald-600" /> Add New Hotel Entry
                    </h2>
                    <form onSubmit={handleAddHotel} className="space-y-3 text-xs">
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Hotel Name</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Makkah Towers" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Holy City</label>
                            <select value={city} onChange={(e) => setCity(e.target.value as any)} className="w-full p-2 border rounded-lg bg-white">
                                <option value="Makkah">Makkah</option>
                                <option value="Madinah">Madinah</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Location / Street Zone</label>
                            <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="e.g. Ibrahim Khalil Road" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Distance from Haram (Meters)</label>
                            <input type="number" required value={distanceMeters} onChange={(e) => setDistanceMeters(e.target.value)} placeholder="e.g. 350" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Base Price / Night (BDT)</label>
                            <input type="number" required value={basePrice} onChange={(e) => setBasePrice(e.target.value)} placeholder="e.g. 8500" className="w-full p-2 border rounded-lg" />
                        </div>
                        <button type="submit" className="w-full py-2 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-700">
                            Save Hotel Record
                        </button>
                    </form>
                </div>

                {/* Hotel Table */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b text-slate-500 uppercase font-bold">
                                <th className="pb-3">Hotel</th>
                                <th className="pb-3">City</th>
                                <th className="pb-3">Haram Distance</th>
                                <th className="pb-3">Base Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {hotels.map((h) => (
                                <tr key={h.id} className="hover:bg-slate-50">
                                    <td className="py-3 font-bold text-slate-800">{h.name}<br /><span className="text-[10px] text-slate-400 font-normal">{h.locationName}</span></td>
                                    <td className="py-3"><span className="px-2 py-0.5 bg-slate-100 rounded font-semibold">{h.city}</span></td>
                                    <td className="py-3 font-bold text-emerald-700">{h.distanceMeters}m</td>
                                    <td className="py-3 font-bold">৳{h.basePricePerNight.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}