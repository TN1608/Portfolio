"use client"

import type React from "react"
import { useContext, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Navbar } from "@/components/fragments/Navbar"
import { About } from "@/components/pages/about"
import { Contact } from "@/components/pages/contact"
import { Hero } from "@/components/pages/hero"
import { Projects } from "@/components/pages/projects"
import { Skills } from "@/components/pages/skills"
import { ToggleButtons } from "@/components/ToggleButtons"
import { ThemeRippleContext } from "@/context/theme-ripple-context"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
    const { ripple, isFadingIn, fadeInComplete } = useContext(ThemeRippleContext)
    const [activeSection, setActiveSection] = useState("home")

    const heroRef = useRef<HTMLElement>(null)
    const aboutRef = useRef<HTMLElement>(null)
    const skillsRef = useRef<HTMLElement>(null)
    const projectsRef = useRef<HTMLElement>(null)
    const contactRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

    const isAboutInView = useInView(aboutRef, { once: false, amount: 0.5 })
    const isProjectsInView = useInView(projectsRef, { once: false, amount: 0.3 })
    const isSkillsInView = useInView(skillsRef, { once: false, amount: 0.3 })
    const isContactInView = useInView(contactRef, { once: false, amount: 0.3 })

    // Update active section based on scroll position
    useEffect(() => {
        if (isContactInView) setActiveSection("contact")
        else if (isSkillsInView) setActiveSection("skills")
        else if (isProjectsInView) setActiveSection("projects")
        else if (isAboutInView) setActiveSection("about")
        else setActiveSection("home")
    }, [isAboutInView, isProjectsInView, isSkillsInView, isContactInView])

    // GSAP animations - Tái khởi tạo khi fadeInComplete thay đổi
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".skill-item", {
                scrollTrigger: {
                    trigger: skillsRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
            })

            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: projectsRef.current,
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
            })
        })

        return () => ctx.revert()
    }, [fadeInComplete]) // Tái khởi tạo GSAP khi fade-in hoàn tất

    const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }

    const navItems = [
        { name: "Home", ref: heroRef, id: "home" },
        { name: "About", ref: aboutRef, id: "about" },
        { name: "Projects", ref: projectsRef, id: "projects" },
        { name: "Skills", ref: skillsRef, id: "skills" },
        { name: "Contact", ref: contactRef, id: "contact" },
    ]

    return (
        <div className="relative min-h-screen bg-background">
            {/* Overlay cho hiệu ứng fade-in */}
            <AnimatePresence>
                {ripple && (
                    <motion.div
                        key="fade-overlay"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isFadingIn ? 0 : 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-[9998] bg-background pointer-events-none"
                    />
                )}
            </AnimatePresence>

            {/* Nội dung chính */}
            <div>
                <ToggleButtons scale={scale.get()} />
                <Navbar activeSection={activeSection} scrollToSection={scrollToSection} navItems={navItems} />

                <Hero
                    ref={heroRef}
                    onViewWork={() => scrollToSection(projectsRef)}
                    onContact={() => scrollToSection(contactRef)}
                />

                <About
                    ref={aboutRef}
                    isInView={isAboutInView}
                    fadeInComplete={fadeInComplete}
                    onContact={() => scrollToSection(contactRef)}
                />

                <Projects
                    ref={projectsRef}
                    isInView={isProjectsInView}
                    fadeInComplete={fadeInComplete}
                />

                <Skills
                    ref={skillsRef}
                    isInView={isSkillsInView}
                    fadeInComplete={fadeInComplete}
                />

                <Contact
                    ref={contactRef}
                    isInView={isContactInView}
                    fadeInComplete={fadeInComplete}
                />

                <footer className="py-8 border-t">
                    <div className="container px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-muted-foreground">© {new Date().getFullYear()} Nguyen Dinh Tuan. All
                                rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}