"use client"

import {useEffect, useRef} from "react"
import {motion} from "framer-motion"
import * as THREE from "three"
import {gsap} from "gsap"

export function UniverseBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const sceneRef = useRef<THREE.Scene | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const starRef = useRef<THREE.Mesh | null>(null)
    const starsRef = useRef<THREE.Points | null>(null)
    const nebulaeRef = useRef<THREE.Points[]>([])

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
        camera.position.set(0, 0, 10)

        const renderer = new THREE.WebGLRenderer({canvas, alpha: true})
        rendererRef.current = renderer
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(window.innerWidth, window.innerHeight)

        // Create circular texture for particles
        const createCircleTexture = () => {
            const size = 32
            const canvas = document.createElement("canvas")
            canvas.width = size
            canvas.height = size
            const context = canvas.getContext("2d")
            if (!context) return null

            const gradient = context.createRadialGradient(
                size / 2,
                size / 2,
                0,
                size / 2,
                size / 2,
                size / 2
            )
            gradient.addColorStop(0, "rgba(255, 255, 255, 1)")
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

            context.fillStyle = gradient
            context.beginPath()
            context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
            context.fill()

            return new THREE.CanvasTexture(canvas)
        }

        const circleTexture = createCircleTexture()
        if (!circleTexture) return

        // Central star (glowing sphere with shader)
        const starGeometry = new THREE.SphereGeometry(0.5, 32, 32)
        const starMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: {value: 0},
                glowColor: {value: new THREE.Color(0x3b82f6)},
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        varying vec2 vUv;
        void main() {
          float intensity = 0.5 + 0.5 * sin(time * 2.0);
          float dist = distance(vUv, vec2(0.5, 0.5));
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(glowColor * glow * intensity, glow * 0.8);
        }
      `,
            transparent: true,
        })
        const star = new THREE.Mesh(starGeometry, starMaterial)
        starRef.current = star
        scene.add(star)

        // GSAP animations for star
        gsap.to(starMaterial.uniforms.time, {
            value: 10,
            duration: 10,
            repeat: -1,
            ease: "linear",
        })
        gsap.to(star.scale, {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

        // Stars (point particles)
        const starCount = 5000
        const starsGeometry = new THREE.BufferGeometry()
        const starPositions = new Float32Array(starCount * 3)
        const starOpacities = new Float32Array(starCount)
        const starSizes = new Float32Array(starCount)
        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 200
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200
            starOpacities[i] = Math.random()
            starSizes[i] = 0.1 + Math.random() * 0.1 // Vary size slightly
        }
        starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
        starsGeometry.setAttribute("opacity", new THREE.BufferAttribute(starOpacities, 1))
        starsGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            map: circleTexture,
            transparent: true,
            vertexColors: false,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        })
        const stars = new THREE.Points(starsGeometry, starsMaterial)
        starsRef.current = stars
        scene.add(stars)

        // GSAP twinkling for stars
        gsap.to(starOpacities, {
            value: () => Math.random(),
            duration: 2,
            repeat: -1,
            stagger: 0.01,
            onUpdate: () => {
                starsGeometry.attributes.opacity.needsUpdate = true
            },
        })

        // Nebulae (particle clouds)
        const nebulaCount = 3
        for (let i = 0; i < nebulaCount; i++) {
            const nebulaGeometry = new THREE.BufferGeometry()
            const nebulaParticleCount = 500
            const nebulaPositions = new Float32Array(nebulaParticleCount * 3)
            const nebulaOpacities = new Float32Array(nebulaParticleCount)
            const nebulaSizes = new Float32Array(nebulaParticleCount)
            for (let j = 0; j < nebulaParticleCount; j++) {
                const radius = 5 + Math.random() * 5
                const theta = Math.random() * Math.PI * 2
                const phi = Math.random() * Math.PI
                nebulaPositions[j * 3] = radius * Math.sin(phi) * Math.cos(theta) + (i - 1) * 8
                nebulaPositions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
                nebulaPositions[j * 3 + 2] = radius * Math.cos(phi)
                nebulaOpacities[j] = Math.random() * 0.5 + 0.2
                nebulaSizes[j] = 0.3 + Math.random() * 0.2 // Vary size slightly
            }
            nebulaGeometry.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3))
            nebulaGeometry.setAttribute("opacity", new THREE.BufferAttribute(nebulaOpacities, 1))
            nebulaGeometry.setAttribute("size", new THREE.BufferAttribute(nebulaSizes, 1))
            const nebulaMaterial = new THREE.PointsMaterial({
                color: new THREE.Color(`hsl(${220 + i * 20}, 70%, 50%)`),
                size: 0.3,
                map: circleTexture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
            const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
            nebulaeRef.current.push(nebula)
            scene.add(nebula)
            gsap.to(nebula.position, {
                x: nebula.position.x + (Math.random() - 0.5) * 2,
                y: nebula.position.y + (Math.random() - 0.5) * 2,
                z: nebula.position.z + (Math.random() - 0.5) * 2,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            })
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        scene.add(ambientLight)
        const pointLight = new THREE.PointLight(0x3b82f6, 2, 20)
        pointLight.position.set(5, 5, 5)
        scene.add(pointLight)
        gsap.to(pointLight, {
            intensity: 3,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })

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
            if (camera) {
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1
                const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
                gsap.to(camera.rotation, {
                    x: mouseY * 0.2,
                    y: mouseX * 0.2,
                    duration: 1,
                    ease: "power2.out",
                })
            }
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
            if (circleTexture) {
                circleTexture.dispose()
            }
        }
    }, [])

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
            className="absolute inset-0 z-0"
        >
            <canvas ref={canvasRef} className="absolute inset-0"/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"/>
        </motion.div>
    )
}