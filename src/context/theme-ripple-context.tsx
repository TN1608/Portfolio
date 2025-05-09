"use client"

import {createContext, useState, useCallback, type ReactNode} from "react"

interface RipplePosition {
    x: number
    y: number
    targetTheme: string
}

interface ThemeRippleContextType {
    ripple: RipplePosition | null
    startRipple: (position: RipplePosition) => void
    resetRipple: () => void
    isFadingIn: boolean
    setIsFadingIn: (value: boolean) => void
    fadeInComplete: boolean // Thêm trạng thái để theo dõi khi fade-in hoàn tất
}

export const ThemeRippleContext = createContext<ThemeRippleContextType>({
    ripple: null,
    startRipple: () => {
    },
    resetRipple: () => {
    },
    isFadingIn: false,
    setIsFadingIn: () => {
    },
    fadeInComplete: false,
})

interface ThemeRippleProviderProps {
    children: ReactNode
}

export function ThemeRippleProvider({children}: ThemeRippleProviderProps) {
    const [ripple, setRipple] = useState<RipplePosition | null>(null)
    const [isFadingIn, setIsFadingIn] = useState(false)
    const [fadeInComplete, setFadeInComplete] = useState(false) // Trạng thái mới

    const startRipple = useCallback((position: RipplePosition) => {
        setRipple(position)
        setIsFadingIn(false)
        setFadeInComplete(false) // Reset khi bắt đầu ripple mới
    }, [])

    const resetRipple = useCallback(() => {
        setRipple(null)
        setFadeInComplete(true) // Đánh dấu fade-in hoàn tất
    }, [])

    return (
        <ThemeRippleContext.Provider
            value={{ripple, startRipple, resetRipple, isFadingIn, setIsFadingIn, fadeInComplete}}
        >
            {children}
        </ThemeRippleContext.Provider>
    )
}