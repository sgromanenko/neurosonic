import React, { useState } from 'react';
import { Search, TrendingUp, Clock, Heart } from 'lucide-react';

const Explore: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const featuredPlaylists = [
        { id: 1, title: 'Top Focus Picks', mode: 'focus', tracks: 12, gradient: 'from-blue-600 to-purple-600' },
        { id: 2, title: 'Peaceful Meditation', mode: 'meditate', tracks: 8, gradient: 'from-teal-500 to-cyan-600' },
        { id: 3, title: 'Deep Sleep Collection', mode: 'sleep', tracks: 15, gradient: 'from-indigo-800 to-blue-600' },
        { id: 4, title: 'Relaxation Mix', mode: 'relax', tracks: 10, gradient: 'from-green-500 to-teal-500' },
    ];

    const trendingTracks = [
        { id: 1, title: 'Neural Flow', activity: 'Deep Work', tags: ['Electronic', 'Ambient'], plays: '2.4k' },
        { id: 2, title: 'Forest Dawn', activity: 'Meditation', tags: ['Nature', 'Calm'], plays: '1.8k' },
        { id: 3, title: 'Night Waves', activity: 'Sleep', tags: ['Ocean', 'Atmospheric'], plays: '3.1k' },
    ];

    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Explore</h1>
                    <p className="text-gray-400">Discover new sounds for every moment</p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-10">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search activities, moods, or tracks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    />
                </div>

                {/* Featured Playlists */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Featured Playlists</h2>
                        <button className="text-sm text-gray-400 hover:text-white transition-colors">View All</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {featuredPlaylists.map((playlist) => (
                            <div
                                key={playlist.id}
                                className={`group relative overflow-hidden rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] bg-gradient-to-br ${playlist.gradient}`}
                            >
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-2">{playlist.title}</h3>
                                    <p className="text-sm text-white/80">{playlist.tracks} tracks</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trending Now */}
                <section className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp className="text-blue-400" size={24} />
                        <h2 className="text-2xl font-bold">Trending Now</h2>
                    </div>

                    <div className="space-y-3">
                        {trendingTracks.map((track) => (
                            <div
                                key={track.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{track.title}</h4>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span>{track.activity}</span>
                                            <span>•</span>
                                            <div className="flex gap-1">
                                                {track.tags.map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded bg-white/10 text-xs">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400">{track.plays} plays</span>
                                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-400" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Browse by Mood */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Browse by Mood</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {['Energetic', 'Calm', 'Creative', 'Sleepy', 'Happy', 'Focused', 'Peaceful', 'Motivated'].map((mood) => (
                            <button
                                key={mood}
                                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left font-medium"
                            >
                                {mood}
                            </button>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Explore;
