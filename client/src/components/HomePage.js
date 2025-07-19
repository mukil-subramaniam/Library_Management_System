import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profile-icon.png';
import '../styles/HomePage.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://library-management-system-pro-backend.onrender.com/api/books/all');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error(error);
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterBooks(query, activeFilter);
  };

  const filterBooks = (query, filter) => {
    let filtered = books;
    
    if (query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.isbn.includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery)
      );
    }

    if (filter !== 'all') {
      filtered = filtered.filter(book => book.type.toLowerCase() === filter);
    }

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    filterBooks(searchQuery, filter);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleBookClick = (isbn) => navigate(`/book-details/${isbn}`);

  const quickActions = [
    { title: 'View All Books', icon: '📚', path: '/view-book', color: 'blue' },
    { title: 'Issued Books', icon: '📖', path: '/issued-book', color: 'green' },
    { title: 'Favorites', icon: '⭐', path: '/favorites', color: 'yellow' },
    { title: 'Add New Book', icon: '➕', path: '/add-book', color: 'purple' }
  ];

  const categories = ['all', 'fiction', 'science', 'history', 'biography', 'mystery'];

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="homepage-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo-title">LibraryPro</h1>
            <span className="logo-subtitle">Management System</span>
          </div>
          
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-button">
                <span className="search-icon">🔍</span>
              </button>
            </div>
          </div>

          <div className="user-section">
            <div className="user-info">
              <img src={profileIcon || "/placeholder.svg"} alt="Profile" className="profile-image" />
              <span className="username">{username}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="homepage-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">Welcome back, {username}!</h2>
            <p className="welcome-description">
              Manage your library efficiently with our comprehensive system
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <h3 className="section-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className={`action-card ${action.color}`}
                onClick={() => navigate(action.path)}
              >
                <div className="action-icon">{action.icon}</div>
                <h4 className="action-title">{action.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Books Section */}
        <section className="books-section">
          <div className="books-header">
            <h3 className="section-title">Library Collection</h3>
            <div className="filter-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-tab ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading your library...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="books-grid">
              {filteredBooks.length > 0 ? (
                filteredBooks.slice(0, 12).map((book) => (
                  <div
                    key={book._id}
                    className="book-card"
                    onClick={() => handleBookClick(book.isbn)}
                  >
                    <div className="book-image">
                      {book.image ? (
                        <img src={book.image || "/placeholder.svg"} alt={book.title} />
                      ) : (
                        <div className="book-placeholder">📖</div>
                      )}
                    </div>
                    <div className="book-info">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">by {book.author}</p>
                      <div className="book-details">
                        <span className="book-type">{book.type}</span>
                        <span className="book-pages">{book.pages} pages</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-books-container">
                  <div className="no-books-icon">📚</div>
                  <h4 className="no-books-title">No books found</h4>
                  <p className="no-books-message">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          )}

          {!loading && !error && filteredBooks.length > 12 && (
            <div className="view-more-container">
              <button 
                className="view-more-button"
                onClick={() => navigate('/view-book')}
              >
                View All Books ({filteredBooks.length})
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
