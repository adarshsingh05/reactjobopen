import { addUserEvents } from '@/api/eventsapi';
import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';

const EventModal = ({ isVisible, onClose}) => {
  const {user} =  useUser();
  const id= user.id;
    
  const [EventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [user_id, setuser_id] = useState(id);

//   db interaction
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleAdd = async (e) => {
        e.preventDefault();
    
        const eventData = {
            EventName,
            description,
            user_id,
            date
           
            
        };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Ensure this is correct
        const response = await addUserEvents(token, eventData);
     

        if (response) {
            setSuccess("Event added successfully!");
            setEventName('');
            setuser_id(id);
            setDate('');
            setDescription('');
            setError(null); // Clear any previous error message
            console.log("Submitting feedback with data:", eventData);
        } else {
            setError("error submiting feedbackk."); // This will show only if response is null
        }
    };
    

  // Automatically set today's date when the modal is opened
  useEffect(() => {
    if (isVisible) {
      const today = new Date().toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
      setDate(today);
    }
  }, [isVisible]);



  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className=' p-6 rounded-lg shadow-lg w-[90%] max-w-md'>
        <h2 className='text-xl font-bold mb-4 text-center'>Add New Event</h2>
     
        
        {/* Event Name */}
        <label className='block mb-2'>
          Event Name:
          <input
            type="text"
            className='w-full p-2 border rounded-md text-black'
            value={EventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label className='block mb-2'>
          User Id:
          <input
            type="text"
            className='w-full p-2 border rounded-md text-black'
            value={user_id}
            required
            onChange={(e) => setuser_id(e.target.value)}
            readOnly
          />
        </label>
        
        {/* Description */}
        <label className='block mb-2'>
          Description:
          <textarea
            className='w-full p-2 border rounded-md text-black'
            
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        
        {/* Date */}
        <label className='block mb-4'>
          Date:
          <input
            type="date"
            className='w-full p-2 border rounded-md text-black'  
            value={date}
            
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        
        <div className='flex justify-end'>
          <button className='bg-red-500 text-white px-4 py-2 rounded-md mr-2' onClick={onClose}>
            Cancel
          </button>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleAdd}>
            Add Event
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
      </div>
   
    </div>
  );
};

export default EventModal;
