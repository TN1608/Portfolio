"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github?: string
  demo: string
}

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

export function ProjectCard({ project, index, className }: ProjectCardProps) {
  return (
      <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ y: -12, scale: 1.02 }}
          className={`project-card ${className || ''}`}
      >
        <Card className="overflow-hidden h-full flex flex-col group bg-card/80 backdrop-blur-sm border border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative overflow-hidden">
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
              <motion.div
                  className="flex gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
              >
                {project.github && (
                    <Button
                        size="sm"
                        variant="secondary"
                        className="bg-primary/80 hover:bg-primary text-primary-foreground"
                        asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </a>
                    </Button>
                )}
                <Button
                    size="sm"
                    className="bg-primary/80 hover:bg-primary text-primary-foreground"
                    asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </a>
                </Button>
              </motion.div>
            </motion.div>
            <motion.img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full aspect-video object-cover"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <CardHeader className="p-4">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
                <Badge
                    key={i}
                    variant="secondary"
                    className="font-normal bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                >
                  {tag}
                </Badge>
            ))}
          </CardFooter>
        </Card>
      </motion.div>
  )
}