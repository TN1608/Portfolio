import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { SoundToggle } from "@/components/sound-toggle"

export function ToggleButtons({ scale }: { scale: number }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <motion.div
            className="fixed bottom-4 right-4 flex flex-col gap-4 z-50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div style={{ scale }} variants={itemVariants}>
                <ThemeToggle />
            </motion.div>
            <motion.div style={{ scale }} variants={itemVariants}>
                <SoundToggle />
            </motion.div>
        </motion.div>
    )
}