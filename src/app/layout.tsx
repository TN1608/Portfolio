'use client';

import {useEffect, useState} from "react";
import {ThemeProvider} from "next-themes";
import {motion, AnimatePresence} from "framer-motion";
import "./globals.css";

export default function RootLayout({children}: { children: React.ReactNode }) {
    const [themeKey, setThemeKey] = useState("light");

    // Cập nhật key để kích hoạt animation khi theme thay đổi
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setThemeKey(currentTheme);
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false} // Cho phép transition CSS
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={themeKey} // Key thay đổi khi theme thay đổi
                    initial={{opacity: 0, scale: 0.98}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.98}}
                    transition={{duration: 0.4, ease: "easeInOut"}}
                    className="min-h-screen bg-background text-foreground transition-all duration-500 ease-in-out"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </ThemeProvider>
        </body>
        </html>
    );
}