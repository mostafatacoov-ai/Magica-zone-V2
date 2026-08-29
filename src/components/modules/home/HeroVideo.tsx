'use client';

import React, { useRef, useEffect } from 'react';

export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.defaultMuted = true;
            video.muted = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const handleFirstInteraction = () => {
                        video.play();
                        window.removeEventListener('click', handleFirstInteraction);
                        window.removeEventListener('touchstart', handleFirstInteraction);
                    };
                    window.addEventListener('click', handleFirstInteraction);
                    window.addEventListener('touchstart', handleFirstInteraction);
                });
            }
        }
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-60 filter saturate-125 transition-opacity duration-700"
            >
                <source src="/Hero_Video.mp4" type="video/mp4" />
                <source src="/hero_video.mp4" type="video/mp4" />
                <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5E6]/60 via-[#FFFAF0]/75 to-[#FFFAF0]" />
        </div>
    );
}