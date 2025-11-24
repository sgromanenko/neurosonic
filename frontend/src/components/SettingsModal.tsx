import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { Settings, User, LogOut } from 'lucide-react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={
                <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Settings
                </div>
            }
        >
            <div className="space-y-6 mb-6">
                {/* Account Section */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Account</h3>
                                <p className="text-sm text-gray-400">Manage your subscription</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pl-12">
                        <div className="text-sm text-gray-300">
                            <span className="text-gray-500 mr-2">Plan:</span>
                            Pro (Annual)
                        </div>
                        <div className="text-sm text-gray-300">
                            <span className="text-gray-500 mr-2">Email:</span>
                            demo@example.com
                        </div>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-0"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
