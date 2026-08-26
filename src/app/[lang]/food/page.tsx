import React from 'react';
import { FoodMenu } from '@/components/modules/food/FoodMenu';
import { Utensils, ShieldCheck, HeartPulse, Award } from 'lucide-react';

export default function FoodPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';

    const standards = [
        {
            icon: ShieldCheck,
            titleEn: '100% Certified Food Hygiene',
            titleAr: 'معايير سلامة غذائية 100%',
            descEn: 'Prepared in certified commercial kitchens under strict health and safety protocols.',
            descAr: 'تحضير الوجبات في مطابخ معتمدة تخضع لأعلى معايير الرقابة الصحية والنظافة.',
        },
        {
            icon: HeartPulse,
            titleEn: 'Nutritious & Fresh Ingredients',
            titleAr: 'مكونات طازجة وقيم غذائية متوازنة',
            descEn: 'High-protein, wholesome ingredients with zero artificial preservatives.',
            descAr: 'مكونات طبيعية طازجة تمنح المشاركين النشاط والتركيز طوال اليوم.',
        },
        {
            icon: Award,
            titleEn: 'Customized Dietary Options',
            titleAr: 'خيارات مخصصة للحساسية والدايت',
            descEn: 'Special customized lunchboxes for vegetarian, gluten-free, or specific allergies.',
            descAr: 'توفير وجبات مخصصة للنباتيين وحساسية الطعام حسب طلب المدرسة أو الشركة.',
        },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            {/* Header Banner */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                    <Utensils className="w-4 h-4 text-amber-600" />
                    <span>{isAr ? 'الإطعام والضيافة المتكاملة' : 'Camp & Event Catering'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {isAr ? 'وجبات صحية وبوفيهات متكاملة لفعالياتك' : 'Nutritious Meal Plans & Event Catering'}
                </h1>
                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                    {isAr
                        ? 'نوفر وجبات معسكرات الأطفال، بوفيهات الشركات المفتوحة، ومحطات المشروبات المنعشة لضمان أعلى مستوى من الراحة لضيوف فعاليتك.'
                        : 'Turnkey catering solutions for youth day camps, school trips, sports days, and corporate team engagements with certified hygiene standards.'}
                </p>
            </section>

            {/* Safety & Hygiene Standards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {standards.map((st, idx) => {
                    const Icon = st.icon;
                    return (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-bold text-gray-900">{isAr ? st.titleAr : st.titleEn}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{isAr ? st.descAr : st.descEn}</p>
                        </div>
                    );
                })}
            </section>

            {/* Interactive Food Menu & Calculator */}
            <FoodMenu lang={params.lang} />
        </main>
    );
}