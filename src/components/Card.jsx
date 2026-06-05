import React from 'react';

export default function Card({ painting }) {
  return (
    <div className="card">
      <div className="card-inner">
        <img src={painting.image} alt={painting.title} />
      </div>
      <div className="card-content">
        <div className="content-flex-wrapper">
          <div className="text-container">
            <div className="text-wrapper">
              <div className="state-default">
                <h3 className="main-title">{painting.title}</h3>
                <p className="year">{painting.year}</p>
              </div>
              <div className="state-hover">
                <h3 className="hover-title">{painting.artist}</h3>
                <p className="year hover-location">{painting.location}</p>
              </div>
            </div>
          </div>
          {/* Эта стрелочка теперь всегда в разметке */}
          <div className="mobile-arrow">→</div>
        </div>
      </div>
    </div>
  );
}