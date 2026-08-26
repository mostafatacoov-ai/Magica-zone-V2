'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IProduct, ProductCategory } from '@/types';
import { ShoppingBag, CheckCircle2, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

export function BazarCatalog({ products, lang }: { products: IProduct[]; lang: string }) {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const categories = [
    { key: 'all', labelEn: 'All Items', labelAr: 'جميع المنتجات' },
    { key: 'uniforms', labelEn: 'Uniforms & Apparel', labelAr: 'اليونيفورم والملابس' },
    { key: 'camp_gear', labelEn: 'Camp Gear', labelAr: 'معدات المعسكرات' },
    { key: 'event_supplies', labelEn: 'Event Supplies', labelAr: 'أدوات ومستلزمات الفعاليات' },
    { key: 'souvenirs', labelEn: 'Medals & Souvenirs', labelAr: 'الهدايا والميداليات التذكارية' },
  ];

  const filteredProducts = products.filter((prod) => {
    return selectedCategory === 'all' || prod.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === cat.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {isAr ? cat.labelAr : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">
            {isAr ? 'لا توجد منتجات في هذا القسم حالياً.' : 'No products found in this category.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const name = isAr ? product.nameAr : product.nameEn;
            const desc = isAr ? product.descriptionAr : product.descriptionEn;
            const features = isAr ? product.featuresAr : product.featuresEn;

            return (
              <div
                key={product.id || product.nameEn}
                className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      <Tag className="w-3 h-3" />
                      {product.category.replace('_', ' ')}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {isAr ? 'متوفر' : 'In Stock'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-gray-900 text-base mb-2">{name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{desc}</p>

                  {/* Features */}
                  {features && features.length > 0 && (
                    <div className="space-y-1.5 mb-4">
                      {features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[11px] text-gray-400 block">{isAr ? 'السعر' : 'Price'}</span>
                    <span className="text-base font-bold text-gray-900">
                      {product.priceEGP.toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                    </span>
                  </div>

                  <Link
                    href={`/${lang}/inquiry?category=bazar&product=${encodeURIComponent(product.nameEn)}`}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'طلب المنتج' : 'Order'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}