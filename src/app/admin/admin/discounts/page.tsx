'use client';

import { useState } from 'react';
import { MOCK_COUPONS, Coupon } from '@/mock-data/coupons';
import { Tag, Plus, Clock } from 'lucide-react';

export default function AdminDiscountsPage() {
    const [coupons, setCoupons] = useState<Record<string, Coupon>>(MOCK_COUPONS);
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateCoupon = (e: React.FormEvent) => {
        e.preventDefault();
        if (!code || !amount) return;

        const newCode = code.toUpperCase().trim();
        const newCoupon: Coupon = {
            code: newCode,
            discountAmount: parseInt(amount),
            type: 'fixed',
            description: description || `${newCode} Special Promo Code`,
        };

        setCoupons({ ...coupons, [newCode]: newCoupon });
        setCode('');
        setAmount('');
        setDescription('');
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Tag className="w-6 h-6 text-amber-500" /> Exclusive Discount & Coupon System
                </h1>
                <p className="text-xs text-slate-500">Create promo codes and time-limited deals for customer checkout discount deduction.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Create Form */}
                <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Plus className="w-4 h-4 text-emerald-600" /> Create Promo Code
                    </h2>
                    <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Coupon Code</label>
                            <input type="text" required value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. EID2026" className="w-full p-2 border rounded-lg uppercase font-bold" />
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Flat Discount Amount (BDT)</label>
                            <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 7500" className="w-full p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block font-semibold text-slate-600 mb-1">Offer Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Eid Special Discount" className="w-full p-2 border rounded-lg" />
                        </div>
                        <button type="submit" className="w-full py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">
                            Publish Coupon
                        </button>
                    </form>
                </div>

                {/* Coupons List */}
                <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="border-b text-slate-500 uppercase font-bold">
                                <th className="pb-3">Code</th>
                                <th className="pb-3">Type</th>
                                <th className="pb-3">Discount Value</th>
                                <th className="pb-3">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {Object.values(coupons).map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-slate-50">
                                    <td className="py-3 font-mono font-bold text-amber-700 bg-amber-50/50 px-2 rounded w-fit">{coupon.code}</td>
                                    <td className="py-3 font-semibold uppercase text-slate-500">{coupon.type}</td>
                                    <td className="py-3 font-bold text-emerald-700">
                                        {coupon.type === 'fixed' ? `৳${coupon.discountAmount.toLocaleString()}` : `${coupon.percentage}%`}
                                    </td>
                                    <td className="py-3 text-slate-600">{coupon.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}