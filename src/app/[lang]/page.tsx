import React from 'react';
import Link from 'next/link';

export default async function HomePage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';

  const divisions = [
    { titleEn: 'Magica Courses', titleAr: 'دورات ماجيكا', image: '/magica-Courses-print.png', href: `/${params.lang}/courses` },
    { titleEn: 'Magica Camp', titleAr: 'مخيم ماجيكا', image: '/magica-camp-print.png', href: `/${params.lang}/camp` },
    { titleEn: 'Magica Mind Games', titleAr: 'ألعاب العقل', image: '/magica-games-print.png', href: `/${params.lang}/activities` },
    { titleEn: 'Magica Bazar', titleAr: 'بازار ماجيكا', image: '/magica-bazar-print.png', href: `/${params.lang}/bazar` },
    { titleEn: 'Magica Podcast', titleAr: 'بودكاست ماجيكا', image: '/magica-Podcast-print.png' },
    { titleEn: 'Magica Supplies', titleAr: 'مستلزمات ماجيكا', image: '/magica-Supplies-print.png' },
    { titleEn: 'Magica Food', titleAr: 'طعام ماجيكا', image: '/magica-food-print.png' },
    { titleEn: 'Magica Uniform', titleAr: 'زي ماجيكا', image: '/magica-Uniform-print.png' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/Hero_Video.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-md mb-8 border border-white/10">
            <span className="animate-pulse w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]"></span>
            <span>{isAr ? 'مرحباً بكم في مجموعة ماجيكا' : 'Welcome to Magica Group'}</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-2xl">
            {isAr
              ? 'نبتكر لحظات لا تُنسى'
              : 'Creating Unforgettable Experiences'}
          </h1>

          <p className="mt-4 text-lg sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed text-gray-200 drop-shadow-lg">
            {isAr
              ? 'مجموعة متكاملة من الخدمات التعليمية، الترفيهية، والمستلزمات المخصصة للإبداع والنمو.'
              : 'A complete suite of educational, entertainment, and essential services tailored for creativity and growth.'}
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#divisions"
              className="px-8 py-4 text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              {isAr ? 'اكتشف خدماتنا' : 'Explore Our Divisions'}
            </a>
          </div>
        </div>
      </section>

      {/* Divisions Section */}
      <section id="divisions" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              {isAr ? 'قطاعات ماجيكا' : 'Our Magica Divisions'}
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              {isAr
                ? 'تعرف على مجموعتنا المتنوعة من الخدمات والقطاعات المصممة خصيصاً لتلبية كافة احتياجاتك.'
                : 'Discover our diverse range of services and divisions specially designed to cater to all your needs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {divisions.map((div, idx) => {
              const CardContent = (
                <>
                  <div className="aspect-square relative p-8 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <img 
                      src={div.image} 
                      alt={div.titleEn} 
                      className={`w-full h-full object-contain transition-transform duration-700 drop-shadow-xl ${div.href ? 'group-hover:scale-110' : ''}`} 
                    />
                  </div>
                  <div className="p-6 bg-white border-t border-gray-100 flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 text-center">
                      {isAr ? div.titleAr : div.titleEn}
                    </h3>
                  </div>
                </>
              );

              const baseClasses = "group relative bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col";
              const interactiveClasses = "hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer";

              return div.href ? (
                <Link key={idx} href={div.href} className={`${baseClasses} ${interactiveClasses}`}>
                  {CardContent}
                </Link>
              ) : (
                <div key={idx} className={`${baseClasses} opacity-80`}>
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-800 rounded-[3rem] p-10 sm:p-16 text-white text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
            
            <div className="max-w-2xl relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {isAr ? 'هل أنت مستعد للانضمام إلينا؟' : 'Ready to Join Us?'}
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                {isAr
                  ? 'تواصل معنا لتصميم باقة مخصصة تناسب كافة احتياجاتك.'
                  : 'Get in touch with us today to learn more about our complete offerings and tailor a package that fits your exact needs.'}
              </p>
            </div>
            <Link
              href={`/${params.lang}/inquiry`}
              className="relative z-10 px-8 py-4 text-lg font-bold text-blue-900 bg-white hover:bg-blue-50 rounded-2xl shrink-0 transition-all shadow-lg hover:scale-105"
            >
              {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}