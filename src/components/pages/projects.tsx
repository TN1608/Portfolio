import { forwardRef } from "react"
import { motion } from "framer-motion"

import { ProjectCard } from "@/components/project-card"
import { PROJECTS } from "@/constants"

interface ProjectsProps {
    isInView: boolean
    fadeInComplete: boolean
}

export const Projects = forwardRef<HTMLElement, ProjectsProps>(({ isInView, fadeInComplete }, ref) => {
    return (
        <section ref={ref} className="py-20">
            <div className="container px-4 justify-center mx-auto">
                <motion.div
                    key={`projects-${fadeInComplete}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                    <p className="text-lg text-muted-foreground">
                        Check out some of my recent work. Each project is crafted with attention to detail,
                        focusing on performance, accessibility, and stunning animations.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} className="project-card" />
                    ))}
                </div>
            </div>
        </section>
    )
})

Projects.displayName = "Projects"
