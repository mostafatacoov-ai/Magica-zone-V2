import React from 'react';
import { AudioPlayer } from '@/components/modules/media/AudioPlayer';
import { Radio, Headphones, Sparkles } from 'lucide-react';

export default function MediaPage({ params }: { params: { lang: string } }) {
    const isAr = params.lang === 'ar';

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
            {/* Header Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                    <Headphones className="w-4 h-4 text-purple-600" />
                    <span>{isAr ? 'صوتيات وبودكاست ماجيكا' : 'Camp Chants, Songs & Podcasts'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">
                    {isAr ? 'أهازيج وبودكاست معسكرات ماجيكا' : 'Interactive Audio Hub & Camp Songs'}
                </h1>

                <p className="text-xs sm:text-base text-gray-600 leading-relaxed">
                    {isAr
                        ? 'استمع إلى أغاني المعسكر الرسمية، هتافات حماس الفرق، وبودكاست تنمية مهارات القيادة للشباب والأطفال.'
                        : 'Listen to official camp anthems, morning field chants, and inspiring youth leadership podcasts.'}
                </p>
            </div>

            {/* Interactive Audio Player */}
            <AudioPlayer lang={params.lang} />
        </main>
    );
}