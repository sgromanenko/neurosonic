import { useState } from 'react'
import { Clock, Zap, Target } from 'lucide-react'

interface SessionConfigProps {
    mode: string
    onStart: (config: SessionConfig) => void
    onBack: () => void
}

export interface SessionConfig {
    duration: number // minutes
    activity?: string
    intensity: 'low' | 'medium' | 'high'
}

import { ACTIVITIES } from '../theme'

const DURATIONS = [15, 30, 45, 60, 90, 120]

export function SessionConfig({ mode, onStart, onBack }: SessionConfigProps) {
    const [duration, setDuration] = useState(30)
    const [activity, setActivity] = useState(ACTIVITIES[mode as keyof typeof ACTIVITIES]?.[0]?.label)
    const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium')

    const handleStart = () => {
        onStart({ duration, activity, intensity })
    }

    return (
        <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-bold text-white">
                    Configure Your {mode.charAt(0).toUpperCase() + mode.slice(1)} Session
                </h2>
                <p className="text-gray-400">Customize your experience for optimal results</p>
            </div>

            {/* Configuration Card */}
            <div className="w-full max-w-2xl bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-8">

                {/* Duration Selector */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <Clock size={20} />
                        <h3 className="text-lg font-semibold">Duration</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {DURATIONS.map((dur) => (
                            <button
                                key={dur}
                                onClick={() => setDuration(dur)}
                                className={`py-3 rounded-lg font-medium transition-all ${duration === dur
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {dur} min
                            </button>
                        ))}
                    </div>
                </div>

                {/* Activity Selector */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <Target size={20} />
                        <h3 className="text-lg font-semibold">Activity</h3>
                    </div>
                    <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        {ACTIVITIES[mode as keyof typeof ACTIVITIES]?.map((act) => (
                            <option key={act.id} value={act.label} className="bg-gray-900">
                                {act.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Intensity Selector */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <Zap size={20} />
                        <h3 className="text-lg font-semibold">Neural Intensity</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                            <button
                                key={level}
                                onClick={() => setIntensity(level)}
                                className={`py-3 rounded-lg font-medium transition-all capitalize ${intensity === level
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 text-center">
                        {intensity === 'low' && 'Gentle modulation for background use'}
                        {intensity === 'medium' && 'Balanced for most activities'}
                        {intensity === 'high' && 'Maximum entrainment effect'}
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={onBack}
                    className="px-8 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                >
                    Back
                </button>
                <button
                    onClick={handleStart}
                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg shadow-blue-900/20"
                >
                    Start Session
                </button>
            </div>
        </div>
    )
}
