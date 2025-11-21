import React from 'react';
import { X, Infinity, Clock } from 'lucide-react';

interface TimerSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (duration: number | 'infinite') => void;
    currentDuration: number | 'infinite';
}

const DURATIONS = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1 hour', value: 60 },
    { label: '1.5 hours', value: 90 },
    { label: '2 hours', value: 120 },
    { label: '4 hours', value: 240 },
    { label: '8 hours', value: 480 },
];

const TimerSelector: React.FC<TimerSelectorProps> = ({ isOpen, onClose, onSelect, currentDuration }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-all scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        Set Timer
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                        onClick={() => {
                            onSelect('infinite');
                            onClose();
                        }}
                        className={`col-span-2 p-4 rounded-xl flex items-center justify-center gap-3 transition-all ${currentDuration === 'infinite'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        <Infinity className="w-6 h-6" />
                        <span className="font-bold text-lg">Infinite Play</span>
                    </button>

                    {DURATIONS.map((dur) => (
                        <button
                            key={dur.value}
                            onClick={() => {
                                onSelect(dur.value);
                                onClose();
                            }}
                            className={`p-3 rounded-xl font-medium transition-all ${currentDuration === dur.value
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                }`}
                        >
                            {dur.label}
                        </button>
                    ))}
                </div>

                <p className="text-center text-xs text-gray-500">
                    Audio will stop automatically when the timer ends.
                </p>
            </div>
        </div>
    );
};

export default TimerSelector;
