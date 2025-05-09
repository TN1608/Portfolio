"use client"

import {useState, useEffect} from "react"
import {Volume2, VolumeX} from "lucide-react"
import {motion, AnimatePresence} from "framer-motion"
import {Button} from "@/components/ui/button"
import {useLocalStorage} from "@/hooks/use-local-storage"

export function SoundToggle() {
    const [isMuted, setIsMuted] = useLocalStorage("portfolio-sound-muted", false)
    const [mounted, setMounted] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    // Đảm bảo component chỉ render ở client-side
    useEffect(() => {
        setMounted(true)
    }, [])

    // Cập nhật trạng thái âm thanh toàn cục
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

    // Sound wave animation variants
    const waveVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0],
            transition: {
                duration: 1,
                repeat: 0,
                ease: "easeInOut",
            },
        },
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSound}
            disabled={isAnimating}
            className="relative overflow-hidden"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
            <div className="relative w-5 h-5">
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{scale: 0, rotate: -90, opacity: 0}}
                            animate={{scale: 1, rotate: 0, opacity: 1}}
                            exit={{scale: 0, rotate: 90, opacity: 0}}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <VolumeX className="h-5 w-5 text-red-500"/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unmuted"
                            initial={{scale: 0, rotate: 90, opacity: 0}}
                            animate={{scale: 1, rotate: 0, opacity: 1}}
                            exit={{scale: 0, rotate: -90, opacity: 0}}
                            transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Volume2 className="h-5 w-5 text-green-500"/>

                            {/* Sound waves when unmuted */}
                            {!isAnimating && !isMuted && (
                                <>
                                    <motion.div
                                        className="absolute right-0 w-6 h-6 border-r border-green-500/30 rounded-full"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.3, 0.5, 0.3],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.div
                                        className="absolute right-0 w-8 h-8 border-r border-green-500/20 rounded-full"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.2, 0.3, 0.2],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: 0.2,
                                        }}
                                    />
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background effect */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        initial={{scale: 0, opacity: 0.7}}
                        animate={{scale: 4, opacity: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.6}}
                        className={`absolute inset-0 rounded-full ${isMuted ? "bg-green-500/20" : "bg-red-500/20"}`}
                    />
                )}
            </AnimatePresence>

            {/* Sound wave ripple effect when toggling */}
            <AnimatePresence>
                {!isMuted && isAnimating && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`wave-${i}`}
                                className="absolute inset-0 rounded-full border border-green-500/30"
                                initial={{scale: 1, opacity: 0.5}}
                                animate={{scale: 2 + i * 0.5, opacity: 0}}
                                exit={{opacity: 0}}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </>
                )}
            </AnimatePresence>
        </Button>
    )
}
