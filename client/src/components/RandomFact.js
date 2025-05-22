import React, { useState, useEffect } from 'react';

function RandomFact({ facts }) {
  const [randomFact, setRandomFact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Automatically select a random fact when the modal opens
  useEffect(() => {
    if (facts.length === 0) return;
    setIsLoading(true);
    
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
    setIsLoading(false);
  }, [facts]);
  
  // Function to get a different random fact
  const getNewRandomFact = () => {
    if (facts.length <= 1) return;
    
    let newIndex;
    let currentFact = randomFact;
    
    // Make sure we get a different fact
    do {
      newIndex = Math.floor(Math.random() * facts.length);
    } while (facts[newIndex] === currentFact && facts.length > 1);
    
    setRandomFact(facts[newIndex]);
  };

  if (facts.length === 0) {
    return <p>No facts available.</p>;
  }

  return (
    <div className="random-fact-container">
      {isLoading ? (
        <p>Loading fact...</p>
      ) : (
        <>
          <p className="random-fact-text">{randomFact}</p>
          <button onClick={getNewRandomFact} className="next-fact-btn">
            Show Another Fact
          </button>
        </>
      )}
    </div>
  );
}

export default RandomFact;