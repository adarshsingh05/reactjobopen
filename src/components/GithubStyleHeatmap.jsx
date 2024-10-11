// GithubStyleHeatmap.js
import React, { useEffect, useState } from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import { format } from 'date-fns';
import { getUserLoginData, storeUserLogin } from '@/api/apiLogin';
import { useUser } from '@clerk/clerk-react'; // Assuming you're using Clerk for authentication

const GithubStyleHeatmap = () => {
  const { user, session } = useUser(); // Clerk authentication
  const [loginData, setLoginData] = useState([]);
  const [hasMarkedToday, setHasMarkedToday] = useState(false);
  const [loading, setLoading] = useState(false); // Button loading state
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Replace with actual token

  const today = new Date().toISOString().split('T')[0]; // Today's date in 'YYYY-MM-DD' format

  // Fetch login data on component mount
  useEffect(() => {
    async function fetchLoginData() {
      if (!user?.id) return;
      console.log('Fetching login data...');

      if (user && session) {
        try {
          const data = await getUserLoginData(token, user.id); // Fetch login data
          console.log('Fetched login data:', data);
          if (data) {
            setLoginData(data);
            const alreadyMarked = data.some(entry => entry.date === today); // Check if already marked today
            setHasMarkedToday(alreadyMarked);
          } else {
            console.warn('No login data returned');
          }
        } catch (error) {
          console.error('Error fetching login data:', error.message);
        }
      } else {
        console.warn('User or session not found');
      }
    }
    fetchLoginData();
  }, [user, session]);

  // Handle "Mark Your Presence" button click
  const handleMarkPresence = async () => {
    setLoading(true);
    console.log('Marking presence...');

    if (user && session && !hasMarkedToday) {
      try {
        const response = await storeUserLogin(token, user.id); // Store login data for today
        console.log('Successfully marked presence:', response);
        setHasMarkedToday(true); // Mark presence for today
        setLoginData(prevData => [...prevData, { date: today, count: 1 }]); // Update loginData state
      } catch (error) {
        console.error('Error marking presence:', error.message);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn('User has already marked presence today or user/session not found');
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      {/* Button to mark presence */}
      <div className="mb-4">
        <button
          className={`px-4 py-2 rounded-md text-white ${hasMarkedToday ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={handleMarkPresence}
          disabled={hasMarkedToday || loading} // Disable if already marked today or loading
        >
          {loading ? 'Marking...' : hasMarkedToday ? 'Already Marked Today' : 'Mark Your Presence'}
        </button>
      </div>

      <div className="rounded-md bg-[#020817] w-full mb-8 lg:mb-0">
        <CalendarHeatmap
          startDate={new Date('2024-01-01')}
          endDate={new Date('2024-12-31')}
          values={loginData} // Use fetched login data
          classForValue={(value) => {
            if (!value) {
              return 'fill-gray-200'; // No logins (white)
            }
            if (value.count >= 1) {
              return 'fill-green-600'; // Green for logged-in days
            }
            return 'fill-green-900'; // Default case
          }}
          showWeekdayLabels={false}
          showMonthLabels={true}
          gutterSize={1}
          tooltipDataAttrs={(value) => {
            return {
              'data-tip': value.date
                ? `${format(new Date(value.date), 'yyyy-MM-dd')}: ${value.count} logins`
                : 'No logins',
            };
          }}
        />
        <style global jsx>{`
          .react-calendar-heatmap .react-calendar-heatmap-month-label {
            margin-bottom: 16px;
            font-size: 8px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default GithubStyleHeatmap;
