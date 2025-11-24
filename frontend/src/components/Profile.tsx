import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Save, Clock, Play, History } from 'lucide-react';
import { Button } from './common/Button';

interface UserProfile {
    email: string;
    full_name: string;
    preferences: string;
}

interface Session {
    id: number;
    mode: string;
    duration_seconds: number;
    started_at: string;
}

export const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile>({
        email: '',
        full_name: '',
        preferences: ''
    });
    const [recentSessions, setRecentSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchUser();
        fetchRecentSessions();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            const response = await fetch('http://localhost:8000/api/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setProfile({
                    email: data.email,
                    full_name: data.full_name || '',
                    preferences: data.preferences || ''
                });
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentSessions = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:8000/api/users/me/history?limit=3&distinct_modes=true', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setRecentSessions(data);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await fetch('http://localhost:8000/api/users/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: profile.full_name,
                    email: profile.email
                })
            });
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleResumeSession = (mode: string) => {
        navigate(`/player/${mode.toLowerCase()}`);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
                    <p className="text-gray-400">Manage your account and view your activity</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Details */}
                    <section className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Personal Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.full_name}
                                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving}
                                    icon={Save}
                                    className="w-full"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* Recent Sessions (Jump Back In) */}
                    <section className="space-y-6">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm h-full">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <History className="w-5 h-5 text-purple-400" />
                                Jump Back In
                            </h2>

                            {recentSessions.length > 0 ? (
                                <div className="space-y-3">
                                    {recentSessions.map((session) => (
                                        <div
                                            key={session.id}
                                            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                                            onClick={() => handleResumeSession(session.mode)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Play className="w-4 h-4 text-white fill-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-white capitalize">{session.mode}</h3>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(session.started_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {Math.round(session.duration_seconds / 60)}m
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No recent sessions found.</p>
                                    <Button
                                        variant="ghost"
                                        className="mt-4 text-blue-400 hover:text-blue-300"
                                        onClick={() => navigate('/player/focus')}
                                    >
                                        Start a Focus Session
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Profile;
