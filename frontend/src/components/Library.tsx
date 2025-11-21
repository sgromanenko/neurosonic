import React, { useState } from 'react';
import { THEME } from '../theme';
import { Play, Heart } from 'lucide-react';

type Tab = 'favorites' | 'history';
type Filter = 'all' | 'focus' | 'relax' | 'sleep' | 'meditate';

const Library: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('favorites');
    const [activeFilter, setActiveFilter] = useState<Filter>('all');

    // Mock data
    const tracks = [
        { id: 1, title: 'Major Cycles', activity: 'Deep Work', tags: ['Piano', 'Cinematic'], duration: '30m', mode: 'focus' },
        { id: 2, title: 'Unruly Action', activity: 'Creative Flow', tags: ['Electronic', 'Upbeat'], duration: '60m', mode: 'focus' },
        { id: 3, title: 'Night Rain', activity: 'Sleep', tags: ['Rain', 'Ambient'], duration: '∞', mode: 'sleep' },
        { id: 4, title: 'Forest Bathing', activity: 'Relax', tags: ['Nature', 'Birds'], duration: '15m', mode: 'relax' },
    ];

    const filteredTracks = tracks.filter(track => {
        if (activeFilter === 'all') return true;
        return track.mode === activeFilter;
    });

    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <h1 className="text-3xl font-bold mb-6">Library</h1>

            {/* Tabs */}
            <div className="flex space-x-6 mb-8 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('favorites')}
                    className={`pb-2 text-lg font-medium transition-colors ${activeTab === 'favorites' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    Favorites
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`pb-2 text-lg font-medium transition-colors ${activeTab === 'history' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
                        }`}
                >
                    History
                </button>
            </div>

            {/* Filters */}
            <div className="flex space-x-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'focus', 'relax', 'sleep', 'meditate'].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter as Filter)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all whitespace-nowrap ${activeFilter === filter
                                ? 'bg-white text-black'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Track List */}
            <div className="space-y-4">
                {filteredTracks.map((track) => (
                    <div key={track.id} className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Play className="w-5 h-5 text-white fill-current" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{track.title}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                    <span>{track.activity}</span>
                                    <span>•</span>
                                    <div className="flex space-x-1">
                                        {track.tags.map(tag => (
                                            <span key={tag} className="px-1.5 py-0.5 rounded bg-white/10 text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
