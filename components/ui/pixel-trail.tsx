"use client"
import React, { useEffect, useRef } from "react"

export function PixelCursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pixelsRef = useRef<Array<{ x: number; y: number; opacity: number; age: number }>>([])
    const lastPosRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        handleResize()
        window.addEventListener("resize", handleResize)

        const PIXEL_SIZE = 12
        const FADE_SPEED = 0.03 // Slightly slower fade for better visibility
        const GAP = 14 // Distance between pixels to prevent overlap clustering

        const handleMouseMove = (e: MouseEvent) => {
            const x = e.clientX
            const y = e.clientY

            const dx = x - lastPosRef.current.x
            const dy = y - lastPosRef.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist > GAP) {
                pixelsRef.current.push({
                    x,
                    y,
                    opacity: 1,
                    age: 0
                })
                lastPosRef.current = { x, y }
            }
        }
        window.addEventListener("mousemove", handleMouseMove)

        const animate = () => {
            if (!ctx || !canvas) return
            ctx.clearRect(0, 0, canvas.width, canvas.height) // Clear canvas

            // Update and draw pixels
            // Remove dead pixels in place (filter) ? No, simpler to build new array or just splice.
            // For performance, let's filter.
            pixelsRef.current = pixelsRef.current.filter(p => p.opacity > 0)

            pixelsRef.current.forEach(p => {
                p.opacity -= FADE_SPEED
                p.age++

                const sizeMultiplier = Math.max(0.3, 1 - p.age / 80)
                const currentSize = PIXEL_SIZE * sizeMultiplier

                // Draw pixel
                // Check for dark/light mode? For now assume white/black contrast based on typical usage.
                // Or we can check window.matchMedia for dark mode to set color.
                // Let's use a dynamic color or just white for now as it's transparent overlay usually.
                // The previous code had "bg-white dark:bg-black border...".
                // Canvas cannot easily read Tailwind classes.
                // We will default to a high contrast color that adapts via CSS variables if we query them? 
                // Simplest: Black pixels with white border or vice versa.
                // Let's draw White pixels with Black border for visibility on both.

                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
                ctx.strokeStyle = `rgba(0, 0, 0, ${p.opacity})`
                ctx.lineWidth = 1

                ctx.beginPath()
                ctx.rect(p.x - currentSize / 2, p.y - currentSize / 2, currentSize, currentSize)
                ctx.fill()
                ctx.stroke()
            })

            animationRef.current = requestAnimationFrame(animate)
        }

        // Start loop
        animationRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-screen h-screen pointer-events-none z-50 mix-blend-difference"
        />
    )
}
