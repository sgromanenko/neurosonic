import React from 'react';
import { Check } from 'lucide-react';
import { ACTIVITIES } from '../theme';

interface ActivitySelectorProps {
    mode: string;
    currentActivity: string;
    onSelect: (activity: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ mode, currentActivity, onSelect, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-0 left-0 bottom-0 w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 z-50 p-6 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-white">Select Activity</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white">Close</button>
            </div>

            <div className="space-y-2">
                {ACTIVITIES[mode as keyof typeof ACTIVITIES]?.map((activity) => (
                    <button
                        key={activity.id}
                        onClick={() => {
                            onSelect(activity.label);
                            onClose();
                        }}
                        className={`w-full text-left p-4 rounded-xl transition-all ${currentActivity === activity.label
                            ? 'bg-white/20 border border-white/20'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-white">{activity.label}</span>
                            {currentActivity === activity.label && <Check className="w-4 h-4 text-white" />}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{activity.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ActivitySelector;
