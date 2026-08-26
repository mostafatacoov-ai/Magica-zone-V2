'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  User,
  Target,
  Tent,
  GraduationCap,
  Utensils,
  ShoppingBag,
  Headphones,
  Package,
  Shirt,
} from 'lucide-react';

export function Header({ lang }: { lang: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isAr = lang === 'ar';

  const servicesList = [
    {
      href: `/${lang}/activities`,
      labelEn: 'Activities & Games',
      labelAr: 'الألعاب والأنشطة التفاعلية',
      descEn: 'Turnkey games catalog & custom package calculator',
      descAr: 'كتالوج الألعاب التفاعلية وحاسبة الباقات المخصصة',
      icon: Target,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      href: `/${lang}/camp`,
      labelEn: 'Camp Programs',
      labelAr: 'المعسكرات والرحلات',
      descEn: 'Day camps, school trips & outdoor youth events',
      descAr: 'معسكرات اليوم الواحد والرحلات المدرسية والشبابية',
      icon: Tent,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      href: `/${lang}/courses`,
      labelEn: 'Workshops & Academy',
      labelAr: 'الورش والدورات التدريبية',
      descEn: 'STEM robotics, leadership & public speaking',
      descAr: 'تحديات STEM، القيادة، والخطابة والإلقاء',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      href: `/${lang}/food`,
      labelEn: 'Catering & Hospitality',
      labelAr: 'الإطعام والضيافة',
      descEn: 'Camp lunchboxes, healthy snacks & corporate buffets',
      descAr: 'وجبات المعسكرات الصحية وبوفيهات الشركات المفتوحة',
      icon: Utensils,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      href: `/${lang}/bazar`,
      labelEn: 'Magic Bazar Store',
      labelAr: 'البازار والمتجر',
      descEn: 'Official souvenirs, gear & facilitation toolkits',
      descAr: 'الأدوات الميدانية، الميداليات، والهدايا التذكارية',
      icon: ShoppingBag,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      href: `/${lang}/supplies`,
      labelEn: 'Supplies & Hardware',
      labelAr: 'المستلزمات والتجهيزات',
      descEn: 'Turnkey event staging, inflatables & props',
      descAr: 'تجهيزات متكاملة، أدوات الفعاليات، ومعدات المعسكرات',
      icon: Package,
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      href: `/${lang}/uniform`,
      labelEn: 'Uniforms & Apparel',
      labelAr: 'الأزياء واليونيفورم',
      descEn: 'Custom team performance wear & coach vests',
      descAr: 'يونيفورم موحد للمدارس والشركات والمدربين',
      icon: Shirt,
      color: 'text-pink-600 bg-pink-50',
    },
    {
      href: `/${lang}/media`,
      labelEn: 'Radio & Media Hub',
      labelAr: 'الصوتيات وراديو ماجيكا',
      descEn: 'Official camp songs, chants & youth podcasts',
      descAr: 'أغاني المعسكر الرسمية، الهتافات، وبودكاست الشباب',
      icon: Headphones,
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const targetLang = isAr ? 'en' : 'ar';
  const switchLangPath = pathname.replace(`/${lang}`, `/${targetLang}`) || `/${targetLang}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 font-black text-xl text-blue-600 tracking-tight">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>{isAr ? 'ماجيكا زون' : 'Magica Zone'}</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-700 hover:text-blue-600 py-2 focus:outline-none transition-colors"
            >
              <span>{isAr ? 'برامجنا وخدماتنا' : 'Services'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full start-0 mt-1 w-80 sm:w-96 bg-white rounded-2xl border border-gray-100 shadow-2xl p-3 grid grid-cols-1 gap-1 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${srv.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {isAr ? srv.labelAr : srv.labelEn}
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug mt-0.5 line-clamp-1">
                          {isAr ? srv.descAr : srv.descEn}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href={`/${lang}/about`}
            className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'عن ماجيكا' : 'About'}
          </Link>

          <Link
            href={`/${lang}/contact`}
            className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'اتصل بنا' : 'Contact'}
          </Link>

          <Link
            href={`/${lang}/dashboard`}
            className="text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'لوحة الطالب' : 'Dashboard'}
          </Link>
        </nav>

        {/* Action & Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={switchLangPath}
            className="px-2.5 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {isAr ? 'English' : 'العربية'}
          </Link>

          <Link
            href={`/${lang}/login`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 hover:text-blue-600 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>{isAr ? 'دخول' : 'Sign In'}</span>
          </Link>

          <Link
            href={`/${lang}/inquiry`}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
          >
            {isAr ? 'احجز فعاليتك' : 'Book Event'}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-3 text-xs max-h-[85vh] overflow-y-auto">
          <Link
            href={`/${lang}`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-gray-800 hover:text-blue-600"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>

          <div className="py-2 space-y-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              {isAr ? 'برامجنا وخدماتنا' : 'Our Services'}
            </span>
            {servicesList.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.href}
                  href={srv.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-1.5 text-gray-700 hover:text-blue-600"
                >
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">{isAr ? srv.labelAr : srv.labelEn}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-gray-100 space-y-2">
            <Link
              href={`/${lang}/about`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 font-semibold text-gray-700"
            >
              {isAr ? 'عن ماجيكا' : 'About'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 font-semibold text-gray-700"
            >
              {isAr ? 'اتصل بنا' : 'Contact'}
            </Link>
            <Link
              href={`/${lang}/dashboard`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 font-semibold text-gray-700"
            >
              {isAr ? 'لوحة الطالب' : 'Dashboard'}
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Link
              href={switchLangPath}
              className="px-3 py-1.5 font-bold text-gray-700 bg-gray-100 rounded-lg"
            >
              {isAr ? 'English' : 'العربية'}
            </Link>
            <Link
              href={`/${lang}/inquiry`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 font-bold text-white bg-blue-600 rounded-xl"
            >
              {isAr ? 'احجز فعاليتك' : 'Book Event'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}