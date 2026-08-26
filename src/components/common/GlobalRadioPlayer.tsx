'use client';

import React, { useState } from 'react';
import { useRadio } from '@/context/RadioContext';
import {
    Play,
    Pause,
    SkipForward,
    SkipBack,
    Volume2,
    VolumeX,
    Radio,
    ChevronDown,
    ChevronUp,
    Sparkles
} from 'lucide-react';

export function GlobalRadioPlayer({ lang }: { lang: string }) {
    const isAr = lang === 'ar';
    const {
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
    } = useRadio();

    const [isExpanded, setIsExpanded] = useState(false);

    const formatTime = (sec: number) => {
        if (isNaN(sec)) return '00:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <aside aria-label="Magica Radio Player" className="fixed bottom-6 start-6 z-50">
            {/* Expanded Full Control Panel */}
            {isExpanded ? (
                <div className="bg-gray-900/95 backdrop-blur-xl text-white p-5 rounded-3xl border border-white/10 shadow-2xl w-80 sm:w-96 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                                <Radio className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                                    {isAr ? 'راديو ماجيكا زون' : 'Magica Live Radio'}
                                </span>
                                <span className="text-xs font-bold text-white line-clamp-1">
                                    {isAr ? currentTrack.titleAr : currentTrack.titleEn}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsExpanded(false)}
                            className="p-1 text-gray-400 hover:text-white rounded-lg transition-colors"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Equalizer Animation */}
                    <div className="flex items-center justify-between text-xs text-gray-400 py-1">
                        <span>{isAr ? currentTrack.artistAr : currentTrack.artistEn}</span>
                        <div className="flex items-end gap-0.5 h-4">
                            {[60, 100, 40, 80, 50, 90].map((h, i) => (
                                <span
                                    key={i}
                                    style={{ height: isPlaying ? `${h}%` : '25%' }}
                                    className="w-1 bg-amber-400 rounded-full transition-all duration-200"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="space-y-1">
                        <input
                            type="range"
                            min={0}
                            max={duration || 100}
                            value={currentTime}
                            onChange={(e) => seekTo(Number(e.target.value))}
                            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between pt-1">
                        {/* Mute & Volume */}
                        <div className="flex items-center gap-2">
                            <button onClick={toggleMute} className="text-gray-300 hover:text-white transition-colors">
                                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.05}
                                value={isMuted ? 0 : volume}
                                onChange={(e) => setVolume(Number(e.target.value))}
                                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        {/* Playback Controls */}
                        <div className="flex items-center gap-3">
                            <button onClick={playPrev} className="text-gray-300 hover:text-white transition-colors p-1">
                                <SkipBack className="w-4 h-4" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg transition-transform hover:scale-105"
                            >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ms-0.5" />}
                            </button>

                            <button onClick={playNext} className="text-gray-300 hover:text-white transition-colors p-1">
                                <SkipForward className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* Compact Minimized Floating Pill */
                <div className="bg-gray-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-white/10 shadow-2xl flex items-center gap-3 transition-all duration-300 hover:scale-105">
                    <button
                        onClick={() => setIsExpanded(true)}
                        className="flex items-center gap-2.5 group text-start focus:outline-none"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                            <Radio className="w-4 h-4" />
                        </div>

                        <div className="max-w-[120px] sm:max-w-[150px]">
                            <div className="text-[10px] text-blue-400 font-bold leading-none flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                <span>{isAr ? 'راديو ماجيكا' : 'Magica Radio'}</span>
                            </div>
                            <p className="text-xs font-semibold text-white truncate mt-0.5">
                                {isAr ? currentTrack.titleAr : currentTrack.titleEn}
                            </p>
                        </div>
                    </button>

                    {/* Quick Buttons */}
                    <div className="flex items-center gap-1.5 ps-2 border-s border-white/10">
                        <button
                            onClick={togglePlay}
                            className="p-2 bg-white text-gray-900 hover:bg-blue-50 rounded-full transition-colors"
                        >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ms-0.5" />}
                        </button>

                        <button onClick={playNext} className="p-1.5 text-gray-300 hover:text-white transition-colors">
                            <SkipForward className="w-3.5 h-3.5" />
                        </button>

                        <button onClick={toggleMute} className="p-1.5 text-gray-300 hover:text-white transition-colors">
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>

                        <button
                            onClick={() => setIsExpanded(true)}
                            className="p-1 text-gray-400 hover:text-white transition-colors ms-1"
                        >
                            <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}