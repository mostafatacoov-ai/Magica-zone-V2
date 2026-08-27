'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Target,
  Tent,
  GraduationCap,
  Utensils,
  ShoppingBag,
  Headphones,
  Backpack,
  Shirt,
  Globe2,
} from 'lucide-react';

export function Header({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAr = lang === 'ar';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Dynamic Auth State Check
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.user) {
          setCurrentUser(json.user);
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push(`/${lang}/login`);
    router.refresh();
  };

  const magicaSectors = [
    {
      href: `/${lang}/activities`,
      labelEn: 'Magica Events & Activities',
      labelAr: 'فعاليات وأنشطة ماجيكا',
      descEn: 'Turnkey interactive games & custom package calculator',
      descAr: 'كتالوج الفعاليات التفاعلية وحاسبة الباقات المخصصة',
      icon: Target,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      href: `/${lang}/camp`,
      labelEn: 'Magica Camp',
      labelAr: 'معسكرات ماجيكا',
      descEn: 'Day camps, school trips & outdoor youth events',
      descAr: 'معسكرات اليوم الواحد والرحلات المدرسية والشبابية',
      icon: Tent,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      href: `/${lang}/courses`,
      labelEn: 'Magica Courses & Workshops',
      labelAr: 'دورات وورش ماجيكا',
      descEn: 'STEM robotics, leadership & public speaking',
      descAr: 'تحديات STEM، القيادة، والخطابة والإلقاء',
      icon: GraduationCap,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      href: `/${lang}/food`,
      labelEn: 'Magica Food & Catering',
      labelAr: 'إطعام وضيافة ماجيكا',
      descEn: 'Camp lunchboxes, healthy snacks & corporate buffets',
      descAr: 'وجبات المعسكرات الصحية وبوفيهات الشركات المفتوحة',
      icon: Utensils,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      href: `/${lang}/bazar`,
      labelEn: 'Magica Bazar',
      labelAr: 'بازار ومتجر ماجيكا',
      descEn: 'Live kid-run marketplace & student stores',
      descAr: 'السوق الحقيقي ومتاجر رواد الأعمال الصغار',
      icon: ShoppingBag,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      href: `/${lang}/supplies`,
      labelEn: 'Magica Supplies',
      labelAr: 'مستلزمات وأدوات ماجيكا',
      descEn: 'Smart executive CEO backpacks & innovation gear',
      descAr: 'حقائب مدرسية تنفيذية طبية وأدوات الابتكار',
      icon: Backpack,
      color: 'text-rose-600 bg-rose-50',
    },
    {
      href: `/${lang}/uniform`,
      labelEn: 'Magica Uniform',
      labelAr: 'يونيفورم وملابس ماجيكا',
      descEn: 'Official explorer polo sets, caps & hoodies',
      descAr: 'اليونيفورم الرسمي، الهوديز، والأطقم الرياضية',
      icon: Shirt,
      color: 'text-blue-700 bg-blue-50',
    },
    {
      href: `/${lang}/media`,
      labelEn: 'Magica Radio & Media',
      labelAr: 'راديو وصوتيات ماجيكا',
      descEn: 'Official camp songs, chants & youth podcasts',
      descAr: 'أغاني المعسكر الرسمية، الهتافات، وبودكاست الشباب',
      icon: Headphones,
      color: 'text-fuchsia-600 bg-fuchsia-50',
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
    <header className="sticky top-0 z-50 bg-[#FFFAF0]/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <div className="relative h-10 w-36 sm:w-44">
            <Image
              src="/logo.png"
              alt="Magica Zone Logo"
              fill
              sizes="(max-width: 768px) 144px, 176px"
              className="object-contain"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/0logo.png';
              }}
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="text-xs font-black text-gray-800 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>

          {/* Our World Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-black text-gray-800 hover:text-blue-600 py-2 focus:outline-none transition-colors"
            >
              <span>{isAr ? 'عالم ماجيكا' : 'Our World'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
              />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full start-0 mt-1 w-84 sm:w-[420px] bg-white rounded-3xl border border-amber-100 shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2"
              >
                {/* Comprehensive World Header Link */}
                <Link
                  href={`/${lang}#sectors`}
                  onClick={() => setServicesDropdownOpen(false)}
                  className="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-amber-300" />
                    <span className="text-xs font-black">
                      {isAr ? 'عالم ماجيكا الشامل (كافة القطاعات)' : 'Our Comprehensive World (All Sectors)'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md">
                    {isAr ? 'استكشف ↓' : 'Explore ↓'}
                  </span>
                </Link>

                <div className="grid grid-cols-1 gap-1 max-h-[60vh] overflow-y-auto pt-1">
                  {magicaSectors.map((srv) => {
                    const Icon = srv.icon;
                    return (
                      <Link
                        key={srv.href + srv.labelEn}
                        href={srv.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-amber-50/50 transition-colors group"
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${srv.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-gray-900 group-hover:text-blue-600 transition-colors">
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
              </div>
            )}
          </div>

          <Link
            href={`/${lang}/about`}
            className="text-xs font-black text-gray-800 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'عن ماجيكا' : 'About Us'}
          </Link>

          <Link
            href={`/${lang}/contact`}
            className="text-xs font-black text-gray-800 hover:text-blue-600 transition-colors"
          >
            {isAr ? 'اتصل بنا' : 'Contact'}
          </Link>

          {/* Student Portal - Rendered ONLY When Signed In */}
          {currentUser && (
            <Link
              href={`/${lang}/dashboard`}
              className="text-xs font-black text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl transition-colors border border-blue-200"
            >
              {isAr ? 'بوابة الطالب' : 'Student Portal'}
            </Link>
          )}
        </nav>

        {/* Action & Auth Area */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href={switchLangPath}
            className="px-3 py-1.5 text-xs font-bold text-gray-700 bg-white border border-amber-200/70 hover:bg-amber-50 rounded-xl transition-colors shadow-sm"
          >
            {isAr ? 'English' : 'عربي'}
          </Link>

          {currentUser ? (
            /* Logged In: Show Name & Sign Out */
            <div className="flex items-center gap-2">
              <Link
                href={`/${lang}/dashboard`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                title={isAr ? 'تسجيل الخروج' : 'Sign Out'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Logged Out: Show Sign In */
            <Link
              href={`/${lang}/login`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>{isAr ? 'دخول' : 'Sign In'}</span>
            </Link>
          )}

          <Link
            href={`/${lang}/inquiry`}
            className="px-4 py-2 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all hover:scale-105"
          >
            {isAr ? 'احجز فعاليتك' : 'Book Event'}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFAF0] border-b border-amber-200 px-4 pt-2 pb-6 space-y-3 text-xs max-h-[85vh] overflow-y-auto">
          <Link
            href={`/${lang}`}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-gray-900 hover:text-blue-600"
          >
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>

          <div className="py-2 space-y-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              {isAr ? 'عالم ماجيكا الشامل' : 'Our Comprehensive World'}
            </span>
            {magicaSectors.map((srv) => {
              const Icon = srv.icon;
              return (
                <Link
                  key={srv.href + srv.labelEn}
                  href={srv.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 py-2 text-gray-800 hover:text-blue-600"
                >
                  <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-bold">{isAr ? srv.labelAr : srv.labelEn}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-amber-200 space-y-2">
            <Link
              href={`/${lang}/about`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 font-bold text-gray-800"
            >
              {isAr ? 'عن ماجيكا' : 'About Us'}
            </Link>
            <Link
              href={`/${lang}/contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 font-bold text-gray-800"
            >
              {isAr ? 'اتصل بنا' : 'Contact'}
            </Link>

            {currentUser && (
              <Link
                href={`/${lang}/dashboard`}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 font-bold text-blue-600"
              >
                {isAr ? 'بوابة الطالب' : 'Student Portal'}
              </Link>
            )}
          </div>

          <div className="pt-4 border-t border-amber-200 flex items-center justify-between">
            <Link
              href={switchLangPath}
              className="px-3 py-1.5 font-bold text-gray-800 bg-white border border-amber-200 rounded-xl"
            >
              {isAr ? 'English' : 'عربي'}
            </Link>

            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 font-bold text-red-600 bg-red-50 rounded-xl"
              >
                {isAr ? 'تسجيل الخروج' : 'Sign Out'}
              </button>
            ) : (
              <Link
                href={`/${lang}/login`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 font-bold text-blue-600 bg-blue-50 rounded-xl"
              >
                {isAr ? 'تسجيل الدخول' : 'Sign In'}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}