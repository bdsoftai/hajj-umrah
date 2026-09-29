'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Compass,
    User,
    LayoutDashboard,
    Ticket,
    Sparkles,
    Search,
    Bell,
    Menu,
} from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        {
            href: '/packages',
            label: 'Packages',
            icon: <Ticket className="w-5 h-5" />,
            match: '/packages',
        },
        {
            href: '/custom-builder',
            label: 'Builder',
            icon: <Sparkles className="w-5 h-5" />,
            match: '/custom-builder',
            highlight: true,
        },
        {
            href: '/dashboard',
            label: 'Portal',
            icon: <User className="w-5 h-5" />,
            match: '/dashboard',
        },
        {
            href: '/hotels',
            label: 'Hotels',
            icon: <LayoutDashboard className="w-5 h-5" />,
            match: '/hotels',
        },
    ];

    const isActive = (matchPath: string) => pathname === matchPath;

    return (
        <>
            {/* ========================================= */}
            {/* --- Top Navbar (Desktop + Mobile Header) --- */}
            {/* ========================================= */}
            <header className="sticky top-0 z-50 bg-emerald-950 text-white shadow-lg border-b border-emerald-800">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-base sm:text-xl tracking-tight text-emerald-400 shrink-0"
                    >
                        <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
                        <span className="hidden xs:inline sm:inline">
                            HajjUmrah<span className="text-amber-400">Portal</span>
                        </span>
                    </Link>

                    {/* ========================================= */}
                    {/* --- Mobile: Standard Top Bar Icons --- */}
                    {/* ========================================= */}
                    <div className="flex md:hidden items-center gap-1">
                        {/* Search */}
                        <button
                            aria-label="Search"
                            className="p-2 rounded-full hover:bg-emerald-900 active:bg-emerald-800 transition-colors"
                        >
                            <Search className="w-5 h-5 text-emerald-200" />
                        </button>

                        {/* Notifications */}
                        <button
                            aria-label="Notifications"
                            className="relative p-2 rounded-full hover:bg-emerald-900 active:bg-emerald-800 transition-colors"
                        >
                            <Bell className="w-5 h-5 text-emerald-200" />
                            {/* Notification dot */}
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-emerald-950" />
                        </button>

                        {/* Menu / Profile */}
                        <button
                            aria-label="Menu"
                            className="p-2 rounded-full hover:bg-emerald-900 active:bg-emerald-800 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-emerald-200" />
                        </button>
                    </div>

                    {/* ========================================= */}
                    {/* --- Desktop Nav --- */}
                    {/* ========================================= */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/packages"
                            className="hover:text-amber-400 transition-colors flex items-center gap-1"
                        >
                            <Ticket className="w-4 h-4" /> Packages
                        </Link>

                        <Link
                            href="/custom-builder"
                            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-400 font-semibold"
                        >
                            ✨ Custom Package Builder
                        </Link>

                        <Link
                            href="/dashboard"
                            className="hover:text-amber-400 transition-colors flex items-center gap-1"
                        >
                            <User className="w-4 h-4" /> Pilgrim Portal
                        </Link>

                        <Link
                            href="/hotels"
                            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors text-xs flex items-center gap-1"
                        >
                            <LayoutDashboard className="w-3.5 h-3.5" /> Visit our Hotel
                        </Link>
                    </nav>
                </div>
            </header>

            {/* ========================================= */}
            {/* --- Mobile Bottom Navigation (App-style) --- */}
            {/* ========================================= */}
            <nav
                className="
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-emerald-950 border-t border-emerald-800
          shadow-[0_-4px_12px_rgba(0,0,0,0.35)]
          pb-[env(safe-area-inset-bottom)]
        "
            >
                <ul className="grid grid-cols-4 h-16">
                    {navItems.map((item) => {
                        const active = isActive(item.match);
                        return (
                            <li key={item.href} className="flex relative">
                                <Link
                                    href={item.href}
                                    className={`
                    flex flex-col items-center justify-center w-full gap-1
                    transition-colors text-[11px] font-medium
                    ${active
                                            ? 'text-amber-400'
                                            : item.highlight
                                                ? 'text-amber-300'
                                                : 'text-emerald-200/80 hover:text-amber-400'
                                        }
                  `}
                                >
                                    <span
                                        className={`
                      flex items-center justify-center
                      ${active ? 'scale-110' : ''}
                      transition-transform
                    `}
                                    >
                                        {item.icon}
                                    </span>
                                    <span className="leading-none">{item.label}</span>

                                    {/* Active indicator bar */}
                                    <span
                                        className={`
                      absolute top-0 h-[3px] w-10 rounded-full bg-amber-400
                      transition-opacity duration-300
                      ${active ? 'opacity-100' : 'opacity-0'}
                    `}
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Spacer for bottom nav */}
            <div className="md:hidden h-16" aria-hidden="true" />
        </>
    );
}