'use client';

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ThemeRippleProvider } from "@/context/theme-ripple-context";
import { ThemeRippleEffect } from "@/components/theme-ripple-effect";
import Preloader from "@/components/Preloader";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [themeKey, setThemeKey] = useState("light");

    // Cập nhật key để kích hoạt animation khi theme thay đổi
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        setThemeKey(currentTheme);
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/img/logo.png" type={"image/png"} />
                <meta name="description" content="This is my portfolio website" />
                <meta name="author" content="Nguyen Dinh Tuan" />
                <title>My Portfolio</title>
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <ThemeRippleProvider>
                        <SmoothScroll />
                        <ThemeRippleEffect />
                        <Preloader />
                        {children}
                    </ThemeRippleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}