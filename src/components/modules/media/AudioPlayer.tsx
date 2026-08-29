'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2, Mic, FileText, Sparkles } from 'lucide-react';

export interface Track {
    id: string;
    titleEn: string;
    titleAr: string;
    artistEn: string;
    artistAr: string;
    category: 'songs' | 'podcast' | 'chants';
    duration: string;
    audioUrl: string;
    lyricsEn: string[];
    lyricsAr: string[];
}

const playlist: Track[] = [
    {
        id: '1',
        titleEn: 'Magica Official Camp Anthem',
        titleAr: 'نشيد معسكر ماجيكا الرسمي',
        artistEn: 'Magica Youth Choir & Coaches',
        artistAr: 'كورال ومدربو ماجيكا',
        category: 'songs',
        duration: '3:15',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        lyricsEn: [
            'Together we rise, together we stand,',
            'Building our dreams across the land!',
            'Magica energy in our hearts,',
            'Where joyful learning always starts!'
        ],
        lyricsAr: [
            'معاً ننهض، يداً بيد نبني الأحلام،',
            'في معسكر ماجيكا نحقق الإلهام!',
            'طاقة وحيوية في كل القلوب،',
            'نتعلم ونبدع في كل الدروب!'
        ]
    },
    {
        id: '2',
        titleEn: 'Morning Spirit Battle Cry',
        titleAr: 'هتاف الصباح وروح الفريق',
        artistEn: 'Field Facilitators',
        artistAr: 'ميسرو الأنشطة الميدانية',
        category: 'chants',
        duration: '1:45',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        lyricsEn: [
            'Who are we? MAGICA!',
            'What do we do? WIN TOGETHER!',
            'Ready to jump, ready to run,',
            'Unstoppable team under the sun!'
        ],
        lyricsAr: [
            'من نحن؟ ماجيكا!',
            'ما هدفنا؟ الفوز معاً بروح الفريق!',
            'جاهزون للحركة، جاهزون للتحدي،',
            'فريق لا يقهر تحت الشمس وفي كل ميدان!'
        ]
    },
    {
        id: '3',
        titleEn: 'Junior Leadership Podcast: Ep 1',
        titleAr: 'بودكاست القيادة للشباب: الحلقة الأولى',
        artistEn: 'Coach Mohamed & Youth Guests',
        artistAr: 'كوتش محمد وضيوف المعسكر',
        category: 'podcast',
        duration: '5:20',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        lyricsEn: [
            '[Intro Music]',
            'Host: Welcome to Magica Youth Podcast!',
            'Today we discuss how small acts of active listening create great leaders.'
        ],
        lyricsAr: [
            '[موسيقى البداية]',
            'المقدم: مرحباً بكم في بودكاست ماجيكا للشباب!',
            'في هذه الحلقة نناقش كيف يصنع الاستماع الفعال قادة حقيقيين قادرين على إدارة فرقهم.'
        ]
    },
    {
        id: '4',
        titleEn: 'Campfire Harmony & Farewell Song',
        titleAr: 'أغنية الوداع وحلقة السمر المسائية',
        artistEn: 'Magica Facilitation Team',
        artistAr: 'فريق تدريب ماجيكا',
        category: 'songs',
        duration: '2:50',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        lyricsEn: [
            'The sun goes down, the fire glows,',
            'The bond of friendship only grows.',
            'Until we meet again next year,',
            'Magica memories forever near!'
        ],
        lyricsAr: [
            'تغرب الشمس وتتوهج نار السمر،',
            'وتكبر صداقتنا مع مرور الساعات والقمر.',
            'إلى أن نلتقي مجدداً في فعاليتنا القادمة،',
            'ستبقى ذكريات ماجيكا خالدة في قلوبنا!'
        ]
    }
];

