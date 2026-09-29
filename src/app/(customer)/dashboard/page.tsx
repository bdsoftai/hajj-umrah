'use client';

import { useState } from 'react';
import { User, FileText, Upload, CheckCircle2, Clock, AlertCircle, Eye, Download, ShieldCheck } from 'lucide-react';

interface PassportDoc {
    id: string;
    name: string;
    passportNo: string;
    status: 'Pending' | 'Verified' | 'Rejected';
    fileName: string;
}

export default function CustomerDashboardPage() {
    const [activeTab, setActiveTab] = useState<'tracking' | 'documents' | 'payments'>('tracking');
    const [passports, setPassports] = useState<PassportDoc[]>([
        { id: '1', name: 'Md. Zaeem Siraji', passportNo: 'A01234567', status: 'Verified', fileName: 'passport_zaeem.pdf' },
    ]);
    const [newPassengerName, setNewPassengerName] = useState('');
    const [newPassportNo, setNewPassportNo] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPassengerName || !newPassportNo) return;

        setUploading(true);
        setTimeout(() => {
            setPassports([
                ...passports,
                {
                    id: Date.now().toString(),
                    name: newPassengerName,
                    passportNo: newPassportNo,
                    status: 'Pending',
                    fileName: `passport_${newPassportNo.toLowerCase()}.pdf`,
                },
            ]);
            setNewPassengerName('');
            setNewPassportNo('');
            setUploading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* User Header */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xl">
                            ZS
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Assalamu Alaikum, Md. Zaeem Siraji</h1>
                            <p className="text-xs text-slate-500">Booking Ref: <span className="font-mono font-bold text-slate-700">HU-2026-9082</span> | 14 Days Premium Umrah</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Booking Confirmed
                    </span>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-sm">
                    <button
                        onClick={() => setActiveTab('tracking')}
                        className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'tracking' ? 'bg-emerald-800 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        📍 Live Visa & Itinerary Tracking
                    </button>
                    <button
                        onClick={() => setActiveTab('documents')}
                        className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'documents' ? 'bg-emerald-800 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        📄 Passport & OCR Documents
                    </button>
                    <button
                        onClick={() => setActiveTab('payments')}
                        className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'payments' ? 'bg-emerald-800 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        💳 Installment Payments
                    </button>
                </div>

                {/* Tab 1: Live Visa Tracking */}
                {activeTab === 'tracking' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                        <h2 className="text-base font-bold text-slate-900 border-b pb-3">Nusuk / Saudi E-Visa Application Lifecycle</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                                <div className="flex items-center justify-between text-emerald-800 font-bold text-xs">
                                    <span>Step 1: Document OCR</span>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <p className="text-xs text-slate-600">Passport verified & encoded.</p>
                            </div>

                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                                <div className="flex items-center justify-between text-emerald-800 font-bold text-xs">
                                    <span>Step 2: MOFA Submission</span>
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                </div>
                                <p className="text-xs text-slate-600">Submitted to Saudi Portal.</p>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                                <div className="flex items-center justify-between text-amber-800 font-bold text-xs">
                                    <span>Step 3: Stamping Process</span>
                                    <Clock className="w-4 h-4 text-amber-600 animate-spin" />
                                </div>
                                <p className="text-xs text-slate-600">In Progress (1-2 Working Days).</p>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1 opacity-60">
                                <div className="flex items-center justify-between text-slate-600 font-bold text-xs">
                                    <span>Step 4: E-Visa Issuance</span>
                                    <AlertCircle className="w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-xs text-slate-500">Pending final approval.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Passport Upload Section */}
                {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <Upload className="w-4 h-4 text-emerald-600" /> Upload Passenger Passport
                            </h2>
                            <form onSubmit={handleUpload} className="space-y-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name (As on Passport)</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPassengerName}
                                        onChange={(e) => setNewPassengerName(e.target.value)}
                                        placeholder="e.g. Md. Tanvir Ahmed"
                                        className="w-full px-3 py-2 border rounded-lg text-xs"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Passport Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={newPassportNo}
                                        onChange={(e) => setNewPassportNo(e.target.value)}
                                        placeholder="e.g. B09876543"
                                        className="w-full px-3 py-2 border rounded-lg text-xs font-mono uppercase"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1">Passport Scan Copy (PDF/JPG)</label>
                                    <input type="file" required accept="image/*,application/pdf" className="w-full text-xs text-slate-500 border rounded-lg p-2" />
                                </div>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="w-full py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    {uploading ? 'Processing OCR Scanning...' : 'Submit Passport Document'}
                                </button>
                            </form>
                        </div>

                        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h2 className="text-base font-bold text-slate-900">Submitted Documents</h2>
                            <div className="divide-y divide-slate-100">
                                {passports.map((doc) => (
                                    <div key={doc.id} className="py-3 flex items-center justify-between text-xs">
                                        <div>
                                            <p className="font-bold text-slate-800">{doc.name}</p>
                                            <p className="text-slate-500 font-mono">No: {doc.passportNo} • {doc.fileName}</p>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                            }`}>
                                            {doc.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: Payment Tracker */}
                {activeTab === 'payments' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                        <h2 className="text-base font-bold text-slate-900 border-b pb-3">Installment & Voucher Statement</h2>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <div>
                                    <p className="font-bold text-slate-800">1st Installment (Booking Advance)</p>
                                    <p className="text-slate-500">Paid via bKash Online Payment</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-emerald-700">৳50,000 Paid</p>
                                    <button className="text-emerald-800 underline font-bold text-[11px] flex items-center gap-1 justify-end">
                                        <Download className="w-3 h-3" /> Voucher PDF
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                    <p className="font-bold text-slate-800">2nd Installment (Final Balance)</p>
                                    <p className="text-slate-500">Due before 15 October 2026</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-800">৳1,40,000 Due</p>
                                    <button className="px-3 py-1 bg-emerald-800 text-white rounded font-bold text-[10px] mt-1">Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}