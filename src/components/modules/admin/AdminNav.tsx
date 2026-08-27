'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Inbox,
  Sparkles,
  GraduationCap,
  ShoppingBag,
  Users,
  FileCheck,
  Radio,
  Backpack,
  Shirt,
} from 'lucide-react';

export function AdminNav({ lang }: { lang: string }) {
  const pathname = usePathname();
  const isAr = lang === 'ar';

  const tabs = [
    { href: `/${lang}/admin`, label: isAr ? 'طلبات الحجز' : 'Inquiries', icon: Inbox },
    { href: `/${lang}/admin/activities`, label: isAr ? 'إدارة الأنشطة' : 'Activities', icon: Sparkles },
    { href: `/${lang}/admin/courses`, label: isAr ? 'إدارة الدورات' : 'Courses', icon: GraduationCap },
    { href: `/${lang}/admin/supplies`, label: isAr ? 'المستلزمات والحقائب' : 'Supplies & Bags', icon: Backpack },
    { href: `/${lang}/admin/uniform`, label: isAr ? 'اليونيفورم والملابس' : 'Uniforms', icon: Shirt },
    { href: `/${lang}/admin/bazar`, label: isAr ? 'إدارة البازار' : 'Bazar Store', icon: ShoppingBag },
    { href: `/${lang}/admin/users`, label: isAr ? 'فريق العمل' : 'Staff & Roles', icon: Users },
    { href: `/${lang}/admin/assignments`, label: isAr ? 'واجبات الطلاب' : 'Assignments', icon: FileCheck },
    { href: `/${lang}/admin/radio`, label: isAr ? 'راديو ماجيكا' : 'Radio & Music', icon: Radio },
  ];

  return (
    <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 bg-white border border-gray-200'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}