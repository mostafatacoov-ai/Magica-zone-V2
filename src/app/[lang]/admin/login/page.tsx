'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Lock, User, AlertCircle, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const router = useRouter();

    const [usernameOrEmail, setUsernameOrEmail] = useState('admin@magica-group.com');
    const [password, setPassword] = useState('magica2026!');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail, password }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || 'Login failed');

            // Successful admin authentication -> redirect to Admin CMS
            router.push(`/${params.lang}/admin`);
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'Failed to authenticate admin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF5E6]/60 via-[#FFFAF0] to-white">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-amber-200/70 shadow-2xl space-y-6">
                {/* Header Badge */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-1 border border-blue-100 shadow-sm">
                        <Shield className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        {isAr ? 'لوحة تحكم إدارة ماجيكا زون' : 'Magica Admin Portal'}
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                        {isAr ? 'تسجيل الدخول المخصص لمديري النظام وفريق العمل' : 'Secure authentication for administrators & staff'}
                    </p>
                </div>

                {error && (
                    <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
                    <div>
                        <label className="block font-bold text-gray-700 mb-1">
                            {isAr ? 'اسم المستخدم أو البريد الإلكتروني' : 'Admin Username / Email'}
                        </label>
                        <div className="relative">
                            <User className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                            <input
                                required
                                type="text"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-bold text-gray-700 mb-1">
                            {isAr ? 'كلمة مرور الإدارة' : 'Admin Password'}
                        </label>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none font-medium"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50 mt-2"
                    >
                        {loading ? (isAr ? 'جاري التحقق...' : 'Authenticating...') : (isAr ? 'دخول لوحة الإدارة' : 'Sign In as Administrator')}
                    </button>
                </form>

                <div className="text-center text-xs text-gray-400 pt-3 border-t border-gray-100">
                    <Link href={`/${params.lang}`} className="hover:text-blue-600 font-bold transition-colors">
                        {isAr ? '← العودة للموقع الرئيسي' : '← Back to Public Website'}
                    </Link>
                </div>
            </div>
        </main>
    );
}