import React from 'react';
import Link from 'next/link';
import { ICourse } from '@/types';
import { BookOpen, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export function CourseCard({ course, lang }: { course: ICourse; lang: string }) {
  const isAr = lang === 'ar';
  const title = isAr ? course.titleAr : course.titleEn;
  const desc = isAr ? course.descriptionAr : course.descriptionEn;
  const syllabus = isAr ? course.syllabusAr : course.syllabusEn;
  const schedule = isAr ? course.scheduleAr : course.scheduleEn;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div>
        {/* Category & Age Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            {course.category.replace('_', ' ').toUpperCase()}
          </span>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
            {course.ageGroup}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2.5">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">{desc}</p>

        {/* Course Logistics */}
        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs text-gray-700 mb-5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{course.durationWeeks} {isAr ? 'أسابيع' : 'Weeks'} ({course.sessionsCount} {isAr ? 'جلسات' : 'Sessions'})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="line-clamp-1">{schedule}</span>
          </div>
        </div>

        {/* Syllabus Highlights */}
        {syllabus && syllabus.length > 0 && (
          <div className="space-y-2 mb-6">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              {isAr ? 'محاور الورشة الأساسية:' : 'Key Modules & Outcomes:'}
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {syllabus.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price & Action */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-[11px] text-gray-400 block">{isAr ? 'رسوم الدورة' : 'Tuition Fee'}</span>
          <span className="text-lg font-black text-indigo-600">
            {course.priceEGP.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>

        <Link
          href={`/${lang}/inquiry?category=courses&course=${encodeURIComponent(course.titleEn)}&notes=${encodeURIComponent(`Registration interest for course: ${course.titleEn} (${course.priceEGP} EGP)`)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
        >
          <span>{isAr ? 'التسجيل في الورشة' : 'Enroll Now'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}