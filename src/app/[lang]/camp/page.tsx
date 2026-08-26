import React from 'react';
import Link from 'next/link';
import { Tent, Users, Sun, Shield, Award, Sparkles, Check } from 'lucide-react';

export default function CampPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';

  const campHighlights = [
    {
      titleEn: 'Day Camps & School Trips',
      titleAr: 'معسكرات اليوم الواحد والرحلات المدرسية',
      descEn: 'Full-day structured programs focusing on active play, STEM challenges, and social bonding.',
      descAr: 'برامج يومية منظمة تجمع بين الأنشطة الحركية، التحديات الإبداعية، وتوطيد الصداقات.',
    },
    {
      titleEn: 'Youth Leadership & Team Spirit',
      titleAr: 'تنمية روح القيادة والتعاون',
      descEn: 'Collaborative problem-solving games that build confidence, empathy, and active listening.',
      descAr: 'ألعاب تعاونية تعزز الثقة بالنفس، مهارات الاستماع الفعال، والمبادرة الإيجابية.',
    },
    {
      titleEn: 'Turnkey Event Management',
      titleAr: 'إدارة وتجهيز لوجستي متكامل',
      descEn: 'We provide certified facilitators, safe equipment, first aid, and structured scheduling.',
      descAr: 'نوفر مدربين معتمدين، كافة الأدوات الآمنة، الإسعافات الأولية، والجدول الزمني المنظم.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-4">
          <Tent className="w-4 h-4 text-emerald-600" />
          <span>{isAr ? 'برامج المعسكرات والرحلات' : 'Camp & Youth Programs'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
          {isAr ? 'معسكرات ماجيكا التفاعلية' : 'Magica Camp Experience'}
        </h1>
        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          {isAr
            ? 'تجارب معسكرات متكاملة مصممة خصيصاً للمدارس، الأندية، والجهات التعليمية تجمع بين المرح، الرياضة، والتعلم التجريبي.'
            : 'Turnkey camp experiences designed for schools, clubs, and youth organizations blending adventure, physical coordination, and teamwork.'}
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {campHighlights.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{isAr ? item.titleAr : item.titleEn}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{isAr ? item.descAr : item.descEn}</p>
          </div>
        ))}
      </div>

      {/* Daily Flow / Sample Schedule */}
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {isAr ? 'نموذج للجدول الزمني لليوم التفاعلي' : 'Sample Daily Camp Schedule'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs font-bold text-blue-600 block mb-1">09:00 - 10:00 AM</span>
            <h4 className="font-semibold text-sm text-gray-900">{isAr ? 'الترحيب وكسر الجليد' : 'Arrival & Icebreakers'}</h4>
            <p className="text-xs text-gray-500 mt-1">{isAr ? 'ألعاب تفاعلية وبناء المجموعات' : 'Name games & team formations'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs font-bold text-blue-600 block mb-1">10:00 - 12:30 PM</span>
            <h4 className="font-semibold text-sm text-gray-900">{isAr ? 'تحديات الحركة والسباقات' : 'Active Field Challenges'}</h4>
            <p className="text-xs text-gray-500 mt-1">{isAr ? 'سباقات حركية وتحديات جماعية' : 'Relays, coordination & agility'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs font-bold text-blue-600 block mb-1">01:30 - 03:00 PM</span>
            <h4 className="font-semibold text-sm text-gray-900">{isAr ? 'ورش الهندسة والابتكار' : 'STEM & Creative Building'}</h4>
            <p className="text-xs text-gray-500 mt-1">{isAr ? 'بناء النماذج وتحديات التفكير' : 'Team engineering & prototyping'}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs font-bold text-blue-600 block mb-1">03:00 - 04:00 PM</span>
            <h4 className="font-semibold text-sm text-gray-900">{isAr ? 'الاحتفال وتوزيع التقدير' : 'Reflection & Awards'}</h4>
            <p className="text-xs text-gray-500 mt-1">{isAr ? 'مراجعة المكتسبات وشهادات المشاركة' : 'Key learnings & group celebrations'}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${params.lang}/inquiry?category=camp`}
            className="inline-block px-8 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors"
          >
            {isAr ? 'احجز معسكر مدرستك / ناديك' : 'Book a Camp for Your School / Club'}
          </Link>
        </div>
      </div>
    </main>
  );
}