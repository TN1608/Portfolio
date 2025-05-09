"use client"

import {useEffect, useState, useRef, useContext} from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {motion, AnimatePresence} from "framer-motion"

import {Button} from "@/components/ui/button"
import {ThemeRippleContext} from "@/context/theme-ripple-context"

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    const [isAnimating, setIsAnimating] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const {startRipple, setIsFadingIn} = useContext(ThemeRippleContext)
    const [localRipple, setLocalRipple] = useState<{ x: number; y: number } | null>(null)

    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isAnimating) return

        setIsAnimating(true)

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            setLocalRipple({x, y})
        }

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const x = rect.left + rect.width / 2
            const y = rect.top + rect.height / 2

            startRipple({
                x,
                y,
                targetTheme: theme === "dark" ? "light" : "dark",
            })

            setTimeout(() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }, 100)

            setTimeout(() => {
                setIsAnimating(false)
                setIsFadingIn(true)
                setLocalRipple(null)
            }, 1800)
        }
    }

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="relative">
                <Sun className="h-5 w-5 opacity-0" aria-hidden="true"/>
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    return (
        <Button
            ref={buttonRef}
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            disabled={isAnimating}
            className="relative overflow-hidden"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
            {localRipple && (
                <motion.span
                    initial={{scale: 0, opacity: 0.5}}
                    animate={{scale: 2, opacity: 0}}
                    transition={{duration: 0.6, ease: "easeOut"}}
                    className={`absolute rounded-full ${
                        theme === "dark" ? "bg-yellow-400/30" : "bg-blue-600/30"
                    }`}
                    style={{
                        width: 40,
                        height: 40,
                        left: localRipple.x - 20,
                        top: localRipple.y - 20,
                    }}
                />
            )}

            <div className="relative w-5 h-5">
                <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                        <motion.div
                            key="sun"
                            initial={{scale: 0, rotate: -180, opacity: 0}}
                            animate={{scale: 1, rotate: 0, opacity: 1}}
                            exit={{scale: 0, rotate: 180, opacity: 0}}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Sun className="h-5 w-5 text-yellow-400"/>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="moon"
                            initial={{scale: 0, rotate: 180, opacity: 0}}
                            animate={{scale: 1, rotate: 0, opacity: 1}}
                            exit={{scale: 0, rotate: -180, opacity: 0}}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Moon className="h-5 w-5 text-blue-600"/>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}