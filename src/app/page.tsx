"use client"

import type React from "react"

import {useEffect, useRef, useState} from "react"
import {motion, useInView, useScroll, useTransform} from "framer-motion"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {
    ArrowRight,
    Code,
    ExternalLink,
    FacebookIcon,
    Github,
    Linkedin,
    LinkedinIcon,
    Mail,
    Twitter, TwitterIcon,
    User
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
import {Button} from "@/components/ui/button"
import {ThemeToggle} from "@/components/theme-toggle"
import {ProjectCard} from "@/components/project-card"
import {SkillItem} from "@/components/skill-item"
import {AnimatedText} from "@/components/animated-text"
import {HeroBackground} from "@/components/hero-background"
import {ContactForm} from "@/components/contact-form"
import {ThreeDBackground} from "@/components/ThreeDBackground";
import {UniverseBackground} from "@/components/UniverseBackground";
import {FaFacebook, FaGithub, FaLinkedin} from "react-icons/fa";
import {FaSquareXTwitter} from "react-icons/fa6";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
    const [activeSection, setActiveSection] = useState("home")
    const heroRef = useRef<HTMLDivElement>(null)
    const aboutRef = useRef<HTMLDivElement>(null)
    const skillsRef = useRef<HTMLDivElement>(null)
    const projectsRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>
    const contactRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>

    const {scrollYProgress} = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

    const isAboutInView = useInView(aboutRef, {once: false, amount: 0.5})
    const isProjectsInView = useInView(projectsRef, {once: false, amount: 0.3})
    const isSkillsInView = useInView(skillsRef, {once: false, amount: 0.3})
    const isContactInView = useInView(contactRef, {once: false, amount: 0.3})

    // Update active section based on scroll position
    useEffect(() => {
        if (isContactInView) setActiveSection("contact")
        else if (isSkillsInView) setActiveSection("skills")
        else if (isProjectsInView) setActiveSection("projects")
        else if (isAboutInView) setActiveSection("about")
        else setActiveSection("home")
    }, [isAboutInView, isProjectsInView, isSkillsInView, isContactInView])

    // GSAP animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate skills on scroll
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

            // Animate project cards
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
    }, [])

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }

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
        // {
        //     title: "Real-time Analytics Dashboard",
        //     description: "Interactive dashboard displaying real-time data with customizable widgets.",
        //     tags: ["Next.js", "D3.js", "WebSockets", "Firebase"],
        //     image: "/placeholder.svg?height=600&width=800",
        //     github: "#",
        //     demo: "#",
        // },
    ]

    const skills = [
        {name: "React", level: 90},
        {name: "Next.js", level: 85},
        {name: "TypeScript", level: 80},
        {name: "Java", level: 75},
        {name: "Tailwind CSS", level: 90},
        {name: "Three.js", level: 70},
        {name: "Spring boot", level: 75},
        {name: "Framer Motion", level: 85},
    ]

    return (
        <div className="relative min-h-screen bg-background">
            {/*FLoat button*/}
            <motion.div
                style={{scale}}
                className="fixed bottom-4 right-4 z-50"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <ThemeToggle/>
            </motion.div>
            {/* Navigation */}
            <motion.nav
                initial={{y: -100, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.5}}
                className="fixed top-0 left-0 right-0 z-50 flex items-center w-full justify-center px-6 py-4 backdrop-blur-md bg-background/80 border-b"
            >

                <div className="hidden md:flex items-center space-x-8">
                    {[
                        {name: "Home", ref: heroRef, id: "home"},
                        {name: "About", ref: aboutRef, id: "about"},
                        {name: "Projects", ref: projectsRef, id: "projects"},
                        {name: "Skills", ref: skillsRef, id: "skills"},
                        {name: "Contact", ref: contactRef, id: "contact"},
                    ].map((item) => (
                        <motion.button
                            key={item.name}
                            onClick={() => scrollToSection(item.ref as React.RefObject<HTMLDivElement>)}
                            className={`relative px-1 py-2 text-lg font-medium transition-colors ${
                                activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            {item.name}
                            {activeSection === item.id && (
                                <motion.div
                                    layoutId="activeSection"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.2}}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

            </motion.nav>

            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                {/*<HeroBackground/>*/}
                {/*<ThreeDBackground/>*/}
                <UniverseBackground/>
                <div className="container relative z-10 px-4 flex flex-col items-center text-center">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="mb-6"
                    >
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                          Frontend Developer
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2, duration: 0.8}}
                    >
                        <AnimatedText text="Creating digital experiences that matter"/>
                    </motion.h1>

                    <motion.p
                        className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.4, duration: 0.8}}
                    >
                        I build innovative web applications with cutting-edge technologies and stunning animations
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.6, duration: 0.5}}
                    >
                        <Button size="lg" onClick={() => scrollToSection(projectsRef)}>
                            View My Work
                        </Button>
                        <Button size="lg" variant="outline" onClick={() => scrollToSection(contactRef)}>
                            Contact Me
                        </Button>
                    </motion.div>

                    {/*<motion.div*/}
                    {/*    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"*/}
                    {/*    initial={{opacity: 0}}*/}
                    {/*    animate={{opacity: 1}}*/}
                    {/*    transition={{delay: 1, duration: 0.5}}*/}
                    {/*>*/}
                    {/*    <motion.div*/}
                    {/*        animate={{y: [0, 10, 0]}}*/}
                    {/*        transition={{repeat: Number.POSITIVE_INFINITY, duration: 1.5}}*/}
                    {/*        className="flex flex-col items-center"*/}
                    {/*    >*/}
                    {/*        <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>*/}
                    {/*        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">*/}
                    {/*            <motion.div*/}
                    {/*                animate={{y: [0, 15, 0]}}*/}
                    {/*                transition={{repeat: Number.POSITIVE_INFINITY, duration: 1.5}}*/}
                    {/*                className="w-2 h-2 bg-primary rounded-full mt-2"*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    </motion.div>*/}
                    {/*</motion.div>*/}
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} className="py-20 bg-muted/30">
                <div className="container px-4 max-w-7xl mx-auto">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={isAboutInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.7}}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                        <p className="text-lg text-muted-foreground">
                            As a front-end developer, I specialize in creating dynamic and responsive web applications.
                            My expertise lies in HTML, CSS, JavaScript, and React, allowing me to build user-friendly
                            interfaces. I am passionate about crafting seamless user experiences that engage and
                            delight.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            animate={isAboutInView ? {opacity: 1, x: 0} : {}}
                            transition={{duration: 0.7, delay: 0.2}}
                        >
                            <div className="relative max-w-md mx-auto">
                                <div
                                    className="absolute -inset-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl opacity-70"></div>
                                <div className="relative aspect-square rounded-xl overflow-hidden border">
                                    <img
                                        src="/img/aboutme.jpg"
                                        alt="Developer"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 50}}
                            animate={isAboutInView ? {opacity: 1, x: 0} : {}}
                            transition={{duration: 0.7, delay: 0.4}}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold">
                                Hi, I'm <span className="text-primary">Nguyen Dinh Tuan</span>
                            </h3>
                            <p className="text-muted-foreground">
                                With over 1 years of experience in web development, I specialize in building
                                high-performance applications with beautiful user interfaces and smooth animations. I'm
                                passionate about creating digital solutions that solve real-world problems.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Location</h4>
                                    <p className="text-muted-foreground">Go Vap district, Ho Chi Minh City</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Experience</h4>
                                    <p className="text-muted-foreground">1+ Years</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Email</h4>
                                    <p className="text-muted-foreground">tuanngdinh.1608@gmail.com</p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Availability</h4>
                                    <p className="text-muted-foreground">Freelance & Full-time</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="cursor-pointer" variant="default">
                                            <User className="mr-2 h-4 w-4"/> More About Me
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>About Me</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <Link href="www.linkedin.com/in/tuấn-nguyễn-đình-70a790359"
                                                  className="w-full">
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
                                <Button
                                    onClick={() => scrollToSection(contactRef)}
                                    variant="outline">
                                    <Mail className="mr-2 h-4 w-4"/> Contact Me
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section ref={projectsRef} className="py-20">
                <div className="container px-4">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={isProjectsInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.7}}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                        <p className="text-lg text-muted-foreground">
                            Check out some of my recent work. Each project is crafted with attention to detail, focusing
                            on
                            performance, accessibility, and stunning animations.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} index={index} className="project-card"/>
                        ))}
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={isProjectsInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.5, delay: 0.6}}
                        className="mt-12 text-center"
                    >
                        <Button size="lg" variant="outline">
                            View All Projects <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Skills Section */}
            <section ref={skillsRef} className="py-20 bg-muted/30">
                <div className="container px-4">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={isSkillsInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.7}}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                        <p className="text-lg text-muted-foreground">
                            I've worked with a variety of technologies and frameworks to create stunning web
                            applications with amazing
                            user experiences.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {skills.map((skill, index) => (
                            <SkillItem key={index} skill={skill} className="skill-item"/>
                        ))}
                    </div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={isSkillsInView ? {opacity: 1} : {}}
                        transition={{duration: 0.7, delay: 0.6}}
                        className="mt-16 grid md:grid-cols-4 gap-6 text-center"
                    >
                        {[
                            {label: "Projects Completed", value: "3+"},
                            {label: "Graduated", value: "May 5 , 2025"},
                            {label: "Years Experience", value: "1+"},
                            {label: "GPA", value: "A-"},
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{y: 50, opacity: 0}}
                                animate={isSkillsInView ? {y: 0, opacity: 1} : {}}
                                transition={{duration: 0.5, delay: 0.2 + index * 0.1}}
                                className="p-6 rounded-lg border bg-card"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                                <p className="text-muted-foreground">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} className="py-20">
                <div className="container px-4">
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={isContactInView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.7}}
                        className="max-w-3xl mx-auto text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
                        <p className="text-lg text-muted-foreground">
                            Have a project in mind or want to collaborate? Feel free to reach out! I'm always open to
                            discussing new
                            opportunities.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <motion.div
                            initial={{opacity: 0, x: -50}}
                            animate={isContactInView ? {opacity: 1, x: 0} : {}}
                            transition={{duration: 0.7, delay: 0.2}}
                            className="space-y-8"
                        >
                            <h3 className="text-2xl font-bold">Contact Information</h3>
                            <p className="text-muted-foreground">
                                Fill out the form or contact me directly using the information below.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {icon: Mail, label: "Email", value: "tuanngdinh.1608@gmail.com"},
                                    {icon: FaGithub, label: "GitHub", value: "https://github.com/TN1608"},
                                    {icon: Code, label: "Website", value: "www.example.com"},
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{x: -20, opacity: 0}}
                                        animate={isContactInView ? {x: 0, opacity: 1} : {}}
                                        transition={{duration: 0.4, delay: 0.3 + index * 0.1}}
                                        className="flex items-center gap-4"
                                    >
                                        <div
                                            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                                            <item.icon className="w-5 h-5"/>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{item.label}</p>
                                            <p className="font-medium">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="pt-8">
                                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                                <div className="flex gap-4">
                                    {[
                                        {name: "github", href: "https://github.com/TN1608"},
                                        {name: "twitter", href: "https://twitter.com"},
                                        {name: "linkedin", href: "www.linkedin.com/in/tuấn-nguyễn-đình-70a790359"},
                                        {name: "facebook", href: "https://www.facebook.com/TuanNguyen160804/"},
                                    ].map((social, index) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.href}
                                            initial={{scale: 0}}
                                            animate={isContactInView ? {scale: 1} : {}}
                                            transition={{duration: 0.3, delay: 0.5 + index * 0.1}}
                                            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                                        >
                                            <span className="sr-only">{social.name}</span>
                                            {social.name === "github" ? (
                                                <FaGithub className="w-5 h-5"/>
                                            ) : social.name === "twitter" ? (
                                                <FaSquareXTwitter className="w-5 h-5"/>
                                            ) : social.name === "linkedin" ? (
                                                <FaLinkedin className="w-5 h-5"/>
                                            ) : social.name === "facebook" ? (
                                                <FaFacebook className={"w-5 h-5"} />
                                            ): (
                                                <span className="w-5 h-5">{social.name}</span>
                                            )}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: 50}}
                            animate={isContactInView ? {opacity: 1, x: 0} : {}}
                            transition={{duration: 0.7, delay: 0.4}}
                        >
                            <ContactForm/>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 border-t">
                <div className="container px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-muted-foreground">© {new Date().getFullYear()} Nguyen Dinh Tuan. All rights
                            reserved.</p>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}