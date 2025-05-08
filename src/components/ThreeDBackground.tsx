"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { gsap } from "gsap"

export function ThreeDBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const modelRef = useRef<THREE.Group | null>(null)
    const particlesRef = useRef<THREE.Mesh[]>([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Initialize Three.js scene
        const scene = new THREE.Scene()
        sceneRef.current = scene
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        cameraRef.current = camera
        camera.position.set(0, 0, 8)

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
        rendererRef.current = renderer
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        // Load GLTF model
        const loader = new GLTFLoader()
        loader.load(
            "/models/biboo.glb", // Replace with your GLTF model path
            (gltf: { scene: any }) => {
                const model = gltf.scene
                modelRef.current = model
                model.scale.set(2, 2, 2)
                model.position.set(0, 0, 0)
                scene.add(model)

                // GSAP animations for model
                gsap.to(model.rotation, {
                    y: Math.PI * 2,
                    duration: 15,
                    repeat: -1,
                    ease: "none",
                })
                gsap.fromTo(
                    model.scale,
                    { x: 0, y: 0, z: 0 },
                    { x: 2, y: 2, z: 2, duration: 2, ease: "elastic.out(1, 0.3)" }
                )
                gsap.to(model.position, {
                    y: 0.5,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                })
            },
            undefined,
            (error: any) => console.error("GLTF loading error:", error)
        )

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight(0x3b82f6, 2, 20)
        pointLight.position.set(5, 5, 5)
        scene.add(pointLight)
        gsap.to(pointLight, {
            intensity: 4,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

        // Particle system
        const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16)
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.5,
        })
        const particleCount = 100
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial)
            particle.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            )
            scene.add(particle)
            particlesRef.current.push(particle)
            gsap.to(particle.position, {
                x: particle.position.x + (Math.random() - 0.5) * 5,
                y: particle.position.y + (Math.random() - 0.5) * 5,
                z: particle.position.z + (Math.random() - 0.5) * 5,
                duration: 5 + Math.random() * 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })
        }

        // Resize handler
        const resizeCanvas = () => {
            if (renderer && camera) {
                renderer.setSize(window.innerWidth, window.innerHeight)
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
            }
        }

        // Mouse interaction
        const onMouseMove = (event: MouseEvent) => {
            if (modelRef.current) {
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1
                const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
                gsap.to(modelRef.current.rotation, {
                    x: mouseY * 0.3,
                    y: mouseX * 0.3,
                    duration: 1,
                    ease: "power2.out",
                })
            }
            particlesRef.current.forEach((particle) => {
                const dx = (event.clientX / window.innerWidth - 0.5) * 10
                const dy = (event.clientY / window.innerHeight - 0.5) * 10
                gsap.to(particle.position, {
                    x: particle.position.x + dx * 0.1,
                    y: particle.position.y - dy * 0.1,
                    duration: 2,
                    ease: "power2.out",
                })
            })
        }

        // Animation loop
        const animate = () => {
            if (renderer && scene && camera) {
                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }
        }

        window.addEventListener("resize", resizeCanvas)
        window.addEventListener("mousemove", onMouseMove)
        resizeCanvas()
        animate()

        // Cleanup
        return () => {
            window.removeEventListener("resize", resizeCanvas)
            window.removeEventListener("mousemove", onMouseMove)
            if (renderer) {
                renderer.dispose()
            }
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
        >
            <canvas ref={canvasRef} className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        </motion.div>
    )
}