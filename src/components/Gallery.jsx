import React from 'react';
import Card from './Card';
import { paintings } from '../paintings.js';

export default function Gallery({ search, filters }) {
  // Теперь мы игнорируем объект filters и смотрим только на search
  const filteredData = paintings.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    
    // Фильтры (artist, location, years) здесь больше не участвуют в return
    return matchSearch; 
  });

  return (
    <div className="grid">
      {filteredData.map(p => <Card key={p.id} painting={p} />)}
    </div>
  );
}