import React from 'react';
import Link from 'next/link';
import { Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { IActivity } from '@/types';

export function ActivityCard({ activity, lang }: { activity: IActivity; lang: string }) {
  const isAr = lang === 'ar';
  const title = isAr ? activity.titleAr : activity.titleEn;
  const description = isAr ? activity.descriptionAr : activity.descriptionEn;
  const benefits = isAr ? activity.benefitsAr : activity.benefitsEn;

  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div>
        {/* Header Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            {activity.category === 'kids_youth'
              ? isAr ? 'أطفال وشباب' : 'Kids & Youth'
              : isAr ? 'شركات وفرق عمل' : 'Corporate'}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {activity.ageRange || '6+'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

        {/* Logistics & Metrics */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{activity.durationMinutes} {isAr ? 'دقيقة' : 'mins'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{activity.participantsMin} - {activity.participantsMax} {isAr ? 'مشارك' : 'players'}</span>
          </div>
        </div>

        {/* Developmental Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="mb-4 space-y-1.5">
            <p className="text-xs font-semibold text-gray-700">{isAr ? 'الفوائد التنموية:' : 'Core Benefits:'}</p>
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price & Action CTA */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-xs text-gray-400 block">{isAr ? 'السعر لليوم' : 'Rate / Day'}</span>
          <span className="text-base font-bold text-blue-600">
            {activity.pricePerDayEGP.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>
        <Link
          href={`/${lang}/inquiry?activity=${encodeURIComponent(activity.titleEn)}`}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          {isAr ? 'احجز النشاط' : 'Book Activity'}
        </Link>
      </div>
    </div>
  );
}