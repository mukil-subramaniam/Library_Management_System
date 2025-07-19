"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import library from "../assets/li.jpg"
import "../styles/InitialPage.css"

const InitialPage = () => {
  const [role, setRole] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const navigate = useNavigate()

  useEffect(() => {
    // Add animation class after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(timeInterval)
    }
  }, [])

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole)
    setIsAnimating(true)

    // Add a slight delay for better UX
    setTimeout(() => {
      if (selectedRole === "admin") {
        navigate("/admin-login")
      } else if (selectedRole === "user") {
        navigate("/user-login")
      }
    }, 600)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const features = [
    {
      icon: "📚",
      title: "Book Management",
      description: "Comprehensive catalog system",
    },
    {
      icon: "👥",
      title: "User Management",
      description: "Efficient member tracking",
    },
  ]

  return (
    <div className="initial-page">
      {/* Background Elements */}
      <div className="background-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Header */}
      <header className="page-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <div className="logo-text">
              <h1 className="logo-title">LibraryPro</h1>
              <span className="logo-subtitle">Management System</span>
            </div>
          </div>
          <div className="header-info">
            <div className="time-display">
              <div className="current-time">{formatTime(currentTime)}</div>
              <div className="current-date">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Hero Section */}
          <section className={`hero-section ${isLoaded ? "loaded" : ""}`}>
            <div className="hero-content">
              <div className="hero-text">
                <h2 className="hero-title">Welcome to Your Digital Library</h2>
                <p className="hero-description">
                  Experience seamless book management with our comprehensive library system. Organize, track, and
                  discover books with ease.
                </p>
              </div>
              <div className="hero-image">
                <div className="image-wrapper">
                  <img
                    src={library || "/placeholder.svg?height=400&width=600&query=modern library interior"}
                    alt="Modern Library"
                    className="library-image"
                    onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextSibling.style.display = "flex"
                    }}
                  />
                  <div className="image-placeholder" style={{ display: "none" }}>
                    <div className="placeholder-icon">🏛️</div>
                    <p>Library Image</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className={`features-section ${isLoaded ? "loaded" : ""}`}>
            <h3 className="features-title">Why Choose Our System?</h3>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Role Selection Section */}
          <section className={`role-selection-section ${isLoaded ? "loaded" : ""} ${isAnimating ? "animating" : ""}`}>
            <div className="selection-card">
              <div className="selection-header">
                <h3 className="selection-title">Choose Your Access Level</h3>
                <p className="selection-description">Select your role to access the appropriate dashboard</p>
              </div>

              <div className="role-options">
                <div
                  className={`role-card admin ${role === "admin" ? "selected" : ""}`}
                  onClick={() => handleRoleSelect("admin")}
                >
                  <div className="role-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="m22 11-3-3m0 0-3 3m3-3v6" />
                    </svg>
                  </div>
                  <h4 className="role-title">Administrator</h4>
                  <p className="role-description">Full system access with management capabilities</p>
                  <div className="role-features">
                    <span>• Manage Books</span>
                    <span>• User Management</span>
                    <span>• System Analytics</span>
                  </div>
                </div>

                <div
                  className={`role-card user ${role === "user" ? "selected" : ""}`}
                  onClick={() => handleRoleSelect("user")}
                >
                  <div className="role-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  </div>
                  <h4 className="role-title">Library User</h4>
                  <p className="role-description">Access to browse and manage your library experience</p>
                  <div className="role-features">
                    <span>• Browse Books</span>
                    <span>• Manage Favorites</span>
                    <span>• Track Issues</span>
                  </div>
                </div>
              </div>

              {role && (
                <div className="continue-section">
                  <div className="loading-indicator">
                    <div className="loading-spinner"></div>
                    <p>Redirecting to {role === "admin" ? "Administrator" : "User"} Login...</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="page-footer">
        <div className="footer-content">
          <p>© 2024 LibraryPro Management System. All rights reserved.</p>
          <div className="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default InitialPage