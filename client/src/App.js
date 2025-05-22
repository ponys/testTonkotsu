import React, { useState, useEffect } from 'react';
import FactList from './components/FactList';
import RandomFact from './components/RandomFact';
import FactForm from './components/FactForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFactModalOpen, setIsFactModalOpen] = useState(false);
  
  useEffect(() => {
    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      const response = await fetch('/api/dogfacts');
      const data = await response.json();
      setFacts(data.facts);
    } catch (error) {
      console.error('Error fetching facts:', error);
    }
  };

  const addFact = async (newFact) => {
    try {
      const response = await fetch('/api/dogfact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fact: newFact }),
      });
      
      if (response.ok) {
        fetchFacts();
        setIsFormModalOpen(false);
      }
    } catch (error) {
      console.error('Error adding fact:', error);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Dog Facts</h1>
      </header>
      
      <div className="controls">
        <button onClick={() => setIsFactModalOpen(true)}>
          Show Random Fact
        </button>
        <button 
          className="form-toggle-btn"
          onClick={() => setIsFormModalOpen(true)}
        >
          Add New Fact
        </button>
      </div>
      
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={() => setIsFormModalOpen(false)}
        title="Add New Dog Fact"
      >
        <FactForm onSubmit={addFact} />
      </Modal>
      
      <Modal
        isOpen={isFactModalOpen}
        onClose={() => setIsFactModalOpen(false)}
        title="Random Dog Fact"
      >
        <RandomFact facts={facts} />
      </Modal>
      
      <FactList facts={facts} />
    </div>
  );
}

export default App;