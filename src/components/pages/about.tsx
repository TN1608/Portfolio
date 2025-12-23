import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

import { AboutMeButton } from "@/components/about-me-button"
import { Button } from "@/components/ui/button"

interface AboutProps {
    isInView: boolean
    fadeInComplete: boolean // Using fadeInComplete for unique keys if needed
    onContact: () => void
}

export const About = forwardRef<HTMLElement, AboutProps>(({ isInView, fadeInComplete, onContact }, ref) => {
    return (
        <section ref={ref} className="py-12 sm:py-20 bg-muted/30">
            <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
                <motion.div
                    key={`about-${fadeInComplete}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
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
                            <AboutMeButton />
                            <Button onClick={onContact} variant="outline" className="text-sm sm:text-base">
                                <Mail className="mr-2 h-4 w-4" /> Contact Me
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
})

About.displayName = "About"