export function AudioPlayer({ lang }: { lang: string }) {
    const isAr = lang === 'ar';
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'songs' | 'chants' | 'podcast'>('all');
    const [showLyrics, setShowLyrics] = useState(true);

    const currentTrack = playlist[currentTrackIndex];

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };
    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const formatTime = (timeInSec: number) => {
        if (isNaN(timeInSec)) return '00:00';
        const minutes = Math.floor(timeInSec / 60);
        const seconds = Math.floor(timeInSec % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const filteredPlaylist = playlist.filter(
        (t) => activeTab === 'all' || t.category === activeTab
    );

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleNext}
            />

            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 sm:p-12 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-start space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
                            <Music2 className="w-3.5 h-3.5 text-amber-300" />
                            <span className="capitalize">{currentTrack.category}</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                            {isAr ? currentTrack.titleAr : currentTrack.titleEn}
                        </h2>
                        <p className="text-xs sm:text-sm text-blue-100">
                            {isAr ? currentTrack.artistAr : currentTrack.artistEn}
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 h-12">
                        {[40, 70, 30, 90, 50, 80, 45, 95, 60, 35].map((height, i) => (
                            <span
                                key={i}
                                style={{ height: isPlaying ? `${height}%` : '20%' }}
                                className="w-1.5 bg-amber-400 rounded-full transition-all duration-300"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-8 space-y-3 relative z-10">
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />

                    <div className="flex items-center justify-between text-xs text-blue-200 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <button
                            onClick={() => {
                                if (audioRef.current) {
                                    audioRef.current.muted = !isMuted;
                                    setIsMuted(!isMuted);
                                }
                            }}
                            className="p-2.5 rounded-full hover:bg-white/10 text-blue-100 transition-colors"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-4">
                            <button onClick={handlePrev} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                                <SkipBack className="w-6 h-6" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-4 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-full shadow-lg transition-transform hover:scale-105"
                            >
                                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ms-0.5" />}
                            </button>

                            <button onClick={handleNext} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                                <SkipForward className="w-6 h-6" />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowLyrics(!showLyrics)}
                            className={`p-2.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${showLyrics ? 'bg-white/20 text-white' : 'text-blue-200 hover:bg-white/10'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            <span className="hidden sm:inline">{isAr ? 'الكلمات' : 'Lyrics'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                        <h3 className="text-base font-bold text-gray-900">{isAr ? 'قائمة الأغاني والبودكاست' : 'Media Playlist'}</h3>
                        <div className="flex items-center gap-1">
                            {[
                                { key: 'all', labelEn: 'All', labelAr: 'الكل' },
                                { key: 'songs', labelEn: 'Songs', labelAr: 'أغاني' },
                                { key: 'chants', labelEn: 'Chants', labelAr: 'هتافات' },
                                { key: 'podcast', labelEn: 'Podcast', labelAr: 'بودكاست' }
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${activeTab === tab.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {isAr ? tab.labelAr : tab.labelEn}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {filteredPlaylist.map((track) => {
                            const isSelected = track.id === currentTrack.id;
                            const title = isAr ? track.titleAr : track.titleEn;
                            const artist = isAr ? track.artistAr : track.artistEn;

                            return (
                                <div
                                    key={track.id}
                                    onClick={() => {
                                        const idx = playlist.findIndex((t) => t.id === track.id);
                                        setCurrentTrackIndex(idx);
                                        setIsPlaying(true);
                                    }}
                                    className={`p-3.5 rounded-xl cursor-pointer flex items-center justify-between gap-4 transition-colors ${isSelected ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {track.category === 'podcast' ? <Mic className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <div className={`font-bold text-xs ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{title}</div>
                                            <div className="text-[11px] text-gray-500">{artist}</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-400">{track.duration}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {showLyrics && (
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4">
                        <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            <span>{isAr ? 'كلمات النشيد' : 'Chant & Lyrics Script'}</span>
                        </h4>
                        <div className="space-y-3 text-xs leading-relaxed text-gray-700 bg-white p-4 rounded-xl border border-gray-100 max-h-72 overflow-y-auto">
                            {(isAr ? currentTrack.lyricsAr : currentTrack.lyricsEn).map((line, idx) => (
                                <p key={idx} className="font-medium">{line}</p>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                const text = (isAr ? currentTrack.lyricsAr : currentTrack.lyricsEn).join('\n');
                                navigator.clipboard.writeText(text);
                                alert(isAr ? 'تم نسخ الكلمات بنجاح!' : 'Lyrics copied to clipboard!');
                            }}
                            className="w-full py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                            {isAr ? 'نسخ كلمات النشيد' : 'Copy Lyrics'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}