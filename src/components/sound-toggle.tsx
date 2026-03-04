"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function SoundToggle() {
    const [isMuted, setIsMuted] = useLocalStorage("portfolio-sound-muted", false)
    const [mounted, setMounted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Ensure component only renders on client-side
    useEffect(() => {
        setMounted(true)
    }, [])

    // Update global sound state
    useEffect(() => {
        if (mounted) {
            document.documentElement.setAttribute("data-sound-muted", isMuted.toString())
        }
    }, [isMuted, mounted])

    const toggleSound = () => {
        setIsAnimating(true)
        // Slight delay to allow animation to complete
        setTimeout(() => {
            setIsMuted(!isMuted)
            setIsAnimating(false)
        }, 300)
    }

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            disabled={isAnimating}
            className="relative w-11 h-11 rounded-xl overflow-hidden group hover:bg-primary/10 transition-all duration-300"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
            {/* Fancy Background Glow */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg",
                isMuted ? "bg-red-500/20" : "bg-green-500/20"
            )} />

            <div className="relative z-10 w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: 90, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200,
                                damping: 12,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <VolumeX className="h-6 w-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unmuted"
                            initial={{ scale: 0, rotate: 90, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0, rotate: -90, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200,
                                damping: 12,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Volume2 className="h-6 w-6 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />

                            {/* Enhanced Sound waves when unmuted */}
                            {!isAnimating && !isMuted && (
                                <>
                                    {[1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute right-0 w-8 h-8 border-r-2 border-green-500/40 rounded-full"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.4, 0.7, 0.4],
                                                x: [0, 2, 0]
                                            }}
                                            transition={{
                                                duration: 1.2 + i * 0.2,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "easeInOut",
                                                delay: i * 0.3,
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background ripple effect when toggling */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`absolute inset-0 rounded-full z-0 ${isMuted ? "bg-green-500/30" : "bg-red-500/30"}`}
                    />
                )}
            </AnimatePresence>
        </Button>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
