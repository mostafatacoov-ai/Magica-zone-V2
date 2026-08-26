'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Utensils, Coffee, Apple, Flame, CheckCircle2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';

interface MenuItem {
    id: string;
    nameEn: string;
    nameAr: string;
    descriptionEn: string;
    descriptionAr: string;
    category: 'camp_lunch' | 'corporate_buffet' | 'breakfast' | 'hydration_snacks';
    pricePerPersonEGP: number;
    minGuests: number;
    itemsEn: string[];
    itemsAr: string[];
    badgeEn?: string;
    badgeAr?: string;
}

const menuItems: MenuItem[] = [
    {
        id: '1',
        nameEn: 'Active Camper Energy Lunchbox',
        nameAr: 'وجبة المعسكر المتكاملة للطاقة',
        descriptionEn: 'Balanced, nutritious meal designed for active youth during outdoor camp programs.',
        descriptionAr: 'وجبة متوازنة ومغذية مصممة للأطفال والشباب لتوفير الطاقة أثناء الأنشطة الحركية.',
        category: 'camp_lunch',
        pricePerPersonEGP: 180,
        minGuests: 15,
        badgeEn: 'Most Popular for Camps',
        badgeAr: 'الأكثر طلباً للمعسكرات',
        itemsEn: [
            'Grilled Chicken Shawarma Wrap or Crispy Chicken Slider',
            'Fresh Cut Vegetable Sticks & Hummus Dip',
            'Seasonal Fresh Fruit (Apple/Banana)',
            '100% Pure Fruit Juice Box & Water Bottle'
        ],
        itemsAr: [
            'راب شاورما دجاج مشوي أو سلايدر دجاج كرسبي',
            'أصابع خضروات طازجة مع صوص الحمص',
            'ثمرة فاكهة طازجة منتقاة',
            'عصير فواكه طبيعي 100% وزجاجة مياه'
        ]
    },
    {
        id: '2',
        nameEn: 'Executive Corporate Open Buffet & Grill',
        nameAr: 'بوفيه الشركات والمشاوي المفتوح',
        descriptionEn: 'Full-service hot buffet featuring live grill stations, gourmet salads, and desserts.',
        descriptionAr: 'بوفيه ساخن متكامل مع محطات شواء حية وسلطات متنوعة وحلويات شرقية وغربية.',
        category: 'corporate_buffet',
        pricePerPersonEGP: 450,
        minGuests: 25,
        badgeEn: 'Corporate Choice',
        badgeAr: 'خيار الشركات الأول',
        itemsEn: [
            'Live Charcoal Mixed Grill (Shish Tawook, Kofta, Beef Strips)',
            'Basmati Rice with Nuts & Oven Roasted Herb Potatoes',
            'Assorted Salad Bar (Caesar, Greek, Fattoush, Tabbouleh)',
            'Dessert Spread & Refreshing Soft Beverages'
        ],
        itemsAr: [
            'مشاوي مشكلة على الفحم (شيش طاووق، كفتة مشوية، لحم تندرلوين)',
            'أرز بسمتي بالمكسرات وبطاطس روستو بالأعشاب',
            'بار سلطات ومقبلات (سيزر، يونانية، فتوش، تبولة)',
            'تشكيلة حلويات شرقية وغربية ومشروبات منعشة'
        ]
    },
    {
        id: '3',
        nameEn: 'Rise & Shine Morning Breakfast Station',
        nameAr: 'محطة الإفطار الصباحي والمخبوزات',
        descriptionEn: 'Fresh morning spread with artisan pastries, hot foul station, cheeses, and brewed coffee.',
        descriptionAr: 'إفطار صباحي شهي مع مخبوزات طازجة، محطة فول مصرية تقليدية، أجبان، وقهوة ساخنة.',
        category: 'breakfast',
        pricePerPersonEGP: 150,
        minGuests: 20,
        badgeEn: 'Morning Fuel',
        badgeAr: 'طاقة الصباح',
        itemsEn: [
            'Freshly Baked Croissants, Danishes & Mini Sandwiches',
            'Traditional Egyptian Foul Station with Artisan Bread',
            'Gourmet Cheeses, Olives & Fresh Jam Spread',
            'Fresh Brewed Coffee, Tea Bar & Orange Juice'
        ],
        itemsAr: [
            'كرواسون طازج، باتيه وساندوتشات صغيرة منوعة',
            'محطة فول إسكندراني تقليدية مع خبز بلدي ساخن',
            'تشكيلة أجبان فاخرة، زيتون، ومربى طبيعية',
            'ركن القهوة الطازجة والشاي وعصير البرتقال'
        ]
    },
    {
        id: '4',
        nameEn: 'All-Day Hydration & Healthy Snack Bar',
        nameAr: 'ركن المرطبات المستمر والسناكس الصحية',
        descriptionEn: 'Continuous refreshment station with infused cold water, granola bars, and fruit skewers.',
        descriptionAr: 'محطة مشروبات منعشة وسناكس خفيفة مستمرة طوال ساعات الفعالية للمشاركين.',
        category: 'hydration_snacks',
        pricePerPersonEGP: 95,
        minGuests: 20,
        badgeEn: 'All-Day Refresh',
        badgeAr: 'انتعاش مستمر',
        itemsEn: [
            'Chilled Infused Lemon-Mint & Berry Water Dispensers',
            'Assorted Healthy Granola & Protein Bars',
            'Chilled Fresh Fruit Skewers',
            'Unlimited Bottled Mineral Water'
        ],
        itemsAr: [
            'موزعات مياه مثلجة منكهة بالليمون والنعناع والتوت',
            'ألواح جرانولا صحية وسناكس بروتين',
            'أسياخ فواكه طازجة مثلجة',
            'زجاجات مياه معدنية غير محدودة طوال الفعالية'
        ]
    }
];

