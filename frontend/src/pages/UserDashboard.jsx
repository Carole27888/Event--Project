"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Calendar, Users, PlusCircle, Star, MessageSquare, Search, Bell, Menu, X } from "lucide-react"

// Sample data for the dashboard
const upcomingEvents = [
  {
    id: "evt1",
    title: "Corporate Retreat",
    date: "May 15, 2025",
    location: "Naivasha",
    attendees: 45,
    status: "confirmed",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "evt2",
    title: "Tech Conference",
    date: "June 3, 2025",
    location: "Nairobi",
    attendees: 120,
    status: "planning",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80",
  },
  {
    id: "evt3",
    title: "Wedding Anniversary",
    date: "July 22, 2025",
    location: "Mombasa",
    attendees: 80,
    status: "confirmed",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
]

const popularEvents = [
  {
    id: "pop1",
    title: "Music Festival",
    date: "May 28, 2025",
    location: "Nairobi",
    attendees: 1500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "pop2",
    title: "UEFA CHAMPIONS LEAGUE",
    date: "April 8 -May22",
    location: "Kisumu",
    attendees: 62000,
    rating: 5.0,
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-maximalist-uefa-champions-league-flyer-design-template-2ca2e35744fe21fcd41486137ad149fa_screen.jpg?ts=1742074340",
  },
  {
    id: "pop3",
    title: "Art Exhibition",
    date: "July 5, 2025",
    location: "Nakuru",
    attendees: 320,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  },
]

const attendeeStats = [
  { month: "Jan", count: 120 },
  { month: "Feb", count: 150 },
  { month: "Mar", count: 200 },
  { month: "Apr", count: 180 },
  { month: "May", count: 250 },
]

const UserDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    // hapa flask session.pop sign out logic here
    navigate("/")
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colors = {
      confirmed: "bg-emerald-100 text-emerald-800",
      planning: "bg-amber-100 text-amber-800",
      cancelled: "bg-red-100 text-red-800",
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Rating stars component
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-indigo-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400">
                  Eventify
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={() => setActiveTab("dashboard")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "dashboard"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("myEvents")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "myEvents"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  My Events
                </button>
                <button
                  onClick={() => setActiveTab("discover")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "discover"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`px-3 py-2 text-sm font-medium ${
                    activeTab === "analytics"
                      ? "text-indigo-600 border-b-2 border-indigo-600"
                      : "text-gray-500 hover:text-indigo-600"
                  }`}
                >
                  Analytics
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:ml-4 md:flex md:items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-4 relative flex-shrink-0">
                  <div>
                    <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://randomuser.me/api/portraits/women/24.jpg"
                        alt="User profile"
                      />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="ml-4 flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition duration-150 ease-in-out"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </button>
              </div>
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setActiveTab("dashboard")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setActiveTab("myEvents")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
              >
                My Events
              </button>
              <button
                onClick={() => {
                  setActiveTab("discover")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
              >
                Discover
              </button>
              <button
                onClick={() => {
                  setActiveTab("analytics")
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
              >
                Analytics
              </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://randomuser.me/api/portraits/women/24.jpg"
                    alt="User profile"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">Jane Smith</div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">jane.smith@example.com</div>
                </div>
                <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Jane!</h1>
          <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your events.</p>
        </div>

        {/* Dashboard content */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Upcoming Events</p>
                    <h3 className="text-3xl font-bold mt-1">3</h3>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-sm text-white/80 hover:text-white">
                    View all events →
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Total Attendees</p>
                    <h3 className="text-3xl font-bold mt-1">245</h3>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-sm text-white/80 hover:text-white">
                    View attendee details →
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Average Rating</p>
                    <h3 className="text-3xl font-bold mt-1">4.8</h3>
                  </div>
                  <div className="p-3 bg-white/20 rounded-lg">
                    <Star className="h-6 w-6 text-white fill-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <a href="#" className="text-sm text-white/80 hover:text-white">
                    View all feedback →
                  </a>
                </div>
              </div>
            </div>

            {/* Upcoming events */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Upcoming Events</h2>
                <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Create New Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=160&width=320"
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                        <StatusBadge status={event.status} />
                      </div>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-indigo-500" />
                          {event.attendees} attendees
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                          Manage Event
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular events to join */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Events to Join</h2>
                <button className="flex items-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=160&width=320"
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-indigo-500" />
                          {event.attendees} attendees
                        </div>
                        <div className="flex items-center">
                          <RatingStars rating={event.rating} />
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-300">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendee stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Attendee Statistics</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    Monthly
                  </button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-full">
                    Yearly
                  </button>
                </div>
              </div>

              <div className="h-64">
                <div className="flex h-full items-end">
                  {attendeeStats.map((stat, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full mx-1 bg-gradient-to-t from-indigo-500 to-violet-500 rounded-t-md"
                        style={{ height: `${(stat.count / 250) * 100}%` }}
                      ></div>
                      <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">{stat.month}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Events tab content */}
        {activeTab === "myEvents" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Your Events</h2>
              <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-300">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Event
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Event
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Attendees
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {upcomingEvents.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              onError={(e) => {
                                e.target.onerror = null
                                e.target.src = "/placeholder.svg?height=40&width=40"
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{event.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{event.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{event.attendees}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={event.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400">
                            Edit
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-900 dark:hover:text-red-400">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Discover tab content */}
        {activeTab === "discover" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Discover Events</h2>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm">All Events</button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                    Music
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                    Business
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                    Food & Drink
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-600">
                    Art
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...popularEvents, ...upcomingEvents].map((event) => (
                  <div
                    key={event.id}
                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=192&width=384"
                        }}
                      />
                      <div className="absolute top-0 right-0 m-4">
                        <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded">
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                        {event.date}
                      </div>
                      {event.rating && <RatingStars rating={event.rating} />}
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.attendees} attending
                        </span>
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-300">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button className="px-6 py-3 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-md text-sm font-medium hover:bg-indigo-50 dark:hover:bg-gray-600 transition-colors duration-300">
                  Load More Events
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics tab content */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Event Analytics</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Period:</span>
                  <select className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md text-sm px-3 py-1">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Last year</option>
                    <option>All time</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Total Events</p>
                      <h3 className="text-3xl font-bold mt-1">12</h3>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-300 text-sm font-medium">↑ 24%</span>
                    <span className="text-white/60 text-sm ml-2">vs previous period</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Total Attendees</p>
                      <h3 className="text-3xl font-bold mt-1">1,245</h3>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-300 text-sm font-medium">↑ 18%</span>
                    <span className="text-white/60 text-sm ml-2">vs previous period</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Feedback Score</p>
                      <h3 className="text-3xl font-bold mt-1">4.8/5</h3>
                    </div>
                    <div className="p-3 bg-white/20 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-300 text-sm font-medium">↑ 5%</span>
                    <span className="text-white/60 text-sm ml-2">vs previous period</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Attendee Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Age Distribution</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">18-24</span>
                          <span className="text-gray-900 dark:text-white font-medium">28%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">25-34</span>
                          <span className="text-gray-900 dark:text-white font-medium">42%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "42%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">35-44</span>
                          <span className="text-gray-900 dark:text-white font-medium">18%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">45+</span>
                          <span className="text-gray-900 dark:text-white font-medium">12%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "12%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Location Distribution</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Nairobi</span>
                          <span className="text-gray-900 dark:text-white font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-fuchsia-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Mombasa</span>
                          <span className="text-gray-900 dark:text-white font-medium">22%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-fuchsia-600 h-2 rounded-full" style={{ width: "22%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Kisumu</span>
                          <span className="text-gray-900 dark:text-white font-medium">18%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-fuchsia-600 h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">Other</span>
                          <span className="text-gray-900 dark:text-white font-medium">15%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div className="bg-fuchsia-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default UserDashboard
