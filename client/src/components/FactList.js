import React, { useState } from 'react';
import Modal from './Modal';

function FactList({ facts }) {
  const [selectedFact, setSelectedFact] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showFactDetail = (fact) => {
    setSelectedFact(fact);
    setIsModalOpen(true);
  };

  return (
    <div className="fact-list">
      <h2>All Dog Facts</h2>
      {facts.length === 0 ? (
        <p>No facts available.</p>
      ) : (
        <ul>
          {facts.map((fact, index) => (
            <li key={index} onClick={() => showFactDetail(fact)}>
              {fact}
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dog Fact"
      >
        <div className="fact-detail">
          <p>{selectedFact}</p>
        </div>
      </Modal>
    </div>
  );
}

export default FactList;