import { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import MobileFilters from './components/MobileFilters';
import './index.css';

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    artist: '', location: '', yearFrom: '', yearTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div className="container">
      <Header 
        search={search} 
        setSearch={setSearch} 
        onFilterOpen={() => setShowFilters(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <Gallery search={search} filters={filters} />

      <footer className="pagination">
        <div className="page-numbers">
          <p>‹</p>
          <button className="page active">1</button>
          <button className="page">2</button>
          <button className="page">3</button>
          <span className="page">...</span>
          <button className="page">9</button>
          <p>›</p>
        </div>
      </footer>

      {showFilters && (
        <MobileFilters 
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}

export default App;