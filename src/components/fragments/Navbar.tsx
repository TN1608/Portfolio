"use client"

import React from "react"
import { motion } from "framer-motion"
import { HeroBackground } from "@/components/hero-background"

interface NavItem {
    name: string
    ref: React.RefObject<HTMLElement | null>
    id: string
}

interface NavbarProps {
    activeSection: string
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void
    navItems: NavItem[]
}

export function Navbar({ activeSection, scrollToSection, navItems }: NavbarProps) {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center w-full justify-center px-6 py-4 backdrop-blur-md bg-background/80 border-b"
        >
            <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                    <motion.button
                        key={item.name}
                        onClick={() => scrollToSection(item.ref)}
                        className={`relative px-1 py-2 text-lg font-medium transition-colors ${activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {item.name}
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeSection"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </motion.nav>
    )
}