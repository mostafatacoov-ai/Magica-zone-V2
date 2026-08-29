'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  GraduationCap,
  ShoppingBag,
  Users,
  FileCheck,
  Radio,
  Backpack,
  Shirt,
  LogOut,
  Tent,
  Database,
  Check,
} from 'lucide-react';

export function AdminNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAr = lang === 'ar';
  const [seeding, setSeeding] = useState(false);
  const [seededSuccess, setSeededSuccess] = useState(false);

  const crmSections = [
    { href: `/${lang}/admin`, label: isAr ? 'لوحة المبيعات وCRM' : 'CRM & Inquiries', icon: LayoutDashboard },
    { href: `/${lang}/admin/camp`, label: isAr ? 'المعسكرات والصور' : 'Camp Programs & Photos', icon: Tent },
    { href: `/${lang}/admin/activities`, label: isAr ? 'الألعاب والفعاليات' : 'Events & Activities', icon: Sparkles },
    { href: `/${lang}/admin/courses`, label: isAr ? 'الأكاديمية والمدربين' : 'Courses & Instructors', icon: GraduationCap },
    { href: `/${lang}/admin/supplies`, label: isAr ? 'الحقائب والمستلزمات' : 'Supplies & Bags', icon: Backpack },
    { href: `/${lang}/admin/uniform`, label: isAr ? 'اليونيفورم والملابس' : 'Uniforms', icon: Shirt },
    { href: `/${lang}/admin/bazar`, label: isAr ? 'متاجر البازار' : 'Bazar Store', icon: ShoppingBag },
    { href: `/${lang}/admin/users`, label: isAr ? 'فريق العمل' : 'Staff & Roles', icon: Users },
    { href: `/${lang}/admin/assignments`, label: isAr ? 'تقييم الواجبات' : 'Assignments Review', icon: FileCheck },
    { href: `/${lang}/admin/radio`, label: isAr ? 'راديو البث المباشر' : 'Radio & Music', icon: Radio },
  ];

  const handleAdminLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${lang}/admin/login`);
    router.refresh();
  };

  const handleOneClickSeed = async () => {
    if (!confirm(isAr ? 'هل تريد استيراد وتحديث كافة بيانات الألعاب (37 لعبة) والمنتجات والكورسات في قاعدة البيانات؟' : 'Import and populate all 37 games, store products, and courses into MongoDB?')) return;
    setSeeding(true);
    setSeededSuccess(false);

    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        setSeededSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        alert(json.error || 'Seed failed');
      }
    } catch (err) {
      console.error(err);
      alert('Seeding request failed');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between gap-3 overflow-x-auto">
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {crmSections.map((sec) => {
          const Icon = sec.icon;
          const isActive = pathname === sec.href;
          return (
            <Link
              key={sec.href}
              href={sec.href}
              prefetch={false}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
              <span>{sec.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* 1-Click Database Population Button */}
        <button
          onClick={handleOneClickSeed}
          disabled={seeding}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-black rounded-xl transition-all shadow-sm ${
            seededSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
          }`}
          title="Seed all 37 games and store products into database"
        >
          {seededSuccess ? <Check className="w-3.5 h-3.5" /> : <Database className={`w-3.5 h-3.5 ${seeding ? 'animate-spin' : ''}`} />}
          <span>{seeding ? (isAr ? 'جاري الاستيراد...' : 'Importing...') : seededSuccess ? (isAr ? 'تم بنجاح!' : 'Imported!') : (isAr ? 'استيراد كافة البيانات (37 لعبة)' : 'Populate All Catalog')}</span>
        </button>

        <button
          onClick={handleAdminLogout}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200/80"
          title={isAr ? 'تسجيل الخروج' : 'Log Out Admin'}
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isAr ? 'خروج' : 'Logout'}</span>
        </button>
      </div>
    </div>
  );
}