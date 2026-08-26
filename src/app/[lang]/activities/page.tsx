import React from 'react';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Activity } from '@/lib/models/Activity';
import { ActivityCard } from '@/components/modules/activities/ActivityCard';
import { PackageCalculator } from '@/components/modules/calculator/PackageCalculator';
import { IActivity } from '@/types';

async function getActivities(): Promise<IActivity[]> {
  try {
    await connectToDatabase();
    const data = await Activity.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Failed to load activities:', error);
    return [];
  }
}

export default async function ActivitiesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const activities = await getActivities();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
          {isAr ? 'كتالوج الألعاب وبناء الباقات' : 'Activities & Custom Package Builder'}
        </h1>
        <p className="mt-4 text-base text-gray-600">
          {isAr
            ? 'اختر الألعاب المنفردة أو استخدم الحاسبة التفاعلية لبناء باقة كاملة بخصومات خاصة لفعاليتك القادمة.'
            : 'Explore turnkey games or use our interactive calculator to create a custom bundle with automatic discounts.'}
        </p>
      </div>

      {/* Interactive Package Calculator */}
      {activities.length > 0 && (
        <PackageCalculator activities={activities} lang={params.lang} />
      )}

      {/* Activities Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isAr ? 'جميع الألعاب المتاحة' : 'All Available Games & Activities'}
        </h2>

        {activities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500">
              {isAr ? 'لا توجد أنشطة متاحة حالياً.' : 'No activities available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((act) => (
              <ActivityCard key={act.id || act.titleEn} activity={act} lang={params.lang} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}