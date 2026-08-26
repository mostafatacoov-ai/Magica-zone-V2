'use client';

import React from 'react';
import Link from 'next/link';
import { Shirt, ShieldCheck, Palette, Scissors, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function UniformPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

    const uniformCollections = [
        {
            titleEn: 'Campers Active Performance T-Shirts & Caps',
            titleAr: 'تيشيرتات وكابات المعسكرات الرياضية',
            descEn: 'Breathable 100% Egyptian cotton & dri-fit athletic blends with screen printed or embroidered team logos.',
            descAr: 'قطن مصري 100% وخامات دراي فيت الرياضية العازلة للعرق مع طباعة أو تطريز عالي الدقة لشعار فريقك.',
            badgeEn: 'Youth & Campers',
            badgeAr: 'المعسكرات والطلاب',
            image: '/magica-Uniform-print.png',
            featuresEn: ['Sweat-wicking Dri-Fit technology', 'Double-stitched seams for active play', 'Vibrant non-fading colors'],
            featuresAr: ['تقنية طرد العرق والحرارة', 'خياطة مزدوجة لتحمل الحركة والشد', 'ألوان زاهية مقاومة للغسيل المتكرر'],
        },
        {
            titleEn: 'Field Facilitator & Coach Technical Vests',
            titleAr: 'فيستات ويونيفورم المدربين والميسرين',
            descEn: 'Multi-pocket utilitarian coach vests with reflective safety stripes, walkie-talkie loops, and custom ID slots.',
            descAr: 'فيستات فنية متعددة الجيوب للمدربين مع شرائط عاكسة للسلامة وأماكن مخصصة لأجهزة اللاسلكي والبطاقات.',
            badgeEn: 'Staff & Facilitation',
            badgeAr: 'المدربين والمشرفين',
            image: '/magica-Uniform-print.png',
            featuresEn: ['Reinforced tactical pockets', 'High-visibility safety accents', 'Lightweight all-weather fabric'],
            featuresAr: ['جيوب تكتيكية مقواة للأدوات', 'عناصر عاكسة لرؤية واضحة ليلاً', 'خامة خفيفة تناسب كل فصول السنة'],
        },
        {
            titleEn: 'Corporate Team Building Polos & Hoodies',
            titleAr: 'بولو سويت شيرت وبدلات الشركات',
            descEn: 'Premium piqu cotton polos and winter fleece hoodies tailored for company retreats, conferences, and sports tournaments.',
            descAr: 'بولو شيرت بيكيه قطني فاخر وسويت شيرتات شتوية مخصصة لفعاليات وخلوات الشركات والبطولات الرياضية.',
            badgeEn: 'Corporate & Executive',
            badgeAr: 'الشركات والمؤسسات',
            image: '/magica-Uniform-print.png',
            featuresEn: ['Sophisticated collar and cuffs', 'Precision laser embroidery', 'Custom Pantone color matching'],
            featuresAr: ['ياقة وأساور أنيقة وعالية المتانة', 'تطريز ليزري فائق الدقة للشعار', 'مطابقة درجات ألوان هوية الشركة'],
        },
        {
            titleEn: 'Custom Team Bandanas, Bibs & Wristbands',
            titleAr: 'بندانات، صديريات فرق، وإكسسوارات',
            descEn: 'Color-coded competition bibs, breathable bandanas, and silicone wristbands for seamless team partitioning.',
            descAr: 'صديريات ألوان لتقسيم الفرق في المباريات، بندانات رأس مريحة، وأساور سيليكون ملونة لتحديد المجموعات.',
            badgeEn: 'Accessories & Bibs',
            badgeAr: 'الملحقات والإكسسوارات',
            image: '/magica-Uniform-print.png',
            featuresEn: ['Ultra-light elastic mesh', 'Washable and reusable', 'High-contrast bright colors'],
            featuresAr: ['شبك مرن فائق الخفة وسريع الجفاف', 'قابلة للغسيل وإعادة الاستخدام', 'ألوان متباينة لتمييز الفرق بسهولة'],
        },
    ];

    const sizeGuide = [
        { size: 'XS (Kids)', age: '6 - 8 Yrs', chest: '68 cm', length: '50 cm' },
        { size: 'S (Youth)', age: '9 - 12 Yrs', chest: '78 cm', length: '58 cm' },
        { size: 'M (Teens)', age: '13 - 16 Yrs', chest: '88 cm', length: '64 cm' },
        { size: 'L (Adult)', age: 'Adult Standard', chest: '102 cm', length: '70 cm' },
        { size: 'XL (Adult)', age: 'Adult Plus', chest: '112 cm', length: '74 cm' },
        { size: '2XL (Adult)', age: 'Adult Extra', chest: '122 cm', length: '78 cm' },
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            {/* Header Banner */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    <Shirt className="w-4 h-4 text-purple-600" />
                    <span>{isAr ? 'قطاع الأزياء واليونيفورم المخصص' : 'Magica Custom Uniforms & Apparel'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {isAr ? 'يونيفورم وملابس مخصصة للفرق والمعسكرات' : 'Engineered Custom Apparel for Camps & Teams'}
                </h1>
                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                    {isAr
                        ? 'تصميم وتصنيع زي موحد عالي الجودة للطلاب، مدربي المعسكرات، والشركات بخامات مريحة وتقنيات طباعة وتطريز تدوم طويلاً.'
                        : 'Bespoke apparel production for schools, summer youth camps, and corporate team events with high-grade Egyptian cotton and moisture-wicking sportswear.'}
                </p>
            </section>

            {/* Quality Pillars */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                        <Scissors className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'خامات قطنية ورياضية فاخرة' : 'Premium Cotton & Performance Blends'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'خامات مريحة وصديقة للبشرة تضمن أعلى راحة أثناء الحركة طوال اليوم.' : 'Crafted with premium soft breathable cotton and moisture-management sports fabrics.'}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <Palette className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'تطريز وطباعة حرارية فائقة' : 'Precision Embroidery & Screen Printing'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'تنفيذ دقيق لشعارات المؤسسات والأسماء بأحدث ماكينات الطباعة والتطريز.' : 'High-density embroidery and screen printing that resists daily washing and active use.'}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'مرونة في الكميات وسرعة التسليم' : 'Flexible Quantities & Swift Turnaround'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'قدرة إنتاجية عالية لتلبية الطلبات الفردية والجملة للمدارس والشركات الكبرى.' : 'Capacity to handle small custom batches or thousands of units for large conferences.'}</p>
                    </div>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {isAr ? 'تشكيلات ومجموعات اليونيفورم' : 'Apparel Collections & Uniform Lines'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isAr ? 'اختر التشكيلة المناسبة لفريقك أو اطلب تصميماً حصرياً' : 'Choose a ready uniform line or request bespoke customization'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {uniformCollections.map((col, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold">
                                        {isAr ? col.badgeAr : col.badgeEn}
                                    </span>
                                    <Shirt className="w-5 h-5 text-purple-500" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">{isAr ? col.titleAr : col.titleEn}</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">{isAr ? col.descAr : col.descEn}</p>

                                <div className="space-y-2 pt-3 border-t border-gray-100">
                                    {(isAr ? col.featuresAr : col.featuresEn).map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <Link
                                    href={`/${params.lang}/inquiry?category=bazar&notes=${encodeURIComponent(`Uniform Inquiry: ${col.titleEn}`)}`}
                                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <span>{isAr ? 'طلب تفصيل ويونيفورم' : 'Order Custom Batch'}</span>
                                    <ArrowIcon className="w-3.5 h-3.5" />
                                </Link>

                                <Link
                                    href={`/${params.lang}/bazar`}
                                    className="text-xs font-semibold text-gray-600 hover:text-purple-600"
                                >
                                    {isAr ? 'عرض المتجر' : 'Browse Bazar'}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sizing Table */}
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-100 shadow-sm space-y-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900">{isAr ? 'جدول المقاسات القياسي (Standard Sizing Chart)' : 'Standard Sizing Chart'}</h3>
                    <p className="text-xs text-gray-500 mt-1">{isAr ? 'مقاسات دقيقة ومناسبة لكافة الأعمار من الأطفال حتى البالغين' : 'Precise dimensions in centimeters for kids, teens, and adults'}</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start">
                        <thead className="bg-purple-50 text-purple-900 uppercase font-bold border-b border-purple-100">
                            <tr>
                                <th className="px-6 py-3">{isAr ? 'المقاس' : 'Size'}</th>
                                <th className="px-6 py-3">{isAr ? 'الفئة العمرية المقترحة' : 'Suggested Age / Group'}</th>
                                <th className="px-6 py-3">{isAr ? 'عرض الصدر' : 'Chest Width'}</th>
                                <th className="px-6 py-3">{isAr ? 'الطول' : 'Total Length'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                            {sizeGuide.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="px-6 py-3.5 font-bold text-purple-700">{row.size}</td>
                                    <td className="px-6 py-3.5">{row.age}</td>
                                    <td className="px-6 py-3.5 font-mono">{row.chest}</td>
                                    <td className="px-6 py-3.5 font-mono">{row.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Call to action */}
            <section className="bg-gray-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{isAr ? 'هل تريد معاينة عينات من الأقمشة والتطريز؟' : 'Request Fabric & Embroidery Swatch Samples?'}</h3>
                    <p className="text-xs text-gray-400">{isAr ? 'تواصل معنا وسنرسل لك عينات أقمشة وتصميم مبدئي لشعارك مجاناً.' : 'Get in touch to receive fabric swatch samples and a free digital 3D uniform mock-up.'}</p>
                </div>
                <Link
                    href={`/${params.lang}/inquiry`}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shrink-0"
                >
                    {isAr ? 'طلب عينة وعرض أسعار' : 'Request Samples & Quote'}
                </Link>
            </section>
        </main>
    );
}
