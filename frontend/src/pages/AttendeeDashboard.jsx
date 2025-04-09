import React, { useState, useEffect } from 'react';

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filters, setFilters] = useState({ location: '', date: '', type: '' });
  const [reminderMessage, setReminderMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterEvent = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      alert('You are already registered for this event.');
      return;
    }

    setRegisteredEvents([...registeredEvents, eventId]);
    alert('Successfully registered for the event!');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredEvents = events.filter((event) => {
    return (
      (!filters.location || event.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.date || event.date === filters.date) &&
      (!filters.type || event.type.toLowerCase().includes(filters.type.toLowerCase()))
    );
  });

  const handleSendReminder = (eventId) => {
    const event = events.find((event) => event.id === eventId);
    if (!event) return;

    setReminderMessage(`Reminder set for event: ${event.type}`);
    setTimeout(() => setReminderMessage(''), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
        <p className="text-lg font-medium text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 px-4 py-24">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Attendee Dashboard</h1>

        {/* Filters */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filter Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Filter by Location"
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Filter by Type"
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Events List */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Events</h2>
        <ul className="space-y-4">
          {filteredEvents.map((event) => (
            <li key={event.id} className="p-4 bg-purple-50 dark:bg-gray-700 rounded-md shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.type}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Location: {event.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Date: {event.date}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Details: {event.details}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleRegisterEvent(event.id)}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                >
                  Register
                </button>
                <button
                  onClick={() => handleSendReminder(event.id)}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                >
                  Set Reminder
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Reminder Message */}
        {reminderMessage && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md text-sm">
            {reminderMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeDashboard;
