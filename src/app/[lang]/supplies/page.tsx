'use client';

import React from 'react';
import Link from 'next/link';
import { Package, ShieldCheck, Truck, Sparkles, CheckCircle2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SuppliesPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

    const supplyCategories = [
        {
            titleEn: 'Field Activity & Team Building Kits',
            titleAr: 'أدوات وحقائب الألعاب الميدانية',
            descEn: 'Turnkey durable props, ropes, inflatables, puzzle boards, and custom obstacles engineered for high-energy team dynamics.',
            descAr: 'معدات حركية متينة، حبال سحب، بوردات ألغاز عملاقة، وعوائق تفاعلية مصممة لتحمل الأنشطة الجماعية المكثفة.',
            badgeEn: 'Facilitation Gear',
            badgeAr: 'أدوات الميسرين',
            image: '/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM.jpeg',
            highlightsEn: ['Child-safe non-toxic materials', 'Rapid setup & breakdown', 'Waterproof & outdoor ready'],
            highlightsAr: ['خامات آمنة وغير سامة للأطفال', 'سهولة وسرعة التركيب والفك', 'مقاومة للعوامل الجوية والماء'],
        },
        {
            titleEn: 'Camp Camping & Overnight Hardware',
            titleAr: 'معدات التخييم والمعسكرات الخارجية',
            descEn: 'Professional scout tents, sleeping gear, field lighting, campfire safety perimeter, and emergency first-aid station packs.',
            descAr: 'خيام كشفية فاخرة، إضاءات ليلية للميدان، أدوات حلقة السمر الآمنة، وحقائب إسعافات أولية متكاملة.',
            badgeEn: 'Outdoor & Scout',
            badgeAr: 'التخييم والكشافة',
            image: '/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM (1).jpeg',
            highlightsEn: ['Certified first-aid standard', 'High ventilation weather tents', 'Solar & battery LED towers'],
            highlightsAr: ['معايير إسعافية معتمدة', 'خيام جيدة التهوية وعازلة للمطر', 'أبراج إضاءة شمسية وبطاريات'],
        },
        {
            titleEn: 'Sports Days & School Fun Day Hardware',
            titleAr: 'تجهيزات الأيام الرياضية والمدارس',
            descEn: 'Electronic scoreboards, medals & cups, whistles, boundary cones, relay batons, and sound system accessories.',
            descAr: 'شاشات ومنصات التتويج، كؤوس وميداليات مخصصة، أقماع الملاعب، وأنظمة صوتية ميدانية متطورة.',
            badgeEn: 'Tournaments & Fun Days',
            badgeAr: 'المسابقات الرياضية',
            image: '/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM.jpeg',
            highlightsEn: ['Custom engraved trophies & medals', 'High-decibel megaphones', 'Professional boundary setups'],
            highlightsAr: ['كؤوس وميداليات مخصصة بالحفر', 'مكبرات صوت لاسلكية عالية النقاء', 'تحديد احترافي للملاعب'],
        },
        {
            titleEn: 'STEM & Creative Innovation Boxes',
            titleAr: 'صناديق الابتكار وتحديات STEM',
            descEn: 'Hands-on engineering materials, structural straws, robotics kits, circuit breadboards, and art craft supplies.',
            descAr: 'مواد بناء هندسية، مجموعات تجارب روبوتكس ودوائر كهربائية مبسطة، وخامات أعمال فنية وإبداعية.',
            badgeEn: 'Innovation Lab',
            badgeAr: 'مختبر الابتكار',
            image: '/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM (2).jpeg',
            highlightsEn: ['Reusable electronic modules', 'Step-by-step experiment guides', 'Safe child friendly tools'],
            highlightsAr: ['وحدات إلكترونية قابلة لإعادة الاستخدام', 'أدلة إرشادية لكل تجربة', 'أدوات آمنة تماماً للأطفال'],
        },
    ];

    const galleryImages = [
        '/supplies/WhatsApp Image 2026-07-28 at 3.31.33 AM (1).jpeg',
        '/supplies/WhatsApp Image 2026-07-28 at 3.31.34 AM (1).jpeg',
        '/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM (2).jpeg',
        '/supplies/WhatsApp Image 2026-07-28 at 3.31.35 AM.jpeg',
    ];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
            {/* Header Banner */}
            <section className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>{isAr ? 'قطاع مستلزمات وتجهيزات ماجيكا' : 'Magica Supplies & Field Hardware'}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                    {isAr ? 'تجهيزات ومعدات الفعاليات والمعسكرات المتكاملة' : 'Turnkey Event Hardware & Camp Facilitation Gear'}
                </h1>
                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                    {isAr
                        ? 'نوفر لكافة المدارس، الشركات، ومنظمي المعسكرات أفضل الأدوات والمعدات الميدانية المعتمدة للألعاب التفاعلية والأنشطة الرياضية والكشفية.'
                        : 'Equipping schools, universities, and corporate events with battle-tested team building props, camping hardware, safety gear, and creative STEM challenge kits.'}
                </p>
            </section>

            {/* Feature Highlights */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'أعلى معايير الأمان' : 'Safety Certified'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'جميع الأدوات مختبرة ومصممة بأعلى معايير السلامة للأطفال والشباب.' : 'Engineered strictly with non-toxic, impact-safe, certified materials.'}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                        <Truck className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'توصيل وتجهيز ميداني' : 'On-Site Delivery & Setup'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'نقوم بتوصيل وتجهيز المعدات في موقع الفعالية بكافة محافظات مصر.' : 'Direct on-site transport, erection, and facilitator staging across Egypt.'}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{isAr ? 'تصميم أدوات حصرية' : 'Custom Prop Engineering'}</h3>
                        <p className="text-xs text-gray-500 mt-1">{isAr ? 'إمكانية تصنيع ألعاب وأدوات مخصصة بهوية مدرستك أو شركتك.' : 'Custom game fabrication with your organization’s branding & color scheme.'}</p>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="space-y-8">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {isAr ? 'أقسام وحقائب التجهيزات المتاحة' : 'Available Supply & Hardware Packages'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {isAr ? 'اختر الباقة المناسبة لفعاليتك أو اطلب تجهيزاً خاصاً' : 'Select a ready gear package or request a custom procurement quote'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {supplyCategories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="h-56 bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.titleEn}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        onError={(e: any) => { e.target.src = '/magica-Supplies-print.png'; }}
                                    />
                                    <span className="absolute top-4 start-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                                        {isAr ? cat.badgeAr : cat.badgeEn}
                                    </span>
                                </div>

                                <div className="p-6 sm:p-8 space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900">{isAr ? cat.titleAr : cat.titleEn}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">{isAr ? cat.descAr : cat.descEn}</p>

                                    <div className="space-y-2 pt-2 border-t border-gray-100">
                                        {(isAr ? cat.highlightsAr : cat.highlightsEn).map((h, i) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                <span>{h}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                <Link
                                    href={`/${params.lang}/inquiry?category=bazar&notes=${encodeURIComponent(`Supplies Inquiry: ${cat.titleEn}`)}`}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
                                >
                                    <span>{isAr ? 'طلب عرض أسعار وتجهيز' : 'Request Quotation'}</span>
                                    <ArrowIcon className="w-3.5 h-3.5" />
                                </Link>

                                <Link
                                    href={`/${params.lang}/bazar`}
                                    className="text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1"
                                >
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>{isAr ? 'المتجر الفوري' : 'Bazar Store'}</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Real Hardware Gallery */}
            <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-6">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">{isAr ? 'معرض صور الأدوات والمعدات' : 'Field Hardware Photo Gallery'}</h2>
                    <p className="text-xs text-gray-500">{isAr ? 'لقطات واقعية من تجهيزاتنا الميدانية للأيام المفتوحة والفعاليات' : 'Live snapshots of our active facilitation hardware and event equipment'}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {galleryImages.map((src, i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                                src={src}
                                alt="Magica Hardware"
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                onError={(e: any) => { e.target.src = '/magica-Supplies-print.png'; }}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Custom Procurement CTA */}
            <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{isAr ? 'هل تحتاج إلى تجهيز مخصص لفعالية مدرستك أو شركتك؟' : 'Need Custom Hardware for Your Event?'}</h3>
                    <p className="text-xs text-blue-200">{isAr ? 'تواصل معنا لتجهيز المعدات والأدوات بالأعداد والمواصفات المطلوبة فوراً.' : 'Our logistics team provides customized equipment staging tailored to your participant count and venue.'}</p>
                </div>
                <Link
                    href={`/${params.lang}/inquiry`}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs rounded-xl transition-all shadow-lg shrink-0"
                >
                    {isAr ? 'تواصل مع فريق التجهيزات' : 'Contact Supplies Team'}
                </Link>
            </section>
        </main>
    );
}
