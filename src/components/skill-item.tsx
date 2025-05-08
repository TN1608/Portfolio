"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SkillItemProps {
  skill: {
    name: string
    level: number
  }
  className?: string
}

export function SkillItem({ skill, className }: SkillItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <div ref={ref} className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{skill.name}</h3>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
