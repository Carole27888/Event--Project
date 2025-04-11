import { useState } from "react"
import { Plus, Trash, Users, Bell, MapPin, Info, X, Check, ChevronDown, ChevronUp } from "lucide-react"

const AdminDashboard = () => {
  const [events, setEvents] = useState([
    { id: 1, type: "Workshop", location: "Nairobi", details: "Tech Workshop", attendees: 10, gallery: [] },
    { id: 2, type: "Conference", location: "Mombasa", details: "Business Conference", attendees: 50, gallery: [] },
    { id: 3, type: "Seminar", location: "Kisumu", details: "Educational Seminar", attendees: 25, gallery: [] },
  ])

  const [newEvent, setNewEvent] = useState({
    type: "",
    location: "",
    details: "",
    attendees: 0,
    gallery: [],
  })

  const [expandedEvent, setExpandedEvent] = useState(null)
  const [attendeeEmail, setAttendeeEmail] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)

  //  form 
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent({
      ...newEvent,
      [name]: name === "attendees" ? Math.max(0, Number.parseInt(value) || 0) : value,
    })
  }


  // Create a new event with authentication
  // const handleCreateEvent = async (e) => {
  //   e.preventDefault();

  //   if (!isAuthenticated) {
  //     showNotification("Please log in to create events", "error");
  //     setIsLoginFormVisible(true);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${API_URL}/events`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: newEvent.name,
  //         description: newEvent.description,
  //         date: newEvent.date,
  //         location: newEvent.location,
  //       }),
  //       credentials: "include", // Important for cookies/session
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       fetchEvents(); // Refresh events list
  //       setNewEvent({ name: "", location: "", description: "", date: "" });
  //       setIsCreatingEvent(false);
  //       showNotification("Event created successfully", "success");
  //     } else {
  //       const errorData = await response.json();
  //       showNotification(
  //         errorData.message || "Failed to create event",
  //         "error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //     showNotification("Error connecting to server", "error");
  //   }
  // };
  // const response = await fetch(`${API_URL}/events`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     name: newEvent.name,
  //     description: newEvent.description,
  //     date: newEvent.date,
  //     location: newEvent.location,
  //   }),
  //   credentials: "include", // Ensure cookies are sent with the request
  // });

  const handleCreateEvent = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newEvent.name,
          description: newEvent.description,
          date: newEvent.date,
          location: newEvent.location,
        }),
        credentials: "include", // Ensure cookies are sent with the request
      });
  
      // Check if the response is okay (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        fetchEvents(); // Refresh events list
        setNewEvent({ name: "", location: "", description: "", date: "" });
        setIsCreatingEvent(false);
        showNotification("Event created successfully", "success");
      } else {
        // Handle error response from the server
        const errorData = await response.json();
        showNotification(errorData.message || "Failed to create event", "error");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      showNotification("Error connecting to server", "error");
    }
  };
  
  

  // Update an event with authentication
  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      showNotification("Please log in to update events", "error");
      setIsLoginFormVisible(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/events/${newEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newEvent.name,
          description: newEvent.description,
          date: newEvent.date,
          location: newEvent.location,
        }),
        credentials: "include", // Important for cookies/session
      });

      if (response.ok) {
        fetchEvents(); // Refresh events list
        setNewEvent({ name: "", location: "", description: "", date: "" });
        setIsEditingEvent(false);
        showNotification("Event updated successfully", "success");
      } else {
        const errorData = await response.json();
        showNotification(
          errorData.message || "Failed to update event",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
      showNotification("Error connecting to server", "error");
    }
  };

  // Delete an event with authentication
  const handleDeleteEvent = async (eventId) => {
    if (!isAuthenticated) {
      showNotification("Please log in to delete events", "error");
      setIsLoginFormVisible(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        credentials: "include", // Important for cookies/session
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
        showNotification("Event deleted successfully", "success");
      } else {
        const errorData = await response.json();
        showNotification(
          errorData.message || "Failed to delete event",
          "error"
        );
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      showNotification("Error connecting to server", "error");
    }
  };

  // Edit event
  const handleEditEvent = (event) => {
    if (!isAuthenticated) {
      showNotification("Please log in to edit events", "error");
      setIsLoginFormVisible(true);
      return;
    }

    setNewEvent({
      id: event.id,
      name: event.type,
      description: event.details,
      date: event.date || "",
      location: event.location,
    });
    setIsEditingEvent(true);
  };

  // Register an attendee
  const handleRegisterAttendee = (eventId) => {
    if (!attendeeEmail) {
      showNotification("Please enter an attendee email", "error")
      return
    }

    // Update attendee count
    setEvents(events.map((event) => (event.id === eventId ? { ...event, attendees: event.attendees + 1 } : event)))

    showNotification(`Registered ${attendeeEmail} successfully`, "success")
    setAttendeeEmail("")
  }

  // Send notification
  const handleSendNotification = (eventId) => {
    if (!notificationMessage) {
      showNotification("Please enter a notification message", "error")
      return
    }

    showNotification("Notification sent to attendees", "success")
    setNotificationMessage("")
  }

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 3000)
  }

  // Toggle event expansion
  const toggleEventExpansion = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {notification.type === "success" ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your events and attendees</p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <Users className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Attendees</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {events.reduce((sum, event) => sum + event.attendees, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Locations</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {new Set(events.map((event) => event.location)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Create Event Button */}
        {!isCreatingEvent && (
          <button
            onClick={() => setIsCreatingEvent(true)}
            className="mb-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Event
          </button>
        )}

        {/* Create Event Form */}
        {isCreatingEvent && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Event</h2>
              <button
                onClick={() => setIsCreatingEvent(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Event Type
                  </label>
                  <input
                    id="type"
                    type="text"
                    name="type"
                    value={newEvent.type}
                    onChange={handleInputChange}
                    placeholder="e.g., Workshop, Conference"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={newEvent.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Nairobi, Mombasa"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Event Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={newEvent.details}
                  onChange={handleInputChange}
                  placeholder="Describe the event..."
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Initial Attendees
                </label>
                <input
                  id="attendees"
                  type="number"
                  name="attendees"
                  value={newEvent.attendees}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="Enter the number of attendees"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingEvent(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Events</h2>
          </div>

          {events.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No events found. Create your first event to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {events.map((event) => (
                <li key={event.id} className="p-6">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleEventExpansion(event.id)}
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.type}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                        <span className="mx-2">•</span>
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    <div>
                      {expandedEvent === event.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedEvent === event.id && (
                    <div className="mt-4 space-y-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                          <p className="text-sm text-gray-600 dark:text-gray-300">{event.details}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Register Attendee
                          </label>
                          <div className="flex">
                            <input
                              type="email"
                              value={attendeeEmail}
                              onChange={(e) => setAttendeeEmail(e.target.value)}
                              placeholder="Email address"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            <button
                              onClick={() => handleRegisterAttendee(event.id)}
                              className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700"
                            >
                              Register
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Send Notification
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={notificationMessage}
                              onChange={(e) => setNotificationMessage(e.target.value)}
                              placeholder="Notification message"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                            <button
                              onClick={() => handleSendNotification(event.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                            >
                              <Bell className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Event
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
