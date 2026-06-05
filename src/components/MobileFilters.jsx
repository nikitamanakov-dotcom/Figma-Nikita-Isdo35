import React from 'react';
import { paintings } from '../paintings.js';

export default function MobileFilters({ onClose, filters, setFilters, onClear }) {
  // Динамически получаем уникальных художников и локации из базы данных
  const artists = [...new Set(paintings.map(p => p.artist))].sort();
  const locations = [...new Set(paintings.map(p => p.location))].sort();

  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <button className="close-menu" onClick={onClose}>✕</button>
        </div>

        <div className="mobile-filters">
          <details className="filter-group-mobile" open>
            <summary>ARTIST <span className="toggle-icon"></span></summary>
            <select 
              className="custom-select-mobile"
              value={filters.artist}
              onChange={(e) => setFilters({...filters, artist: e.target.value})}
            >
              <option value="">All artists</option>
              {artists.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </details>

          <details className="filter-group-mobile" open>
            <summary>LOCATION <span className="toggle-icon"></span></summary>
            <select 
              className="custom-select-mobile"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="">All locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </details>

          <details className="filter-group-mobile" open>
            <summary>YEARS <span className="toggle-icon"></span></summary>
            <div className="years-inputs-mobile">
              <input 
                type="number" placeholder="From" 
                value={filters.yearFrom}
                onChange={(e) => setFilters({...filters, yearFrom: e.target.value})}
              />
              <input 
                type="number" placeholder="To" 
                value={filters.yearTo}
                onChange={(e) => setFilters({...filters, yearTo: e.target.value})}
              />
            </div>
          </details>
        </div>

        <div className="mobile-menu-actions">
          <button className="btn-primary-mobile" onClick={onClose}>SHOW RESULTS</button>
          <button className="btn-secondary-mobile" onClick={() => { onClear(); onClose(); }}>CLEAR</button>
        </div>
      </div>
    </div>
  );
}