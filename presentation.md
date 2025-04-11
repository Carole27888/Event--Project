# Event Management System Presentation

## 1. Project Overview
**Full-stack application for managing events with:**
- Admin interface for event management
- Attendee interface for registration/participation
- RESTful backend API
- SQL database storage

## 2. Frontend Architecture
**Technology Stack:**
- React.js (Vite build system)
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

**Key Components:**
- `AdminDashboard.jsx`: 
  - Event creation/management
  - User administration
  - Analytics dashboard

- `AttendeeDashboard.jsx`:
  - Event browsing/registration  
  - Personal schedule
  - Feedback submission

## 3. Backend Architecture
**Technology Stack:**
- Python Flask framework
- SQLAlchemy ORM
- Flask-Migrate for database migrations
- JWT authentication

**Key Endpoints (from app.py):**
- `/api/events` - CRUD operations for events
- `/api/users` - User management  
- `/api/registrations` - Attendee signups
- `/api/auth` - Authentication routes

