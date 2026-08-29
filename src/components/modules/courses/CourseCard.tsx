'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ICourse } from '@/types';
import {
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  MapPin,
  X,
  Phone,
  Mail,
  User,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    ageGroup: course.ageGroup || '8-14 Years',
    notes: '',
  });

  const handleOpenEnrollment = () => {
    setIsConfirmed(false);
    setIsModalOpen(true);
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bookingNotes = `[COURSE RESERVATION] Course: ${course.titleEn} | Instructor: ${course.instructorNameEn || 'Assigned'} | Fee: ${price.toLocaleString()} EGP | Student Age: ${formData.ageGroup} | Notes: ${formData.notes}`;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.studentName,
          phone: formData.phone,
          email: formData.email,
          category: 'courses',
          estimatedParticipants: 1,
          location: 'Maadi Branch, Cairo',
          notes: bookingNotes,
        }),
      });

      if (res.ok) {
        setIsConfirmed(true);
      }
    } catch (err) {
      console.error('Reservation submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBase64 = course.instructorImage?.startsWith('data:');

  return (
    <>
      {/* Course Card */}
      <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-amber-100/80 shadow-sm hover:shadow-xl transition-all duration-300">
        <div>
          {/* Category & Age Badge */}
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

          {/* Instructor Profile */}
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

          {/* Logistics */}
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

          {/* Syllabus */}
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

        {/* Price & Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-2">
          <div>
            <span className="text-[11px] text-gray-400 block">{isAr ? 'رسوم الدورة' : 'Tuition Fee'}</span>
            <span className="text-xl font-black text-indigo-600">
              {price.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
            </span>
          </div>

          <button
            onClick={handleOpenEnrollment}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md hover:scale-105"
          >
            <span>{isAr ? 'حجز الدورة الآن' : 'Enroll Now'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Reservation & Location Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                  {isAr ? 'حجز مقعد بالدورة التدريبية' : 'Course Reservation'}
                </span>
                <h3 className="text-lg font-black text-gray-900">{title}</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isConfirmed ? (
              /* Step 2: Confirmation & Maadi Location Map */
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-black text-emerald-950">
                    {isAr ? 'تم استلام طلب حجز المقعد بنجاح!' : 'Seat Reserved Successfully!'}
                  </h4>
                  <p className="text-xs text-gray-600 font-medium">
                    {isAr
                      ? `تم تسجيل بياناتك لدورة "${title}". الخطوة التالية هي زيارة فرع الأكاديمية بالمعادي لإتمام التسجيل واختبار تحديد المستوى.`
                      : `Your reservation for "${title}" has been received. The next step is to visit our academy branch in Maadi to finalize enrollment and placement testing.`}
                  </p>
                </div>

                {/* Location Details Box */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-900 font-black text-xs">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>{isAr ? 'موقع فرع المعادي (مكان انعقاد الدورات):' : 'Maadi Course Location & Academy Branch:'}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    {isAr
                      ? 'المعادي، القاهرة — بالقرب من حضانة روتس (Roots Nursery) وميدان فيكتوريا.'
                      : 'Maadi, Cairo, Egypt — Next to Roots Nursery / Victoria Square.'}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="https://maps.app.goo.gl/1cfvtbm6tDbjApL48"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isAr ? 'فتح الموقع في Google Maps' : 'Open in Google Maps'}</span>
                    </a>

                    <a
                      href={`https://wa.me/201037377505?text=${encodeURIComponent(
                        isAr
                          ? `مرحباً، قمت بحجز دورة ${title} وأود الاستفسار عن موعد زيارة فرع المعادي.`
                          : `Hello, I reserved ${title} and would like to confirm my visit to the Maadi branch.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تأكيد الموعد عبر واتساب' : 'WhatsApp Coordination'}</span>
                    </a>
                  </div>
                </div>

                {/* Embedded Google Map */}
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215.16493560508533!2d31.284819372341556!3d29.975420262570516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458385e8921f25b%3A0x63a4b5b8da0a09e1!2sRoots%20Nursery!5e1!3m2!1sen!2seg!4v1788030920281!5m2!1sen!2seg"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold rounded-xl"
                  >
                    {isAr ? 'تم، إغلاق النافذة' : 'Done & Close'}
                  </button>
                </div>
              </div>
            ) : (
              /* Step 1: Reservation Form */
              <form onSubmit={handleReservationSubmit} className="space-y-4 text-xs">
                <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold block">{isAr ? 'المدرب ورسوم الدورة:' : 'Instructor & Tuition:'}</span>
                    <span className="font-black text-gray-900 text-xs">{instructorName}</span>
                  </div>
                  <span className="text-base font-black text-indigo-600">{price.toLocaleString()} EGP</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{isAr ? 'اسم الطالب / المشارك *' : 'Student Full Name *'}</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                      <input
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                      <input
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{isAr ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute start-3 top-3" />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full ps-9 pe-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">{isAr ? 'الفئة العمرية للطالب' : 'Student Age Group'}</label>
                    <input
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">{isAr ? 'ملاحظات إضافية أو الموعد المفضل' : 'Additional Notes / Preferred Timing'}</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={isAr ? 'اكتب أي متطلبات خاصة...' : 'Any special requests or inquiries...'}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitting
                    ? isAr ? 'جاري تأكيد الحجز...' : 'Reserving Seat...'
                    : isAr ? 'تأكيد الحجز وعرض الموقع بالمعادي' : 'Confirm Reservation & View Maadi Location'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}