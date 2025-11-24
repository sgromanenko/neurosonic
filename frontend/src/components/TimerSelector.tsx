import React, { useState } from 'react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { Infinity, Clock, Timer as TimerIcon, Zap, Coffee } from 'lucide-react';

interface TimerSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (duration: number | null) => void;
}

type TabType = 'infinite' | 'timer' | 'intervals';

export const TimerSelector: React.FC<TimerSelectorProps> = ({ isOpen, onClose, onSelect }) => {
    const [activeTab, setActiveTab] = useState<TabType>('infinite');

    const tabs = [
        { id: 'infinite', label: 'Infinite', icon: Infinity },
        { id: 'timer', label: 'Timer', icon: Clock },
        { id: 'intervals', label: 'Intervals', icon: TimerIcon },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Timer Settings
                </div>
            }
            className="max-w-lg"
        >
            <div className="flex flex-col h-full">
                {/* Tabs */}
                <div className="flex p-1 mb-6 bg-white/5 rounded-xl border border-white/10">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-white/10 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="min-h-[200px]">
                    {activeTab === 'infinite' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 mb-2">
                                <Infinity className="w-12 h-12" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold text-white">Infinite Play</h3>
                                <p className="text-gray-400 text-sm max-w-[200px] mx-auto">
                                    Music plays continuously until you decide to stop.
                                </p>
                            </div>
                            <Button
                                variant="accent"
                                className="w-full max-w-xs"
                                onClick={() => onSelect(null)}
                            >
                                Start Infinite Session
                            </Button>
                        </div>
                    )}

                    {activeTab === 'timer' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-medium text-white mb-2">Set Duration</h3>
                                <p className="text-gray-400 text-sm">Session will end automatically</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[15, 30, 45, 60, 90, 120].map((minutes) => (
                                    <Button
                                        key={minutes}
                                        variant="secondary"
                                        className="h-14 text-lg group hover:border-blue-500/50 hover:bg-blue-500/10"
                                        onClick={() => onSelect(minutes * 60)}
                                    >
                                        <span className="group-hover:text-blue-400 transition-colors">{minutes}</span>
                                        <span className="text-xs text-gray-500 ml-1 group-hover:text-blue-400/70">min</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'intervals' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-medium text-white mb-2">Focus Intervals</h3>
                                <p className="text-gray-400 text-sm">Structure your work with breaks</p>
                            </div>

                            <Button
                                variant="ghost"
                                className="w-full justify-between p-4 h-auto group hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30"
                                onClick={() => onSelect(25 * 60)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">Pomodoro</div>
                                        <div className="text-sm text-gray-400">25m focus + 5m break</div>
                                    </div>
                                </div>
                                <div className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-300">
                                    30m total
                                </div>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-between p-4 h-auto group hover:bg-green-500/10 border border-white/5 hover:border-green-500/30"
                                onClick={() => onSelect(50 * 60)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                                        <Coffee className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white text-lg group-hover:text-green-300 transition-colors">Deep Work</div>
                                        <div className="text-sm text-gray-400">50m focus + 10m break</div>
                                    </div>
                                </div>
                                <div className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-300">
                                    60m total
                                </div>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};
