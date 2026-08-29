'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ICourse } from '@/types';
import { BookOpen, Calendar, Clock, CheckCircle2, ArrowRight, ArrowLeft, UserCheck } from 'lucide-react';

export function CourseCard({ course, lang }: { course: ICourse; lang: string }) {
  const isAr = lang === 'ar';
  const title = isAr ? course.titleAr : course.titleEn;
  const desc = isAr ? course.descriptionAr : course.descriptionEn;
  const syllabus = course.syllabusEn || [];
  const schedule = isAr ? course.scheduleAr : course.scheduleEn;
  const instructorName = isAr ? course.instructorNameAr : course.instructorNameEn;
  const instructorTitle = isAr ? course.instructorTitleAr : course.instructorTitleEn;
  const price = course.priceEGP ?? 0;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const isBase64 = course.instructorImage?.startsWith('data:');

  return (
    <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            {course.category ? course.category.replace('_', ' ').toUpperCase() : 'COURSE'}
          </span>
          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
            {course.ageGroup || '8-14 Years'}
          </span>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-2.5">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium">{desc}</p>

        {/* Instructor Profile Header */}
        <div className="flex items-center gap-3 p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100/80 mb-5">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-indigo-100 flex items-center justify-center shrink-0 border border-indigo-200 shadow-sm">
            {course.instructorImage ? (
              isBase64 ? (
                <img
                  src={course.instructorImage}
                  alt={instructorName || 'Instructor'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={course.instructorImage}
                  alt={instructorName || 'Instructor'}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              )
            ) : (
              <UserCheck className="w-5 h-5 text-indigo-600" />
            )}
          </div>
          <div>
            <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {isAr ? 'المدرب المعتمد' : 'Course Instructor'}
            </div>
            <div className="text-xs font-black text-gray-900">{instructorName || 'Magica Coach'}</div>
            {instructorTitle && (
              <div className="text-[10px] text-gray-500 font-medium line-clamp-1">{instructorTitle}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 text-xs text-gray-700 mb-5">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>{course.durationWeeks || 4} {isAr ? 'أسابيع' : 'Weeks'}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="line-clamp-1">{schedule || 'Twice a week'}</span>
          </div>
        </div>

        {syllabus && syllabus.length > 0 && (
          <div className="space-y-2 mb-6">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider">
              {isAr ? 'محاور الورشة الأساسية:' : 'Key Modules & Outcomes:'}
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {syllabus.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
        <div>
          <span className="text-[11px] text-gray-400 block">{isAr ? 'رسوم الدورة' : 'Tuition Fee'}</span>
          <span className="text-xl font-black text-indigo-600">
            {price.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
          </span>
        </div>

        <Link
          href={`/${lang}/inquiry?category=courses&course=${encodeURIComponent(course.titleEn)}&notes=${encodeURIComponent(`Registration for: ${course.titleEn}`)}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:scale-105"
        >
          <span>{isAr ? 'التسجيل في الورشة' : 'Enroll Now'}</span>
          <ArrowIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}