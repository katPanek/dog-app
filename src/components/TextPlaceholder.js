import React from 'react';

export function TextPlaceholder({ count }) {
  const countArr = Array.from({ length: count });

  return (
    <>
      {countArr.map((_, i) => (
        <React.Fragment key={i + 'placeholder'}>
          <div className="h5 card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </div>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
          </p>
        </React.Fragment>
      ))}
    </>
  );
}
