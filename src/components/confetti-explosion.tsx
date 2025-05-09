"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ConfettiPieceProps {
    index: number
    colors?: string[]
}

export const ConfettiPiece = ({
                                  index,
                                  colors = ["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#E040FB", "#69F0AE"],
                              }: ConfettiPieceProps) => {
    // Chọn màu ngẫu nhiên từ mảng colors
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Tạo các giá trị ngẫu nhiên cho animation
    const x = (Math.random() - 0.5) * 400
    const y = (Math.random() - 0.5) * 400 - 100 // Hướng lên trên nhiều hơn
    const rotation = Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)
    const scale = 0.5 + Math.random() * 0.5
    const duration = 1.5 + Math.random() * 2
    const delay = Math.random() * 0.3

    // Hình dạng ngẫu nhiên (hình vuông hoặc hình tròn)
    const isCircle = Math.random() > 0.5

    return (
        <motion.div
            className={`absolute ${isCircle ? "rounded-full" : "rounded-sm"}`}
            style={{
                width: isCircle ? "10px" : `${5 + Math.random() * 10}px`,
                height: isCircle ? "10px" : `${5 + Math.random() * 10}px`,
                backgroundColor: color,
                top: "50%",
                left: "50%",
                zIndex: 20,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
            animate={{
                x,
                y,
                opacity: [1, 1, 0],
                scale,
                rotate: rotation,
            }}
            transition={{
                duration,
                delay,
                ease: ["easeOut", "easeIn"],
                opacity: { duration: duration * 0.8, delay: delay + duration * 0.2 },
            }}
        />
    )
}

interface ConfettiExplosionProps {
    count?: number
    duration?: number
    colors?: string[]
    onComplete?: () => void
}

export function ConfettiExplosion({ count = 100, duration = 3000, colors, onComplete }: ConfettiExplosionProps) {
    const [pieces, setPieces] = useState<number[]>([])

    useEffect(() => {
        // Tạo mảng các mảnh confetti
        setPieces(Array.from({ length: count }, (_, i) => i))

        // Xóa confetti sau khoảng thời gian duration
        const timer = setTimeout(() => {
            setPieces([])
            if (onComplete) onComplete()
        }, duration)

        return () => clearTimeout(timer)
    }, [count, duration, onComplete])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {pieces.map((i) => (
                <ConfettiPiece key={i} index={i} colors={colors} />
            ))}
        </div>
    )
}
