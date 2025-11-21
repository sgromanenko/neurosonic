import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MODE_CONFIG, ModeType } from '../theme';
import { Play, Pause, SkipForward, SkipBack, Repeat, Volume2, ArrowLeft, Settings, Clock, ThumbsUp, ThumbsDown, Menu, Timer, Infinity as InfinityIcon } from 'lucide-react';
import ActivitySelector from './ActivitySelector';
import TimerSelector from './TimerSelector';
import { Visualizer } from './Visualizer';
import { SessionSummary } from './SessionSummary';
import { ACTIVITIES } from '../theme';

const Player: React.FC = () => {
    const { mode } = useParams<{ mode: string }>();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(true); // Auto-play
    const [duration, setDuration] = useState(30);
    const [progress, setProgress] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
    const [currentActivity, setCurrentActivity] = useState('Deep Work');
    const [neuralIntensity, setNeuralIntensity] = useState<'Low' | 'Medium' | 'High'>('Medium');
    const [showTimerSelector, setShowTimerSelector] = useState(false);
    const [timerMode, setTimerMode] = useState<'infinite' | 'countdown'>('infinite');
    const [remainingTime, setRemainingTime] = useState(0); // in seconds
    const [showSummary, setShowSummary] = useState(false);
    const [trackSeed, setTrackSeed] = useState(Date.now());
    const [seedHistory, setSeedHistory] = useState<number[]>([]);
    const [volume, setVolume] = useState(0.8);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    const currentMode = (mode as ModeType) || 'focus';
    const modeConfig = MODE_CONFIG[currentMode];

    useEffect(() => {
        // Update activity when mode changes
        const defaultActivity = ACTIVITIES[currentMode as keyof typeof ACTIVITIES]?.[0]?.label;
        if (defaultActivity) {
            setCurrentActivity(defaultActivity);
        }
        // Reset track seed to force new audio generation for new mode
        setTrackSeed(Date.now());
        setSeedHistory([]);
    }, [currentMode]);

    useEffect(() => {
        if (!audioRef.current) return;

        const audioUrl = `http://localhost:8000/api/audio/generate?mode=${currentMode}&duration=600&seed=${trackSeed}`;

        // Only update src if it changed (to avoid loops, though seed changes will force it)
        if (audioRef.current.src !== audioUrl) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            }
        }
    }, [currentMode, trackSeed]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play().catch(e => console.error("Playback failed:", e));
            else audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const saveSession = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await fetch('http://localhost:8000/api/users/me/history', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mode: currentMode,
                    duration_seconds: duration * 60
                })
            });
        } catch (error) {
            console.error('Failed to save session:', error);
        }
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        let timerInterval: ReturnType<typeof setInterval>;
        if (isPlaying && timerMode === 'countdown' && remainingTime > 0) {
            timerInterval = setInterval(() => {
                setRemainingTime(prev => {
                    if (prev <= 1) {
                        setIsPlaying(false);
                        setShowSummary(true);
                        saveSession();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerInterval);
    }, [isPlaying, timerMode, remainingTime]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleTimerSelect = (duration: number | 'infinite') => {
        if (duration === 'infinite') {
            setTimerMode('infinite');
            setDuration(0);
        } else {
            setTimerMode('countdown');
            setDuration(duration);
            setRemainingTime(duration * 60);
        }
    };

    const handleNext = () => {
        setSeedHistory(prev => [...prev, trackSeed]);
        setTrackSeed(Date.now());
        setIsPlaying(true);
        setProgress(0);
    };

    const handlePrevious = () => {
        if (seedHistory.length > 0) {
            const previousSeed = seedHistory[seedHistory.length - 1];
            setSeedHistory(prev => prev.slice(0, -1));
            setTrackSeed(previousSeed);
            setIsPlaying(true);
            setProgress(0);
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col text-white transition-all duration-1000 ease-in-out relative overflow-hidden"
            style={{ background: modeConfig.gradient }}
        >
            {/* Activity Selector Panel */}
            <ActivitySelector
                mode={currentMode}
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
                    <button
                        onClick={() => setShowTimerSelector(true)}
                        className={`p-2 rounded-full transition-colors ${timerMode === 'countdown' ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/10 text-white/70'}`}
                    >
                        {timerMode === 'countdown' ? (
                            <div className="flex items-center gap-1 text-xs font-bold">
                                <Clock className="w-4 h-4" />
                                <span>{formatTime(remainingTime)}</span>
                            </div>
                        ) : (
                            <Timer className="w-6 h-6" />
                        )}
                    </button>
                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Settings className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Timer Selector Modal */}
            <TimerSelector
                isOpen={showTimerSelector}
                onClose={() => setShowTimerSelector(false)}
                onSelect={handleTimerSelect}
                currentDuration={timerMode === 'infinite' ? 'infinite' : duration}
            />

            {/* Session Summary Overlay */}
            {showSummary && (
                <SessionSummary
                    duration={duration}
                    mode={currentMode}
                    onRestart={() => {
                        setShowSummary(false);
                        setIsPlaying(true);
                    }}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex items-center justify-center relative">
                {/* Visualizer */}
                <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
                    <div className="w-full h-full max-w-4xl max-h-96">
                        <Visualizer mode={currentMode} isPlaying={isPlaying} />
                    </div>
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

                        {/* Left Controls (Timer Status) */}
                        <div className="flex items-center space-x-4 w-1/3">
                            <button
                                onClick={() => setShowTimerSelector(true)}
                                className="flex items-center space-x-2 text-sm font-medium opacity-70 hover:opacity-100 cursor-pointer transition-opacity bg-white/5 px-3 py-1.5 rounded-lg"
                            >
                                {timerMode === 'infinite' ? (
                                    <>
                                        <InfinityIcon className="w-4 h-4" />
                                        <span>Infinite</span>
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-4 h-4" />
                                        <span>{formatTime(remainingTime)}</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Center Controls (Play/Pause) */}
                        <div className="flex items-center justify-center space-x-8 w-1/3">
                            <button
                                onClick={handlePrevious}
                                disabled={seedHistory.length === 0}
                                className={`p-2 transition-opacity hover:scale-110 ${seedHistory.length === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-70 hover:opacity-100'}`}
                            >
                                <SkipBack className="w-5 h-5" />
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

                            <button
                                onClick={handleNext}
                                className="p-2 opacity-70 hover:opacity-100 transition-opacity hover:scale-110"
                            >
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Right Controls (Volume) */}
                        <div className="flex items-center justify-end space-x-4 w-1/3">
                            <Volume2 className="w-5 h-5 opacity-70" />
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
                    </div>
                </div>
            </div>
            <audio ref={audioRef} loop onEnded={handleNext} />
        </div>
    );
};

export default Player;
