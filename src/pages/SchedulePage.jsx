import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { Button } from "@/components/ui/button"; // Assuming you're using Shadcn Button
import { useUser } from '@clerk/clerk-react';

// Function to generate 24 one-hour slots with time ranges
const generateSlotsForDate = (date) => {
  const slots = [];
  for (let i = 0; i < 24; i++) { // 24 hours in a day
    const startTime = new Date(date);
    startTime.setHours(i,0,0);
    const endTime = new Date(startTime);
    endTime.setHours(i + 1);
    slots.push({
      startTime: format(startTime, 'HH:mm'),
      endTime: format(endTime, 'HH:mm'),
    });
  }
  return slots;
};

// SlotCard component, now with delete/undo functionality
const SlotCard = ({ timeRange, date, deleted, onDelete, onUndo }) => (
  <div className={`border p-4 rounded-lg shadow-md flex justify-between items-center ${deleted ? 'bg-red-300' : 'bg-white'}`}>
    <div>
      <p className={`text-md font-medium ${deleted ? 'line-through text-gray-500' : 'text-black'}`}>{timeRange}</p>
      <p className={`text-sm ${deleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>{date}</p>
    </div>
    <Button 
      variant="outline" 
      onClick={deleted ? onUndo : onDelete} 
      className={`${deleted ? 'bg-blue-500 text-white' : ''}`}>
      {deleted ? 'Undo' : 'Delete'}
    </Button>
  </div>
);

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useUser();
  
  // State to track which slots have been deleted
  const [deletedSlots, setDeletedSlots] = useState([]);

  // Handle date navigation
  const handleNextDate = () => {
    const newDate = addDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const handlePrevDate = () => {
    const newDate = subDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  // Move to current date
  const handleCurrentDate = () => {
    const today = new Date();
    setCurrentDate(today);
  };

  // Generate slots for the current date
  const slots = generateSlotsForDate(currentDate);

  // Handle slot deletion
  const handleDeleteSlot = (index) => {
    setDeletedSlots((prev) => [...prev, index]);
  };

  // Handle undo deletion
  const handleUndoDeleteSlot = (index) => {
    setDeletedSlots((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div className="p-6">
      {/* Candidate Name */}
      <h1 className="text-3xl font-semibold text-center mb-6">
        {user?.firstName}'s Schedule
      </h1>

      {/* Date Bar with Arrows */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Button variant="outline" onClick={handlePrevDate}>←</Button>
          <Button variant="ghost" className="ml-2" onClick={handleCurrentDate}>Current Date</Button>
        </div>
        <span className="text-lg font-medium">{format(currentDate, 'EEEE, MMMM do yyyy')}</span>
        <Button variant="outline" onClick={handleNextDate}>→</Button>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot, index) => (
          <SlotCard
            key={index}
            timeRange={`${slot.startTime} to ${slot.endTime}`}
            date={format(currentDate, 'MM/dd/yyyy')}
            deleted={deletedSlots.includes(index)} // Check if this slot is deleted
            onDelete={() => handleDeleteSlot(index)} // Delete slot on button click
            onUndo={() => handleUndoDeleteSlot(index)} // Undo deletion on button click
          />
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
