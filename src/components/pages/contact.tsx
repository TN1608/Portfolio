import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"

import { ContactForm } from "@/components/contact-form"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/constants"

interface ContactProps {
    isInView: boolean
    fadeInComplete: boolean
}

export const Contact = forwardRef<HTMLElement, ContactProps>(({ isInView, fadeInComplete }, ref) => {
    return (
        <section ref={ref} className="py-20">
            <div className="container px-4 justify-center mx-auto">
                <motion.div
                    key={`contact-${fadeInComplete}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
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
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold">Contact Information</h3>
                        <p className="text-muted-foreground">
                            Fill out the form or contact me directly using the information below.
                        </p>

                        <div className="space-y-6">
                            {CONTACT_INFO.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : {}}
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
                                {SOCIAL_LINKS.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
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
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </section>
    )
})

Contact.displayName = "Contact"
