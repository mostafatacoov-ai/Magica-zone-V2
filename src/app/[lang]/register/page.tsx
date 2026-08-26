'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, Phone, User, AlertCircle } from 'lucide-react';

export default function RegisterPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Registration failed');

      router.push(`/${params.lang}/dashboard`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {isAr ? 'إنشاء حساب طالب جديد' : 'Create Student Account'}
          </h1>
          <p className="text-xs text-gray-500">
            {isAr ? 'انضم إلى ماجيكا زون وتابع دوراتك وورشك التفاعلية' : 'Join Magica Zone to access workshops and assignments'}
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'كلمة المرور *' : 'Password *'}</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? (isAr ? 'جاري إنشاء الحساب...' : 'Creating Account...') : (isAr ? 'إنشاء الحساب' : 'Create Account')}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>{isAr ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}</span>
          <Link href={`/${params.lang}/login`} className="font-bold text-blue-600 hover:underline">
            {isAr ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        </div>
      </div>
    </main>
  );
}