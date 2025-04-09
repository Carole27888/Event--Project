import React, { useState } from 'react';

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, type: 'Workshop', location: 'Nairobi', details: 'Tech Workshop', attendees: 10, gallery: [] },
    { id: 2, type: 'Conference', location: 'Mombasa', details: 'Business Conference', attendees: 50, gallery: [] }
  ]);
  const [newEvent, setNewEvent] = useState({
    type: '',
    location: '',
    details: '',
    attendees: 0,
    gallery: []
  });
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const newEventData = { ...newEvent, id: Date.now() };
    setEvents([...events, newEventData]);
    setNewEvent({
      type: '',
      location: '',
      details: '',
      attendees: 0,
      gallery: []
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: name === "attendees" && value < 0 ? 0 : value
    });
  };

  const handleRegisterAttendee = (eventId) => {
    if (!attendeeEmail) {
      alert("Please enter an attendee email.");
      return;
    }
    console.log(`Registering ${attendeeEmail} for event ID: ${eventId}`);
    setAttendeeEmail('');
  };

  const handleSendNotification = (eventId) => {
    if (!notificationMessage) {
      alert("Please enter a notification message.");
      return;
    }
    console.log(`Sending notification for event ID: ${eventId} with message: ${notificationMessage}`);
    setNotificationMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 px-4 py-24">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
        
        {/* Create Event Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <input
              type="text"
              name="type"
              value={newEvent.type}
              onChange={handleInputChange}
              placeholder="Event Type"
              required
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Event Location"
              required
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <textarea
              name="details"
              value={newEvent.details}
              onChange={handleInputChange}
              placeholder="Event Details"
              required
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              name="attendees"
              value={newEvent.attendees}
              onChange={handleInputChange}
              placeholder="Attendees"
              required
              className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
            >
              Create Event
            </button>
          </form>
        </div>

        {/* Events List */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Manage Events</h2>
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="p-4 bg-purple-50 dark:bg-gray-700 rounded-md shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.type}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Location: {event.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Details: {event.details}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Attendees: {event.attendees}</p>
              <div className="mt-4 space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    placeholder="Attendee Email"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => handleRegisterAttendee(event.id)}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                  >
                    Register
                  </button>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    placeholder="Notification Message"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    onClick={() => handleSendNotification(event.id)}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                  >
                    Notify
                  </button>
                </div>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
                >
                  Delete Event
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
