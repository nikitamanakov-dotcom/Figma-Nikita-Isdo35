import { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import MobileFilters from './components/MobileFilters';
import { paintings } from './paintings.js';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    artist: '', location: '', yearFrom: '', yearTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Количество карточек на страницу

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  // Сбрасываем на 1 страницу при любом изменении поиска или фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  // Единая логика фильтрации и поиска
  const filteredPaintings = useMemo(() => {
    return paintings.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchArtist = filters.artist ? p.artist === filters.artist : true;
      const matchLocation = filters.location ? p.location === filters.location : true;
      const matchYearFrom = filters.yearFrom ? p.year >= parseInt(filters.yearFrom) : true;
      const matchYearTo = filters.yearTo ? p.year <= parseInt(filters.yearTo) : true;
      
      return matchSearch && matchArtist && matchLocation && matchYearFrom && matchYearTo;
    });
  }, [search, filters]);

  // Вычисляем данные для текущей страницы
  const totalPages = Math.ceil(filteredPaintings.length / itemsPerPage);
  const currentPaintings = filteredPaintings.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setFilters({ artist: '', location: '', yearFrom: '', yearTo: '' });
    setSearch('');
  };

  // Генерация номеров страниц
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="container">
      <Header 
        search={search} 
        setSearch={setSearch} 
        onFilterOpen={() => setShowFilters(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Передаем в Gallery только те картины, которые нужно показать на текущей странице */}
      <Gallery paintings={currentPaintings} />

      {totalPages > 1 && (
        <footer className="pagination">
          <div className="page-numbers">
            <button 
              className="page"
              style={{ border: 'none' }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            
            {pageNumbers.map(num => (
              <button 
                key={num} 
                className={`page ${currentPage === num ? 'active' : ''}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <button 
              className="page"
              style={{ border: 'none' }}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        </footer>
      )}

      {filteredPaintings.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: "'Cormorant SC', serif" }}>
          <h2>No paintings found</h2>
        </div>
      )}

      {showFilters && (
        <MobileFilters 
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
          onClear={handleClearFilters}
        />
      )}
    </div>
  );
}

export default App;