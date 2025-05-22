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
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    fetchFacts();
  }, [language]);

  const fetchFacts = async () => {
    try {
      const response = await fetch(`/api/dogfacts?language=${language}`);
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
        body: JSON.stringify({ fact: newFact, language }),
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
        <div className="language-controls">
          <label htmlFor="language-select">Language: </label>
          <select 
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
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