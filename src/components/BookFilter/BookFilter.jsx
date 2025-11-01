import React from 'react';
import './BookFilter.css';

function BookFilter({ currentFilter, onFilterChange }) {
  const filters = ['all', 'milik', 'baca', 'beli'];

  return (
    <div className="book-filter glass-card">
      {filters.map(filter => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default BookFilter;