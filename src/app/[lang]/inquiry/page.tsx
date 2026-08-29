'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, InquiryFormInput } from '@/lib/validations/inquiry';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

function InquiryForm({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const preselectedActivity = searchParams.get('activity') || '';
  const preselectedCourse = searchParams.get('course') || '';
  const preselectedPackage = searchParams.get('selectedActivities') || '';
  const estimatedTotal = searchParams.get('estimatedTotal') || '';
  const initialNotes =
    searchParams.get('notes') ||
    (preselectedCourse ? `Interested in Course: ${preselectedCourse}` : preselectedActivity ? `Interested in: ${preselectedActivity}` : '');
  const isAr = lang === 'ar';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      category: searchParams.get('category') === 'corporate' ? 'corporate' : 'kids_youth',
      estimatedParticipants: Number(searchParams.get('participants')) || 10,
      notes: initialNotes,
    },
  });

  const onSubmit = async (data: InquiryFormInput) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to submit booking request');

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-6 sm:p-10 text-center bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-900">
            {isAr ? 'تم استلام طلبك وتأكيد الحجز بنجاح!' : 'Inquiry & Reservation Confirmed!'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
            {isAr
              ? 'شكراً لتواصلك مع ماجيكا زون. تم تسجيل طلبك وسيتواصل معك منسقو الفعاليات. تفضل بزيارة فرع الأكاديمية بالمعادي لإتمام الإجراءات.'
              : 'Thank you for choosing Magica Zone. Our event coordinator will contact you shortly. You are welcome to visit our academy branch in Maadi.'}
          </p>
        </div>

        {/* Maadi Location Box */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100 text-start space-y-3">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm">
            <MapPin className="w-5 h-5 text-indigo-600" />
            <span>{isAr ? 'فرع الأكاديمية بالمعادي:' : 'Academy Branch Location (Maadi, Cairo):'}</span>
          </div>
          <p className="text-xs text-gray-700 font-medium">
            {isAr
              ? 'المعادي، القاهرة — بجوار حضانة روتس (Roots Nursery).'
              : 'Maadi, Cairo, Egypt — Next to Roots Nursery.'}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://maps.app.goo.gl/1cfvtbm6tDbjApL48"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span>{isAr ? 'فتح الموقع في Google Maps' : 'Open Location in Google Maps'}</span>
            </a>

            <a
              href="https://wa.me/201037377505"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isAr ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d215.16493560508533!2d31.284819372341556!3d29.975420262570516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458385e8921f25b%3A0x63a4b5b8da0a09e1!2sRoots%20Nursery!5e1!3m2!1sen!2seg!4v1788030920281!5m2!1sen!2seg"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 px-6 py-2.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          {isAr ? 'إرسال طلب جديد' : 'Submit Another Request'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {preselectedPackage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isAr ? 'الباقة المخصصة المحددة:' : 'Selected Custom Package:'}</span>
          </div>
          <p className="text-xs text-blue-700 font-medium">{preselectedPackage}</p>
          {estimatedTotal && (
            <div className="text-xs font-black text-blue-900 pt-1">
              {isAr ? 'التقدير المالي:' : 'Estimated Total:'}{' '}
              {Number(estimatedTotal).toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
            </div>
          )}
        </div>
      )}

      {serverError && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">
          {isAr ? 'الاسم الكامل *' : 'Full Name *'}
        </label>
        <input
          {...register('fullName')}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
          </label>
          <input
            {...register('phone')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            {isAr ? 'نوع الفعالية أو البرنامج' : 'Program Type'}
          </label>
          <select
            {...register('category')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="kids_youth">{isAr ? 'أطفال وشباب (Kids & Youth)' : 'Kids & Youth'}</option>
            <option value="corporate">{isAr ? 'بناء فرق عمل وشركات (Corporate)' : 'Corporate Team Building'}</option>
            <option value="camp">{isAr ? 'معسكرات (Camps)' : 'Camps'}</option>
            <option value="bazar">{isAr ? 'بازار ومتجر (Bazar & Store)' : 'Bazar & Store'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            {isAr ? 'العدد المتوقع للمشاركين *' : 'Expected Participants *'}
          </label>
          <input
            type="number"
            {...register('estimatedParticipants')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">
          {isAr ? 'ملاحظات أو متطلبات خاصة' : 'Additional Notes & Timing'}
        </label>
        <textarea
          rows={3}
          {...register('notes')}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-4 bg-blue-600 text-white text-sm font-black rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50"
      >
        {isSubmitting
          ? isAr ? 'جاري إرسال الطلب...' : 'Submitting Request...'
          : isAr ? 'إرسال طلب الحجز وعرض خريطة المعادي' : 'Submit Booking & View Maadi Location'}
      </button>
    </form>
  );
}

export default function InquiryPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-amber-100/80">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            {isAr ? 'حجز فعالية أو تسجيل دورة تدريبية' : 'Book an Event or Reserve a Course'}
          </h1>
          <p className="text-xs text-gray-600 font-medium">
            {isAr
              ? 'املأ النموذج وسيقوم فريقنا بالتواصل معك لتنسيق موعد الزيارة لمقر الأكاديمية بالمعادي.'
              : 'Fill out the form below and our team will coordinate your visit to our Maadi academy branch.'}
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-8 text-sm text-gray-500">Loading form...</div>}>
          <InquiryForm lang={params.lang} />
        </Suspense>
      </div>
    </main>
  );
}