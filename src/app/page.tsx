'use client';

import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Clock,
  Hotel,
  Plane,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  MapPin,
  PhoneCall,
  FileText,
  HeartHandshake
} from 'lucide-react';
import AboutUs from '@/components/AboutUs';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      <HeroSection />

      {/* 1. HERO SECTION */}
      <section className="relative bg-emerald-950 text-white overflow-hidden py-16 sm:py-24 border-b border-emerald-800">
        {/* Background Subtle Geometric Glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-700/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/50 text-amber-400 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4" /> Trusted Hajj & Umrah Partner in Bangladesh
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Begin Your Sacred Journey With <span className="text-amber-400">Complete Peace</span> of Mind
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Design your custom Umrah package based on exact hotel distance from Haram, budget, and travel dates. Instant transparent pricing with live visa tracking.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  href="/custom-builder"
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-extrabold rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Sparkles className="w-4 h-4 fill-emerald-950" /> Build Custom Package
                </Link>

                <Link
                  href="/packages"
                  className="px-6 py-3.5 bg-emerald-900 hover:bg-emerald-850 text-white font-bold rounded-xl border border-emerald-700 hover:border-emerald-600 transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Explore Fixed Packages <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-emerald-900/80 grid grid-cols-3 gap-4 text-center lg:text-left text-xs text-slate-300">
                <div>
                  <span className="block font-black text-white text-base sm:text-lg text-amber-400">100%</span>
                  <span>Guaranteed Haram Distance</span>
                </div>
                <div>
                  <span className="block font-black text-white text-base sm:text-lg text-amber-400">Nusuk</span>
                  <span>Direct Saudi Visa Portal</span>
                </div>
                <div>
                  <span className="block font-black text-white text-base sm:text-lg text-amber-400">24/7</span>
                  <span>Dedicated Muallim Guide</span>
                </div>
              </div>
            </div>
        
            {/* Right Column: Hero Calculator Quick Teaser */}
            <div className="lg:col-span-5 bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-100 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-700" /> Quick Umrah Estimate
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">Live Fare</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Number of Pilgrims</label>
                  <select className="w-full p-2.5 bg-slate-50 border rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <option>1 Adult Pilgrim</option>
                    <option defaultValue="selected">2 Pilgrims (Couple / Family)</option>
                    <option>4 Pilgrims (Group)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Makkah Hotel Proximity</label>
                  <select className="w-full p-2.5 bg-slate-50 border rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <option>0m - 100m (Clock Tower / Courtyard)</option>
                    <option>100m - 400m (5 Min Walking)</option>
                    <option>500m - 900m (Free Shuttle Bus Service)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 mb-1">Duration & Season</label>
                  <select className="w-full p-2.5 bg-slate-50 border rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <option>14 Days Standard Season</option>
                    <option>10 Days Express Trip</option>
                    <option>15 Days Ramadan Package</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Estimated Starting From</span>
                  <span className="text-xl font-extrabold text-emerald-800">৳1,35,000 <span className="text-xs text-slate-500 font-normal">/person</span></span>
                </div>
                <Link
                  href="/custom-builder"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  Configure Now
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <AboutUs />

      {/* 2. WHY CHOOSE US (KEY FEATURES) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Unmatched Services</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Designed For Your Comfort & Devotion</h2>
          <p className="text-xs sm:text-sm text-slate-500">We remove all logistics hassles so you can focus entirely on your Ibadah.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Hotel Proximity</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No misleading promises. We measure exact meter distances from Haram courtyards in Makkah and Madinah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Instant Visa & Passport OCR</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your passport directly for automated OCR reading and real-time Nusuk E-Visa status updates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6 text-emerald-700" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Flexible Installment Plan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Book with a low advance booking fee and pay the rest in easy installments before your departure date.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PACKAGES PREVIEW */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Handcrafted Packages</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular Hajj & Umrah Offers</h2>
            </div>
            <Link
              href="/packages"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-700 flex items-center gap-1"
            >
              View All 30+ Packages <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Package 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md uppercase">
                  Economy Category
                </span>
                <h3 className="font-bold text-slate-900 text-lg">14 Days Basic Umrah Saver</h3>
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="flex justify-between"><span>🕋 Makkah:</span> <strong>Kiswah Towers (Shuttle)</strong></p>
                  <p className="flex justify-between"><span>🕌 Madinah:</span> <strong>Ansar Palace (600m)</strong></p>
                  <p className="flex justify-between"><span>⏳ Duration:</span> <strong>14 Days / 13 Nights</strong></p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting From</span>
                  <span className="text-xl font-black text-emerald-700">৳1,35,000</span>
                </div>
                <Link href="/packages" className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-lg hover:bg-emerald-700">
                  Book Package
                </Link>
              </div>
            </div>

            {/* Package 2 */}
            <div className="bg-white rounded-2xl border-2 border-emerald-600 overflow-hidden shadow-md relative flex flex-col justify-between">
              <div className="bg-emerald-600 text-white text-[10px] font-bold uppercase text-center py-1">
                Most Preferred Choice
              </div>
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md uppercase">
                  Standard 4-Star
                </span>
                <h3 className="font-bold text-slate-900 text-lg">14 Days Deluxe Clock Tower</h3>
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="flex justify-between"><span>🕋 Makkah:</span> <strong>Swissotel Al Maqam (0m)</strong></p>
                  <p className="flex justify-between"><span>🕌 Madinah:</span> <strong>Saja Al Madinah (350m)</strong></p>
                  <p className="flex justify-between"><span>⏳ Duration:</span> <strong>14 Days / 13 Nights</strong></p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting From</span>
                  <span className="text-xl font-black text-emerald-700">৳1,85,000</span>
                </div>
                <Link href="/packages" className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-lg hover:bg-emerald-700">
                  Book Package
                </Link>
              </div>
            </div>

            {/* Package 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="p-6 space-y-4">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md uppercase">
                  5-Star Premium VIP
                </span>
                <h3 className="font-bold text-slate-900 text-lg">10 Days Royal Clock Tower VIP</h3>
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <p className="flex justify-between"><span>🕋 Makkah:</span> <strong>Raffles Makkah Palace</strong></p>
                  <p className="flex justify-between"><span>🕌 Madinah:</span> <strong>Oberoi Madinah (0m)</strong></p>
                  <p className="flex justify-between"><span>⏳ Duration:</span> <strong>10 Days VIP Stay</strong></p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Starting From</span>
                  <span className="text-xl font-black text-emerald-700">৳2,95,000</span>
                </div>
                <Link href="/packages" className="px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded-lg hover:bg-emerald-700">
                  Book Package
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Simple Process</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">How To Book Your Pilgrimage</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-800 text-white font-bold rounded-full flex items-center justify-center mx-auto text-sm">1</div>
            <h4 className="font-bold text-slate-900 text-sm">Select or Build Package</h4>
            <p className="text-xs text-slate-500">Choose fixed packages or customize your hotels and room sharing.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-800 text-white font-bold rounded-full flex items-center justify-center mx-auto text-sm">2</div>
            <h4 className="font-bold text-slate-900 text-sm">Upload Passport Details</h4>
            <p className="text-xs text-slate-500">Scan or upload passport copies for quick automated visa processing.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-800 text-white font-bold rounded-full flex items-center justify-center mx-auto text-sm">3</div>
            <h4 className="font-bold text-slate-900 text-sm">Pay Advance Booking Fee</h4>
            <p className="text-xs text-slate-500">Secure your seats with bKash, card, or bank deposit.</p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <div className="w-10 h-10 bg-emerald-800 text-white font-bold rounded-full flex items-center justify-center mx-auto text-sm">4</div>
            <h4 className="font-bold text-slate-900 text-sm">Track Visa & Depart</h4>
            <p className="text-xs text-slate-500">Get live Nusuk visa updates and meet your group leader at the airport.</p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-emerald-950 text-white border-t border-emerald-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-300">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg text-emerald-400">
              <Compass className="w-6 h-6 text-amber-400" /> HajjUmrahPortal
            </div>
            <p className="text-slate-400">
              Government licensed Hajj & Umrah agency providing transparent, distance-guaranteed pilgrimage packages.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Links</h5>
            <ul className="space-y-1.5">
              <li><Link href="/packages" className="hover:text-amber-400">Fixed Packages</Link></li>
              <li><Link href="/custom-builder" className="hover:text-amber-400">Custom Package Builder</Link></li>
              <li><Link href="/dashboard" className="hover:text-amber-400">Pilgrim Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Admin & Management</h5>
            <ul className="space-y-1.5">
              <li><Link href="/admin" className="hover:text-amber-400">Admin Dashboard</Link></li>
              <li><Link href="/admin/hotels" className="hover:text-amber-400">Hotel Distance Entry</Link></li>
              <li><Link href="/admin/discounts" className="hover:text-amber-400">Promo Code Manager</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact & Support</h5>
            <p className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-amber-400" /> +880 1700-000000</p>
            <p>House 12, Road 5, Dhanmondi, Dhaka, Bangladesh</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-emerald-900 text-center text-[11px] text-slate-400">
          © 2026 HajjUmrahPortal. All rights reserved. Designed for spiritual excellence.
        </div>
      </footer>

    </div>
  );
}