export function FoodMenu({ lang }: { lang: string }) {
    const isAr = lang === 'ar';
    const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [selectedMealId, setSelectedMealId] = useState<string>('1');
    const [guestCount, setGuestCount] = useState<number>(30);

    const categories = [
        { key: 'all', labelEn: 'All Menus', labelAr: 'جميع القوائم' },
        { key: 'camp_lunch', labelEn: 'Camp Lunchboxes', labelAr: 'وجبات المعسكرات' },
        { key: 'corporate_buffet', labelEn: 'Corporate Buffets', labelAr: 'بوفيهات الشركات' },
        { key: 'breakfast', labelEn: 'Breakfast Stations', labelAr: 'محطات الإفطار' },
        { key: 'hydration_snacks', labelEn: 'Hydration & Snacks', labelAr: 'المرطبات والسناكس' },
    ];

    const filteredItems = menuItems.filter(
        (item) => activeCategory === 'all' || item.category === activeCategory
    );

    const activeMeal = menuItems.find((m) => m.id === selectedMealId) || menuItems[0];
    const totalCateringEstimate = activeMeal.pricePerPersonEGP * guestCount;

    return (
        <div className="space-y-12">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${activeCategory === cat.key
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {isAr ? cat.labelAr : cat.labelEn}
                    </button>
                ))}
            </div>

            {/* Menu Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredItems.map((meal) => {
                    const isSelected = meal.id === selectedMealId;
                    const name = isAr ? meal.nameAr : meal.nameEn;
                    const desc = isAr ? meal.descriptionAr : meal.descriptionEn;
                    const items = isAr ? meal.itemsAr : meal.itemsEn;
                    const badge = isAr ? meal.badgeAr : meal.badgeEn;

                    return (
                        <div
                            key={meal.id}
                            onClick={() => setSelectedMealId(meal.id)}
                            className={`cursor-pointer rounded-3xl p-6 sm:p-8 border transition-all flex flex-col justify-between space-y-6 ${isSelected
                                    ? 'bg-blue-50/50 border-blue-600 shadow-md ring-2 ring-blue-600/20'
                                    : 'bg-white border-gray-100 hover:border-gray-300 shadow-sm'
                                }`}
                        >
                            <div>
                                {/* Badge & Price */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    {badge ? (
                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                                            <Flame className="w-3.5 h-3.5 text-amber-600" />
                                            {badge}
                                        </span>
                                    ) : <span />}

                                    <span className="text-sm font-black text-blue-600">
                                        {meal.pricePerPersonEGP} {isAr ? 'ج.م / للفرد' : 'EGP / person'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-5">{desc}</p>

                                {/* Items List */}
                                <div className="space-y-2 py-3 border-t border-gray-100">
                                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                                        {isAr ? 'مكونات القائمة:' : 'Menu Inclusions:'}
                                    </span>
                                    {items.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card Action */}
                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-[11px] text-gray-400">
                                    {isAr ? `الحد الأدنى: ${meal.minGuests} فرد` : `Min: ${meal.minGuests} guests`}
                                </span>

                                <button
                                    type="button"
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${isSelected
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {isSelected
                                        ? isAr ? 'القائمة المختارة للحساب' : 'Selected for Estimate'
                                        : isAr ? 'اختيار القائمة' : 'Select Menu'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Interactive Catering Budget Calculator Card */}
            <div className="bg-gradient-to-r from-gray-900 via-slate-900 to-blue-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                    <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 mb-2">
                            <Utensils className="w-3.5 h-3.5" />
                            <span>{isAr ? 'حاسبة تكلفة الإطعام والضيافة' : 'Catering Cost Estimator'}</span>
                        </div>
                        <h3 className="text-2xl font-bold">
                            {isAr ? 'احسب تكلفة الوجبات لفعاليتك' : 'Calculate Catering for Your Event'}
                        </h3>
                    </div>

                    <div className="text-start sm:text-end">
                        <span className="text-xs text-gray-400 block">{isAr ? 'القائمة النشطة' : 'Active Selection'}</span>
                        <span className="text-base font-bold text-amber-400">{isAr ? activeMeal.nameAr : activeMeal.nameEn}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Guest Count Slider */}
                    <div className="space-y-3">
                        <label className="block text-xs font-semibold text-gray-300">
                            {isAr ? 'عدد الأفراد المتوقع:' : 'Estimated Guests:'} ({guestCount} {isAr ? 'فرد' : 'people'})
                        </label>
                        <input
                            type="range"
                            min={15}
                            max={300}
                            step={5}
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[11px] text-gray-400">
                            <span>15 {isAr ? 'فرد' : 'guests'}</span>
                            <span>300+ {isAr ? 'فرد' : 'guests'}</span>
                        </div>
                    </div>

                    {/* Price Output & Transfer CTA */}
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <span className="text-xs text-gray-400 block">{isAr ? 'إجمالي تكلفة الإطعام:' : 'Total Catering Estimate:'}</span>
                            <span className="text-3xl font-black text-amber-400">
                                {totalCateringEstimate.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-gray-300 ms-1">{isAr ? 'ج.م' : 'EGP'}</span>
                        </div>

                        <Link
                            href={`/${lang}/inquiry?category=camp&notes=${encodeURIComponent(`Catering Request: ${activeMeal.nameEn} for ~${guestCount} people. (Estimated: ${totalCateringEstimate.toLocaleString()} EGP)`)}&participants=${guestCount}`}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-lg"
                        >
                            <span>{isAr ? 'طلب حجز الوجبات' : 'Book with this Menu'}</span>
                            <ArrowIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}