'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ContactPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    category: 'kids_youth',
                    estimatedParticipants: 10,
                }),
            });
            setSubmitted(true);
            setFormData({ fullName: '', email: '', phone: '', notes: '' });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    {isAr ? 'تواصل مع فريق ماجيكا زون' : 'Contact Magica Zone'}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                    {isAr
                        ? 'نحن هنا للإجابة على كافة استفساراتكم وتنسيق تفاصيل فعالياتكم ومعسكراتكم.'
                        : 'Get in touch with our event facilitators to plan your school camp or corporate team building.'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact Info Cards */}
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{isAr ? 'الهاتف المباشر' : 'Direct Phone'}</h3>
                            <a href="tel:+201003937096" className="text-xs text-blue-600 font-semibold hover:underline block mt-1">
                                +20 10 03937096
                            </a>
                            <p className="text-[11px] text-gray-400">{isAr ? 'متاح طوال أيام الأسبوع' : 'Available all week'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{isAr ? 'محادثة الواتساب' : 'WhatsApp Chat'}</h3>
                            <a
                                href="https://wa.me/201003937096"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-emerald-600 font-semibold hover:underline block mt-1"
                            >
                                +20 10 03937096
                            </a>
                            <p className="text-[11px] text-gray-400">{isAr ? 'رد سريع وفوري' : 'Instant response'}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</h3>
                            <a href="mailto:info@magica-group.com" className="text-xs text-purple-600 font-semibold hover:underline block mt-1">
                                info@magica-group.com
                            </a>
                            <p className="text-[11px] text-gray-400">info@magica-group.com</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">{isAr ? 'المقر والتغطية' : 'Headquarters & Locations'}</h3>
                            <p className="text-xs text-gray-700 mt-1">{isAr ? 'القاهرة الجديدة، مصر' : 'New Cairo, Egypt'}</p>
                            <p className="text-[11px] text-gray-400">{isAr ? 'نغطي كافة المحافظات' : 'Serving nationwide & MENA'}</p>
                        </div>
                    </div>
                </div>

                {/* Message Form */}
                <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {isAr ? 'أرسل لنا استفسارك مباشرة' : 'Send Us a Quick Message'}
                    </h2>
                    <p className="text-xs text-gray-500 mb-6">
                        {isAr ? 'املأ النموذج وسيتواصل معك أحد منسقي الفعاليات.' : 'Fill out the form below and an event manager will reach out.'}
                    </p>

                    {submitted ? (
                        <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
                            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                            <h3 className="text-base font-bold text-emerald-900">{isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message Sent Successfully!'}</h3>
                            <p className="text-xs text-emerald-700">{isAr ? 'شكراً لتواصلك معنا. سنقوم بالرد خلال 24 ساعة.' : 'Thank you for contacting us. We will reply within 24 hours.'}</p>
                            <button onClick={() => setSubmitted(false)} className="mt-2 text-xs font-semibold text-emerald-800 underline">
                                {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'الاسم *' : 'Your Name *'}</label>
                                    <input
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}</label>
                                <input
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-gray-700 mb-1">{isAr ? 'نص الرسالة أو متطلبات الفعالية *' : 'Your Message / Inquiry *'}</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                <span>{loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الرسالة' : 'Send Message')}</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
