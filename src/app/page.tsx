"use client"

import type React from "react"
import { useEffect, useRef, useState, useContext } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    ArrowRight,
    Code,
    ExternalLink,
    Mail,
    User,
} from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ToggleButtons } from "@/components/ToggleButtons"
import { ProjectCard } from "@/components/project-card"
import { SkillItem } from "@/components/skill-item"
import { AnimatedText } from "@/components/animated-text"
import { HeroBackground } from "@/components/hero-background"
import { ContactForm } from "@/components/contact-form"
import { ThreeDBackground } from "@/components/ThreeDBackground"
import { UniverseBackground } from "@/components/UniverseBackground"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { ThemeRippleContext } from "@/context/theme-ripple-context"
import { Navbar } from "@/components/fragments/Navbar"

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
    const { ripple, isFadingIn, fadeInComplete } = useContext(ThemeRippleContext)
    const [activeSection, setActiveSection] = useState("home")

    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const skillsRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
    const contactRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

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

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }

    const navItems = [
        { name: "Home", ref: heroRef, id: "home" },
        { name: "About", ref: aboutRef, id: "about" },
        { name: "Projects", ref: projectsRef, id: "projects" },
        { name: "Skills", ref: skillsRef, id: "skills" },
        { name: "Contact", ref: contactRef, id: "contact" },
    ]

    const projects = [
        {
            title: "Pacific Travel",
            description: "A travel website integrated with AI API, payment API, beautiful effects, and built with modern technologies.",
            tags: ["Gemini API", "ReactJS", "Java Spring boot", "Tailwind", "VNPAY API", "SQL Server"],
            image: "/img/pacific.png",
            github: "https://github.com/Khang1z2t/Pacific",
            demo: "https://pacific-vn.vercel.app/",
        },
        {
            title: "Vieclamsanxuat",
            description: "A modernized job search website for factory workers, migrated from a legacy system with full responsiveness and built using up-to-date technologies.",
            tags: ["ReactJS", "Oracle ", "C#", "Responsive", "Tailwind"],
            image: "/img/vieclamsanxuat.png",
            github: "https://gitlab.com/websitetuyendung/vieclamsanxuat_v2/-/blob/DinhTuan",
            demo: "https://vieclamsanxuat.vercel.app/",
        },
        {
            title: "TNIzStore",
            description: "A gaming and media service website offering game codes, monthly packs, and social media bundles with integrated AI chat and sleek UI.",
            tags: ["NextJS", "Tailwind", "Framer Motion", "GSAP", "Gemini API", "Java Spring boot", "Postgresql", "ShadcnUI"],
            image: "/img/tnizstore.png",
            github: "https://github.com/TN1608/TNIzStore",
            demo: "https://tnizstore.vercel.app/",
        },
    ]

    const skills = [
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Java", level: 75 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Three.js", level: 70 },
        { name: "Spring boot", level: 75 },
        { name: "Framer Motion", level: 85 },
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

                <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                    <UniverseBackground />
                    <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
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
                            className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8"
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
                            <Button size="lg" onClick={() => scrollToSection(projectsRef)}>
                                View My Work
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => scrollToSection(contactRef)}>
                                Contact Me
                            </Button>
                        </motion.div>
                    </div>
                </section>

                <section ref={aboutRef} className="py-12 sm:py-20 bg-muted/30">
                    <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
                        <motion.div
                            key={`about-${fadeInComplete}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7 }}
                            className="max-w-3xl mx-auto text-center mb-10 sm:mb-16"
                        >
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">About Me</h2>
                            <div className="h-1 w-16 sm:w-20 bg-primary mx-auto mb-6 sm:mb-8"></div>
                            <p className="text-base sm:text-lg text-muted-foreground">
                                As a front-end developer, I specialize in creating dynamic and responsive web applications.
                                My expertise lies in HTML, CSS, JavaScript, and React, allowing me to build user-friendly
                                interfaces. I am passionate about crafting seamless user experiences that engage and delight.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto items-center">
                            <motion.div
                                key={`about-image-${fadeInComplete}`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                <div className="relative max-w-sm sm:max-w-md mx-auto">
                                    <div className="absolute -inset-3 sm:-inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl opacity-70"></div>
                                    <div className="relative aspect-square rounded-xl overflow-hidden border">
                                        <img src="/img/aboutme.jpg" alt="Developer" className="object-cover w-full h-full" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                key={`about-details-${fadeInComplete}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                className="space-y-4 sm:space-y-6"
                            >
                                <h3 className="text-xl sm:text-2xl font-bold">
                                    Hi, I'm <span className="text-primary">Nguyen Dinh Tuan</span>
                                </h3>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    With over 1 year of experience in web development, I specialize in building
                                    high-performance applications with beautiful user interfaces and smooth animations.
                                    I'm passionate about creating digital solutions that solve real-world problems.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Location</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Go Vap district, Ho Chi Minh City</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Experience</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">1+ Years</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Email</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">tuanngdinh.1608@gmail.com</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Availability</h4>
                                        <p className="text-xs sm:text-sm text-muted-foreground">Freelance & Full-time</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="cursor-pointer text-sm sm:text-base" variant="default">
                                                <User className="mr-2 h-4 w-4" /> More About Me
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>About Me</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Link href="https://www.linkedin.com/in/tuấn-nguyễn-đình-70a790359" className="w-full">
                                                    LinkedIn
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="https://www.facebook.com/TuanNguyen160804/" className="w-full">
                                                    Facebook
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="https://github.com/TN1608" className="w-full">
                                                    Github
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button onClick={() => scrollToSection(contactRef)} variant="outline" className="text-sm sm:text-base">
                                        <Mail className="mr-2 h-4 w-4" /> Contact Me
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section ref={projectsRef} className="py-20">
                    <div className="container px-4 justify-center mx-auto">
                        <motion.div
                            key={`projects-${fadeInComplete}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
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
                            {projects.map((project, index) => (
                                <ProjectCard key={index} project={project} index={index} className="project-card" />
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={skillsRef} className="py-12 sm:py-20 bg-muted/30">
                    <div className="container px-4 sm:px-6 max-w-7xl justify-center mx-auto">
                        <motion.div
                            key={`skills-${fadeInComplete}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
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
                            {skills.map((skill, index) => (
                                <SkillItem key={index} skill={skill} className="skill-item" />
                            ))}
                        </div>

                        <motion.div
                            key={`skills-stats-${fadeInComplete}`}
                            initial={{ opacity: 0 }}
                            animate={isSkillsInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center"
                        >
                            {[
                                { label: "Projects Completed", value: "3+" },
                                { label: "Graduated", value: "May 5, 2025" },
                                { label: "Years Experience", value: "1+" },
                                { label: "GPA", value: "(3.42/4.00)" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={isSkillsInView ? { y: 0, opacity: 1 } : {}}
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

                <section ref={contactRef} className="py-20">
                    <div className="container px-4 justify-center mx-auto">
                        <motion.div
                            key={`contact-${fadeInComplete}`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7 }}
                            className="max-w-3xl mx-auto text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                            <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                            <p className="text-lg text-muted-foreground">
                                Have a project in mind or want to collaborate? Feel free to reach out! I'm always open
                                to discussing new opportunities.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            <motion.div
                                key={`contact-info-${fadeInComplete}`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isContactInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="space-y-8"
                            >
                                <h3 className="text-2xl font-bold">Contact Information</h3>
                                <p className="text-muted-foreground">
                                    Fill out the form or contact me directly using the information below.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { icon: Mail, label: "Email", value: "tuanngdinh.1608@gmail.com" },
                                        { icon: FaGithub, label: "GitHub", value: "https://github.com/TN1608" },
                                        { icon: Code, label: "Website", value: "https://tunzngportfolio.id.vn" },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={isContactInView ? { x: 0, opacity: 1 } : {}}
                                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-4"
                                        >
                                            <div
                                                className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">{item.label}</p>
                                                <p className="text-base font-medium text-foreground">
                                                    {item.label === "Email" ? (
                                                        <a href={`mailto:${item.value}`} className="hover:underline">
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <a href={item.value} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                            {item.value}
                                                        </a>
                                                    )}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="pt-8">
                                    <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                                    <div className="flex gap-4">
                                        {[
                                            { name: "github", href: "https://github.com/TN1608" },
                                            { name: "twitter", href: "https://twitter.com" },
                                            { name: "linkedin", href: "www.linkedin.com/in/tuấn-nguyễn-đình-70a790359" },
                                            { name: "facebook", href: "https://www.facebook.com/TuanNguyen160804/" },
                                        ].map((social, index) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                initial={{ scale: 0 }}
                                                animate={isContactInView ? { scale: 1 } : {}}
                                                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                            >
                                                <span className="sr-only">{social.name}</span>
                                                {social.name === "github" ? (
                                                    <FaGithub className="w-5 h-5" />
                                                ) : social.name === "twitter" ? (
                                                    <FaSquareXTwitter className="w-5 h-5" />
                                                ) : social.name === "linkedin" ? (
                                                    <FaLinkedin className="w-5 h-5" />
                                                ) : social.name === "facebook" ? (
                                                    <FaFacebook className="w-5 h-5" />
                                                ) : (
                                                    <span className="w-5 h-5">{social.name}</span>
                                                )}
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                key={`contact-form-${fadeInComplete}`}
                                initial={{ opacity: 0, x: 50 }}
                                animate={isContactInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.4 }}
                            >
                                <ContactForm />
                            </motion.div>
                        </div>
                    </div>
                </section>

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