import { useEffect, useRef } from 'react'
import { ModeType } from '../theme'

interface VisualizerProps {
    mode: ModeType
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
            if (mode === 'meditate') color = 'rgba(6, 182, 212, 0.5)' // Cyan

            ctx.strokeStyle = color

            const lines = 5 // Increased lines for richness
            for (let i = 0; i < lines; i++) {
                ctx.beginPath()
                for (let x = 0; x < width; x++) {
                    // Sine wave formula: y = A * sin(B * x + C)
                    // Vary parameters based on mode for different "feel"
                    let freq = 0.01
                    let amp = 50
                    let speed = time + i * 0.5

                    // Premium tuning
                    if (mode === 'focus') {
                        // Sharp, alert, high frequency
                        freq = 0.03 + (i * 0.005);
                        amp = 20 + (Math.sin(time) * 10);
                        speed = time * 1.5 + i;
                    }
                    if (mode === 'relax') {
                        // Smooth, flowing, medium frequency
                        freq = 0.01 + (i * 0.002);
                        amp = 40 + (Math.sin(time * 0.5) * 15);
                        speed = time * 0.8 + i;
                    }
                    if (mode === 'sleep') {
                        // Deep, slow, low frequency
                        freq = 0.005 + (i * 0.001);
                        amp = 60 + (Math.sin(time * 0.3) * 20);
                        speed = time * 0.4 + i;
                    }
                    if (mode === 'meditate') {
                        // Rhythmic, balanced, breathing effect
                        freq = 0.015;
                        amp = 45 + (Math.sin(time * 0.8) * 25); // Strong breathing effect
                        speed = time + i;
                    }

                    const y = height / 2 + Math.sin(x * freq + speed) * amp * Math.sin(time * 0.5 + i * 0.2)
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
