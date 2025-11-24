import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Slider: React.FC<SliderProps> = ({ className = '', ...props }) => {
    return (
        <input
            type="range"
            className={`w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-transform ${className}`}
            {...props}
        />
    );
};
