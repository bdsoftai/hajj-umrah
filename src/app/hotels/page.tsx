'use client';

import { useMemo, useState } from 'react';
import { Building2, Search, MapPin } from 'lucide-react';
import { MOCK_HOTELS } from '@/mock-data/hotels';
import HotelCard from '@/components/HotelCard';

type CityFilter = 'All' | 'Makkah' | 'Madinah';

export default function HotelsPage() {
    const [cityFilter, setCityFilter] = useState<CityFilter>('All');
    const [search, setSearch] = useState('');

    const filteredHotels = useMemo(() => {
        return MOCK_HOTELS.filter((h) => {
            const matchCity = cityFilter === 'All' || h.city === cityFilter;
            const matchSearch =
                h.name.toLowerCase().includes(search.toLowerCase()) ||
                h.locationName.toLowerCase().includes(search.toLowerCase());
            return matchCity && matchSearch;
        });
    }, [cityFilter, search]);

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
                        <Building2 className="w-7 h-7 text-emerald-600" />
                        Hotels in Makkah & Madinah
                    </h1>
                    <p className="text-sm text-slate-600 mt-1">
                        Browse premium hotels near Masjid al-Haram and Masjid an-Nabawi with real distances and maps.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search hotel or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['All', 'Makkah', 'Madinah'] as CityFilter[]).map((city) => (
                            <button
                                key={city}
                                onClick={() => setCityFilter(city)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${cityFilter === city
                                        ? 'bg-emerald-600 text-white shadow'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Hotel Grid: 2 cols mobile → 3 tablet → 4 desktop */}
                {filteredHotels.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                        <MapPin className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                        <p className="font-semibold">No hotels found</p>
                        <p className="text-xs mt-1">Try adjusting your search or filter.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {filteredHotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}