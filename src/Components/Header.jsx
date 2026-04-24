import React from 'react';

const Header = ({ darkMode, setDarkMode, searchTerm, setSearchTerm, onRefresh }) => {
  return (
    <header className="header">
      <h1 className="header-title">StoreExplorer</h1>
      
      <div className="header-actions">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <button 
          className="btn btn-secondary" 
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button 
          className="btn btn-primary" 
          onClick={onRefresh}
          title="Refresh Data"
        >
          ↻ Refresh
        </button>
      </div>
    </header>
  );
};

export default Header;
