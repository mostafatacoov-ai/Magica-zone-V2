import React from 'react';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Product } from '@/lib/models/Product';
import { ProductStore } from '@/components/modules/store/ProductStore';
import { IProduct } from '@/types';
import { Shirt, Sparkles } from 'lucide-react';

async function getUniforms(): Promise<IProduct[]> {
    try {
        await connectToDatabase();
        const data = await Product.find({
            category: 'uniforms',
            inStock: true,
        }).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error('Failed to load uniforms:', error);
        return [];
    }
}

export default async function UniformPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';
    const products = await getUniforms();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-blue-100 text-blue-900 shadow-sm">
                    <Shirt className="w-4 h-4 text-blue-700" />
                    <span>{isAr ? 'يونيفورم وملابس ماجيكا' : 'Magica Official Apparel'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                    {isAr ? 'ارتدِ هويتك القيادية بفخر' : 'Wear Your Identity with Pride'}
                </h1>

                <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-medium">
                    {isAr
                        ? 'أطقم بولو وكاب المستكشف الرسمي، هوديز ريادة الأعمال الفاخرة، والملابس الرياضية المصنعة من أقطان مسامية مريحة وعالية الجودة.'
                        : 'Official explorer polo sets, caps, and founder fleece hoodies crafted from breathable, premium active cotton for school and field.'}
                </p>
            </div>

            {/* Uniforms Mini-Store */}
            <ProductStore products={products} lang={params.lang} storeType="uniform" />
        </main>
    );
}