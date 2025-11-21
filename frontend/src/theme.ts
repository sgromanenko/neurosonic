export const THEME = {
    colors: {
        background: '#0D1117', // Dark background
        foreground: '#FFFFFF',
        primary: '#FFFFFF',
        secondary: '#8B949E',
        accent: '#58A6FF',
        surface: 'rgba(255, 255, 255, 0.05)',
        surfaceHover: 'rgba(255, 255, 255, 0.1)',
        border: 'rgba(255, 255, 255, 0.1)',
    },
    gradients: {
        focus: 'linear-gradient(135deg, #4A90E2 0%, #9013FE 100%)',
        relax: 'linear-gradient(135deg, #50E3C2 0%, #4A90E2 100%)',
        sleep: 'linear-gradient(135deg, #2C3E50 0%, #4CA1AF 100%)', // Deep blue/teal
        meditate: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)',
        playerOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
    },
    fonts: {
        heading: '"Nunito", "Varela Round", sans-serif',
        body: '"Nunito", "Varela Round", sans-serif',
    },
    layout: {
        maxWidth: '1200px',
        sidebarWidth: '280px',
        playerHeight: '90px',
    },
    animation: {
        transition: 'all 0.3s ease',
    }
};

export type ModeType = 'focus' | 'relax' | 'sleep' | 'meditate';

export const MODE_CONFIG: Record<ModeType, { label: string; gradient: string; icon: string }> = {
    focus: { label: 'Focus', gradient: THEME.gradients.focus, icon: 'brain' },
    relax: { label: 'Relax', gradient: THEME.gradients.relax, icon: 'coffee' },
    sleep: { label: 'Sleep', gradient: THEME.gradients.sleep, icon: 'moon' },
    meditate: { label: 'Meditate', gradient: THEME.gradients.meditate, icon: 'om' },
};

export const ACTIVITIES = {
    focus: [
        { id: 'deep_work', label: 'Deep Work', desc: 'Sustained concentration' },
        { id: 'coding', label: 'Coding', desc: 'Flow state for programming' },
        { id: 'reading', label: 'Reading', desc: 'Absorb information' },
        { id: 'writing', label: 'Writing', desc: 'Creative & technical writing' },
        { id: 'studying', label: 'Studying', desc: 'Retention & focus' }
    ],
    relax: [
        { id: 'unwind', label: 'Unwinding', desc: 'Decompress after work' },
        { id: 'break', label: 'Break Time', desc: 'Short recharge' },
        { id: 'evening', label: 'Evening Wind-Down', desc: 'Prepare for sleep' },
        { id: 'post_work', label: 'Post-Work', desc: 'Transition to personal time' }
    ],
    meditate: [
        { id: 'mindfulness', label: 'Mindfulness', desc: 'Present moment awareness' },
        { id: 'breathing', label: 'Breathing', desc: 'Breath-focused meditation' },
        { id: 'body_scan', label: 'Body Scan', desc: 'Physical awareness' },
        { id: 'visualization', label: 'Visualization', desc: 'Guided imagery' }
    ],
    sleep: [
        { id: 'falling_asleep', label: 'Falling Asleep', desc: 'Drift off easily' },
        { id: 'nap', label: 'Nap', desc: 'Power nap' },
        { id: 'insomnia', label: 'Insomnia Relief', desc: 'Calm racing thoughts' },
        { id: 'deep_rest', label: 'Deep Rest', desc: 'Restorative downtime' }
    ]
};
