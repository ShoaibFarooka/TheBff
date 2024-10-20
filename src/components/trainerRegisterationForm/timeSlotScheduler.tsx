import React, { useState } from 'react';
import { X } from 'lucide-react';

interface TimeSlotSelectorProps {
    onSelectTimeSlot: (timeSlot: string) => void;
    onClose: () => void; // New prop to handle closing the modal
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ onSelectTimeSlot, onClose }) => {
    const [selectedTime, setSelectedTime] = useState('7:00 am');

    const timeSlots = [
        "12:00 AM - 1:00 AM", "1:00 AM - 2:00 AM", "2:00 AM - 3:00 AM",
        "3:00 AM - 4:00 AM", "4:00 AM - 5:00 AM", "5:00 AM - 6:00 AM",
        "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM",
        "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM", "7:00 PM - 8:00 PM", "8:00 PM - 9:00 PM",
        "9:00 PM - 10:00 PM", "10:00 PM - 11:00 PM", "11:00 PM - 12:00 AM"
    ];

    return (
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 rounded-3xl text-white max-w-sm mx-auto shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">When would you like to schedule?</h2>
                <button className="text-gray-400 hover:text-white transition-colors" onClick={onClose}>
                    <X size={24} />
                </button>
            </div>

            <div className="space-y-4">
                <div className="bg-indigo-800/30 rounded-xl p-4 h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-indigo-800">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            className={`w-full text-left py-2 px-4 rounded-lg mb-2 transition-colors ${
                                selectedTime === time
                                    ? 'bg-indigo-500 text-white'
                                    : 'hover:bg-indigo-700/50 text-gray-300'
                            }`}
                            onClick={() => {
                                setSelectedTime(time);
                                onSelectTimeSlot(time); // Call the prop function to set the selected time
                            }}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimeSlotSelector;
