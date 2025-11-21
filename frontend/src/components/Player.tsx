import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MODE_CONFIG, ModeType } from '../theme';
import { Play, Pause, SkipForward, Repeat, Volume2, ArrowLeft, Settings, Clock, ThumbsUp, ThumbsDown, Info, Menu } from 'lucide-react';
import ActivitySelector from './ActivitySelector';

const Player: React.FC = () => {
    const { mode } = useParams<{ mode: string }>();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(true); // Auto-play
    const [duration, setDuration] = useState(30);
    const [progress, setProgress] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
    const [currentActivity, setCurrentActivity] = useState('Deep Work');
    const [neuralIntensity, setNeuralIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');

    const currentMode = (mode as ModeType) || 'focus';
    const modeConfig = MODE_CONFIG[currentMode];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div
            className="min-h-screen flex flex-col text-white transition-all duration-1000 ease-in-out relative overflow-hidden"
            style={{ background: modeConfig.gradient }}
        >
            {/* Activity Selector Panel */}
            <ActivitySelector
                isOpen={showActivities}
                onClose={() => setShowActivities(false)}
                currentActivity={currentActivity}
                onSelect={setCurrentActivity}
            />

            {/* Top Bar */}
            <div className="flex justify-between items-center p-6 z-10">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => setShowActivities(true)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <Menu className="w-4 h-4" />
                        <span className="font-medium">{currentActivity}</span>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-full">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-70">Neural Effect:</span>
                        {(['Low', 'Medium', 'High'] as const).map(level => (
                            <button
                                key={level}
                                onClick={() => setNeuralIntensity(level)}
                                className={`text-xs px-2 py-0.5 rounded ${neuralIntensity === level ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center relative">
                {/* Visualizer */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className={`w-72 h-72 rounded-full bg-white blur-3xl transition-transform duration-[4000ms] ${isPlaying ? 'scale-150 animate-pulse' : 'scale-100'}`} />
                    <div className={`absolute w-48 h-48 rounded-full bg-white blur-2xl transition-transform duration-[3000ms] delay-75 ${isPlaying ? 'scale-125 animate-pulse' : 'scale-90'}`} />
                </div>

                <div className="z-10 text-center">
                    <div className="mb-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider">Science-based Audio</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg tracking-tight">{currentActivity}</h2>
                    <p className="text-xl opacity-80 font-light">Atmospheric • {neuralIntensity} Intensity</p>

                    <div className="mt-8 flex justify-center space-x-4">
                        <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <ThumbsDown className="w-6 h-6" />
                        </button>
                        <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <ThumbsUp className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Player Bar */}
            <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-6 pb-8">
                <div className="max-w-4xl mx-auto flex flex-col space-y-6">

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                        <div
                            className="h-full bg-white group-hover:bg-blue-400 transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex justify-between items-center">

                        {/* Left Controls (Timer) */}
                        <div className="flex items-center space-x-4 w-1/3">
                            <div className="flex items-center space-x-2 text-sm font-medium opacity-70 hover:opacity-100 cursor-pointer transition-opacity bg-white/5 px-3 py-1.5 rounded-lg">
                                <Clock className="w-4 h-4" />
                                <span>{duration} min</span>
                            </div>
                        </div>

                        {/* Center Controls (Play/Pause) */}
                        <div className="flex items-center justify-center space-x-8 w-1/3">
                            <button className="p-2 opacity-70 hover:opacity-100 transition-opacity hover:scale-110">
                                <Repeat className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                            >
                                {isPlaying ? (
                                    <Pause className="w-6 h-6 fill-current" />
                                ) : (
                                    <Play className="w-6 h-6 fill-current ml-1" />
                                )}
                            </button>

                            <button className="p-2 opacity-70 hover:opacity-100 transition-opacity hover:scale-110">
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Right Controls (Volume) */}
                        <div className="flex items-center justify-end space-x-4 w-1/3">
                            <Volume2 className="w-5 h-5 opacity-70" />
                            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                                <div className="w-3/4 h-full bg-white/70 group-hover:bg-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
