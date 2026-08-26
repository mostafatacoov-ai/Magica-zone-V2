'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton({ lang }: { lang: string }) {
  const isAr = lang === 'ar';
  const phoneNumber = '201037377505';
  const defaultMessage = isAr
    ? 'مرحباً، أود الاستفسار عن فعاليات وأنشطة ماجيكا زون.'
    : 'Hello, I would like to inquire about Magica Zone activities and camp packages.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 end-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <MessageCircle className="w-6 h-6 fill-white stroke-none" />
      <span className="text-xs font-bold hidden sm:inline">
        {isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      </span>
    </a>
  );
}