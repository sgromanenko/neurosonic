import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Visualizer } from './Visualizer'

interface Track {
    id: number
    title: string
    artist: string
    genre: string
    image_url: string
    base_color: string
}

interface PremiumPlayerProps {
    track: Track
    isPlaying: boolean
    onTogglePlay: () => void
    onBack: () => void
    onNext?: () => void
    onPrevious?: () => void
}

export function PremiumPlayer({ track, isPlaying, onTogglePlay, onBack, onNext, onPrevious }: PremiumPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [volume, setVolume] = useState(0.8)

    useEffect(() => {
        if (!audioRef.current || !track) return

        // Use the static URL from the track object
        const audioUrl = (track as any).audio_url || `http://localhost:8000/api/audio/generate?mode=${track.genre}&duration=600`

        if (audioRef.current.src !== audioUrl) {
            audioRef.current.src = audioUrl
            audioRef.current.load()
        }

        if (isPlaying) {
            audioRef.current.play()
                .catch(e => console.error("Playback failed:", e))
        } else {
            audioRef.current.pause()
        }
    }, [track, isPlaying])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    return (
        <div className="fixed inset-0 z-50 flex flex-col text-white overflow-hidden animate-in fade-in duration-700">
            {/* Dynamic Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                style={{ backgroundImage: `url(${track.image_url})` }}
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-center p-6">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium uppercase tracking-wider backdrop-blur-md border border-white/10">
                        Neural Phase Locking Active
                    </span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Maximize2 size={20} />
                </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8 p-8">
                {/* Album Art / Visualizer Container */}
                <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                    <div className="absolute inset-0 bg-black/20" />
                    <Visualizer mode={track.genre as any} isPlaying={isPlaying} />

                    {/* Track Info Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-2xl font-bold">{track.title}</h2>
                        <p className="text-white/70">{track.artist}</p>
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="relative z-10 bg-black/30 backdrop-blur-xl border-t border-white/10 p-6 pb-8">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 w-1/3">
                            <Volume2 size={20} className="text-white/70" />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-24 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={onPrevious}
                                disabled={!onPrevious}
                                className="p-2 hover:text-white text-white/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <SkipBack size={24} />
                            </button>
                            <button
                                onClick={onTogglePlay}
                                className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20"
                            >
                                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                            </button>
                            <button
                                onClick={onNext}
                                disabled={!onNext}
                                className="p-2 hover:text-white text-white/70 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <SkipForward size={24} />
                            </button>
                        </div>

                        <div className="w-1/3"></div>
                    </div>
                </div>
            </div>

            <audio ref={audioRef} loop />
        </div>
    )
}
