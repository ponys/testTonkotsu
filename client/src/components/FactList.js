import React from 'react';

function FactList({ facts }) {
  return (
    <div className="fact-list">
      <h2>All Dog Facts</h2>
      {facts.length === 0 ? (
        <p>No facts available.</p>
      ) : (
        <ul>
          {facts.map((fact, index) => (
            <li key={index}>{fact}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FactList;