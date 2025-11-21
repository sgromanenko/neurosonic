import React from 'react';
import { Trophy, Calendar, Zap, Share2, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SessionSummaryProps {
    duration: number; // minutes
    mode: string;
    onRestart: () => void;
}

export function SessionSummary({ duration, mode, onRestart }: SessionSummaryProps) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-md p-8 space-y-8 text-center">
                <div className="space-y-2">
                    <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-400 mb-4">
                        <Trophy size={48} />
                    </div>
                    <h2 className="text-4xl font-bold text-white">Session Complete!</h2>
                    <p className="text-xl text-gray-400">Great job staying in the zone.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                            <Calendar size={16} />
                            <span className="text-sm uppercase tracking-wider">Time</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{duration}m</div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
                            <Zap size={16} />
                            <span className="text-sm uppercase tracking-wider">Focus Score</span>
                        </div>
                        <div className="text-3xl font-bold text-white">92%</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onRestart}
                        className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={20} />
                        Start Another Session
                    </button>
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <Home size={18} />
                            Home
                        </button>
                        <button className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                            <Share2 size={18} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
