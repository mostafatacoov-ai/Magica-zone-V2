'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="text-center space-y-2">
                <div className="inline-flex p-2.5 rounded-xl bg-blue-50 text-blue-600 mb-2">
                    <Shield className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    {isAr ? 'سياسة الخصوصية وحماية البيانات' : 'Privacy & Data Protection Policy'}
                </h1>
                <p className="text-xs text-gray-500">
                    {isAr ? 'آخر تحديث: أغسطس 2026' : 'Last Updated: August 2026'}
                </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6 text-xs sm:text-sm text-gray-600 leading-relaxed">
                <section className="space-y-2">
                    <h2 className="text-base font-bold text-gray-900">
                        {isAr ? '1. جمع واستخدام البيانات' : '1. Information We Collect'}
                    </h2>
                    <p>
                        {isAr
                            ? 'نحن نجمع البيانات الضرورية فقط لتنسيق فعاليات بناء الفرق، المعسكرات، وتسجيل الطلاب في الورش التدريبية (مثل: الاسم، البريد الإلكتروني، رقم الهاتف، والبيانات اللوجستية للفعالية).'
                            : 'We collect information necessary to coordinate team building events, school camps, and student workshop registrations (e.g., name, email, phone number, and event logistics).'}
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-base font-bold text-gray-900">
                        {isAr ? '2. حماية بيانات الأطفال والمشاركين' : '2. Child & Participant Safety'}
                    </h2>
                    <p>
                        {isAr
                            ? 'نلتزم بأعلى معايير حماية بيانات الأطفال والشباب المشاركين في معسكراتنا. لا يتم مشاركة أو بيع أي بيانات لأطراف ثالثة لأغراض تجارية.'
                            : 'We adhere to the highest standards regarding youth participant data privacy. Information is strictly used for event safety and communication with parents and authorized organizations.'}
                    </p>
                </section>

                <section className="space-y-2">
                    <h2 className="text-base font-bold text-gray-900">
                        {isAr ? '3. التواصل والاستفسارات' : '3. Inquiries & Contact'}
                    </h2>
                    <p>
                        {isAr
                            ? 'لأي استفسارات بخصوص بياناتك، يمكنك التواصل معنا عبر البريد الإلكتروني: info@magica-group.com'
                            : 'For any privacy-related questions, please contact our data team at info@magica-group.com.'}
                    </p>
                </section>
            </div>
        </main>
    );
}