"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Search, Calendar, Users, Star, PlusCircle, AlertTriangle, User } from "lucide-react"

// Sample data
const managedEvents = [
  {
    id: "evt1",
    title: "Corporate Retreat",
    date: "May 15, 2025",
    location: "Naivasha",
    attendees: 45,
    status: "upcoming",
    category: "Business",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "evt2",
    title: "Tech Conference",
    date: "June 3, 2025",
    location: "Nairobi",
    attendees: 120,
    status: "upcoming",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1112&q=80",
  },
  {
    id: "evt3",
    title: "Annual Company Dinner",
    date: "December 15, 2024",
    location: "Nairobi",
    attendees: 85,
    status: "completed",
    category: "Business",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1169&q=80",
  },
]

// Feedback data
const feedbackData = [
  {
    id: "fb1",
    eventId: "evt3",
    userName: "John Doe",
    rating: 5,
    comment: "The annual dinner was fantastic! Great food and entertainment.",
    date: "December 16, 2024",
  },
  {
    id: "fb2",
    eventId: "evt3",
    userName: "Sarah Johnson",
    rating: 4,
    comment: "Enjoyed the event, but the venue was a bit crowded.",
    date: "December 16, 2024",
  },
]

// User data
const userData = {
  name: "Alex Morgan",
  email: "alex@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Event Organizer",
}

const OrganizerDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    location: "",
    category: "Business",
    description: "",
  })

  const handleSignOut = () => navigate("/")

  const filteredEvents = managedEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateEvent = () => {
    setEventForm({
      title: "",
      date: "",
      location: "",
      category: "Business",
      description: "",
    })
    setShowCreateModal(true)
  }

  const handleEditEvent = (event) => {
    setEventForm({
      title: event.title,
      date: event.date,
      location: event.location,
      category: event.category,
      description: "Event description...",
    })
    setSelectedEvent(event)
    setShowCreateModal(true)
  }

  const handleDeleteEvent = (event) => {
    setSelectedEvent(event)
    setShowDeleteModal(true)
  }

  const submitEventForm = () => {
    console.log("Event:", selectedEvent ? "Edit" : "Create", eventForm)
    setEventForm({ title: "", date: "", location: "", category: "Business", description: "" })
    setShowCreateModal(false)
    setSelectedEvent(null)
    alert(selectedEvent ? "Event updated!" : "Event created!")
  }

  const confirmDeleteEvent = () => {
    console.log("Delete event:", selectedEvent.id)
    setShowDeleteModal(false)
    setSelectedEvent(null)
    alert("Event deleted!")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Eventify
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={userData.avatar || "/placeholder.svg"}
                  alt="User profile"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  {userData.name}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none transition duration-150 ease-in-out"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {["dashboard", "events", "feedback", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-purple-500 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {userData.name}!</h1>
                <p className="text-gray-600 dark:text-gray-300">Here's an overview of your events</p>
              </div>
              <button
                onClick={handleCreateEvent}
                className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create New Event
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Events</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">{managedEvents.length}</h3>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Attendees</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                      {managedEvents.reduce((sum, event) => sum + event.attendees, 0).toLocaleString()}
                    </h3>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Rating</p>
                    <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                      {(feedbackData.reduce((sum, fb) => sum + fb.rating, 0) / feedbackData.length).toFixed(1)}
                    </h3>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Event List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Events</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{event.title}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{event.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">{event.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              event.status === "upcoming"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event)}
                              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Profile</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="mb-4 md:mb-0 md:mr-6">
                    <div className="relative">
                      <img
                        src={userData.avatar || "/placeholder.svg"}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover border-2 border-purple-500"
                      />
                      <button className="absolute bottom-0 right-0 p-1 bg-purple-600 rounded-full text-white">
                        <User className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userData.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
                    <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                      <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        {userData.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {selectedEvent ? "Edit Event" : "Create New Event"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input
                    type="text"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="e.g., May 15, 2025"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white sm:text-sm"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={submitEventForm}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md"
              >
                {selectedEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Delete Event</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete "{selectedEvent.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEvent}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrganizerDashboard
