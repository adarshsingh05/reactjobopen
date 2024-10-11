import React from 'react';
import { format } from 'date-fns';
import { ClockIcon } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

// Function to generate 24 one-hour slots with time ranges
const generateSlotsForDate = (date) => {
  const slots = [];
  for (let i = 0; i < 24; i++) { // 24 hours in a day
    const startTime = new Date(date);
    startTime.setHours(i, 0, 0, 0); // Set hours and minutes to 00
    const endTime = new Date(startTime);
    endTime.setHours(i + 1, 0, 0, 0); // Set end time hours and minutes to 00
    slots.push({
      startTime: format(startTime, 'HH:mm'), // e.g., 09:00
      endTime: format(endTime, 'HH:mm'),     // e.g., 10:00
    });
  }
  return slots;
};

// Slot card component to display read-only slots
const SlotCard = ({ timeRange, date }) => (
  <div className="border p-4 rounded-lg shadow-md flex justify-between items-center bg-white">
    <div>
      <p className="text-md font-medium text-black">{timeRange}</p>
      <p className="text-sm text-gray-600">{date}</p>
    </div>
  </div>
);

const ViewSchedule = ({ currentDate }) => {
  // Generate slots for the given date
  const slots = generateSlotsForDate(currentDate);

  return (
    <div className="p-6">
       
      {/* Date Bar */}
      <div className="flex justify-center mb-4">
        <span className="text-lg font-medium">
          {format(currentDate, 'EEEE, MMMM do yyyy')}
        </span>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <SlotCard
            key={index}
            timeRange={`${slot.startTime} to ${slot.endTime}`}
            date={format(currentDate, 'MM/dd/yyyy')}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewSchedule;
