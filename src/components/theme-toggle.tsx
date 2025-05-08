'use client';

import {useEffect, useState} from "react"
import {Moon, Sun} from "lucide-react"
import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {motion, AnimatePresence} from "framer-motion"

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5"/>
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.span
                        key="sun"
                        initial={{rotate: -90, opacity: 0, scale: 0.8}}
                        animate={{rotate: 0, opacity: 1, scale: 1}}
                        exit={{rotate: 90, opacity: 0, scale: 0.8}}
                        transition={{duration: 0.3}}
                        className="flex"
                    >
                        <Sun className="h-5 w-5"/>
                    </motion.span>
                ) : (
                    <motion.span
                        key="moon"
                        initial={{rotate: 90, opacity: 0, scale: 0.8}}
                        animate={{rotate: 0, opacity: 1, scale: 1}}
                        exit={{rotate: -90, opacity: 0, scale: 0.8}}
                        transition={{duration: 0.3}}
                        className="flex"
                    >
                        <Moon className="h-5 w-5"/>
                    </motion.span>
                )}
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}