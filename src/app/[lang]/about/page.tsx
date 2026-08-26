import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Trophy, Heart, Sparkles, Target, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AboutPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

    const stats = [
        { value: '15,000+', labelEn: 'Participants Engaged', labelAr: 'مشارك في فعالياتنا' },
        { value: '120+', labelEn: 'Corporate & School Events', labelAr: 'فعالية للشركات والمدارس' },
        { value: '17+', labelEn: 'Proprietary Active Games', labelAr: 'لعبة تفاعلية حصرية' },
        { value: '100%', labelEn: 'Safety & Certified Staff', labelAr: 'معايير أمان معتمدة 100%' },
    ];

    const values = [
        {
            icon: ShieldCheck,
            titleEn: 'Uncompromising Child Safety',
            titleAr: 'أعلى معايير الأمان والسلامة',
            descEn: 'All equipment and activities are strictly engineered to be child-safe with positive facilitation.',
            descAr: 'تصميم كافة الأدوات والمعدات لتكون آمنة تماماً للأطفال بإشراف مدربين معتمدين.',
        },
        {
            icon: Users,
            titleEn: 'Inclusive Team Building',
            titleAr: 'بناء روح الفريق والدمج',
            descEn: 'We design experiences that ensure every single participant feels valued, included, and heard.',
            descAr: 'تصميم تجارب تفاعلية تضمن مشاركة الجميع وتعزز الثقة المتبادلة والانتماء.',
        },
        {
            icon: Trophy,
            titleEn: 'Experiential Growth',
            titleAr: 'التعلم والتطور بالتجربة',
            descEn: 'Blending outdoor physical movement with cognitive problem solving and STEM innovation.',
            descAr: 'الدمج بين النشاط الحركي والتفكير الهندسي لحل المشكلات بطرق إبداعية.',
        },
        {
            icon: Heart,
            titleEn: 'Joy & Lasting Memories',
            titleAr: 'صناعة البهجة والذكريات',
            descEn: 'Creating positive emotional milestones that strengthen peer connections and company culture.',
            descAr: 'خلق لحظات فارقة مفعمة بالمرح تعزز الروابط الإنسانية وروح المؤسسة.',
        },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            {/* Header Banner */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? 'عن ماجيكا زون' : 'About Magica Zone'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {isAr
                        ? 'نبتكر تجارب تفاعلية تلهم العقول وتبني الفرق'
                        : 'Pioneering Transformative Team Experiences & Youth Camps'}
                </h1>
                <p className="text-base text-gray-600 leading-relaxed">
                    {isAr
                        ? 'ماجيكا زون هي منصة متخصصة في تصميم وإدارة الفعاليات التفاعلية، معسكرات اليوم الواحد، وبرامج بناء فرق العمل للشركات والمدارس والجهات التعليمية في مصر والشرق الأوسط.'
                        : 'Magica Zone designs turnkey interactive team building experiences, youth camps, and corporate engagement programs focused on social bonding, active play, and experiential learning.'}
                </p>
            </section>

            {/* Stats Counter */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center shadow-lg">
                {stats.map((st, idx) => (
                    <div key={idx} className="space-y-1">
                        <div className="text-3xl sm:text-4xl font-black text-white">{st.value}</div>
                        <div className="text-xs sm:text-sm text-blue-100 font-medium">{isAr ? st.labelAr : st.labelEn}</div>
                    </div>
                ))}
            </section>

            {/* Core Values */}
            <section className="space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {isAr ? 'قيمنا ومعايير عملنا' : 'Our Core Philosophy & Values'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2">
                        {isAr ? 'نلتزم بالاحترافية والإشراف الآمن في كل فعالية نقوم بتنظيمها.' : 'Commitment to safety, certified facilitation, and impactful engagement.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((v, idx) => {
                        const Icon = v.icon;
                        return (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-bold text-gray-900">{isAr ? v.titleAr : v.titleEn}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{isAr ? v.descAr : v.descEn}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Mission & Vision Split */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="inline-flex p-2.5 rounded-xl bg-amber-50 text-amber-600">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{isAr ? 'رسالتنا' : 'Our Mission'}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {isAr
                            ? 'تمكين المؤسسات والمدارس من تعزيز روح التعاون والتواصل الإيجابي من خلال أنشطة عملية وألعاب تفاعلية مبتكرة تترك أثراً مستداماً على شخصية كل مشارك.'
                            : 'To empower schools and organizations with world-class interactive experiential activities that develop resilience, empathy, and high-trust collaboration.'}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                    <div className="inline-flex p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {isAr
                            ? 'أن نكون الوجهة الرائدة الأولى في الشرق الأوسط في تقديم حلول بناء الفرق التفاعلية ومعسكرات الابتكار والقيادة للشباب والشركات.'
                            : 'To be the leading regional hub for interactive team building, innovative youth leadership camps, and transformational experiential education.'}
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-2xl font-bold">{isAr ? 'هل أنت مستعد لتنظيم فعاليتك القادمة؟' : 'Ready to Plan Your Next Event?'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{isAr ? 'تواصل معنا لتصميم باقة مخصصة تناسب أهداف فريقك وميزانيتك.' : 'Reach out to craft a custom package tailored to your goals and budget.'}</p>
                </div>
                <Link
                    href={`/${params.lang}/inquiry`}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm whitespace-nowrap"
                >
                    {isAr ? 'احجز فعاليتك الآن' : 'Get in Touch'}
                </Link>
            </section>
        </main>
    );
}