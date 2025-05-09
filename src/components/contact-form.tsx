"use client"

import type React from "react"

import {useState, useEffect, useRef} from "react"
import {motion, useAnimation, AnimatePresence} from "framer-motion"
import {Send} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"

// Component cho mỗi mảnh confetti
const ConfettiPiece = ({
                           index,
                           colors = ["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#E040FB", "#69F0AE"],
                       }: {
    index: number
    colors?: string[]
}) => {
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
            initial={{x: 0, y: 0, opacity: 1, scale: 0, rotate: 0}}
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
                opacity: {duration: duration * 0.8, delay: delay + duration * 0.2},
            }}
        />
    )
}

// Component Confetti chính
const Confetti = ({count = 100}: { count?: number }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({length: count}).map((_, i) => (
                <ConfettiPiece key={i} index={i}/>
            ))}
        </div>
    )
}

// Hook để quản lý âm thanh
function useSound(url: string, volume = 0.5) {
    const audio = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Tạo audio element khi component mount
        audio.current = new Audio(url)
        audio.current.volume = volume

        // Cleanup khi component unmount
        return () => {
            if (audio.current) {
                audio.current.pause()
                audio.current = null
            }
        }
    }, [url, volume])

    const play = () => {
        if (audio.current) {
            // Reset audio về đầu nếu đang phát
            audio.current.currentTime = 0

            // Phát âm thanh
            const playPromise = audio.current.play()

            // Xử lý lỗi autoplay policy
            if (playPromise !== undefined) {
                playPromise.catch((error) => {
                    console.log("Audio playback prevented by browser:", error)
                })
            }
        }
    }

    return {play}
}

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)

    // Sử dụng hook âm thanh
    const successSound = useSound("/sounds/success-sound.mp3", 0.4)
    const popSound = useSound("/sounds/pop-sound.mp3", 0.3)

    const controls = useAnimation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        // Lấy dữ liệu từ form
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const subject = formData.get("subject") as string
        const message = formData.get("message") as string

        try {
            const response = await fetch("/api/send-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, subject, message }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to send email")
            }

            await new Promise((resolve) => setTimeout(resolve, 1500))

            // Kích hoạt hiệu ứng thành công
            setIsSubmitting(false)
            setIsSubmitted(true)

            // Phát âm thanh thành công
            successSound.play()

            // Hiển thị confetti và phát âm thanh pop sau một chút
            setTimeout(() => {
                setShowConfetti(true)
                popSound.play()
            }, 300)

            // Ẩn confetti sau một khoảng thời gian
            setTimeout(() => {
                setShowConfetti(false)
            }, 4000)

            // Reset form sau khi gửi thành công
            setTimeout(() => {
                setIsSubmitted(false)
                e.currentTarget.reset() // Reset form fields
            }, 5000)
        } catch (err: any) {
            setIsSubmitting(false)
            setError(err.message || "Something went wrong. Please try again.")
        }
    }

    return (
        <div className="rounded-lg border bg-card p-6 relative overflow-hidden">
            {/* Confetti effect */}
            <AnimatePresence>{showConfetti && <Confetti/>}</AnimatePresence>

            {isSubmitted ? (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    className="flex flex-col items-center justify-center h-full py-12 text-center relative z-10"
                >
                    <motion.div
                        className="relative w-20 h-20 mb-6"
                        initial={{scale: 0.5, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.6,
                        }}
                    >
                        {/* Background circle with pulse effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-primary/10"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [1, 0.8, 1],
                            }}
                            transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Icon container */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Send icon that transforms into checkmark */}
                            <motion.div
                                initial={{rotate: -45, x: -10}}
                                animate={{
                                    rotate: 0,
                                    x: 0,
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 1, 0],
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                    scale: {
                                        delay: 0.5,
                                        duration: 0.6,
                                    },
                                    opacity: {
                                        delay: 0.8,
                                        duration: 0.3,
                                    },
                                }}
                            >
                                <Send className="h-8 w-8 text-primary"/>
                            </motion.div>

                            {/* Checkmark that appears after send icon */}
                            <motion.div
                                className="absolute"
                                initial={{scale: 0, opacity: 0}}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.1,
                                }}
                            >
                                <motion.svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-primary"
                                >
                                    <motion.path
                                        d="M5 13L9 17L19 7"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{pathLength: 0}}
                                        animate={{pathLength: 1}}
                                        transition={{duration: 0.5, delay: 1.2}}
                                    />
                                </motion.svg>
                            </motion.div>
                        </div>

                        {/* Particles effect */}
                        {Array.from({length: 6}).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-primary"
                                initial={{
                                    x: 0,
                                    y: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    x: Math.cos((i * (Math.PI * 2)) / 6) * 40,
                                    y: Math.sin((i * (Math.PI * 2)) / 6) * 40,
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.8,
                                    ease: "easeOut",
                                    opacity: {duration: 1.2},
                                }}
                            />
                        ))}
                    </motion.div>

                    <motion.h3
                        className="text-xl font-bold mb-2"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                    >
                        Message Sent!
                    </motion.h3>

                    <motion.p
                        className="text-muted-foreground"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.6}}
                    >
                        Thank you for reaching out. I'll get back to you as soon as possible.
                    </motion.p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                    className="text-red-500 text-sm text-center">
                            {error}
                        </motion.div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder="Your name" required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="Your email" required/>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" placeholder="Subject" required/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            className="min-h-[150px] resize-none"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message <Send className="ml-2 h-4 w-4"/>
                            </>
                        )}
                    </Button>
                </form>
            )}
        </div>
    )
}
