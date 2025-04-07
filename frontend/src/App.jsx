"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Menu, X } from "lucide-react"
import { Routes, Route } from "react-router-dom"

// Team members data
const teamMembers = [
  { name: "Hakim Castro", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Caroline Mutemi", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Angela Gathoni", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Tilen Otuoma", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Jaafar Abdiwahid", avatar: "/placeholder.svg?height=100&width=100" },
  { name: "Miriam Yego", avatar: "/placeholder.svg?height=100&width=100" },
]

// Events data
const events = [
  {
    type: "Birthday Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Memorable birthday celebrations for all ages",
  },
  {
    type: "Concert Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Spectacular concert setups with amazing sound systems",
  },
  {
    type: "Wedding Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Beautiful wedding arrangements for your special day",
  },
  {
    type: "Graduation Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.9,
    description: "Celebrate academic achievements in style",
  },
  {
    type: "Sport Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 4.8,
    description: "Well-organized sporting events with all facilities",
  },
  {
    type: "Private Event",
    image: "/placeholder.svg?height=300&width=400",
    rating: 5,
    description: "Exclusive private events with personalized touches",
  },
]

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    comment: "Eventify made my daughter's birthday absolutely perfect! The attention to detail was amazing.",
    rating: 5,
  },
  {
    name: "Michael Omondi",
    avatar: "/placeholder.svg?height=80&width=80",
    comment: "Our corporate event was flawlessly executed. The team is professional and creative.",
    rating: 5,
  },
  {
    name: "Amina Hassan",
    avatar: "/placeholder.svg?height=80&width=80",
    comment: "The wedding of my dreams! Everything was exactly as I imagined and more.",
    rating: 5,
  },
]

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{rating.toFixed(1)}</span>
    </div>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-950 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10 transition-all duration-300 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 animate-pulse">
                  Eventify
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a
                  href="#home"
                  className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-transform hover:scale-105"
                >
                  Home
                </a>
                <a
                  href="#events"
                  className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-transform hover:scale-105"
                >
                  Events
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-transform hover:scale-105"
                >
                  Feedback
                </a>
                <a
                  href="#team"
                  className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium transition-transform hover:scale-105"
                >
                  Cantacts
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-transform hover:scale-110"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <div className="hidden md:flex md:items-center md:ml-6 space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-transform hover:scale-105">
                  Login
                </button>
                <button className="px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-md transition-transform hover:scale-105">
                  Sign Up
                </button>
              </div>
              <div className="md:hidden flex items-center ml-4">
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#home"
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md"
              >
                Home
              </a>
              <a
                href="#events"
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md"
              >
                Events
              </a>
              <a
                href="#testimonials"
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md"
              >
                Testimonials
              </a>
              <a
                href="#team"
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-purple-100 dark:hover:bg-gray-700 rounded-md"
              >
                Our Team
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-3 px-5">
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md">
                  Login
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-md">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 animate-fadeIn">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                Karibu Eventify
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate-fadeIn delay-100">
              Your premier event management solution. We create unforgettable experiences tailored to your needs.
            </p>
            <div className="mt-8 flex justify-center space-x-4 animate-fadeIn delay-200">
              <button className="px-8 py-3 text-base font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Login
              </button>
              <button className="px-8 py-3 text-base font-medium text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Events We've Managed</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 sm:mt-4">
              From intimate gatherings to grand celebrations, we handle it all with excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 bg-purple-50 dark:bg-gray-700"
              >
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={event.image || "/placeholder.svg"} alt={event.type} />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{event.type}</h3>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{event.description}</p>
                  </div>
                  <div className="mt-4">
                    <StarRating rating={event.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 bg-purple-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">What Our Clients Say</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 sm:mt-4">
              Don't just take our word for it - hear from our satisfied clients.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full object-cover mr-4"
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section / Footer */}
      <footer id="team" className="bg-gray-800 dark:bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Meet Our Team</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
              The creative minds behind your perfect events.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto h-20 w-20 rounded-full overflow-hidden mb-4 border-2 border-purple-500 transition-transform duration-300 hover:scale-110">
                  <img
                    className="h-full w-full object-cover"
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                  />
                </div>
                <div className="text-sm font-medium text-white">{member.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

