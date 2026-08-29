'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { IProduct } from '@/types';
import { CheckCircle2, ShoppingCart, X, Check } from 'lucide-react';

interface ProductStoreProps {
    products: IProduct[];
    lang: string;
    storeType: 'supplies' | 'uniform';
}

export function ProductStore({ products, lang, storeType }: ProductStoreProps) {
    const isAr = lang === 'ar';
    const isUniform = storeType === 'uniform';

    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>('Medium (10-12 yrs)');
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [customerForm, setCustomerForm] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
    });

    const sizes = [
        { id: 'S', labelEn: 'Small (6-8 yrs)', labelAr: 'صغير (6-8 سنوات)' },
        { id: 'M', labelEn: 'Medium (10-12 yrs)', labelAr: 'وسط (10-12 سنة)' },
        { id: 'L', labelEn: 'Large (14-16 yrs)', labelAr: 'كبير (14-16 سنة)' },
        { id: 'XL', labelEn: 'Adult XL', labelAr: 'مقاس كبير للبالغين' },
    ];

    const handleOpenOrder = (product: IProduct) => {
        setSelectedProduct(product);
        setQuantity(1);
        setOrderSuccess(false);
        setIsOrdering(true);
    };

    const handleOrderSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;

        const priceText =
            selectedProduct.priceEGP && selectedProduct.priceEGP > 0
                ? `${(selectedProduct.priceEGP * quantity).toLocaleString()} EGP`
                : 'Price Upon Inquiry';

        const orderNotes = `[${storeType.toUpperCase()} ORDER] Item: ${selectedProduct.nameEn} | Qty: ${quantity} ${isUniform ? `| Size: ${selectedSize}` : ''
            } | Address: ${customerForm.address} | Amount: ${priceText}`;

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: customerForm.fullName,
                    phone: customerForm.phone,
                    email: customerForm.email,
                    category: 'bazar',
                    estimatedParticipants: quantity,
                    location: customerForm.address,
                    notes: orderNotes,
                }),
            });

            if (res.ok) {
                setOrderSuccess(true);
            }
        } catch (err) {
            console.error('Order failed', err);
        }
    };

    return (
        <div className="space-y-10">
            {products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 font-medium">
                        {isAr ? 'لا توجد منتجات متاحة في هذا القسم حالياً.' : 'No products available in this store currently.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const name = isAr ? product.nameAr : product.nameEn;
                        const desc = isAr ? product.descriptionAr : product.descriptionEn;
                        const features = isAr ? product.featuresAr : product.featuresEn;
                        const imageSource =
                            product.imageUrl && product.imageUrl.length > 3
                                ? product.imageUrl
                                : isUniform
                                    ? '/magica-Uniform-print.png'
                                    : '/magica-Supplies-print.png';

                        return (
                            <div
                                key={product.id || (product as any)._id || product.nameEn}
                                className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border border-amber-100/80 shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="space-y-4">
                                    <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-amber-50/50 border border-amber-100/80 flex items-center justify-center">
                                        <Image
                                            src={imageSource}
                                            alt={name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                            {isUniform ? (isAr ? 'يونيفورم رسمي' : 'Official Apparel') : (isAr ? 'مستلزمات تنفيذية' : 'Smart Gear')}
                                        </span>
                                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                                            {isAr ? 'متوفر للتسليم' : 'In Stock'}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{name}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed mt-1.5 font-medium line-clamp-2">{desc}</p>
                                    </div>

                                    {features && features.length > 0 && (
                                        <div className="space-y-1.5 pt-3 border-t border-gray-100">
                                            {features.map((feat, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                    <span className="font-medium">{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                                    <div>
                                        <span className="text-[10px] text-gray-400 font-bold block uppercase">{isAr ? 'السعر' : 'Price'}</span>
                                        {product.priceEGP && product.priceEGP > 0 ? (
                                            <span className="text-2xl font-black text-gray-900">
                                                {product.priceEGP.toLocaleString()} <span className="text-xs text-gray-500 font-bold">{isAr ? 'ج.م' : 'EGP'}</span>
                                            </span>
                                        ) : (
                                            <span className="text-xs font-black text-blue-600">{isAr ? 'السعر عند الطلب' : 'Price Upon Inquiry'}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleOpenOrder(product)}
                                        className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all hover:scale-105"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>{isAr ? 'طلب الشراء' : 'Buy Now'}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isOrdering && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl bg-amber-50 border border-gray-100 overflow-hidden shrink-0">
                                    <Image
                                        src={selectedProduct.imageUrl || (isUniform ? '/magica-Uniform-print.png' : '/magica-Supplies-print.png')}
                                        alt="Product"
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                                        {isAr ? 'طلب شراء مباشر' : 'Direct Order'}
                                    </span>
                                    <h3 className="text-base font-black text-gray-900">
                                        {isAr ? selectedProduct.nameAr : selectedProduct.nameEn}
                                    </h3>
                                </div>
                            </div>
                            <button onClick={() => setIsOrdering(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {orderSuccess ? (
                            <div className="py-8 text-center space-y-3">
                                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-7 h-7 stroke-" />
                                </div>
                                <h4 className="text-xl font-black text-emerald-900">
                                    {isAr ? 'تم استلام طلب الشراء بنجاح!' : 'Order Placed Successfully!'}
                                </h4>
                                <p className="text-xs text-emerald-700 max-w-xs mx-auto">
                                    {isAr
                                        ? 'سيقوم فريق المبيعات بالتواصل معك هاتفياً لتأكيد الشحن والتسليم.'
                                        : 'Our sales team will contact you via phone or WhatsApp to confirm delivery.'}
                                </p>
                                <button onClick={() => setIsOrdering(false)} className="mt-4 px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl">
                                    {isAr ? 'إغلاق' : 'Close'}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs">
                                {isUniform && (
                                    <div>
                                        <label className="block font-bold text-gray-800 mb-1.5">{isAr ? 'اختر المقاس:' : 'Select Size:'}</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {sizes.map((s) => (
                                                <button
                                                    type="button"
                                                    key={s.id}
                                                    onClick={() => setSelectedSize(isAr ? s.labelAr : s.labelEn)}
                                                    className={`p-2 rounded-xl text-start font-bold border transition-all ${selectedSize.includes(s.id) || selectedSize === (isAr ? s.labelAr : s.labelEn)
                                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {isAr ? s.labelAr : s.labelEn}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block font-bold text-gray-800 mb-1.5">{isAr ? 'الكمية المطلوبة:' : 'Quantity:'}</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-base text-gray-700 flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span className="font-black text-sm text-gray-900 px-3">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-base text-gray-700 flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-1">{isAr ? 'الاسم الكامل *' : 'Full Name *'}</label>
                                        <input
                                            required
                                            value={customerForm.fullName}
                                            onChange={(e) => setCustomerForm({ ...customerForm, fullName: e.target.value })}
                                            className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-bold text-gray-700 mb-1">{isAr ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}</label>
                                        <input
                                            required
                                            value={customerForm.phone}
                                            onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                                            className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-bold text-gray-700 mb-1">{isAr ? 'عنوان التوصيل والمدينة *' : 'Delivery Address & City *'}</label>
                                    <input
                                        required
                                        placeholder={isAr ? 'مثال: التجمع الخامس، القاهرة' : 'e.g. New Cairo, Egypt'}
                                        value={customerForm.address}
                                        onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                                        className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    />
                                </div>

                                <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-2xl flex items-center justify-between">
                                    <span className="font-bold text-gray-800">{isAr ? 'إجمالي التكلفة:' : 'Total Amount:'}</span>
                                    {selectedProduct.priceEGP && selectedProduct.priceEGP > 0 ? (
                                        <span className="text-base font-black text-blue-600">
                                            {(selectedProduct.priceEGP * quantity).toLocaleString()} {isAr ? 'ج.م' : 'EGP'}
                                        </span>
                                    ) : (
                                        <span className="text-xs font-black text-blue-600">{isAr ? 'السعر عند الطلب' : 'Price Upon Inquiry'}</span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg transition-colors"
                                >
                                    {isAr ? 'تأكيد وإرسال طلب الشراء' : 'Confirm & Place Order'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}