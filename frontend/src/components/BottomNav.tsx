import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Library, Compass, User } from 'lucide-react';

const BottomNav: React.FC = () => {
    const location = useLocation();

    // Hide bottom nav on player screen
    if (location.pathname.startsWith('/player')) {
        return null;
    }

    const navItems = [
        { path: '/library', icon: Library, label: 'Library' },
        { path: '/explore', icon: Compass, label: 'Explore' },
        { path: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 px-6 py-4 z-50 md:hidden">
            <div className="flex justify-around items-center">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center space-y-1 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            }`
                        }
                    >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default BottomNav;
