import React from 'react';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Course } from '@/lib/models/Course';
import { CourseCard } from '@/components/modules/courses/CourseCard';
import { ICourse } from '@/types';
import { GraduationCap } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getCourses(): Promise<ICourse[]> {
  try {
    await connectToDatabase();
    const data = await Course.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Failed to load courses:', error);
    return [];
  }
}

export default async function CoursesPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const courses = await getCourses();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-4">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>{isAr ? 'الأكاديمية والورش التفاعلية' : 'Workshops & Leadership Academy'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
          {isAr ? 'ورش عمل ودورات ماجيكا التنموية' : 'Experiential Workshops & Courses'}
        </h1>
        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          {isAr
            ? 'برامج تدريبية متخصصة للأطفال واليافعين تركز على التطبيق العملي في مجالات العلوم (STEM)، القيادة، الفنون الإبداعية، والمهارات الحياتية.'
            : 'Structured hands-on courses for youth focusing on practical application in STEM engineering, public speaking, leadership, and outdoor survival.'}
        </p>
      </div>

      {/* Courses Grid */}
      {courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-gray-500">{isAr ? 'لا توجد دورات متاحة حالياً.' : 'No active courses found.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id || course.titleEn} course={course} lang={params.lang} />
          ))}
        </div>
      )}
    </main>
  );
}