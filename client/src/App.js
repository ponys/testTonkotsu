import React, { useState, useEffect } from 'react';
import FactList from './components/FactList';
import RandomFact from './components/RandomFact';
import FactForm from './components/FactForm';
import './App.css';

function App() {
  const [facts, setFacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  
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
        setShowForm(false);
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
        <RandomFact facts={facts} />
        <button 
          className="form-toggle-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add New Fact'}
        </button>
      </div>
      
      {showForm && <FactForm onSubmit={addFact} />}
      
      <FactList facts={facts} />
    </div>
  );
}

export default App;