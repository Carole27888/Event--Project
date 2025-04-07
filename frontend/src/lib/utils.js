/**
 * Eventify Utility Functions
 * A collection of helper functions for the Eventify application
 */

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date object or date string
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
    const dateObj = date instanceof Date ? date : new Date(date)
  
    const defaultOptions = {
      format: "full", // 'full', 'short', 'time', 'day', 'month', 'year'
      includeTime: false,
      locale: "en-US",
    }
  
    const config = { ...defaultOptions, ...options }
  
    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date provided to formatDate")
      return "Invalid date"
    }
  
    switch (config.format) {
      case "short":
        return dateObj.toLocaleDateString(config.locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
          ...(config.includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
        })
      case "time":
        return dateObj.toLocaleTimeString(config.locale, {
          hour: "2-digit",
          minute: "2-digit",
        })
      case "day":
        return dateObj.toLocaleDateString(config.locale, { weekday: "long" })
      case "month":
        return dateObj.toLocaleDateString(config.locale, { month: "long" })
      case "year":
        return dateObj.getFullYear().toString()
      case "full":
      default:
        return dateObj.toLocaleDateString(config.locale, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
          ...(config.includeTime ? { hour: "2-digit", minute: "2-digit" } : {}),
        })
    }
  }
  
  /**
   * Calculate the time difference between two dates
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   * @returns {Object} Object containing days, hours, minutes, seconds
   */
  export function getTimeDifference(startDate, endDate) {
    const start = startDate instanceof Date ? startDate : new Date(startDate)
    const end = endDate instanceof Date ? endDate : new Date(endDate)
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date provided to getTimeDifference")
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
  
    const diffInMs = Math.abs(end - start)
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000)
  
    return { days, hours, minutes, seconds }
  }
  
  /**
   * Format a price with currency symbol
   * @param {number} amount - The amount to format
   * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
   * @param {string} locale - Locale for formatting
   * @returns {string} Formatted price string
   */
  export function formatPrice(amount, currencyCode = "USD", locale = "en-US") {
    if (typeof amount !== "number") {
      console.error("Invalid amount provided to formatPrice")
      return "Invalid amount"
    }
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }
  
  /**
   * Truncate text to a specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @param {string} suffix - Suffix to add to truncated text
   * @returns {string} Truncated text
   */
  export function truncateText(text, maxLength = 100, suffix = "...") {
    if (!text || typeof text !== "string") {
      return ""
    }
  
    if (text.length <= maxLength) {
      return text
    }
  
    return text.substring(0, maxLength).trim() + suffix
  }
  
  /**
   * Generate a random ID
   * @param {number} length - Length of the ID
   * @returns {string} Random ID
   */
  export function generateId(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
  
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
  
    return result
  }
  
  /**
   * Validate an email address
   * @param {string} email - Email to validate
   * @returns {boolean} Whether the email is valid
   */
  export function isValidEmail(email) {
    if (!email || typeof email !== "string") {
      return false
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Validate a phone number
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Whether the phone number is valid
   */
  export function isValidPhone(phone) {
    if (!phone || typeof phone !== "string") {
      return false
    }
  
    // Basic phone validation - can be adjusted for different formats
    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(phone.replace(/[\s()-]/g, ""))
  }
  
  /**
   * Calculate the total price for an event
   * @param {number} basePrice - Base price of the event
   * @param {number} attendees - Number of attendees
   * @param {Array} addons - Array of addon objects with prices
   * @param {number} discountPercent - Discount percentage
   * @returns {Object} Object with subtotal, discount, and total
   */
  export function calculateEventPrice(basePrice, attendees = 1, addons = [], discountPercent = 0) {
    if (typeof basePrice !== "number" || basePrice < 0) {
      console.error("Invalid base price provided to calculateEventPrice")
      return { subtotal: 0, discount: 0, total: 0 }
    }
  
    // Calculate base cost
    const baseCost = basePrice * attendees
  
    // Calculate addons cost
    const addonsCost = addons.reduce((sum, addon) => {
      return sum + (addon.price || 0)
    }, 0)
  
    // Calculate subtotal
    const subtotal = baseCost + addonsCost
  
    // Calculate discount
    const discount = subtotal * (discountPercent / 100)
  
    // Calculate total
    const total = subtotal - discount
  
    return {
      subtotal: Number.parseFloat(subtotal.toFixed(2)),
      discount: Number.parseFloat(discount.toFixed(2)),
      total: Number.parseFloat(total.toFixed(2)),
    }
  }
  
  /**
   * Get the average rating from an array of ratings
   * @param {Array} ratings - Array of rating objects with a 'rating' property
   * @returns {number} Average rating (1 decimal place)
   */
  export function getAverageRating(ratings) {
    if (!Array.isArray(ratings) || ratings.length === 0) {
      return 0
    }
  
    const sum = ratings.reduce((total, item) => {
      return total + (Number.parseFloat(item.rating) || 0)
    }, 0)
  
    return Number.parseFloat((sum / ratings.length).toFixed(1))
  }
  
  /**
   * Group events by category
   * @param {Array} events - Array of event objects
   * @returns {Object} Events grouped by category
   */
  export function groupEventsByCategory(events) {
    if (!Array.isArray(events)) {
      return {}
    }
  
    return events.reduce((groups, event) => {
      const category = event.category || "Uncategorized"
  
      if (!groups[category]) {
        groups[category] = []
      }
  
      groups[category].push(event)
      return groups
    }, {})
  }
  
  /**
   * Check if an event is upcoming
   * @param {Date|string} eventDate - Event date
   * @returns {boolean} Whether the event is upcoming
   */
  export function isUpcomingEvent(eventDate) {
    const date = eventDate instanceof Date ? eventDate : new Date(eventDate)
  
    if (isNaN(date.getTime())) {
      console.error("Invalid date provided to isUpcomingEvent")
      return false
    }
  
    const now = new Date()
    return date > now
  }
  
  /**
   * Sort events by date
   * @param {Array} events - Array of event objects with a 'date' property
   * @param {string} order - Sort order ('asc' or 'desc')
   * @returns {Array} Sorted events
   */
  export function sortEventsByDate(events, order = "asc") {
    if (!Array.isArray(events)) {
      return []
    }
  
    return [...events].sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
  
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
        return 0
      }
  
      return order === "asc" ? dateA - dateB : dateB - dateA
    })
  }
  
  /**
   * Filter events by search term
   * @param {Array} events - Array of event objects
   * @param {string} searchTerm - Search term
   * @returns {Array} Filtered events
   */
  export function filterEventsBySearchTerm(events, searchTerm) {
    if (!Array.isArray(events) || !searchTerm) {
      return events || []
    }
  
    const term = searchTerm.toLowerCase().trim()
  
    return events.filter((event) => {
      return (
        (event.title && event.title.toLowerCase().includes(term)) ||
        (event.description && event.description.toLowerCase().includes(term)) ||
        (event.location && event.location.toLowerCase().includes(term)) ||
        (event.category && event.category.toLowerCase().includes(term))
      )
    })
  }
  
  /**
   * Debounce a function call
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  export function debounce(func, wait = 300) {
    let timeout
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
  
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
  
  /**
   * Combine class names conditionally
   * @param {...string} classes - Class names to combine
   * @returns {string} Combined class names
   */
  export function cn(...classes) {
    return classes.filter(Boolean).join(" ")
  }
  
  /**
   * Get the time slots for an event
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   * @param {number} intervalMinutes - Interval in minutes
   * @returns {Array} Array of time slot objects
   */
  export function getTimeSlots(startDate, endDate, intervalMinutes = 60) {
    const start = startDate instanceof Date ? startDate : new Date(startDate)
    const end = endDate instanceof Date ? endDate : new Date(endDate)
  
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid date provided to getTimeSlots")
      return []
    }
  
    const slots = []
    const current = new Date(start)
  
    while (current < end) {
      const slotStart = new Date(current)
      current.setMinutes(current.getMinutes() + intervalMinutes)
      const slotEnd = new Date(current)
  
      if (slotEnd > end) {
        slotEnd.setTime(end.getTime())
      }
  
      slots.push({
        start: slotStart,
        end: slotEnd,
        label: `${slotStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${slotEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      })
    }
  
    return slots
  }
  
  