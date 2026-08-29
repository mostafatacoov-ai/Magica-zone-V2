import React from 'react';
import Link from 'next/link';
import { Users, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { IActivity } from '@/types';

export function ActivityCard({ activity, lang }: { activity: IActivity; lang: string }) {
  const isAr = lang === 'ar';
  const title = isAr ? activity.titleAr : activity.titleEn;
  const description = isAr ? activity.descriptionAr : activity.descriptionEn;
  const benefits = isAr ? activity.benefitsAr : activity.benefitsEn;
  const price = activity.pricePerDayEGP ?? 6000;

  return (
    <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-amber-100/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div>
        {/* Header Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700">
            <Sparkles className="w-3.5 h-3.5" />
            {activity.category === 'kids_youth'
              ? isAr ? 'أطفال وشباب' : 'Kids & Youth'
              : isAr ? 'شركات وفرق عمل' : 'Corporate'}
          </span>
          <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-lg">
            {activity.ageRange || '6+'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">{description}</p>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs text-gray-600 mb-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{activity.durationMinutes || 20} {isAr ? 'دقيقة' : 'mins'}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{activity.participantsMin || 4} - {activity.participantsMax || 20} {isAr ? 'مشارك' : 'players'}</span>
          </div>
        </div>

        {/* Benefits */}
        {benefits && benefits.length > 0 && (
          <div className="mb-4 space-y-1.5">
            <p className="text-xs font-black text-gray-800 uppercase tracking-wider">{isAr ? 'الفوائد التنموية:' : 'Core Benefits:'}</p>
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price & Action */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-[10px] text-gray-400 font-bold block uppercase">{isAr ? 'السعر لليوم' : 'Rate / Day'}</span>
          <span className="text-lg font-black text-blue-600">
            {price.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>
        <Link
          href={`/${lang}/inquiry?activity=${encodeURIComponent(activity.titleEn)}`}
          className="px-4 py-2.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:scale-105"
        >
          {isAr ? 'احجز النشاط' : 'Book Activity'}
        </Link>
      </div>
    </div>
  );
}