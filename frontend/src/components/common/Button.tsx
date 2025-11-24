import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'accent';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    shape?: 'rounded' | 'circle' | 'square';
    icon?: LucideIcon;
    children?: React.ReactNode;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    shape,
    icon: Icon,
    children,
    className = '',
    ...props
}) => {
    // Determine default shape based on variant if not specified
    const effectiveShape = shape || (variant === 'icon' ? 'circle' : 'rounded');

    const baseStyles = "transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-200 shadow-lg hover:shadow-xl active:scale-95",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-sm active:scale-95",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5 active:scale-95",
        icon: "text-white/70 hover:text-white hover:bg-white/10 active:scale-95",
        accent: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/30 active:scale-95",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2",
        lg: "px-6 py-3 text-lg",
        icon: "p-2",
    };

    const shapes = {
        rounded: "rounded-xl",
        circle: "rounded-full",
        square: "rounded-none",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${shapes[effectiveShape]} ${className}`}
            {...props}
        >
            {Icon && <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />}
            {children}
        </button>
    );
};
