"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/FavoriteBooks.css"

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBooks, setFilteredBooks] = useState([])
  const [sortBy, setSortBy] = useState("title")
  const [viewMode, setViewMode] = useState("grid")
  const navigate = useNavigate()

  useEffect(() => {
    const loadFavorites = () => {
      setLoading(true)
      try {
        const booksFromStorage = localStorage.getItem("favorites")
        if (booksFromStorage) {
          const parsedBooks = JSON.parse(booksFromStorage)
          if (Array.isArray(parsedBooks)) {
            setFavoriteBooks(parsedBooks)
            setFilteredBooks(parsedBooks)
          } else {
            setFavoriteBooks([])
            setFilteredBooks([])
          }
        } else {
          setFavoriteBooks([])
          setFilteredBooks([])
        }
      } catch (error) {
        console.error("Error loading favorites:", error)
        setFavoriteBooks([])
        setFilteredBooks([])
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    }

    loadFavorites()
  }, [])

  useEffect(() => {
    let filtered = favoriteBooks.filter(
      (book) =>
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.isbn?.includes(searchQuery),
    )

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.author.localeCompare(b.author)
        case "price":
          return parseFloat(a.price) - parseFloat(b.price)
        default:
          return 0
      }
    })

    setFilteredBooks(filtered)
  }, [searchQuery, favoriteBooks, sortBy])

  const removeFromFavorites = (bookId) => {
    const updatedBooks = favoriteBooks.filter((book) => book._id !== bookId)
    setFavoriteBooks(updatedBooks)
    setFilteredBooks(updatedBooks.filter((book) => 
      book.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn?.includes(searchQuery)
    ))
    localStorage.setItem("favorites", JSON.stringify(updatedBooks))
  }

  const clearAllFavorites = () => {
    setFavoriteBooks([])
    setFilteredBooks([])
    localStorage.removeItem("favorites")
  }

  const handleBookClick = (book) => {
    navigate(`/book-details/${book.isbn}`)
  }

  const goBack = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your favorite books...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <div className="header-top">
          <button className="back-button" onClick={goBack}>
            <span className="back-icon">←</span>
            Back
          </button>
          <div className="header-title-section">
            <h1 className="page-title">My Favorite Books</h1>
            <p className="page-subtitle">
              {favoriteBooks.length} book{favoriteBooks.length !== 1 ? "s" : ""} in your collection
            </p>
          </div>
        </div>

        {favoriteBooks.length > 0 && (
          <div className="header-controls">
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search your favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <span className="search-icon">🔍</span>
              </div>
            </div>

            <div className="controls-section">
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="price">Price</option>
                </select>
              </div>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  ⊞
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  ☰
                </button>
              </div>

              <button className="clear-all-btn" onClick={clearAllFavorites}>
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="favorites-content">
        {favoriteBooks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💔</div>
            <h2 className="empty-title">No Favorite Books Yet</h2>
            <p className="empty-message">
              Start building your collection by adding books to your favorites!
            </p>
            <button className="browse-books-btn" onClick={() => navigate("/view-book")}>Browse Books</button>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3 className="no-results-title">No books found</h3>
            <p className="no-results-message">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={`books-container ${viewMode}`}>
            {filteredBooks.map((book, index) => (
              <div
                key={book._id || book.isbn || index}
                className="book-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleBookClick(book)}
              >
                <div className="book-image-container">
                  {book.image ? (
                    <img
                      src={book.image.startsWith("http") ? book.image : `http://localhost:5000/${book.image}`}
                      alt={book.title}
                      className="book-image"
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                  ) : null}
                  <div className="book-placeholder" style={{ display: book.image ? "none" : "flex" }}>
                    📖
                  </div>
                  <div className="book-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>

                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <div className="book-details">
                    <div className="detail-item">
                      <span className="detail-label">Price:</span>
                      <span className="detail-value price">${book.price}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">ISBN:</span>
                      <span className="detail-value">{book.isbn}</span>
                    </div>
                    {book.type && (
                      <div className="detail-item">
                        <span className="book-type">{book.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="book-actions">
                    {book.link && (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buy-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="link-icon">🛒</span>
                        Buy Now
                      </a>
                    )}
                    <button
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromFavorites(book._id)
                      }}
                    >
                      <span className="remove-icon">❤️</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoriteBooks