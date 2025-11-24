import React from 'react';
import { Check } from 'lucide-react';
import { ACTIVITIES } from '../theme';
import { Dropdown, DropdownItem } from './common/Dropdown';

interface ActivitySelectorProps {
    mode: string;
    currentActivity: string;
    onSelect: (activity: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({ mode, currentActivity, onSelect, isOpen, onClose }) => {
    return (
        <Dropdown isOpen={isOpen} onClose={onClose} position="bottom-left" className="mt-2 left-0">
            {ACTIVITIES[mode as keyof typeof ACTIVITIES]?.map((activity) => (
                <DropdownItem
                    key={activity.id}
                    active={currentActivity === activity.label}
                    onClick={() => {
                        onSelect(activity.label);
                        onClose();
                    }}
                >
                    <span className="font-medium">{activity.label}</span>
                    {currentActivity === activity.label && <Check className="w-4 h-4" />}
                </DropdownItem>
            ))}
        </Dropdown>
    );
};

export default ActivitySelector;
