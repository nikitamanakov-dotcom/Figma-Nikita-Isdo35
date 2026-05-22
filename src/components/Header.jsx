import React from 'react';

export default function Header({ search, setSearch, onFilterOpen, isDark, toggleTheme }) {
  return (
    <header className="gallery-header">
      <div className="dark-mode-toggle" onClick={toggleTheme}>
        {isDark ? '☀︎' : '☽'}
      </div>
      <div className="search-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍︎</span>
          <input
            type="text"
            placeholder="Painting title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="filter-btn" onClick={onFilterOpen}>
          <img src="images/filter_icon.png" alt="filter" />
        </button>
      </div>
    </header>
  );
}