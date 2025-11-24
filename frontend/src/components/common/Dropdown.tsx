import React, { useEffect, useRef } from 'react';

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}

export const Dropdown: React.FC<DropdownProps> = ({
    isOpen,
    onClose,
    children,
    className = '',
    position = 'bottom-left'
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const positionStyles = {
        'bottom-left': 'top-full left-0 mt-2',
        'bottom-right': 'top-full right-0 mt-2',
        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2',
    };

    return (
        <div
            ref={dropdownRef}
            className={`absolute ${positionStyles[position]} w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${className}`}
        >
            <div className="p-2 space-y-1">
                {children}
            </div>
        </div>
    );
};

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean;
    children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
    active,
    children,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`w-full text-left px-4 py-3 rounded-xl transition-all group flex items-center justify-between ${active
                    ? 'bg-white/20 text-white'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                } ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
