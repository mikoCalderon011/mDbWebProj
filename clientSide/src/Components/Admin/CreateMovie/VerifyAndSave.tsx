import React from 'react';

const VerifyAndSave = ({ movieDetails }) => {
  const detailLabels = {
    original_title: 'Original Title',
    overview: 'Overview',
    imdb_id: 'IMDB ID',
    adult: 'Adult Movie',
    video: 'Video',
    tagline: 'Tagline',
    runtime: 'Runtime',
    budget: 'Budget',
    revenue: 'Revenue',
    webpage: 'Webpage',
  };

  return (
    <div className="verify-and-save">
      <span className="title">Verify And Save</span>
      <div className="details">
        {Object.entries(detailLabels).map(([key, label]) => (
          <span key={key} className="detail">
            {label}:{' '}
            <span className="value">
              {movieDetails[key] || 'N/A'}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default VerifyAndSave;
