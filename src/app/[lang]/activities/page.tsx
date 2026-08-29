'use client';

import React, { useState, useEffect } from 'react';
import { ActivityCard } from '@/components/modules/activities/ActivityCard';
import { PackageCalculator } from '@/components/modules/calculator/PackageCalculator';
import { IActivity } from '@/types';
import { Target, Sparkles, RefreshCw } from 'lucide-react';

export default function ActivitiesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/activities?all=true', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setActivities(json.data);
      }
    } catch (err) {
      console.error('Failed to load activities', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 shadow-sm">
          <Target className="w-4 h-4 text-blue-600" />
          <span>{isAr ? 'فعاليات وأنشطة ماجيكا التفاعلية' : 'Magica Events & Activities'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
          {isAr ? 'كتالوج فعاليات وأنشطة ماجيكا' : 'Magica Events & Activities Catalog'}
        </h1>
        <p className="mt-4 text-base text-gray-600 leading-relaxed font-medium">
          {isAr
            ? 'أنشطة وألعاب مصممة بعناية لبناء فرق العمل، تعزيز التواصل، وحل المشكلات التفاعلي للأطفال والشركات.'
            : 'Turnkey interactive games and activities designed to foster teamwork, active problem-solving, and communication for youth and corporate teams.'}
        </p>
      </div>

      {/* Interactive Package Calculator */}
      {activities.length > 0 && (
        <PackageCalculator activities={activities} lang={params.lang} />
      )}

      {/* Activities Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900">
            {isAr ? 'جميع الألعاب والفعاليات المتاحة' : 'All Available Events & Games'}
          </h2>
          <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {activities.length} {isAr ? 'لعبة متاحة' : 'Games Available'}
          </span>
        </div>

        {loading ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-3">
            <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
            <p className="text-xs text-gray-500 font-bold">{isAr ? 'جاري تحميل الألعاب...' : 'Loading games catalog...'}</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">
              {isAr ? 'لا توجد أنشطة متاحة حالياً.' : 'No activities available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <ActivityCard key={act.id || (act as any)._id || act.titleEn} activity={act} lang={params.lang} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}