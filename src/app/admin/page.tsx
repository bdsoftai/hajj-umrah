import { Hotel, Tag, Users, ShieldAlert } from 'lucide-react';

export default function AdminDashboardPage() {
    return (
        <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Back-Office Admin Portal</h1>
                <p className="text-slate-500 text-sm">Manage hotel distance metrics, discount promo codes, and document validation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg"><Hotel className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Listed Hotels</p>
                        <p className="text-xl font-bold text-slate-900">6 Hotels</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-800 rounded-lg"><Tag className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Active Coupons</p>
                        <p className="text-xl font-bold text-slate-900">3 Promos</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-lg"><Users className="w-6 h-6" /></div>
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase">Pending Bookings</p>
                        <p className="text-xl font-bold text-slate-900">12 Bookings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}