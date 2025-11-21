import { Brain, Moon, Coffee } from 'lucide-react'
import { Mode } from '../App'

interface ModeSelectorProps {
    onSelect: (mode: Mode) => void
}

export function ModeSelector({ onSelect }: ModeSelectorProps) {
    const modes = [
        {
            id: 'focus',
            label: 'Focus',
            icon: Brain,
            desc: 'Deep work & concentration',
            color: 'text-blue-400',
            bg: 'hover:bg-blue-500/10',
            border: 'hover:border-blue-500/30'
        },
        {
            id: 'relax',
            label: 'Relax',
            icon: Coffee,
            desc: 'Decompress & recharge',
            color: 'text-teal-400',
            bg: 'hover:bg-teal-500/10',
            border: 'hover:border-teal-500/30'
        },
        {
            id: 'sleep',
            label: 'Sleep',
            icon: Moon,
            desc: 'Deep, restorative sleep',
            color: 'text-indigo-400',
            bg: 'hover:bg-indigo-500/10',
            border: 'hover:border-indigo-500/30'
        }
    ] as const

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    onClick={() => onSelect(mode.id)}
                    className={`
            glass-card p-6 flex flex-col items-center gap-4 transition-all duration-300
            hover:scale-105 hover:shadow-lg group text-left
            ${mode.bg} ${mode.border} border-transparent
          `}
                >
                    <div className={`p-4 rounded-full bg-white/5 ${mode.color} group-hover:scale-110 transition-transform`}>
                        <mode.icon size={32} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold">{mode.label}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{mode.desc}</p>
                    </div>
                </button>
            ))}
        </div>
    )
}
