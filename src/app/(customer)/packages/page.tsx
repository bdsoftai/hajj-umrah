'use client';

import { useState } from 'react';
import { Ticket, Search, ArrowRight, Maximize2, X, Calendar, Hotel, Users, CheckCircle2 } from 'lucide-react';
import { ALL_PACKAGES, PackageItem } from '@/mock-data/packages';

export default function PackagesPage() {
    // Top-Level Type Filter: 'All' | 'Hajj' | 'Umrah' | 'Ramadan'
    const [mainType, setMainType] = useState<'All' | 'Hajj' | 'Umrah' | 'Ramadan'>('All');

    // Sub Category Filter: 'All' | 'Economy' | 'Standard' | 'Premium' | 'VIP Special'
    const [subCategory, setSubCategory] = useState<string>('All');

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

    // Sub-categories list for Hajj & Umrah
    const SUB_CATEGORIES = ['All', 'Economy', 'Standard', 'Premium', 'VIP Special'];

    // Filter Logic
    const filteredPackages = ALL_PACKAGES.filter((pkg) => {
        // 1. Main Type Matching
        let matchesMain = false;
        if (mainType === 'All') {
            matchesMain = true;
        } else if (mainType === 'Ramadan') {
            matchesMain = pkg.category === 'Ramadan';
        } else if (mainType === 'Hajj') {
            matchesMain = pkg.category.includes('Hajj');
        } else if (mainType === 'Umrah') {
            matchesMain = pkg.category.includes('Umrah');
        }

        // 2. Sub Category Matching (Economy, Standard, etc.)
        let matchesSub = true;
        if (subCategory !== 'All' && mainType !== 'Ramadan') {
            matchesSub = pkg.category.toLowerCase().includes(subCategory.toLowerCase());
        }

        // 3. Search Matching
        const matchesSearch =
            pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.makkahHotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.madinahHotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pkg.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesMain && matchesSub && matchesSearch;
    });

    // Helper counts for main tabs
    const getCountByMainType = (type: string) => {
        if (type === 'All') return ALL_PACKAGES.length;
        if (type === 'Ramadan') return ALL_PACKAGES.filter(p => p.category === 'Ramadan').length;
        if (type === 'Hajj') return ALL_PACKAGES.filter(p => p.category.includes('Hajj')).length;
        if (type === 'Umrah') return ALL_PACKAGES.filter(p => p.category.includes('Umrah')).length;
        return 0;
    };

    return (
        <div className="min-h-screen bg-slate-50 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                        <h1 className="text-lg sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                            <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" /> Fixed Hajj & Umrah Packages
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Explore pre-configured packages divided by Hajj, Umrah, and Ramadan special journeys.
                        </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs text-emerald-800 font-medium w-full sm:w-auto text-center">
                        ✨ Tap any package card to view details in Full Screen!
                    </div>
                </div>

                {/* Filter Controls Container */}
                <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 sm:space-y-4">

                    {/* Top Row: Main Type Selector & Search Input */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center border-b border-slate-100 pb-3">

                        {/* Main Type Tabs (All / Hajj / Umrah / Ramadan) */}
                        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                            {[
                                { id: 'All', label: 'All Packages' },
                                { id: 'Hajj', label: '🕋 Hajj' },
                                { id: 'Umrah', label: '🕌 Umrah' },
                                { id: 'Ramadan', label: '🌙 Ramadan' },
                            ].map((tab) => {
                                const count = getCountByMainType(tab.id);
                                const isActive = mainType === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setMainType(tab.id as any);
                                            setSubCategory('All'); // Reset sub filter when main tab changes
                                        }}
                                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${isActive
                                            ? 'bg-emerald-800 text-white shadow-md'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span className={`text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-950 text-amber-300' : 'bg-slate-200 text-slate-600'
                                            }`}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-72 group">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 transition-all duration-300 group-focus-within:text-emerald-600 group-focus-within:scale-110 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search hotel, package name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 bg-slate-100 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Sub-Categories (Economy, Standard, Premium, VIP Special) */}
                    {mainType !== 'Ramadan' && (
                        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-0.5 scrollbar-none">
                            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 sm:mr-2 shrink-0">
                                {mainType === 'All' ? 'Tier Filter:' : `${mainType} Tier:`}
                            </span>
                            {SUB_CATEGORIES.map((sub) => {
                                const isActive = subCategory === sub;
                                return (
                                    <button
                                        key={sub}
                                        onClick={() => setSubCategory(sub)}
                                        className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all whitespace-nowrap ${isActive
                                            ? 'bg-amber-400 text-slate-900 font-bold shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {sub}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* PACKAGE GRID (MOBILE: 2 CARDS PER ROW, DESKTOP: 3 CARDS PER ROW) */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
                    {filteredPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
                        >
                            <div>
                                {/* Package Image Banner */}
                                <div className="relative h-28 sm:h-44 w-full overflow-hidden bg-slate-100">
                                    <img
                                        src={pkg.imageUrl}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

                                    {/* Badges on Top of Image */}
                                    <div className="absolute top-1.5 sm:top-3 left-1.5 sm:left-3 right-1.5 sm:right-3 flex justify-between items-center gap-1">
                                        <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-emerald-800/90 text-white backdrop-blur-md text-[8px] sm:text-[10px] font-extrabold rounded-md sm:rounded-lg uppercase tracking-wide truncate max-w-[70%]">
                                            {pkg.category}
                                        </span>
                                        {pkg.badge && (
                                            <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 bg-amber-400 text-slate-900 text-[8px] sm:text-[10px] font-extrabold rounded-md sm:rounded-lg uppercase shadow-sm shrink-0">
                                                {pkg.badge}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-3">
                                    <h3 className="font-bold text-slate-900 text-xs sm:text-base line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                                        {pkg.title}
                                    </h3>

                                    {/* Essential Info List */}
                                    <div className="space-y-1 text-[10px] sm:text-xs text-slate-600 bg-slate-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-slate-100">
                                        <p className="truncate">
                                            <span className="font-semibold text-slate-800">🕋</span> {pkg.makkahHotel}
                                        </p>
                                        <p className="truncate">
                                            <span className="font-semibold text-slate-800">🕌</span> {pkg.madinahHotel}
                                        </p>
                                        <div className="flex justify-between items-center text-slate-500 pt-1 border-t border-slate-200 text-[9px] sm:text-xs">
                                            <span>⏳ {pkg.durationDays}D</span>
                                            <span>🛏️ {pkg.sharingType.split(' ')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="p-2.5 sm:p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-1 sm:gap-2">
                                <div>
                                    <span className="text-[8px] sm:text-[10px] text-slate-400 block uppercase font-bold">/ Person</span>
                                    <span className="text-xs sm:text-lg font-black text-emerald-700">
                                        ৳{pkg.pricePerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedPackage(pkg);
                                    }}
                                    className="p-1.5 sm:px-3 sm:py-2 bg-emerald-800 text-white font-bold text-[10px] sm:text-xs rounded-lg sm:rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                                >
                                    <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span className="hidden sm:inline">Details</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPackages.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                        <p className="text-slate-500 font-semibold text-xs sm:text-sm">No packages found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* FULLSCREEN POPUP MODAL */}
            {selectedPackage && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
                    onClick={() => setSelectedPackage(null)}
                >
                    <div
                        className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative overflow-hidden animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header Image */}
                        <div className="relative h-40 sm:h-64 w-full bg-slate-200">
                            <img
                                src={selectedPackage.imageUrl}
                                alt={selectedPackage.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

                            <button
                                onClick={() => setSelectedPackage(null)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-slate-900/50 hover:bg-slate-900/80 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white space-y-1">
                                <div className="flex gap-2 items-center">
                                    <span className="px-2 sm:px-3 py-0.5 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-bold rounded-md uppercase">
                                        {selectedPackage.category} Package
                                    </span>
                                    {selectedPackage.badge && (
                                        <span className="px-2 sm:px-3 py-0.5 bg-amber-400 text-slate-900 text-[9px] sm:text-[10px] font-bold rounded-md uppercase">
                                            {selectedPackage.badge}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-base sm:text-2xl font-extrabold line-clamp-1">{selectedPackage.title}</h2>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-8 space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-emerald-50/60 rounded-xl sm:rounded-2xl border border-emerald-100 space-y-1">
                                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                                        <Hotel className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" /> Makkah Accommodation
                                    </div>
                                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPackage.makkahHotel}</p>
                                    <p className="text-[11px] sm:text-xs text-slate-600">📍 Distance: <span className="font-semibold">{selectedPackage.makkahDistance}</span></p>
                                </div>

                                <div className="p-3 sm:p-4 bg-amber-50/60 rounded-xl sm:rounded-2xl border border-amber-100 space-y-1">
                                    <div className="flex items-center gap-2 text-amber-900 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                                        <Hotel className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" /> Madinah Accommodation
                                    </div>
                                    <p className="text-xs sm:text-sm font-extrabold text-slate-900">{selectedPackage.madinahHotel}</p>
                                    <p className="text-[11px] sm:text-xs text-slate-600">📍 Distance: <span className="font-semibold">{selectedPackage.madinahDistance}</span></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 text-xs sm:text-sm">
                                <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 sm:gap-3">
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                                    <div>
                                        <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">Duration</span>
                                        <span className="font-bold text-slate-800 text-[11px] sm:text-sm">{selectedPackage.durationDays} Days / {selectedPackage.durationDays - 1} N</span>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2 sm:gap-3">
                                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 shrink-0" />
                                    <div>
                                        <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase font-bold">Sharing</span>
                                        <span className="font-bold text-slate-800 text-[11px] sm:text-sm">{selectedPackage.sharingType}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 sm:space-y-3">
                                <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider">Package Inclusions:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {selectedPackage.inclusions.map((inc, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-100">
                                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0" />
                                            <span className="text-slate-700 font-medium text-[11px] sm:text-xs">{inc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="pt-3 sm:pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                                <div>
                                    <span className="text-[10px] sm:text-xs text-slate-400 block uppercase font-bold">Price per Pilgrim</span>
                                    <span className="text-lg sm:text-2xl font-black text-emerald-700">
                                        ৳{selectedPackage.pricePerPerson.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={() => setSelectedPackage(null)}
                                        className="px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href="/custom-builder"
                                        className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors text-center flex items-center justify-center gap-2"
                                    >
                                        Proceed to Book <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}