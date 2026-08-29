'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IActivity } from '@/types';
import { Calculator, Check, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

export function PackageCalculator({ activities, lang }: { activities: IActivity[]; lang: string }) {
  const router = useRouter();
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [days, setDays] = useState<number>(1);
  const [participants, setParticipants] = useState<number>(20);

  const toggleActivity = (titleEn: string) => {
    if (selectedActivityIds.includes(titleEn)) {
      setSelectedActivityIds(selectedActivityIds.filter((id) => id !== titleEn));
    } else {
      setSelectedActivityIds([...selectedActivityIds, titleEn]);
    }
  };

  const selectAll = () => {
    if (selectedActivityIds.length === activities.length) {
      setSelectedActivityIds([]);
    } else {
      setSelectedActivityIds(activities.map((a) => a.titleEn));
    }
  };

  const selectedActivitiesList = activities.filter((a) => selectedActivityIds.includes(a.titleEn));
  const baseRatePerDay = selectedActivitiesList.reduce((acc, curr) => acc + (curr.pricePerDayEGP ?? 6000), 0);
  const subtotal = baseRatePerDay * days;

  let discountPercentage = 0;
  if (selectedActivityIds.length >= 5) {
    discountPercentage = 15;
  } else if (selectedActivityIds.length >= 3) {
    discountPercentage = 10;
  }

  const discountAmount = (subtotal * discountPercentage) / 100;
  const grandTotal = subtotal - discountAmount;

  const handleProceedToBooking = () => {
    const activityNames = selectedActivitiesList.map((a) => a.titleEn).join(', ');
    const query = new URLSearchParams({
      category: selectedActivitiesList.some((a) => a.category === 'corporate') ? 'corporate' : 'kids_youth',
      selectedActivities: activityNames,
      participants: participants.toString(),
      estimatedTotal: grandTotal.toString(),
      notes: `Custom Package: ${selectedActivityIds.length} activities for ${days} day(s), ~${participants} participants. (Estimate: ${grandTotal.toLocaleString()} EGP)`,
    });

    router.push(`/${lang}/inquiry?${query.toString()}`);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-100/80 shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isAr ? 'حاسبة الباقات المخصصة' : 'Package & Price Estimator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isAr ? 'صمّم باقة فعاليتك واحسب التكلفة فوراً' : 'Build Your Custom Event Package'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
            {isAr
              ? 'اختر الألعاب المطلوبة وعدد الأيام لرؤية الخصومات المتاحة وتكلفة الحزمة الإجمالية.'
              : 'Select your preferred games and days to see available bundle discounts and instant price estimates.'}
          </p>
        </div>

        <button
          onClick={selectAll}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors"
        >
          {selectedActivityIds.length === activities.length
            ? isAr ? 'إلغاء تحديد الكل' : 'Deselect All'
            : isAr ? 'تحديد جميع الألعاب' : 'Select All Activities'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-gray-900">
            {isAr ? '1. اختر الألعاب والأنشطة:' : '1. Select Activities & Games:'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activities.map((activity) => {
              const isSelected = selectedActivityIds.includes(activity.titleEn);
              const title = isAr ? activity.titleAr : activity.titleEn;
              const price = activity.pricePerDayEGP ?? 6000;

              return (
                <div
                  key={activity.titleEn}
                  onClick={() => toggleActivity(activity.titleEn)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                          }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-" />}
                      </div>
                      <span className="font-black text-sm text-gray-900">{title}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1 ps-6 font-medium">
                      {isAr ? activity.descriptionAr : activity.descriptionEn}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                    {price.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isAr ? 'عدد الأيام:' : 'Number of Event Days:'} ({days} {isAr ? 'يوم' : 'days'})
              </label>
              <input
                type="range"
                min={1}
                max={7}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                {isAr ? 'عدد المشاركين المتوقع:' : 'Estimated Participants:'} ({participants} {isAr ? 'مشارك' : 'people'})
              </label>
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={participants}
                onChange={(e) => setParticipants(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-[#FFF5E6]/40 rounded-3xl p-6 border border-amber-200/70 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-black text-gray-900 text-base">
              {isAr ? 'ملخص الباقة والتقدير' : 'Package Summary'}
            </h3>

            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>{isAr ? 'الأنشطة المحددة:' : 'Selected Activities:'}</span>
              <span className="font-bold text-gray-900">{selectedActivityIds.length}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>{isAr ? 'عدد الأيام:' : 'Duration:'}</span>
              <span className="font-bold text-gray-900">{days} {isAr ? 'يوم' : 'day(s)'}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-600 font-medium">
              <span>{isAr ? 'السعر الأساسي:' : 'Subtotal:'}</span>
              <span>{subtotal.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
            </div>

            {discountPercentage > 0 && (
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs">
                <span className="inline-flex items-center gap-1 font-bold">
                  <Tag className="w-3.5 h-3.5" />
                  {isAr ? `خصم باقة (${discountPercentage}%)` : `Bundle Discount (${discountPercentage}%)`}
                </span>
                <span className="font-black">-{discountAmount.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
            )}

            <div className="pt-4 border-t border-amber-200/60 flex items-baseline justify-between">
              <span className="text-sm font-black text-gray-900">{isAr ? 'التكلفة التقديرية:' : 'Estimated Total:'}</span>
              <div>
                <span className="text-2xl font-black text-blue-600">{grandTotal.toLocaleString()}</span>
                <span className="text-xs font-bold text-gray-500 ms-1">{isAr ? 'ج.م' : 'EGP'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToBooking}
            disabled={selectedActivityIds.length === 0}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>{isAr ? 'تأكيد الحجز بهذه الباقة' : 'Book with this Package'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}