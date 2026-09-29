import Link from 'next/link';
import { Compass, User, LayoutDashboard, Ticket } from 'lucide-react';

export default function  Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-emerald-950 text-white shadow-lg border-b border-emerald-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-[#center] justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-400">
                    <Compass className="w-7 h-7 text-amber-400" />
                    <span>HajjUmrah<span className="text-amber-400">Portal</span></span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/packages" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                        <Ticket className="w-4 h-4" /> Packages
                    </Link>
                    <Link href="/custom-builder" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-400 font-semibold">
                        ✨ Custom Package Builder
                    </Link>
                    <Link href="/dashboard" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                        <User className="w-4 h-4" /> Pilgrim Portal
                    </Link>
                    <Link href="/hotels" className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors text-xs flex items-center gap-1">
                        <LayoutDashboard className="w-3.5 h-3.5" /> Visit our Hotel
                    </Link>
                </nav>
            </div>
        </header>
    );
}