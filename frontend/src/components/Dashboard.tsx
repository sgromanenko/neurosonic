```
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODE_CONFIG, ModeType } from '../theme';
import { Brain, Coffee, Moon, Wind, Play } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'recent' | 'favorites'>('recent');

  const handleModeSelect = (mode: ModeType) => {
    navigate(`/ player / ${ mode } `);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain': return <Brain className="w-12 h-12 mb-4 text-white" />;
      case 'coffee': return <Coffee className="w-12 h-12 mb-4 text-white" />;
      case 'moon': return <Moon className="w-12 h-12 mb-4 text-white" />;
      case 'om': return <Wind className="w-12 h-12 mb-4 text-white" />;
      default: return <Brain className="w-12 h-12 mb-4 text-white" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-24 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        
        {/* Hero Section - Jump Back In */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Good afternoon</h1>
          <button 
            onClick={() => handleModeSelect('focus')}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Jump Back In
            <div className="absolute inset-0 rounded-full bg-white/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Mode Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {(Object.keys(MODE_CONFIG) as ModeType[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeSelect(mode)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{ background: MODE_CONFIG[mode].gradient }}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="z-10 flex flex-col items-center">
                {getIcon(MODE_CONFIG[mode].icon)}
                <span className="text-xl md:text-2xl font-bold text-white tracking-wide">{MODE_CONFIG[mode].label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Recent / Favorites Tabs */}
        <div className="w-full">
          <div className="flex space-x-6 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('recent')}
              className={`pb - 2 text - lg font - medium transition - colors ${
    activeTab === 'recent' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
} `}
            >
              Recent
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb - 2 text - lg font - medium transition - colors ${
    activeTab === 'favorites' ? 'text-white border-b-2 border-white' : 'text-gray-500 hover:text-gray-300'
} `}
            >
              Favorites
            </button>
          </div>

          <div className="space-y-3">
            {/* Mock Data Items */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Deep Focus Session {i}</h4>
                    <p className="text-sm text-gray-400">Focus • 30 min</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
```
