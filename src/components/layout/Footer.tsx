import React from 'react';
import Link from 'next/link';

export function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <h3 className="text-white text-base font-bold">{isAr ? 'ماجيكا زون' : 'Magica Zone'}</h3>
          <p className="text-gray-400 leading-relaxed">
            {isAr
              ? 'تجارب تفاعلية لبناء الفرق، المعسكرات الشبابية، والأنشطة الترفيهية والتطويرية للشركات والمدارس.'
              : 'Interactive team building experiences, youth camps, and corporate engagement programs.'}
          </p>
        </div>

        {/* Programs */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
            {isAr ? 'برامج ماجيكا' : 'Magica Programs'}
          </h4>
          <ul className="space-y-2">
            <li><Link href={`/${lang}/activities`} className="hover:text-white transition-colors">{isAr ? 'فعاليات وأنشطة ماجيكا' : 'Magica Events & Activities'}</Link></li>
            <li><Link href={`/${lang}/camp`} className="hover:text-white transition-colors">{isAr ? 'معسكرات ماجيكا' : 'Magica Camp'}</Link></li>
            <li><Link href={`/${lang}/courses`} className="hover:text-white transition-colors">{isAr ? 'دورات وورش ماجيكا' : 'Magica Courses'}</Link></li>
            <li><Link href={`/${lang}/food`} className="hover:text-white transition-colors">{isAr ? 'إطعام وضيافة ماجيكا' : 'Magica Food'}</Link></li>
          </ul>
        </div>

        {/* Store & Media */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
            {isAr ? 'المتجر والصوتيات' : 'Bazar & Media'}
          </h4>
          <ul className="space-y-2">
            <li><Link href={`/${lang}/bazar`} className="hover:text-white transition-colors">{isAr ? 'بازار ومتجر ماجيكا' : 'Magica Bazar'}</Link></li>
            <li><Link href={`/${lang}/media`} className="hover:text-white transition-colors">{isAr ? 'راديو وصوتيات ماجيكا' : 'Magica Radio'}</Link></li>
            <li><Link href={`/${lang}/about`} className="hover:text-white transition-colors">{isAr ? 'عن ماجيكا' : 'About Us'}</Link></li>
            <li><Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
            {isAr ? 'التواصل المباشر' : 'Direct Contact'}
          </h4>
          <p className="text-gray-300 font-semibold">+20 10 03937096</p>
          <p className="text-gray-400 mt-1">info@magica-group.com</p>
          <p className="text-gray-400 mt-1">{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-[11px] text-gray-500">
        © {new Date().getFullYear()} Magica Zone (Magica Group). All rights reserved.
      </div>
    </footer>
  );
}