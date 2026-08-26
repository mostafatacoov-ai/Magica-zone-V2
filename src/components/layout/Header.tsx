'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, User } from 'lucide-react';

export function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAr = lang === 'ar';

  const navLinks = [
    { href: `/${lang}`, label: isAr ? 'الرئيسية' : 'Home' },
    { href: `/${lang}/activities`, label: isAr ? 'الأنشطة' : 'Activities' },
    { href: `/${lang}/camp`, label: isAr ? 'المعسكرات' : 'Camps' },
    { href: `/${lang}/courses`, label: isAr ? 'الورش والدورات' : 'Courses' },
    { href: `/${lang}/bazar`, label: isAr ? 'البازار' : 'Bazar' },
    { href: `/${lang}/dashboard`, label: isAr ? 'لوحة الطالب' : 'Dashboard' },
  ];

  const targetLang = isAr ? 'en' : 'ar';
  const switchLangPath = pathname.replace(`/${lang}`, `/${targetLang}`) || `/${targetLang}`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <img src="/logo.png" alt="Magica Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action & Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={switchLangPath}
            className="px-2.5 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {isAr ? 'English' : 'العربية'}
          </Link>

          <Link
            href={`/${lang}/login`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-blue-600 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{isAr ? 'دخول' : 'Sign In'}</span>
          </Link>

          <Link
            href={`/${lang}/inquiry`}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
          >
            {isAr ? 'احجز فعاليتك' : 'Book Event'}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 text-xs">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-medium text-gray-800 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Link href={switchLangPath} className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md">
              {isAr ? 'English' : 'العربية'}
            </Link>
            <Link href={`/${lang}/login`} className="px-4 py-2 text-xs font-semibold text-blue-600">
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}