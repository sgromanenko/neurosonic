import React, { useEffect } from 'react';
import { User, CreditCard, Settings as SettingsIcon, Gift, Users, Download, HelpCircle, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [user, setUser] = React.useState({
        name: 'Neurosonic User',
        email: 'user@example.com',
        preferences: {
            notifications: true,
            downloadQuality: 'High'
        }
    });
    const [loading, setLoading] = React.useState(true);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoggedIn(false);
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:8000/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser({
                    name: data.full_name || 'Neurosonic User',
                    email: data.email,
                    preferences: data.preferences ? JSON.parse(data.preferences) : { notifications: true, downloadQuality: 'High' }
                });
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        setLoading(true);
        try {
            const email = "test@example.com";
            const password = "password";

            // Try to register first (ignore error if exists)
            await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            // Login
            const formData = new URLSearchParams();
            formData.append('username', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:8000/api/auth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                await fetchUser();
            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:8000/api/users/me', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: user.name,
                    email: user.email,
                    preferences: JSON.stringify(user.preferences)
                })
            });

            if (response.ok) {
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const menuSections = [
        {
            title: 'ACCOUNT',
            items: [
                { icon: User, label: 'Account Information', onClick: () => setIsEditing(!isEditing) },
                { icon: CreditCard, label: 'Subscription', badge: 'Premium', onClick: () => { } },
                { icon: SettingsIcon, label: 'Settings', onClick: () => { } },
            ]
        },
        {
            title: 'SHARE',
            items: [
                { icon: Users, label: 'Refer a Friend', onClick: () => { } },
                { icon: Gift, label: 'Gift Neurosonic', onClick: () => { } },
            ]
        },
        {
            title: 'OTHER',
            items: [
                { icon: Download, label: 'Neurosonic for Desktop', onClick: () => { } },
                { icon: HelpCircle, label: 'Contact Support', onClick: () => { } },
            ]
        },
    ];

    if (loading) return <div className="min-h-screen bg-background text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <div className="max-w-2xl mx-auto">

                {/* User Profile Header */}
                <div className="mb-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                        <User className="w-12 h-12" />
                    </div>

                    {!isLoggedIn ? (
                        <div className="space-y-4">
                            <h1 className="text-2xl font-bold mb-1">Guest User</h1>
                            <p className="text-gray-400 mb-4">Log in to sync your progress</p>
                            <button
                                onClick={handleDemoLogin}
                                className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Login as Demo User
                            </button>
                        </div>
                    ) : isEditing ? (
                        <div className="space-y-4 max-w-xs mx-auto animate-in fade-in slide-in-from-top-4">
                            <input
                                value={user.name}
                                onChange={e => setUser({ ...user, name: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center font-bold"
                                placeholder="Full Name"
                            />
                            <input
                                value={user.email}
                                onChange={e => setUser({ ...user, email: e.target.value })}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center text-sm"
                                placeholder="Email"
                            />
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                            <p className="text-gray-400">{user.email}</p>
                        </>
                    )}
                </div>

                {/* Menu Sections */}
                {menuSections.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="mb-8">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 px-4">
                            {section.title}
                        </h2>
                        <div className="space-y-1">
                            {section.items.map((item, itemIdx) => (
                                <button
                                    key={itemIdx}
                                    onClick={item.onClick}
                                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                        <span className="font-medium">{item.label}</span>
                                    </div>
                                    {item.badge ? (
                                        <span className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold">
                                            {item.badge}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 group-hover:text-gray-300 transition-colors">›</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Logout Button */}
                {isLoggedIn && (
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            setIsLoggedIn(false);
                            setUser({
                                name: 'Neurosonic User',
                                email: 'user@example.com',
                                preferences: { notifications: true, downloadQuality: 'High' }
                            });
                        }}
                        className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Log Out</span>
                    </button>
                )}

            </div>
        </div>
    );
};

export default Profile;
