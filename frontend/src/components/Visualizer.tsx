import { useEffect, useRef } from 'react'
import { Mode } from '../App'

interface VisualizerProps {
    mode: Mode
    isPlaying: boolean
}

export function Visualizer({ mode, isPlaying }: VisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio
            canvas.height = canvas.clientHeight * window.devicePixelRatio
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
        resize()
        window.addEventListener('resize', resize)

        let time = 0

        const animate = () => {
            if (!isPlaying) {
                // If paused, slow down time increment or stop
                // We'll keep it moving very slowly for aesthetics
                time += 0.005
            } else {
                time += 0.02
            }

            const width = canvas.width / window.devicePixelRatio
            const height = canvas.height / window.devicePixelRatio

            ctx.clearRect(0, 0, width, height)

            // Draw waves
            ctx.lineWidth = 2

            // Color based on mode
            let color = 'rgba(255, 255, 255, 0.5)'
            if (mode === 'focus') color = 'rgba(96, 165, 250, 0.5)' // Blue
            if (mode === 'relax') color = 'rgba(45, 212, 191, 0.5)' // Teal
            if (mode === 'sleep') color = 'rgba(129, 140, 248, 0.5)' // Indigo

            ctx.strokeStyle = color

            const lines = 3
            for (let i = 0; i < lines; i++) {
                ctx.beginPath()
                for (let x = 0; x < width; x++) {
                    // Sine wave formula: y = A * sin(B * x + C)
                    // Vary parameters based on mode for different "feel"
                    let freq = 0.01
                    let amp = 50
                    let speed = time + i

                    if (mode === 'focus') { freq = 0.02; amp = 30; } // Faster, tighter
                    if (mode === 'sleep') { freq = 0.005; amp = 80; } // Slower, deeper

                    const y = height / 2 + Math.sin(x * freq + speed) * amp * Math.sin(time * 0.5)
                    ctx.lineTo(x, y)
                }
                ctx.stroke()
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resize)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [mode, isPlaying])

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-64 rounded-xl glass border-none opacity-80"
        />
    )
}
