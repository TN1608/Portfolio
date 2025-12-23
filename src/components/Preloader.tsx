"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setIsComplete(true),
        });

        const textContainer = textContainerRef.current;
        const container = containerRef.current;

        if (textContainer && container) {
            document.body.style.overflow = "hidden";

            const texts = textContainer.children;
            // Select all the "stair" bars
            const bars = container.querySelectorAll(".stair-bar");

            tl
                // 1. Fade In Text
                .fromTo(texts,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        stagger: 0.2
                    }
                )
                // 2. Hold
                .to(texts, {
                    opacity: 1,
                    duration: 1.5,
                })
                // 3. Fade Out Text
                .to(texts, {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power3.in",
                    stagger: 0.1
                })
                // 4. Stair Reveal
                .to(bars, {
                    height: "0%",
                    duration: 0.8,
                    ease: "power4.inOut",
                    stagger: 0.1, // This creates the stair effect
                    onComplete: () => {
                        document.body.style.overflow = "";
                    }
                });
        }

        return () => {
            document.body.style.overflow = "";
        };

    }, []);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
            {/* Stair Bars Background */}
            <div className="absolute inset-0 flex w-full h-full pointer-events-auto">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="stair-bar h-full w-1/5 bg-neutral-950"
                    />
                ))}
            </div>

            {/* Text Container */}
            <div ref={textContainerRef} className="relative z-10 flex flex-col items-center justify-center space-y-4 text-white">
                <h2 className="text-2xl md:text-3xl font-light tracking-widest text-neutral-400">Welcome to</h2>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Tuan's Portfolio</h1>
            </div>
        </div>
    );
}