'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface RadioTrack {
    id?: string;
    _id?: string;
    titleEn: string;
    titleAr: string;
    artistEn: string;
    artistAr: string;
    category: 'anthem' | 'song' | 'chant' | 'podcast';
    duration: string;
    audioSrc: string;
    isActive?: boolean;
}

const fallbackPlaylist: RadioTrack[] = [
    {
        titleEn: 'Level Up Your World',
        titleAr: 'ارتقِ بعالمك في ماجيكا',
        artistEn: 'Magica Official Anthem',
        artistAr: 'نشيد ماجيكا الرسمي',
        category: 'anthem',
        duration: '1:15',
        audioSrc: '/audio/Level Up Your World.mp3',
    },
    {
        titleEn: 'Magica Dreams',
        titleAr: 'أحلام ماجيكا',
        artistEn: 'Magica Youth Choir',
        artistAr: 'كورال شباب ماجيكا',
        category: 'song',
        duration: '3:45',
        audioSrc: '/audio/Magica Dreams.mp3',
    },
    {
        titleEn: 'Making Futures Bright',
        titleAr: 'نصنع مستقبلاً مشرقاً',
        artistEn: 'Magica Camp Experience',
        artistAr: 'معسكرات ماجيكا',
        category: 'anthem',
        duration: '3:30',
        audioSrc: '/audio/Magica Making Futures Bright.mp3',
    },
    {
        titleEn: 'Magica Magic',
        titleAr: 'سحر ماجيكا',
        artistEn: 'Magica Beats & Rhythms',
        artistAr: 'إيقاعات ماجيكا',
        category: 'song',
        duration: '2:43',
        audioSrc: '/audio/Magica Magic.mp3',
    },
    {
        titleEn: 'Ready for the Week',
        titleAr: 'جاهزون لأسبوع المغامرة',
        artistEn: 'Field Facilitators',
        artistAr: 'ميسرو الأنشطة الميدانية',
        category: 'chant',
        duration: '2:50',
        audioSrc: '/audio/Magica Ready for the Week.mp3',
    },
    {
        titleEn: 'Magica Rising',
        titleAr: 'انطلاقة ماجيكا الحماسية',
        artistEn: 'Morning Hype Crew',
        artistAr: 'هتاف الصباح الحماسي',
        category: 'chant',
        duration: '0:31',
        audioSrc: '/audio/Magica Rising.mp3',
    },
    {
        titleEn: 'Own the Court',
        titleAr: 'امتلك الميدان والملعب',
        artistEn: 'Sports & Team Dynamism',
        artistAr: 'فريق الأنشطة الرياضية',
        category: 'chant',
        duration: '0:31',
        audioSrc: '/audio/Own the Court.mp3',
    },
];

interface RadioContextType {
    playlist: RadioTrack[];
    currentTrackIndex: number;
    currentTrack: RadioTrack;
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    togglePlay: () => void;
    playNext: () => void;
    playPrev: () => void;
    toggleMute: () => void;
    setVolume: (val: number) => void;
    seekTo: (time: number) => void;
    playTrack: (index: number) => void;
    refreshPlaylist: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export function RadioProvider({ children }: { children: React.ReactNode }) {
    const [playlist, setPlaylist] = useState<RadioTrack[]>(fallbackPlaylist);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [volume, setVolumeState] = useState<number>(0.8);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentTrack = playlist[currentTrackIndex] || playlist[0];

    const fetchActiveTracks = async () => {
        try {
            const res = await fetch('/api/radio');
            const json = await res.json();
            if (json.success && json.data.length > 0) {
                setPlaylist(json.data);
            }
        } catch (err) {
            console.warn('[RadioContext] Using fallback local playlist');
        }
    };

    useEffect(() => {
        fetchActiveTracks();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => setIsPlaying((prev) => !prev);
    const playNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
        setIsPlaying(true);
    };
    const playPrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
        setIsPlaying(true);
    };
    const toggleMute = () => setIsMuted((prev) => !prev);
    const setVolume = (val: number) => {
        setVolumeState(val);
        if (isMuted && val > 0) setIsMuted(false);
    };
    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };
    const playTrack = (index: number) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    return (
        <RadioContext.Provider
            value={{
                playlist,
                currentTrackIndex,
                currentTrack,
                isPlaying,
                isMuted,
                volume,
                currentTime,
                duration,
                togglePlay,
                playNext,
                playPrev,
                toggleMute,
                setVolume,
                seekTo,
                playTrack,
                refreshPlaylist: fetchActiveTracks,
            }}
        >
            <audio
                ref={audioRef}
                src={currentTrack?.audioSrc}
                onTimeUpdate={() => {
                    if (audioRef.current) {
                        setCurrentTime(audioRef.current.currentTime);
                        setDuration(audioRef.current.duration || 0);
                    }
                }}
                onEnded={playNext}
            />
            {children}
        </RadioContext.Provider>
    );
}

export function useRadio() {
    const context = useContext(RadioContext);
    if (!context) {
        throw new Error('useRadio must be used within a RadioProvider');
    }
    return context;
}