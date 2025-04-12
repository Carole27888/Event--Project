/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  Trash,
  Users,
  Bell,
  MapPin,
  Info,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Calendar,
  Search,
  User,
  LogOut,
  Mail,
} from "lucide-react"

const AdminDashboard = () => {
  const [events, setEvents] = useState([])
  const [attendees, setAttendees] = useState({})
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [attendeeEmail, setAttendeeEmail] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [isCreatingEvent, setIsCreatingEvent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "Admin User",
    email: "admin@example.com",
  })
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  // ma new events
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  })

  // Handle input change for new event form
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // API URL
  const API_URL = "http://127.0.0.1:5000"

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      type: "Workshop",
      location: "Nairobi",
      date: "June 15, 2025",
      details: "Tech Workshop for beginners",
      attendees: 10,
    },
    {
      id: 2,
      type: "Conference",
      location: "Mombasa",
      date: "July 3, 2025",
      details: "Business Conference with industry leaders",
      attendees: 50,
    },
    {
      id: 3,
      type: "Seminar",
      location: "Kisumu",
      date: "August 22, 2025",
      details: "Educational Seminar for professionals",
      attendees: 25,
    },
  ]

  
  const sampleAttendees = {
    1: [
      { id: 101, name: "John Doe", email: "john@example.com" },
      { id: 102, name: "Jane Smith", email: "jane@example.com" },
    ],
    2: [
      { id: 201, name: "Alice Johnson", email: "alice@example.com" },
      { id: 202, name: "Bob Brown", email: "bob@example.com" },
      { id: 203, name: "Charlie Davis", email: "charlie@example.com" },
    ],
    3: [
      { id: 301, name: "David Wilson", email: "david@example.com" },
      { id: 302, name: "Eva Martinez", email: "eva@example.com" },
    ],
  }

  // Check if user is authenticated
  const checkAuth = () => {
    const userRole = localStorage.getItem("userRole")
    console.log("Checking auth, user role:", userRole)

    if (!userRole) {
      console.warn("No user role found, redirecting to login")
      navigate("/login")
      return false
    }

    if (userRole !== "admin") {
      console.warn("User is not an admin, redirecting to login")
      navigate("/login")
      return false
    }

    return true
  }

  // Fetch user data
  const fetchUserData = async () => {
    try {
      // Try to get user data from API
      const response = await fetch(`${API_URL}/me`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setUserData({
          name: data.name,
          email: data.email || "admin@example.com",
        })
        localStorage.setItem("userName", data.name)
        localStorage.setItem("userId", data.id)
      } else if (response.status === 401) {
        console.warn("Unauthorized. Using local storage data.")
      } else {
        console.log("Using localStorage data for user")
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
      console.log("Using localStorage data for user due to error")
    }
  }

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/events`, {
        credentials: "include",
      })

      if (!response.ok) {
        console.log("Using sample events as API returned error")
        setEvents(sampleEvents)
        setAttendees(sampleAttendees)
      } else {
        const data = await response.json()
        if (data.events && data.events.length > 0) {
          setEvents(data.events)
          // Fetch attendees for each event
          data.events.forEach((event) => {
            fetchEventAttendees(event.id)
          })
        } else {
          console.log("No events returned from API, using sample data")
          setEvents(sampleEvents)
          setAttendees(sampleAttendees)
        }
      }
    } catch (err) {
      console.error("Error fetching events:", err)
      console.log("Using sample events due to error")
      setEvents(sampleEvents)
      setAttendees(sampleAttendees)
    } finally {
      setLoading(false)
    }
  }

  // Fetch attendees for a specific event
  const fetchEventAttendees = async (eventId) => {
    try {
      const response = await fetch(`${API_URL}/events/${eventId}/attendees`, {
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json()
        setAttendees((prev) => ({
          ...prev,
          [eventId]: data,
        }))
      }
    } catch (err) {
      console.error(`Error fetching attendees for event ${eventId}:`, err)
    }
  }

  // Load data when component mounts
  useEffect(() => {
    console.log("AdminDashboard component mounted")

    const init = async () => {
    
      // ina  ensure 2 least try to load data
      try {
        await fetchUserData()
        await fetchEvents()
      } catch (err) {
        console.error("Initialization error:", err)
        setError("Failed to load dashboard data. Please try refreshing the page.")
      } finally {
        setLoading(false)
      }
    }

    init()

    
    return () => {
      console.log("AdminDashboard component unmounted")
    }
  }, [])

  // Create a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault()

    if (!checkAuth()) return

    try {
      setLoading(true)

      
      const eventData = {
        type: newEvent.name,
        location: newEvent.location,
        date: newEvent.date,
        details: newEvent.description,
      }

      console.log("Sending event data to backend:", eventData)

      // Send the data to the backend
      const response = await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(eventData),
      })

      if (response.ok) {
        const createdEvent = await response.json()
        console.log("Event created successfully:", createdEvent)

        // Add the new event to the state
        setEvents((prevEvents) => [...prevEvents, createdEvent])

        // Reset the form
        setNewEvent({ name: "", description: "", date: "", location: "" })
        setIsCreatingEvent(false)
        showNotification("Event created successfully and saved to database", "success")
      } else {
        // kama kulikuwa na error
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }))
        console.error("Error creating event:", errorData)

        const newId = Math.max(...events.map((e) => e.id || 0), 0) + 1
        const fallbackEvent = {
          id: newId,
          type: newEvent.name,
          location: newEvent.location,
          date: newEvent.date,
          details: newEvent.description,
          attendees: 0,
        }

        // Add the fallback event to the state
        setEvents([...events, fallbackEvent])
        setNewEvent({ name: "", description: "", date: "", location: "" })
        setIsCreatingEvent(false)
        showNotification("Event created in UI only. Database save failed: " + errorData.message, "error")
      }
    } catch (err) {
      console.error("Error creating event:", err)

      // Create a fallback event with a unique ID for the UI
      const newId = Math.max(...events.map((e) => e.id || 0), 0) + 1
      const fallbackEvent = {
        id: newId,
        type: newEvent.name,
        location: newEvent.location,
        date: newEvent.date,
        details: newEvent.description,
        attendees: 0,
      }

      // Add the fallback event to the state
      setEvents([...events, fallbackEvent])
      setNewEvent({ name: "", description: "", date: "", location: "" })
      setIsCreatingEvent(false)
      showNotification("Event created in UI only. Database save failed: " + err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    if (!checkAuth()) return

    try {
      setLoading(true)

      // Send delete request to the backend
      const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      })

      if (response.ok) {
        // If the backend request was successful, remove the event from the state
        setEvents(events.filter((event) => event.id !== eventId))
        showNotification("Event deleted successfully from database", "success")
      } else {
        // If there was an error from the backend
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }))
        console.error("Error deleting event:", errorData)

        // Remove the event from the UI anyway
        setEvents(events.filter((event) => event.id !== eventId))
        showNotification("Event removed from UI. Database delete failed: " + errorData.message, "error")
      }
    } catch (err) {
      console.error("Error deleting event:", err)

      // Remove the event from the UI anyway
      setEvents(events.filter((event) => event.id !== eventId))
      showNotification("Event removed from UI. Database delete failed: " + err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  // Register an attendee
  const handleRegisterAttendee = async (eventId) => {
    if (!checkAuth()) return

    if (!attendeeEmail) {
      showNotification("Please enter an attendee email", "error")
      return
    }

    try {
      setLoading(true)

      // Prepare the attendee data
      const attendeeData = {
        email: attendeeEmail,
        event_id: eventId,
      }

      console.log("Sending attendee data to backend:", attendeeData)

      // Send the data to the backend
      const response = await fetch(`${API_URL}/attendees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(attendeeData),
      })

      if (response.ok) {
        // If the backend request was successful, get the created attendee
        const createdAttendee = await response.json()
        console.log("Attendee registered successfully:", createdAttendee)

        // Add the new attendee to the state
        setAttendees((prev) => ({
          ...prev,
          [eventId]: [...(prev[eventId] || []), createdAttendee],
        }))

        // Update attendee count in the event
        setEvents(
          events.map((event) => (event.id === eventId ? { ...event, attendees: (event.attendees || 0) + 1 } : event)),
        )

        showNotification(`Invitation sent to ${attendeeEmail} and saved to database`, "success")
        setAttendeeEmail("")
      } else {
        // If there was an error from the backend
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }))
        console.error("Error registering attendee:", errorData)

        // Create a fallback attendee for the UI
        const newAttendee = {
          id: Date.now(),
          name: attendeeEmail.split("@")[0],
          email: attendeeEmail,
        }

        // Add the fallback attendee to the state
        setAttendees((prev) => ({
          ...prev,
          [eventId]: [...(prev[eventId] || []), newAttendee],
        }))

        // Update attendee count in the event
        setEvents(
          events.map((event) => (event.id === eventId ? { ...event, attendees: (event.attendees || 0) + 1 } : event)),
        )

        showNotification(`Attendee added to UI only. Database save failed: ${errorData.message}`, "error")
        setAttendeeEmail("")
      }
    } catch (err) {
      console.error("Error registering attendee:", err)

      // Create a fallback attendee for the UI
      const newAttendee = {
        id: Date.now(),
        name: attendeeEmail.split("@")[0],
        email: attendeeEmail,
      }

      // Add the fallback attendee to the state
      setAttendees((prev) => ({
        ...prev,
        [eventId]: [...(prev[eventId] || []), newAttendee],
      }))

      // Update attendee count in the event
      setEvents(
        events.map((event) => (event.id === eventId ? { ...event, attendees: (event.attendees || 0) + 1 } : event)),
      )

      showNotification(`Attendee added to UI only. Database save failed: ${err.message}`, "error")
      setAttendeeEmail("")
    } finally {
      setLoading(false)
    }
  }

  // Send notification to attendees
  const handleSendNotification = async (eventId) => {
    if (!checkAuth()) return

    if (!notificationMessage) {
      showNotification("Please enter a notification message", "error")
      return
    }

    try {
      setLoading(true)

      // Prepare the notification data
      const notificationData = {
        event_id: eventId,
        message: notificationMessage,
      }

      console.log("Sending notification data to backend:", notificationData)

      // Send the data to the backend
      const response = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(notificationData),
      })

      if (response.ok) {
        // If the backend request was successful
        console.log("Notification sent successfully")
        showNotification("Notification sent to attendees and saved to database", "success")
        setNotificationMessage("")
      } else {
        // If there was an error from the backend
        const errorData = await response.json().catch(() => ({ message: "Unknown error occurred" }))
        console.error("Error sending notification:", errorData)
        showNotification("Notification failed: " + errorData.message, "error")
      }
    } catch (err) {
      console.error("Error sending notification:", err)
      showNotification("Notification failed: " + err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" })
    }, 5000) // Increased to 5 seconds for better visibility
  }

  // Toggle event expansion
  const toggleEventExpansion = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
    navigate("/login")
  }

  // Filter events based on search
  const filteredEvents = events.filter(
    (event) =>
      event.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 mb-4">
            <X className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
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

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            Eventify
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User className="h-4 w-4" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userData.name}
                </span>
                <ChevronDown className="hidden md:block h-4 w-4 text-gray-500" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{userData.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your events and monitor performance
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => setIsCreatingEvent(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{events.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Users className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Attendees</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {Object.values(attendees).reduce((sum, eventAttendees) => sum + (eventAttendees?.length || 0), 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
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
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Event Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={newEvent.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Workshop, Conference"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
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
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    placeholder="Describe the event..."
                    required
                    rows="3"
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

            {filteredEvents.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                {events.length === 0
                  ? "No events found. Create your first event to get started."
                  : "No events match your search criteria."}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredEvents.map((event) => (
                  <li key={event.id} className="p-6">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleEventExpansion(event.id)}
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{event.type}</h3>
                        <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center mr-3">
                            <Calendar className="h-4 w-4 mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center mr-3">
                            <MapPin className="h-4 w-4 mr-1" />
                            {event.location}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {event.attendees || 0} attendees
                          </div>
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

                        {/* Attendees List */}
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <Users className="h-4 w-4 mr-1.5" />
                            Registered Attendees
                          </h4>
                          {attendees[event.id]?.length > 0 ? (
                            <ul className="space-y-2">
                              {attendees[event.id].map((attendee) => (
                                <li
                                  key={attendee.id}
                                  className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2">
                                    <User className="h-3 w-3" />
                                  </div>
                                  <span>{attendee.name}</span>
                                  <span className="mx-1.5 text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">{attendee.email}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No attendees registered yet.</p>
                          )}
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
                                className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700 flex items-center"
                              >
                                <Mail className="h-4 w-4 mr-1.5" />
                                Invite
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
                                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 flex items-center"
                              >
                                <Bell className="h-4 w-4 mr-1.5" />
                                Send
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
    </div>
  )
}

export default AdminDashboard
