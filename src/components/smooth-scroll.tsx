"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        })

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        // Disable GSAP's lag smoothing to prevent stuttering
        gsap.ticker.lagSmoothing(0)

        // Sync with GSAP's ticker (no need for separate RAF)
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })

        return () => {
            lenis.destroy()
            gsap.ticker.remove(lenis.raf)
        }
    }, [])

    return null
}
