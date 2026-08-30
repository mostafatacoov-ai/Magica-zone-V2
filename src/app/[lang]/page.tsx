import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  Tent,
  GraduationCap,
  ShoppingBag,
  Target,
  UtensilsCrossed,
  Mic2,
  Shirt,
  Backpack,
  Music,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { HeroVideo } from '@/components/modules/home/HeroVideo';

// Force live data rendering on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SectorItem {
  id: string;
  icon: any;
  printImg: string;
  borderColor: string;
  badgeBg: string;
  btnBg: string;
  titleEn: string;
  titleAr: string;
  taglineEn: string;
  taglineAr: string;
  descEn: string;
  descAr: string;
  offersEn: string[];
  offersAr: string[];
  ctaHref: string;
  ctaTextEn: string;
  ctaTextAr: string;
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const sectors: SectorItem[] = [
    {
      id: "courses",
      icon: GraduationCap,
      printImg: "/magica-courses-print.png",
      borderColor: "border-[#2563EB]/40",
      badgeBg: "bg-[#2563EB]/10 text-[#2563EB]",
      btnBg: "bg-[#2563EB] hover:bg-[#1D4ED8]",
      titleEn: "Magica Courses",
      titleAr: "دورات وأكاديمية ماجيكا",
      taglineEn: "Tomorrow's Skills, Today",
      taglineAr: "مهارات الغد، اليوم",
      descEn: "Junior CEO & Financial Literacy Academy, Robotics, SAT/EST English, and leadership tracks for innovators.",
      descAr: "أكاديمية الرئيس التنفيذي الصغير، الذكاء المالي، الروبوتات، واللغات والقيادة لرواد المستقبل.",
      offersEn: [
        "Leadership & Project Management",
        "E-Commerce & Digital Marketing",
        "Robotics & AI Mastery",
        "Executive Coding & Test Prep",
      ],
      offersAr: [
        "القيادة وإدارة المشاريع",
        "التجارة الإلكترونية والتسويق",
        "الروبوتات والذكاء الاصطناعي",
        "التأهيل الأكاديمي والبرمجة",
      ],
      ctaHref: `/${params.lang}/courses`,
      ctaTextEn: "Explore All Courses",
      ctaTextAr: "استكشف كافة الدورات والورش",
    },
    {
      id: "camp",
      icon: Tent,
      printImg: "/magica-camp-print.png",
      borderColor: "border-[#059669]/40",
      badgeBg: "bg-[#059669]/10 text-[#059669]",
      btnBg: "bg-[#059669] hover:bg-[#047857]",
      titleEn: "Magica Camp",
      titleAr: "معسكرات ماجيكا",
      taglineEn: "One Summer Changes Everything",
      taglineAr: "صيف واحد يغير كل شيء",
      descEn: "Royal Valley Adventure 2026 — outdoor field leadership, independence, and character cultivation.",
      descAr: "مغامرة الوادي الملكي 2026 — بناء الشخصية القيادية، الاستقلالية، وتحديات الميدان.",
      offersEn: [
        "Summer & Holiday Camps",
        "Outdoor Field Team Building",
        "Hands-On Survival Skills",
        "Confidence Cultivation",
      ],
      offersAr: [
        "معسكرات صيفية وإجازات",
        "تحديات بناء الفرق الميدانية",
        "مهارات كشفية وحياتية",
        "غرس الثقة والاستقلالية",
      ],
      ctaHref: `/${params.lang}/camp`,
      ctaTextEn: "Explore Summer Camps",
      ctaTextAr: "استكشف برامج المعسكرات",
    },
    {
      id: "supplies",
      icon: Backpack,
      printImg: "/magica-Supplies-print.png",
      borderColor: "border-[#E11D48]/40",
      badgeBg: "bg-[#E11D48]/10 text-[#E11D48]",
      btnBg: "bg-[#E11D48] hover:bg-[#BE123C]",
      titleEn: "Magica Supplies",
      titleAr: "مستلزمات وأدوات ماجيكا",
      taglineEn: "Smart Executive CEO Gear",
      taglineAr: "حقائب وأدوات القادة الصغار",
      descEn: "Ergonomic, water-resistant CEO school backpacks, facilitation kits, and experiment toolkits.",
      descAr: "حقائب مدرسية تنفيذية طبية مقاومة للماء وأدوات ابتكار ومعدات ميدانية متطورة.",
      offersEn: [
        "Executive CEO School Backpacks",
        "Dedicated Tech & Tablet Sleeves",
        "Ergonomic Spine Support",
        "Heavy-Duty Waterproof Fabric",
      ],
      offersAr: [
        "حقائب مدرسية تنفيذية",
        "جيوب مبطنة للأجهزة التكنولوجية",
        "دعامة طبية لحماية الظهر",
        "أقمشة فائقة التحمل",
      ],
      ctaHref: `/${params.lang}/supplies`,
      ctaTextEn: "Explore Smart Supplies",
      ctaTextAr: "استكشف الحقائب والأدوات",
    },
    {
      id: "events",
      icon: Target,
      printImg: "/magica-games-print.png",
      borderColor: "border-[#9333EA]/40",
      badgeBg: "bg-[#9333EA]/10 text-[#9333EA]",
      btnBg: "bg-[#9333EA] hover:bg-[#7E22CE]",
      titleEn: "Magica Events & Activities",
      titleAr: "فعاليات وأنشطة ماجيكا",
      taglineEn: "37 Interactive Turnkey Games",
      taglineAr: "37 لعبة وفعالية تفاعلية",
      descEn: "Turnkey team building games, corporate floatable challenges, and youth sports activities with live package calculator.",
      descAr: "ألعاب بناء فرق عمل متكاملة، تحديات هوائية للشركات، وفعاليات شبابية مع حاسبة باقات تفاعلية.",
      offersEn: [
        "17 Youth & Kids Team Building Games",
        "20 Corporate Floatable & Inflatable Arenas",
        "Certified Safety Facilitators & Equipment",
        "Instant Multi-Activity Package Calculator",
      ],
      offersAr: [
        "17 لعبة لبناء فرق الأطفال والشباب",
        "20 ملعب وتحدي هوائي عائم للشركات",
        "مدربون معتمدون ومعدات آمنة بالكامل",
        "حاسبة باقات فورية بخصومات 10% و15%",
      ],
      ctaHref: `/${params.lang}/activities`,
      ctaTextEn: "Explore Events & Activities",
      ctaTextAr: "استكشف الفعاليات وحاسبة الباقات",
    },
    {
      id: "bazar",
      icon: ShoppingBag,
      printImg: "/magica-bazar-print.png",
      borderColor: "border-[#EA580C]/40",
      badgeBg: "bg-[#EA580C]/10 text-[#EA580C]",
      btnBg: "bg-[#EA580C] hover:bg-[#C2410C]",
      titleEn: "Magica Bazar",
      titleAr: "بازار ومتجر ماجيكا",
      taglineEn: "Live Kid-Run Marketplace",
      taglineAr: "سوق حقيقي يديره الأطفال",
      descEn: "Authentic marketplace where kids build their brand, pitch products, and manage real profits.",
      descAr: "السوق الحقيقي حيث يؤسس الأطفال متاجرهم، يسوقون منتجاتهم، ويديرون أرباحهم.",
      offersEn: [
        "Kid-Run Online & Live Stores",
        "Pricing & Negotiation Mastery",
        "Innovative Handmade Goods",
        "Real Capital & Profit Handling",
      ],
      offersAr: [
        "متاجر حقيقية يديرها الأطفال",
        "احتراف التسعير والتفاوض",
        "منتجات مبتكرة ومصنوعات يدوية",
        "إدارة رأس المال والأرباح",
      ],
      ctaHref: `/${params.lang}/bazar`,
      ctaTextEn: "Explore Bazar Market",
      ctaTextAr: "استكشف البازار ومتاجر الأطفال",
    },
    {
      id: "food",
      icon: UtensilsCrossed,
      printImg: "/magica-food-print.png",
      borderColor: "border-[#16A34A]/40",
      badgeBg: "bg-[#16A34A]/10 text-[#16A34A]",
      btnBg: "bg-[#16A34A] hover:bg-[#15803D]",
      titleEn: "Magica Food",
      titleAr: "إطعام وضيافة ماجيكا",
      taglineEn: "Eat Right = Think Right",
      taglineAr: "غذاء ذكي = تفكير عبقري",
      descEn: "Nutrient-rich Bento lunchboxes and brain-boosting meals crafted by certified nutritionists.",
      descAr: "لانش بوكس صحي ووجبات ذكية مصممة بإشراف أخصائيي تغذية لزيادة التركيز والنشاط.",
      offersEn: [
        "Brain Power Energy Meals",
        "Custom School Bento Boxes",
        "100% Natural Preservative-Free",
        "Event & Camp Meal Plans",
      ],
      offersAr: [
        "وجبات تعزيز طاقة الدماغ",
        "بينتو بوكس صحي للمدارس",
        "طبيعي 100% بدون مواد حافظة",
        "خطط وجبات المعسكرات والفعاليات",
      ],
      ctaHref: `/${params.lang}/food`,
      ctaTextEn: "Explore Food & Bento Menus",
      ctaTextAr: "استكشف قوائم الطعام الصحي",
    },
    {
      id: "podcast",
      icon: Mic2,
      printImg: "/magica-Podcast-print.png",
      borderColor: "border-[#4F46E5]/40",
      badgeBg: "bg-[#4F46E5]/10 text-[#4F46E5]",
      btnBg: "bg-[#4F46E5] hover:bg-[#3730A3]",
      titleEn: "Magica Podcast",
      titleAr: "بودكاست ماجيكا",
      taglineEn: "Words That Matter",
      taglineAr: "كلمات تصنع الفارق",
      descEn: "Educational and psychology discussions, parenting guidance, and youth empowerment stories.",
      descAr: "حوارات تربوية ونفسية، إرشادات لأولياء الأمور، وقصص نجاح ملهمة يقدمها الشباب.",
      offersEn: [
        "Child Psychology & Mentorship",
        "Financial Fluency for Parents",
        "Inspirational Youth Stories",
        "On-Demand Audio Streaming",
      ],
      offersAr: [
        "توجيه تربوي ونفسي للأطفال",
        "تعليم الذكاء المالي في المنزل",
        "قصص نجاح يقدمها الأطفال",
        "بث صوتي متاح دائماً",
      ],
      ctaHref: `/${params.lang}/media`,
      ctaTextEn: "Explore Podcasts",
      ctaTextAr: "استمع إلى البودكاست والراديو",
    },
    {
      id: "uniform",
      icon: Shirt,
      printImg: "/magica-Uniform-print.png",
      borderColor: "border-[#1E3A8A]/40",
      badgeBg: "bg-[#1E3A8A]/10 text-[#1E3A8A]",
      btnBg: "bg-[#1E3A8A] hover:bg-[#172554]",
      titleEn: "Magica Uniform",
      titleAr: "يونيفورم ماجيكا",
      taglineEn: "Wear Your Identity",
      taglineAr: "ارتدِ هويتك بفخر",
      descEn: "Breathable, anti-stain soft cotton explorer polo sets, caps, and premium founder hoodies.",
      descAr: "طقم بولو وكاب المستكشف الرسمي وهوديز قطنية فاخرة تعزز روح الانتماء.",
      offersEn: [
        "Explorer Polo & Cap Sets",
        "Junior Founder Premium Hoodies",
        "Breathable Ultra-Comfort Cotton",
        "Complete Size Range for All Ages",
      ],
      offersAr: [
        "طقم بولو وكاب المستكشف",
        "هوديز رائد الأعمال الفاخرة",
        "قطن مسامي مضاد للتعرق",
        "مقاسات لكافة الفئات العمرية",
      ],
      ctaHref: `/${params.lang}/uniform`,
      ctaTextEn: "Explore Apparel",
      ctaTextAr: "استكشف اليونيفورم الرسمي",
    },
    {
      id: "music",
      icon: Music,
      printImg: "/0logo.png",
      borderColor: "border-[#D946EF]/40",
      badgeBg: "bg-[#D946EF]/10 text-[#D946EF]",
      btnBg: "bg-[#D946EF] hover:bg-[#A21CAF]",
      titleEn: "Magica Songs & Anthems",
      titleAr: "أغاني وأناشيد ماجيكا",
      taglineEn: "Stream & Download Anthems",
      taglineAr: "استمع وحمّل الأناشيد",
      descEn: "Official camp tracks including Level Up Your World, Magica Dreams, and Making Futures Bright.",
      descAr: "الأناشيد الرسمية للمعسكرات ومقاطع التحفيز الصباحية وموسيقى التركيز.",
      offersEn: [
        "Online Streaming of 7+ Soundtracks",
        "Free Studio-Quality MP3 Downloads",
        "Morning Energy & Motivation Chants",
        "Video Pitch Theme Music",
      ],
      offersAr: [
        "بث مباشر لـ 7+ أناشيد رسمية",
        "تحميل مجاني مباشر بجودة عالية",
        "هتافات النشاط والطاقة الصباحية",
        "الموسيقى التصويرية للعروض",
      ],
      ctaHref: `/${params.lang}/media`,
      ctaTextEn: "Explore Songs & Radio",
      ctaTextAr: "استمع وحمّل الأناشيد",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Ambient Video */}
      <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-20 pb-24 sm:pt-28 sm:pb-32 border-b border-amber-100/80">
        <HeroVideo />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-amber-100/90 text-amber-900 shadow-sm backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{isAr ? "حيث يبدأ التميز الإنساني وصناعة القادة" : "Where Human Excellence & Leadership Begin"}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight max-w-5xl mx-auto leading-tight">
            {isAr ? (
              <>
                ماجيكا زون: <span className="text-blue-600">حيث يصبح الأطفال قادة.</span>
              </>
            ) : (
              <>
                Magica Zone: <span className="text-blue-600">Where Children Become Leaders.</span>
              </>
            )}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            {isAr
              ? "مهمتنا ليست الترفيه السلبي — بل الإعداد الشامل للحياة. نُمكّن الأطفال واليافعين من الذكاء المالي، ريادة الأعمال، القيادة، والمهارات التطبيقية للمستقبل."
              : "Our mission isn't passive entertainment — it's comprehensive life preparation. We equip youth with financial literacy, entrepreneurship, leadership, and hands-on skills for life."}
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#sectors"
              prefetch={false}
              className="px-8 py-4 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              {isAr ? "استكشف قطاعات وبرامج ماجيكا ↓" : "Explore Sectors & Offerings ↓"}
            </Link>
            <Link
              href={`/${params.lang}/dashboard`}
              prefetch={false}
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black text-gray-800 bg-white border border-amber-200/80 hover:bg-amber-50/50 rounded-2xl transition-all shadow-md backdrop-blur-sm"
            >
              <span>{isAr ? "بوابة أولياء الأمور والطلاب" : "Parent & Student Portal"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* Metrics Cards */}
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-amber-100 shadow-md text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">500+</div>
              <div className="text-xs font-black text-gray-700 mt-1">{isAr ? "رائد أعمال صغير" : "Young Founders"}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-amber-100 shadow-md text-center">
              <div className="text-3xl sm:text-4xl font-black text-indigo-600">9</div>
              <div className="text-xs font-black text-gray-700 mt-1">{isAr ? "قطاعات تخصصية ومكتبة صوتية" : "Core Sectors & Music Library"}</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-amber-100 shadow-md text-center">
              <div className="text-3xl sm:text-4xl font-black text-emerald-600">100%</div>
              <div className="text-xs font-black text-gray-700 mt-1">{isAr ? "بيئة آمنة للمستقبل" : "Future-Ready Safe Space"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl space-y-4 text-center sm:text-start flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
              {isAr ? "فلسفتنا ورسالتنا" : "Our Philosophy & Mission"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              {isAr
                ? "نؤمن أن كل طفل يمتلك إمكانات قيادية وريادية لا حدود لها."
                : "We believe every child possesses boundless entrepreneurial & leadership potential."}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              {isAr
                ? "في ماجيكا زون، نوفر منظومة متكاملة من 9 قطاعات ديناميكية — من الأسواق الواقعية ومسارات STEM إلى التغذية الصحية والأدوات التنفيذية — لبناء جيل من القادة الواثقين."
                : "At Magica Zone, we provide an integrated ecosystem of 9 dynamic sectors — from real kid marketplaces and STEM tracks to nutrition and executive equipment — shaping youth into confident future leaders."}
            </p>
          </div>

          <Link
            href={`/${params.lang}/inquiry`}
            prefetch={false}
            className="px-6 py-4 bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs rounded-2xl shrink-0 transition-transform hover:scale-105 shadow-xl"
          >
            {isAr ? "احجز فعاليتك أو سجل طفلك" : "Enroll Your Child Now"}
          </Link>
        </div>
      </section>

      {/* The 9 Sectors Showcase */}
      <section id="sectors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black text-blue-700 bg-blue-100/70 px-4 py-1.5 rounded-full uppercase tracking-wider">
            {isAr ? "عالم ماجيكا الشامل" : "Our Comprehensive World"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900">
            {isAr ? "استكشف كافة قطاعات ماجيكا وعروضنا" : "Discover All Magica Sectors & What We Offer"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">
            {isAr
              ? "تصفح قطاعاتنا الـ 9 المتخصصة لاكتشاف البرامج، المنتجات، والأناشيد الصوتية مع روابط حية لكل قسم:"
              : "Explore our 9 specialized divisions below to discover core offerings along with live previews and soundtracks:"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.id}
                className={`${sector.borderColor} border-2 rounded-2xl p-6 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all group`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${sector.badgeBg} p-3 rounded-xl`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">
                  {isAr ? sector.titleAr : sector.titleEn}
                </h3>
                <p className="text-xs font-bold text-gray-600 mb-3">
                  {isAr ? sector.taglineAr : sector.taglineEn}
                </p>
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  {isAr ? sector.descAr : sector.descEn}
                </p>
                <ul className="space-y-2 mb-6">
                  {(isAr ? sector.offersAr : sector.offersEn).map((offer, idx) => (
                    <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{offer}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={sector.ctaHref}
                  prefetch={false}
                  className={`${sector.btnBg} text-white font-black text-xs py-3 px-4 rounded-xl block text-center transition-all hover:scale-105`}
                >
                  {isAr ? sector.ctaTextAr : sector.ctaTextEn}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}