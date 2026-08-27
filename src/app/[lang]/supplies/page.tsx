import React from 'react';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Product } from '@/lib/models/Product';
import { ProductStore } from '@/components/modules/store/ProductStore';
import { IProduct } from '@/types';
import { Backpack, ShieldCheck, Sparkles } from 'lucide-react';

async function getSupplies(): Promise<IProduct[]> {
    try {
        await connectToDatabase();
        const data = await Product.find({
            category: { $in: ['camp_gear', 'event_supplies', 'souvenirs'] },
            inStock: true,
        }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error('Failed to load supplies:', error);
        return [];
    }
}

export default async function SuppliesPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const products = await getSupplies();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-rose-100 text-rose-800 shadow-sm">
                    <Backpack className="w-4 h-4 text-rose-600" />
                    <span>{isAr ? 'مستلزمات وأدوات ماجيكا' : 'Magica Supplies & Smart Gear'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                    {isAr ? 'حقائب القادة وأدوات المعسكرات' : 'Smart Executive Bags & Innovation Gear'}
                </h1>

                <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-medium">
                    {isAr
                        ? 'حقائب مدرسية تنفيذية طبية، أدوات ورش الابتكار، ومعدات معسكرات الشباب المصممة وفق أعلى معايير الجودة والمتانة.'
                        : 'Ergonomic, water-resistant school bags and innovation toolkits designed for young leaders to organize, experiment, and succeed.'}
                </p>
            </div>

            {/* Supplies Mini-Store */}
            <ProductStore products={products} lang={params.lang} storeType="supplies" />
        </main>
    );
}