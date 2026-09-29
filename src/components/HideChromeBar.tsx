'use client';
import { useEffect } from 'react';

export default function HideChromeBar() {
    useEffect(() => {
        // Small scroll triggers Chrome/Safari to collapse their address bar
        window.scrollTo(0, 1);
        const t = setTimeout(() => window.scrollTo(0, 1), 300);
        return () => clearTimeout(t);
    }, []);
    return null;
}