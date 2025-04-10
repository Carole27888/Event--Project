"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Search, Filter, MapPin, Users, Bell, X } from "lucide-react"

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [filters, setFilters] = useState({ search: "", location: "", date: "" })
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const navigate = useNavigate()

  //  after the state declarations
  const sampleEvents = [
    {
      id: "evt1",
      type: "Corporate Retreat",
      date: "May 15, 2025",
      location: "Naivasha",
      attendees: 45,
      details: "Team building and strategy sessions in a relaxing environment",
    },
    {
      id: "evt2",
      type: "Tech Conference",
      date: "June 3, 2025",
      location: "Nairobi",
      attendees: 120,
      details: "Latest innovations and networking opportunities for tech professionals",
    },
    {
      id: "evt3",
      type: "Wedding Event",
      date: "July 22, 2025",
      location: "Mombasa",
      attendees: 80,
      details: "Beautiful beachside ceremony and reception",
    },
  ]

  //hapa nimemodify feth function kiasi
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/events")
      if (!response.ok) throw new Error("Failed to fetch events")
      const data = await response.json()
      setEvents(Array.isArray(data) ? data : sampleEvents)
    } catch (err) {
      console.log("Using sample events due to API error:", err.message)
      setEvents(sampleEvents) // Use sample events on error
      setError("") // Clear error since we're showing sample data
    } finally {
      setLoading(false)
    }
  }

  // Fetch events 
  useEffect(() => {
    fetchEvents()
  }, [])

  // i hope inafilter search and events
  const filteredEvents = Array.isArray(events)
    ? events.filter((event) => {
        const matchesSearch =
          !filters.search ||
          event.type?.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.details?.toLowerCase().includes(filters.search.toLowerCase())

        const matchesLocation =
          !filters.location || event.location?.toLowerCase().includes(filters.location.toLowerCase())

        const matchesDate = !filters.date || event.date === filters.date

        const matchesTab = activeTab === "all" || (activeTab === "registered" && registeredEvents.includes(event.id))

        return matchesSearch && matchesLocation && matchesDate && matchesTab
      })
    : []

  // Handle event registration
  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setNotification("You're already registered for this event")
      return
    }
    setRegisteredEvents([...registeredEvents, eventId])
    setNotification("Successfully registered for the event!")
    setTimeout(() => setNotification(""), 3000)
  }

  // Handle setting reminders
  const handleReminder = (eventId) => {
    const event = events.find((e) => e.id === eventId)
    if (event) {
      setNotification(`Reminder set for: ${event.type}`)
      setTimeout(() => setNotification(""), 3000)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">
        <div className="text-red-500 mb-2">⚠️ {error}</div>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-purple-600 text-white rounded-md">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Eventify
          </span>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button
              onClick={() => navigate("/")}
              className="px-3 py-2 text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full px-4 py-2 pl-10 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-md flex items-center justify-between animate-fadeIn">
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span>{notification}</span>
            </div>
            <button onClick={() => setNotification("")}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Tabs & Filters */}
        <div className="flex flex-wrap items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          <div className="flex">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "all"
                  ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveTab("registered")}
              className={`py-2 px-4 text-sm font-medium ${
                activeTab === "registered"
                  ? "text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              My Events
            </button>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center py-2 px-3 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Filter by location"
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ search: "", location: "", date: "" })}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {activeTab === "registered" ? "My Registered Events" : "Available Events"}
            <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({filteredEvents.length})</span>
          </h2>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === "registered"
                  ? "You haven't registered for any events yet."
                  : "No events match your search criteria."}
              </p>
              {activeTab === "registered" && (
                <button
                  onClick={() => setActiveTab("all")}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Browse Events
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{event.type}</h3>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                        {event.location}
                      </div>
                      {event.attendees && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                          {event.attendees} attendees
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRegister(event.id)}
                        className={`flex-1 px-3 py-2 text-xs font-medium rounded-md ${
                          registeredEvents.includes(event.id)
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                        disabled={registeredEvents.includes(event.id)}
                      >
                        {registeredEvents.includes(event.id) ? "Registered" : "Register"}
                      </button>
                      <button
                        onClick={() => handleReminder(event.id)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-md"
                      >
                        Remind Me
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AttendeeDashboard
