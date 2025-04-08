"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, MapPin, Users, Calendar, Star } from "lucide-react"

const EventDetailPage = ({ events }) => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = events.find((e) => e.id === eventId)

    if (foundEvent) {
      setEvent(foundEvent)
    }

    setLoading(false)
  }, [eventId, events])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Event not found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The event you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Go back home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to events
        </button>

        {/* Event header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.type}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "/placeholder.svg?height=400&width=800"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 sm:p-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{event.type}</h1>
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(event.rating) ? "fill-current" : "stroke-current fill-transparent"}`}
                    />
                  ))}
                  <span className="ml-2 text-white">{event.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Locations</h3>
                  <p className="text-base font-medium text-gray-900 dark:text-white">{event.locations.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Attendees</h3>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {event.attendees.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Events Managed</h3>
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {event.totalEvents.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About this event</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{event.details}</p>
            </div>
          </div>
        </div>

        {/* Event gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.gallery.map((image, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${event.type} gallery image ${index + 1}`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=300&width=400"
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-purple-600 dark:bg-purple-700 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to plan your {event.type.toLowerCase()}?</h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Let our experienced team help you create an unforgettable event. Contact us today to get started!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-white text-purple-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-300 shadow-md">
              Contact Us
            </button>
            <button className="px-6 py-3 bg-purple-800 text-white font-medium rounded-md hover:bg-purple-900 transition-colors duration-300 shadow-md">
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage

