import { forwardRef } from "react"
import { motion } from "framer-motion"

import { SkillItem } from "@/components/skill-item"
import { SKILLS, SKILLS_STATS } from "@/constants"

interface SkillsProps {
    isInView: boolean
    fadeInComplete: boolean
}

export const Skills = forwardRef<HTMLElement, SkillsProps>(({ isInView, fadeInComplete }, ref) => {
    return (
        <section ref={ref} className="py-12 sm:py-20 bg-muted/30">
            <div className="container px-4 sm:px-6 max-w-7xl justify-center mx-auto">
                <motion.div
                    key={`skills-${fadeInComplete}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">My Skills</h2>
                    <div className="h-1 w-16 sm:w-20 bg-primary mx-auto mb-6 sm:mb-8"></div>
                    <p className="text-base sm:text-lg text-muted-foreground">
                        I've worked with a variety of technologies and frameworks to create stunning web
                        applications with amazing user experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    {SKILLS.map((skill, index) => (
                        <SkillItem key={index} skill={skill} className="skill-item" />
                    ))}
                </div>

                <motion.div
                    key={`skills-stats-${fadeInComplete}`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center"
                >
                    {SKILLS_STATS.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 50, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="p-4 sm:p-6 rounded-lg border bg-card"
                        >
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
})

Skills.displayName = "Skills"
