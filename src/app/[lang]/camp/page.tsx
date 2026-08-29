'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Tent,
  Compass,
  Heart,
  Users,
  Lightbulb,
  ShieldCheck,
  Award,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Flame,
  Camera,
} from 'lucide-react';

export default function CampPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const skills = [
    {
      icon: Compass,
      titleEn: 'Leadership',
      titleAr: 'القيادة وصناعة القرار',
      descEn: 'Children learn how to lead, make decisions, and take responsibility for their team with confidence and courage.',
      descAr: 'يتعلم الأطفال كيفية قيادة الفرق، اتخاذ القرارات الجريئة، وتحمل المسؤولية بشجاعة وثقة كاملة.',
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      icon: Lightbulb,
      titleEn: 'Creativity',
      titleAr: 'الإبداع والابتكار',
      descEn: 'Through art, music, and design — we unleash imagination and transform it into tangible real ideas.',
      descAr: 'من خلال الفنون والموسيقى والتصميم — نطلق العنان للخيال ونحوله إلى أفكار ومشاريع ملموسة.',
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      icon: Users,
      titleEn: 'Collaboration',
      titleAr: 'روح الفريق والتعاون',
      descEn: 'A team that works together succeeds together. We teach children how to build real relationships based on respect.',
      descAr: 'الفريق المتماسك ينجح معاً. نُعلم الأطفال بناء علاقات حقيقية قائمة على الاحترام والتفاهم.',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      icon: ShieldCheck,
      titleEn: 'Problem Solving',
      titleAr: 'حل المشكلات والتفكير النقدي',
      descEn: 'Every challenge at camp is an opportunity for critical thinking. We prepare children to be thinkers, not consumers.',
      descAr: 'كل تحدٍ في المعسكر هو فرصة للتفكير التحليلي. نُعد الأطفال ليكونوا مفكرين ومبتكرين.',
      color: 'text-purple-600 bg-purple-50 border-purple-100',
    },
    {
      icon: Heart,
      titleEn: 'Self-Confidence',
      titleAr: 'الثقة بالنفس والاستقلالية',
      descEn: 'In a safe and encouraging environment, every child discovers their true abilities and learns to believe in themselves.',
      descAr: 'في بيئة آمنة ومشجعة، يكتشف كل طفل قدراته الحقيقية ويتعلم الإيمان بنفسه والاعتماد على الذات.',
      color: 'text-rose-600 bg-rose-50 border-rose-100',
    },
    {
      icon: Award,
      titleEn: 'Purposeful Fun',
      titleAr: 'المتعة والتعلم الهادف',
      descEn: 'Every game, activity, and adventure is carefully designed to be both highly enjoyable and deeply valuable.',
      descAr: 'كل لعبة ومغامرة مصممة بعناية لتكون ممتعة للغاية وذات قيمة تربوية وتنموية حقيقية في آن واحد.',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
  ];

  const scheduleSteps = [
    { time: '08:00 AM', titleEn: 'Welcome & Morning Start', titleAr: 'الاستقبال والنشاط الصباحي', descEn: 'Arrival, morning chants, energy warmup & team circle.' },
    { time: '09:00 AM', titleEn: 'Core Skill Session', titleAr: 'جلسة المهارات التخصصية', descEn: 'Robotics, outdoor survival, or soft skills workshop.' },
    { time: '11:00 AM', titleEn: 'Magica Food Break', titleAr: 'استراحة الغذاء الذكي', descEn: 'Fresh, nutritious Bento lunchbox and brain energy snacks.' },
    { time: '11:30 AM', titleEn: 'Group Adventure Activity', titleAr: 'تحديات المغامرة الميدانية', descEn: 'Outdoor team building relays, navigation, and agility.' },
    { time: '01:30 PM', titleEn: 'Free Creativity Workshop', titleAr: 'ورشة الابتكار الحر', descEn: 'Design, building prototypes, and creative expression.' },
    { time: '03:00 PM', titleEn: 'Team Games & Wrap-Up', titleAr: 'الألعاب الختامية والتكريم', descEn: 'Reflection circle, points tally, and daily achievement medals.' },
  ];

  const galleryPhotos = [
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 1' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 2' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 3' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 4' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 5' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 6' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 7' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 8' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 9' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 10' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 11' },
    { src: '/magica-camp-print.png', alt: 'Camp Adventure Moment 12' },
  ];

  return (
    <main className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5E6] via-[#FFFAF0] to-white pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-amber-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 shadow-sm">
            <Tent className="w-4 h-4 text-emerald-600" />
            <span>{isAr ? '🏕️ متعة + تعلم + نمو مستمر | 500+ بطل سعيد' : '🏕️ Fun + Learn + Grow | 500+ Happy Kids'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight max-w-5xl mx-auto leading-tight">
            {isAr ? (
              <>
                معسكرات ماجيكا: <span className="text-emerald-600">صيف واحد يغير كل شيء.</span>
              </>
            ) : (
              <>
                Magica Camp: <span className="text-emerald-600">One Summer Changes Everything.</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {isAr
              ? 'أكثر من مجرد معسكر صيفي — تجربة تحول حقيقية تُعيد تشكيل شخصية طفلك. كل نشاط مصمم بعناية لبناء مهارات حقيقية: القيادة، الإبداع، العمل الجماعي، وحل المشكلات.'
              : "More than a summer camp — an experience that reshapes your child's character. Every activity is carefully designed to develop real skills: leadership, creativity, collaboration, and problem-solving."}
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${params.lang}/inquiry?category=camp&notes=${encodeURIComponent('Interest in Magica Summer Adventure Camp 2026')}`}
              className="px-8 py-4 text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              {isAr ? 'احجز مكان طفلك في المعسكر' : 'Register for Camp'}
            </Link>
            <Link
              href={`/${params.lang}/dashboard`}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black text-gray-800 bg-white border border-amber-200/80 hover:bg-amber-50/50 rounded-2xl transition-all shadow-md"
            >
              <span>{isAr ? 'بوابة أولياء الأمور' : 'Parent Login'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Skills Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-emerald-700 bg-emerald-100/70 px-4 py-1.5 rounded-full uppercase tracking-wider">
            {isAr ? 'المهارات التي نبنيها' : 'The Skills We Build'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {isAr ? 'منهج مدروس بعناية لبناء قادة المستقبل' : 'Curriculum Designed for Character & Impact'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {isAr
              ? 'كل نشاط في معسكراتنا يستهدف مهارة محددة. لا مكان للعشوائية — بل تجربة تعليمية ممتعة ومدروسة.'
              : 'Every camp activity targets a specific skill. No randomness — a carefully designed curriculum for holistic development.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${skill.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-gray-900">{isAr ? skill.titleAr : skill.titleEn}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  {isAr ? skill.descAr : skill.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Camp Program */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl space-y-8 border border-white/10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'البرنامج الصيفي الرئيسي 2026' : 'Flagship Summer Adventure 2026'}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black">
                {isAr ? 'معسكر ماجيكا الصيفي للمغامرة والابتكار 2026' : 'Magica Summer Adventure & Innovation Camp 2026'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
                {isAr
                  ? 'تجربة نهارية ميدانية متكاملة تجمع بين رياضات بناء الفرق، تحديات ريادة الأعمال، مهارات البقاء، التجارب العلمية، وتمارين القيادة الإبداعية.'
                  : 'An all-day immersive outdoor & tech experience combining teamwork sports, business challenges, survival skills, science experiments, and creative leadership drills.'}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center shrink-0 w-full sm:w-auto">
              <span className="text-xs text-emerald-200 block uppercase font-bold">{isAr ? 'رسوم البرنامج' : 'Tuition'}</span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400">350 USD</span>
              <span className="text-xs text-gray-300 block mt-1">{isAr ? 'أو ما يعادلها بالجنيه المصري' : 'Or EGP Equivalent'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-emerald-300 block">{isAr ? 'الموقع' : 'Location'}</span>
                <span className="text-xs font-bold">{isAr ? 'الوادي الملكي وقرية التكنولوجيا' : 'Royal Valley Campsite'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-emerald-300 block">{isAr ? 'المواعيد' : 'Dates'}</span>
                <span className="text-xs font-bold">{isAr ? '1 يوليو - 30 أغسطس' : 'July 1 - August 30'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-emerald-300 block">{isAr ? 'المرحلة العمرية' : 'Age Group'}</span>
                <span className="text-xs font-bold">{isAr ? '6 - 15 سنة' : '6 - 15 Years'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-emerald-300 block">{isAr ? 'المدة' : 'Session Duration'}</span>
                <span className="text-xs font-bold">{isAr ? 'باقات أسبوعين وشهر' : '2-Week & Monthly Options'}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-amber-300">{isAr ? 'مميزات الباقة:' : 'Package Inclusions:'}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-100">
                <div className="flex items-center gap-1.5">✦ {isAr ? 'وجبات بينتو بوكس صحية يومية' : 'Daily Organic Brain Fuel Meals'}</div>
                <div className="flex items-center gap-1.5">✦ {isAr ? 'يونيفورم وكاب المستكشف الرسمي' : 'Official Magica Explorer Uniform'}</div>
                <div className="flex items-center gap-1.5">✦ {isAr ? 'مساحة خاصة في يوم البازار الملكي' : 'Access to Royal Bazar Booth'}</div>
                <div className="flex items-center gap-1.5">✦ {isAr ? 'تقرير تقييم مهارات أسبوعي لولي الأمر' : 'Weekly Assessment Report'}</div>
              </div>
            </div>

            <Link
              href={`/${params.lang}/inquiry?category=camp&notes=${encodeURIComponent('Enrollment for Magica Summer Adventure Camp 2026')}`}
              className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs rounded-2xl shrink-0 transition-transform hover:scale-105 shadow-xl"
            >
              {isAr ? 'سجل في المعسكر الصيفي الآن' : 'Enroll in this Camp'}
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Daily Schedule Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-blue-700 bg-blue-100/70 px-4 py-1.5 rounded-full uppercase tracking-wider">
            {isAr ? 'يوم في المعسكر' : 'A Day at Camp'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {isAr ? 'كل دقيقة لها هدف وقيمة' : 'Every Moment Has a Purpose'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {isAr ? 'جدول يومي متوازن يجمع بين النشاط الحركي، التفكير العلمي، والتغذية الصحية:' : 'A balanced daily schedule blending physical energy, STEM focus, and nutrition:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleSteps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-100/80 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-black text-emerald-700 bg-emerald-50">
                <Clock className="w-3.5 h-3.5" />
                <span>{step.time}</span>
              </div>
              <h3 className="text-lg font-black text-gray-900">{isAr ? step.titleAr : step.titleEn}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 12-Photo Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full uppercase tracking-wider">
            <Camera className="w-4 h-4 text-amber-600" />
            <span>{isAr ? 'معرض صور المعسكر ✨' : 'Step Inside Our Magical World ✨'}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
            {isAr ? 'شاهد أبطالنا الصغار يصنعون ذكريات لا تُنسى' : 'Watch Our Little Heroes Create Unforgettable Memories'}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {galleryPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="relative h-48 sm:h-64 rounded-3xl overflow-hidden bg-amber-50/60 border border-amber-100/80 shadow-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-bold text-white">
                  {isAr ? `لحظة معسكر ماجيكا #${idx + 1}` : `Camp Adventure #${idx + 1}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black">
              {isAr ? 'احجز مكان طفلك الآن — المقاعد محدودة' : "Reserve Your Child's Spot Now"}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
              {isAr
                ? 'الأماكن في معسكراتنا محدودة لضمان أعلى مستوى من الرعاية والتفاعل الفردي مع كل طفل.'
                : 'Spots are limited to ensure personalized coaching, safety, and focused attention for every camper.'}
            </p>
          </div>

          <Link
            href={`/${params.lang}/inquiry?category=camp&notes=${encodeURIComponent('Reservation for Magica Camp 2026')}`}
            className="px-8 py-4 text-xs font-black text-blue-700 bg-white hover:bg-blue-50 rounded-2xl transition-transform hover:scale-105 shadow-md shrink-0"
          >
            {isAr ? 'حجز المعسكر الآن' : 'Register Now'}
          </Link>
        </div>
      </section>
    </main>
  );
}