import React from 'react';
import { User, CreditCard, Settings as SettingsIcon, Gift, Users, Download, HelpCircle, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
    const menuSections = [
        {
            title: 'ACCOUNT',
            items: [
                { icon: User, label: 'Account Information', onClick: () => { } },
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
        }
    ];

    return (
        <div className="min-h-screen bg-background text-white p-6 pb-24">
            <div className="max-w-2xl mx-auto">

                {/* User Profile Header */}
                <div className="mb-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mx-auto mb-4 flex items-center justify-center">
                        <User className="w-12 h-12" />
                    </div>
                    <h1 className="text-2xl font-bold mb-1">Your Profile</h1>
                    <p className="text-gray-400">woulder1@gmail.com</p>
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
                <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors mt-8">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>

            </div>
        </div>
    );
};

export default Profile;
