import React, { useState } from 'react';

type TimeSlotSelectorProps = {
  onClose: () => void;
  onSelectTimeSlots: (timeSlots: string[]) => void;
  initialSelectedSlots?: string[];
};

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({ onClose, onSelectTimeSlots, initialSelectedSlots = [] }) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>(initialSelectedSlots);

  const timeSlots = [
    { display: '12:00 AM - 01:00 AM', value: '00:00-01:00' },
    { display: '01:00 AM - 02:00 AM', value: '01:00-02:00' },
    { display: '02:00 AM - 03:00 AM', value: '02:00-03:00' },
    { display: '03:00 AM - 04:00 AM', value: '03:00-04:00' },
    { display: '04:00 AM - 05:00 AM', value: '04:00-05:00' },
    { display: '05:00 AM - 06:00 AM', value: '05:00-06:00' },
    { display: '06:00 AM - 07:00 AM', value: '06:00-07:00' },
    { display: '07:00 AM - 08:00 AM', value: '07:00-08:00' },
    { display: '08:00 AM - 09:00 AM', value: '08:00-09:00' },
    { display: '09:00 AM - 10:00 AM', value: '09:00-10:00' },
    { display: '10:00 AM - 11:00 AM', value: '10:00-11:00' },
    { display: '11:00 AM - 12:00 PM', value: '11:00-12:00' },
    { display: '12:00 PM - 01:00 PM', value: '12:00-13:00' },
    { display: '01:00 PM - 02:00 PM', value: '13:00-14:00' },
    { display: '02:00 PM - 03:00 PM', value: '14:00-15:00' },
    { display: '03:00 PM - 04:00 PM', value: '15:00-16:00' },
    { display: '04:00 PM - 05:00 PM', value: '16:00-17:00' },
    { display: '05:00 PM - 06:00 PM', value: '17:00-18:00' },
    { display: '06:00 PM - 07:00 PM', value: '18:00-19:00' },
    { display: '07:00 PM - 08:00 PM', value: '19:00-20:00' },
    { display: '08:00 PM - 09:00 PM', value: '20:00-21:00' },
    { display: '09:00 PM - 10:00 PM', value: '21:00-22:00' },
    { display: '10:00 PM - 11:00 PM', value: '22:00-23:00' },
    { display: '11:00 PM - 12:00 AM', value: '23:00-00:00' },
  ];

  const toggleTimeSlot = (slot: string, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default form submission
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot) 
        : [...prev, slot]
    );
  };

  const handleSave = () => {
    onSelectTimeSlots(selectedSlots);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full max-h-[50%] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Select Available Time Slots</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {timeSlots.map(slot => (
            <button
              key={slot.value}
              onClick={(e) => toggleTimeSlot(slot.value, e)}
              className={`p-2 rounded ${
                selectedSlots.includes(slot.value) ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
              }`}
              type="button" // Explicitly set button type to prevent form submission
            >
              {slot.display}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
