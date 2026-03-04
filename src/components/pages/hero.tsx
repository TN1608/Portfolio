import { forwardRef } from "react"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/animated-text"
import { Button } from "@/components/ui/button"
import { Meteors } from "../ui/meteors"
import RotatingText from "../RotatingText"

interface HeroProps {
    onViewWork: () => void
    onContact: () => void
}

export const Hero = forwardRef<HTMLElement, HeroProps>(({ onViewWork, onContact }, ref) => {
    return (
        <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
            <Meteors
                number={50}
            />
            <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <RotatingText
                        texts={['Front-end Developer', 'Full-stack Engineer']}
                        mainClassName="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-foreground overflow-hidden justify-center"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2500}
                    />
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
                    className="max-w-2xl text-lg md:text-xl text-foreground mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    I build comprehensive full-stack solutions with a focus on immersive frontend experiences and cutting-edge animations.
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
