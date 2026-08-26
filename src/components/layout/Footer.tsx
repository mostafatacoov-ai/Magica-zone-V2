import React from 'react';
import Link from 'next/link';

export function Footer({ lang }: { lang: string }) {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">{isAr ? 'ماجيكا زون' : 'Magica Zone'}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            {isAr
              ? 'تجارب تفاعلية لبناء الفرق، المعسكرات الشبابية، والأنشطة الترفيهية والتطويرية للشركات والمدارس.'
              : 'Interactive team building experiences, youth camps, and corporate engagement programs.'}
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">{isAr ? 'روابط سريعة' : 'Quick Links'}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${lang}/activities`} className="hover:text-white transition-colors">{isAr ? 'كتالوج الألعاب' : 'Activities Catalog'}</Link></li>
            <li><Link href={`/${lang}/camp`} className="hover:text-white transition-colors">{isAr ? 'المعسكرات' : 'Camp Programs'}</Link></li>
            <li><Link href={`/${lang}/inquiry`} className="hover:text-white transition-colors">{isAr ? 'حجز الفعاليات' : 'Book an Event'}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">{isAr ? 'التواصل' : 'Contact Us'}</h4>
          <p className="text-sm text-gray-400">+20 10 03937096</p>
          <p className="text-sm text-gray-400 mt-1">info@magica-group.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Magica Group. All rights reserved.
      </div>
    </footer>
  );
}