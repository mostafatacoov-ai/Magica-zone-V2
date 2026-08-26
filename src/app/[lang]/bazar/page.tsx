import React from 'react';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Product } from '@/lib/models/Product';
import { BazarCatalog } from '@/components/modules/bazar/BazarCatalog';
import { IProduct } from '@/types';
import { ShoppingBag } from 'lucide-react';

async function getProducts(): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const data = await Product.find({ inStock: true }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}

export default async function BazarPage({ params }: { params: { lang: string } }) {
  const isAr = params.lang === 'ar';
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-4">
          <ShoppingBag className="w-4 h-4 text-amber-600" />
          <span>{isAr ? 'متجر ومستلزمات ماجيكا' : 'Magic Bazar & Supplies'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {isAr ? 'بازار ومستلزمات الفعاليات والمعسكرات' : 'Camp Supplies, Apparel & Gear'}
        </h1>
        <p className="mt-4 text-base text-gray-600 leading-relaxed">
          {isAr
            ? 'تجهيزات متكاملة من اليونيفورم المخصص، أدوات الأنشطة التفاعلية، ومعدات المعسكرات المعتمدة للأفراد والمدارس والشركات.'
            : 'Customized apparel, certified facilitation kits, and camp gear designed for schools, clubs, and corporate organizations.'}
        </p>
      </div>

      {/* Interactive Catalog */}
      <BazarCatalog products={products} lang={params.lang} />
    </main>
  );
}