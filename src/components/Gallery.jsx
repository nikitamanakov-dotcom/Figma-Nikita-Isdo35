import React from 'react';
import Card from './Card';

export default function Gallery({ paintings }) {
  return (
    <div className="grid">
      {paintings.map(p => <Card key={p.id} painting={p} />)}
    </div>
  );
}