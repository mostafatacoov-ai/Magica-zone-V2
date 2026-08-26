'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, InquiryFormInput } from '@/lib/validations/inquiry';
import { CheckCircle2, AlertCircle, Sparkles, Tag } from 'lucide-react';

function InquiryForm({ lang }: { lang: string }) {
  const searchParams = useSearchParams();
  const preselectedActivity = searchParams.get('activity') || '';
  const preselectedPackage = searchParams.get('selectedActivities') || '';
  const estimatedTotal = searchParams.get('estimatedTotal') || '';
  const initialNotes = searchParams.get('notes') || (preselectedActivity ? `Interested in: ${preselectedActivity}` : '');
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
      estimatedParticipants: Number(searchParams.get('participants')) || 20,
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
      <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h3 className="text-xl font-bold text-emerald-900">
          {isAr ? 'تم استلام طلبك بنجاح!' : 'Inquiry Received Successfully!'}
        </h3>
        <p className="text-sm text-emerald-700">
          {isAr
            ? 'شكراً لتواصلك مع ماجيكا زون. سنقوم بالرد عليك خلال 24 ساعة لتأكيد التفاصيل.'
            : 'Thank you for reaching out to Magica Zone. We will respond within 24 hours to confirm your package.'}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50"
        >
          {isAr ? 'إرسال طلب جديد' : 'Submit Another Request'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Selected Package Banner if coming from Calculator */}
      {preselectedPackage && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isAr ? 'الباقة المخصصة المحددة:' : 'Selected Custom Package:'}</span>
          </div>
          <p className="text-xs text-blue-700">{preselectedPackage}</p>
          {estimatedTotal && (
            <div className="text-xs font-bold text-blue-900 pt-1">
              {isAr ? 'التقدير المالي:' : 'Estimated Package Total:'}{' '}
              {Number(estimatedTotal).toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
            </div>
          )}
        </div>
      )}

      {serverError && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {isAr ? 'الاسم الكامل *' : 'Full Name *'}
        </label>
        <input
          {...register('fullName')}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
        {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'البريد الإلكتروني *' : 'Email Address *'}
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
          </label>
          <input
            {...register('phone')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Category & Participants */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'نوع الفعالية' : 'Program Type'}
          </label>
          <select
            {...register('category')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          >
            <option value="kids_youth">{isAr ? 'أطفال وشباب (Kids & Youth)' : 'Kids & Youth'}</option>
            <option value="corporate">{isAr ? 'بناء فرق عمل وشركات (Corporate)' : 'Corporate Team Building'}</option>
            <option value="camp">{isAr ? 'معسكرات (Camps)' : 'Camps'}</option>
            <option value="bazar">{isAr ? 'بازار وفعاليات مفتوحة (Bazar)' : 'Bazar / Open Events'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'العدد المتوقع للمشاركين *' : 'Expected Participants *'}
          </label>
          <input
            type="number"
            {...register('estimatedParticipants', { valueAsNumber: true })}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
          {errors.estimatedParticipants && (
            <p className="mt-1 text-xs text-red-500">{errors.estimatedParticipants.message}</p>
          )}
        </div>
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'التاريخ المفضل' : 'Preferred Event Date'}
          </label>
          <input
            type="date"
            {...register('eventDate')}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {isAr ? 'مكان الفعالية / النادي / المدرسة' : 'Location / Venue'}
          </label>
          <input
            {...register('location')}
            placeholder={isAr ? 'مثال: القاهرة الجديدة' : 'e.g. New Cairo / Venue'}
            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {isAr ? 'ملاحظات أو متطلبات إضافية' : 'Additional Notes / Requests'}
        </label>
        <textarea
          rows={3}
          {...register('notes')}
          className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isSubmitting
          ? isAr ? 'جاري الإرسال...' : 'Submitting...'
          : isAr ? 'إرسال طلب الحجز' : 'Submit Booking Request'}
      </button>
    </form>
  );
}

export default function InquiryPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {isAr ? 'حجز فعالية أو طلب عرض سعر' : 'Book an Event or Request a Quote'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isAr
              ? 'املأ النموذج وسيقوم فريقنا بالتواصل معك لتنسيق كافة التفاصيل اللوجستية.'
              : 'Fill out the form below and our team will contact you to coordinate all event details.'}
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-8 text-sm text-gray-500">Loading form...</div>}>
          <InquiryForm lang={params.lang} />
        </Suspense>
      </div>
    </main>
  );
}