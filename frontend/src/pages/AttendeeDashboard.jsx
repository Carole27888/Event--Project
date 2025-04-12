/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Search, Filter, MapPin, Users, Bell, X, User, LogOut, ChevronDown, CheckCircle } from "lucide-react"

const AttendeeDashboard = () => {
  const [events, setEvents] = useState([])
  const [registeredEvents, setRegisteredEvents] = useState([])
  const [filters, setFilters] = useState({ search: "", location: "", date: "" })
  const [notification, setNotification] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [invitations, setInvitations] = useState([])
  const [userData, setUserData] = useState({
    name: localStorage.getItem("userName") || "Guest User",
    email: "",
  })
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [eventAttendees, setEventAttendees] = useState({})
  const navigate = useNavigate()

  // API URL
  const API_URL = "http://127.0.0.1:5000"

  // Sample notifications
  const sampleNotifications = [
    {
      id: 1,
      eventId: "evt1",
      message: "The Corporate Retreat has been rescheduled to May 20, 2025",
      date: "2 days ago",
      read: false,
    },
    {
      id: 2,
      eventId: "evt2",
      message: "New speaker announced for Tech Conference: John Smith on AI",
      date: "1 week ago",
      read: true,
    },
  ]

  // Sample events data - will be replaced with API data
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

  // Check if user is authenticated
  const checkAuth = () => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole) {
      navigate("/login")
      return false
    }
    return true
  }

  // Fetch events from the backend
  const fetchEvents = async () => {
    if (!checkAuth()) return

    try {
      const response = await fetch(`${API_URL}/events`, {
        credentials: "include",
      })

      if (!response.ok) {
        console.log("Using sample events as API returned error")
        setEvents(sampleEvents)
      } else {
        const data = await response.json()
        setEvents(data.events && data.events.length > 0 ? data.events : sampleEvents)
      }
    } catch (err) {
      console.log("Using sample events due to API error:", err.message)
      setEvents(sampleEvents)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user data and registered events
  const fetchUserData = async () => {
    if (!checkAuth()) return

    try {
      // Try to get user data from API
      const userResponse = await fetch(`${API_URL}/me`, {
        credentials: "include",
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUserData({
          name: userData.name,
          email: userData.email || "user@example.com",
        })

        // Store in localStorage for persistence
        localStorage.setItem("userName", userData.name)
        localStorage.setItem("userId", userData.id)
      } else {
        console.log("Using localStorage data for user")
      }

     
      setRegisteredEvents(["evt1"])

      
      setInvitations([
        {
          id: "inv1",
          event_id: "evt2",
          event_name: "Tech Conference",
          event_date: "June 3, 2025",
          inviter_name: "Admin User",
          inviter_id: "admin1",
        },
      ])
    } catch (err) {
      console.error("Error fetching user data:", err)
    }
  }

  // Fetch events and user data on component mount
  useEffect(() => {
    if (!checkAuth()) return

    fetchUserData()
    fetchEvents()
    setNotifications(sampleNotifications)
  }, [])

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !filters.search ||
      event.type?.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.details?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesLocation = !filters.location || event.location?.toLowerCase().includes(filters.location.toLowerCase())

    const matchesDate = !filters.date || event.date === filters.date

    const matchesTab = activeTab === "all" || (activeTab === "registered" && registeredEvents.includes(event.id))

    return matchesSearch && matchesLocation && matchesDate && matchesTab
  })

  // Handle event registration
  const handleRegister = async (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setNotification("You're already registered for this event")
      return
    }

    try {
      // For demo purposes, just update the UI
      setRegisteredEvents([...registeredEvents, eventId])
      setNotification("Successfully registered for the event!")
    } catch (err) {
      console.error("Error registering for event:", err)
      setNotification(`Registration failed: ${err.message}`)
    }

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

  // Handle accepting an invitation
  const handleAcceptInvitation = async (invitationId) => {
    try {
      // For demo purposes, just update the UI
      const acceptedInvitation = invitations.find((inv) => inv.id === invitationId)
      setInvitations(invitations.filter((inv) => inv.id !== invitationId))

      if (acceptedInvitation) {
        setRegisteredEvents([...registeredEvents, acceptedInvitation.event_id])
      }

      setNotification("Invitation accepted successfully!")
    } catch (err) {
      console.error("Error accepting invitation:", err)
      setNotification(`Failed to accept invitation: ${err.message}`)
    }

    setTimeout(() => setNotification(""), 3000)
  }

  // Handle declining an invitation
  const handleDeclineInvitation = async (invitationId) => {
    try {

      setInvitations(invitations.filter((inv) => inv.id !== invitationId))
      setNotification("Invitation declined.")
    } catch (err) {
      console.error("Error declining invitation:", err)
      setNotification(`Failed to decline invitation: ${err.message}`)
    }

    setTimeout(() => setNotification(""), 3000)
  }

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userId")
    navigate("/login")
  }

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
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

            {/* Notifications dropdown */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                onClick={() => markAllNotificationsAsRead()}
              >
                <Bell className="h-5 w-5" />
                {notifications.some((n) => !n.read) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
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

        {/* Notifications Section */}
        {notifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Notifications
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                ({notifications.length})
              </span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start p-3 rounded-lg ${
                      notif.read
                        ? "bg-gray-50 dark:bg-gray-700/50"
                        : "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400"
                    }`}
                  >
                    <Bell
                      className={`h-5 w-5 mr-3 mt-0.5 ${
                        notif.read ? "text-gray-400 dark:text-gray-500" : "text-blue-500 dark:text-blue-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invitations Section */}
        {invitations.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Event Invitations
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">({invitations.length})</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <div className="space-y-4">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800/30"
                  >
                    <div className="mb-3 sm:mb-0">
                      <p className="font-medium text-gray-900 dark:text-white">{invitation.event_name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="inline-flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {invitation.event_date}
                        </span>
                        <span className="mx-2">•</span>
                        <span>Invited by {invitation.inviter_name}</span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptInvitation(invitation.id)}
                        className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 flex items-center"
                      >
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineInvitation(invitation.id)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
                >
                  <div className="p-4 flex-1">
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
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-purple-500" />
                        {event.attendees || 0} attendees
                      </div>
                    </div>

                    {/* Event details */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.details}</p>

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
