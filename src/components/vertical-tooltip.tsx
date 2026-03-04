"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronUp, MoreVertical } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { SoundToggle } from "@/components/sound-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function VerticalToolTipMenu() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const bubbleRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)
    const tl = useRef<gsap.core.Timeline | null>(null)

    // Handle scroll visibility for "Scroll to Top"
    useEffect(() => {
        const toggleVisibility = () => {
            setIsScrolled(window.scrollY > 300)
        }
        window.addEventListener("scroll", toggleVisibility)
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    // Initialize GSAP Timeline
    useEffect(() => {
        if (!bubbleRef.current || !itemsRef.current) return

        tl.current = gsap.timeline({ paused: true })

        // Bubble liquid/morph animation
        tl.current.to(bubbleRef.current, {
            scale: 1.2,
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            duration: 0.6,
            ease: "power2.inOut"
        }, 0)
            .to(bubbleRef.current, {
                scale: 1.5,
                borderRadius: "50% 50% 50% 50%",
                duration: 0.4,
                ease: "power2.out"
            }, 0.6)

        // Menu items expansion
        tl.current.fromTo(itemsRef.current,
            { opacity: 0, y: 20, scale: 0.8, pointerEvents: "none" },
            { opacity: 1, y: 0, scale: 1, pointerEvents: "auto", duration: 0.4, ease: "back.out(1.7)" },
            0.4
        )

        return () => {
            tl.current?.kill()
        }
    }, []) // Run once on mount

    // Handle Hover direction
    useEffect(() => {
        if (isHovered) {
            tl.current?.play()
        } else {
            tl.current?.reverse()
        }
    }, [isHovered])

    // Magnetic effect logic
    useEffect(() => {
        const trigger = containerRef.current
        if (!trigger) return

        const onMouseMove = (e: MouseEvent) => {
            const rect = trigger.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2

            gsap.to(trigger, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: "power2.out"
            })
        }

        const onMouseLeave = () => {
            gsap.to(trigger, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            })
        }

        trigger.addEventListener("mousemove", onMouseMove)
        trigger.addEventListener("mouseleave", onMouseLeave)

        return () => {
            trigger.removeEventListener("mousemove", onMouseMove)
            trigger.removeEventListener("mouseleave", onMouseLeave)
        }
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        // Add 1.5s delay before collapsing
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false)
        }, 1500)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div
            ref={menuRef}
            className="fixed bottom-8 right-6 z-50 flex flex-col items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Expanded Menu Items */}
            <div
                ref={itemsRef}
                className="flex flex-col gap-3 p-2 mb-4 rounded-2xl bg-background/60 backdrop-blur-2xl border border-primary/20 shadow-[0_0_30px_rgba(var(--primary),0.1)] transition-colors duration-500"
                style={{ opacity: 0 }}
            >
                {/* Scroll to Top - Only if scrolled */}
                {isScrolled && (
                    <div className="relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={scrollToTop}
                            className="rounded-xl hover:bg-primary/20 hover:text-primary transition-all duration-300"
                        >
                            <ChevronUp className="h-5 w-5" />
                        </Button>
                        <span className="absolute right-full mr-4 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg shadow-primary/20">
                            Scroll to Top
                        </span>
                    </div>
                )}

                {isScrolled && <div className="w-8 h-px bg-primary/10 mx-auto" />}

                <div className="relative group">
                    <ThemeToggle />
                    <span className="absolute right-full mr-4 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg shadow-primary/20">
                        Theme
                    </span>
                </div>

                <div className="relative group">
                    <SoundToggle />
                    <span className="absolute right-full mr-4 px-2 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0 shadow-lg shadow-primary/20">
                        Sound
                    </span>
                </div>
            </div>

            {/* Trigger Button with Bubble Effect */}
            <div
                ref={containerRef}
                className="relative flex items-center justify-center group"
            >
                <div
                    ref={bubbleRef}
                    className="absolute inset-0 bg-primary/30 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-500"
                    style={{ transform: "scale(0)" }}
                />
                <Button
                    variant="outline"
                    size="icon"
                    className="relative z-10 w-14 h-14 rounded-full border-2 border-primary/30 bg-background/60 backdrop-blur-2xl shadow-2xl hover:border-primary/60 hover:bg-primary/10 transition-all duration-500 overflow-hidden"
                >
                    <MoreVertical className="h-7 w-7 text-primary animate-pulse group-hover:animate-none" />
                </Button>
            </div>
        </div>
    )
}
