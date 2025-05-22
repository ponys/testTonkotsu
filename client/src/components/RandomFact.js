import React, { useState } from 'react';

function RandomFact({ facts }) {
  const [randomFact, setRandomFact] = useState('');
  const [showFact, setShowFact] = useState(false);

  const getRandomFact = () => {
    if (facts.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
    setShowFact(true);
  };

  return (
    <div>
      <button onClick={getRandomFact}>
        Show Random Fact
      </button>
      
      {showFact && randomFact && (
        <div className="random-fact">
          <h2>Random Dog Fact</h2>
          <p>{randomFact}</p>
        </div>
      )}
    </div>
  );
}

export default RandomFact;