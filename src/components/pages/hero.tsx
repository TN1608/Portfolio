import { forwardRef } from "react"
import { motion } from "framer-motion"

import { AnimatedText } from "@/components/animated-text"
import LightPillar from "@/components/LightPillar"
import { Button } from "@/components/ui/button"

interface HeroProps {
    onViewWork: () => void
    onContact: () => void
}

export const Hero = forwardRef<HTMLElement, HeroProps>(({ onViewWork, onContact }, ref) => {
    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
            <LightPillar
                topColor="#5227FF"
                bottomColor="#FF9FFC"
                intensity={1.0}
                rotationSpeed={0.3}
                glowAmount={0.005}
                pillarWidth={3.0}
                pillarHeight={0.4}
                noiseIntensity={0.5}
                pillarRotation={25}
                interactive={false}
                mixBlendMode="normal"
            />
            <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 dark:text-foreground text-accent">
                        Frontend Developer
                    </span>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 justify-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <AnimatedText text="Creating digital experiences that matter" />
                </motion.h1>

                <motion.p
                    className="max-w-2xl text-lg md:text-xl dark:text-muted-foreground text-accent/80 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    I build innovative web applications with cutting-edge technologies and stunning animations
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button size="lg" onClick={onViewWork}>
                        View My Work
                    </Button>
                    <Button size="lg" variant="outline" onClick={onContact}>
                        Contact Me
                    </Button>
                </motion.div>
            </div>
        </section>
    )
})

Hero.displayName = "Hero"
