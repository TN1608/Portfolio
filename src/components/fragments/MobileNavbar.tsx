import React from "react"
import { motion } from "framer-motion"
import { TextRoll } from "../ui/text-roll"

interface NavItem {
    name: string
    ref: React.RefObject<HTMLElement | null>
    id: string
}

interface MobileNavbarProps {
    activeSection: string
    scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void
    navItems: NavItem[]
}

export default function MobileNavbar({ activeSection, scrollToSection, navItems }: MobileNavbarProps) {
    return (
        <div className="md:hidden flex items-center justify-center w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center space-x-6 px-4">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => {
                            scrollToSection(item.ref)
                        }}
                        className={`relative py-1 text-base font-medium transition-colors whitespace-nowrap ${activeSection === item.id ? "text-primary" : "text-muted-foreground"
                            }`}
                    >
                        <TextRoll className="inline-block" center>{item.name}</TextRoll>
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="activeSectionMobile"
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}