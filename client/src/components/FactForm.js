import React, { useState } from 'react';

function FactForm({ onSubmit }) {
  const [newFact, setNewFact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newFact.trim()) {
      onSubmit(newFact);
      setNewFact('');
    }
  };

  return (
    <div className="fact-form">
      <h2>Add New Dog Fact</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fact">New Fact:</label>
          <textarea
            id="fact"
            value={newFact}
            onChange={(e) => setNewFact(e.target.value)}
            placeholder="Enter a new dog fact"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default FactForm;