"use client"

import {useContext, useEffect, useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {ThemeRippleContext} from "@/context/theme-ripple-context"
import {useTheme} from "next-themes"

export function ThemeRippleEffect() {
    const {ripple, resetRipple, setIsFadingIn} = useContext(ThemeRippleContext)
    const {theme} = useTheme()
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize)
            return () => window.removeEventListener("resize", handleResize)
        }
    }, [])

    const getMaxRadius = (x: number, y: number) => {
        const distToTopLeft = Math.sqrt(x * x + y * y)
        const distToTopRight = Math.sqrt((windowSize.width - x) ** 2 + y ** 2)
        const distToBottomLeft = Math.sqrt(x ** 2 + (windowSize.height - y) ** 2)
        const distToBottomRight = Math.sqrt((windowSize.width - x) ** 2 + (windowSize.height - y) ** 2)

        return Math.max(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight) * 1.1
    }

    useEffect(() => {
        if (ripple) {
            // Đồng bộ thời gian với ThemeToggle
            const fadeInTimer = setTimeout(() => {
                setIsFadingIn(true)
            }, 1800) // Đặt thành 1800ms để đồng bộ với ThemeToggle

            const resetTimer = setTimeout(() => {
                resetRipple()
            }, 1800)

            return () => {
                clearTimeout(fadeInTimer)
                clearTimeout(resetTimer)
            }
        }
    }, [ripple, resetRipple, setIsFadingIn])

    if (!ripple) return null

    const maxRadius = getMaxRadius(ripple.x, ripple.y)

    return (
        <AnimatePresence>
            {ripple && (
                <motion.div
                    initial={{clipPath: `circle(0px at ${ripple.x}px ${ripple.y}px)`}}
                    animate={{clipPath: `circle(${maxRadius}px at ${ripple.x}px ${ripple.y}px)`}}
                    exit={{opacity: 0}}
                    transition={{duration: 1.2, ease: [0.22, 1, 0.36, 1]}}
                    className={`fixed inset-0 z-[9999] pointer-events-none ${
                        ripple.targetTheme === "dark" ? "bg-[#121212]" : "bg-white"
                    }`}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        {Array.from({length: 3}).map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{opacity: 0.3, scale: 0}}
                                animate={{opacity: 0, scale: 1}}
                                transition={{
                                    duration: 1.5,
                                    delay: i * 0.2,
                                    ease: "easeOut",
                                }}
                                style={{
                                    position: "absolute",
                                    top: ripple.y,
                                    left: ripple.x,
                                    width: maxRadius * 2,
                                    height: maxRadius * 2,
                                    borderRadius: "50%",
                                    transform: "translate(-50%, -50%)",
                                    border: `1px solid ${
                                        ripple.targetTheme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                                    }`,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}