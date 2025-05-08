"use client"

import {useEffect, useRef} from "react"
import {motion} from "framer-motion"

export function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let particles: Particle[] = []
        let animationFrameId: number

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initParticles()
        }

        class Particle {
            x: number
            y: number
            size: number
            speedX: number
            speedY: number
            color: string

            constructor() {
                // @ts-ignore
                this.x = Math.random() * canvas.width
                // @ts-ignore
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 5 + 1
                this.speedX = Math.random() * 3 - 1.5
                this.speedY = Math.random() * 3 - 1.5
                this.color = `hsla(${Math.random() * 60 + 280}, 100%, 50%, ${Math.random() * 0.5 + 0.1})`
            }

            update() {
                this.x += this.speedX
                this.y += this.speedY

                // @ts-ignore
                if (this.x > canvas.width) this.x = 0
                else if (this.x < 0) { // @ts-ignore
                    this.x = canvas.width
                }

                // @ts-ignore
                if (this.y > canvas.height) this.y = 0
                else if (this.y < 0) { // @ts-ignore
                    this.y = canvas.height
                }
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = this.color
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        function initParticles() {
            particles = []
            // @ts-ignore
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000)

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle())
            }
        }

        function animate() {
            if (!ctx) return
            // @ts-ignore
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (let i = 0; i < particles.length; i++) {
                particles[i].update()
                particles[i].draw()

                // Connect particles with lines
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(180, 180, 255, ${0.2 * (1 - distance / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate)
        }

        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="absolute inset-0 z-0"
        >
            <canvas ref={canvasRef} className="absolute inset-0 bg-gradient-to-b from-background to-background/80"/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"/>
        </motion.div>
    )
}
