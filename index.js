const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Set up database
const adapter = new FileSync('db.json');
const db = low(adapter);

// Add body parser middleware
app.use(express.json());

// Helper function to translate text using MyMemory API
async function translateText(text, langPair) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`
    );
    const data = await response.json();
    if (data.responseStatus === 200) {
      return data.responseData.translatedText;
    }
    console.error('Translation error:', data.responseStatus, data.responseDetails);
    return text; // Return original text if translation fails
  } catch (error) {
    console.error('Translation service error:', error);
    return text; // Return original text if translation fails
  }
}

// Initialize the database with default data if it's empty
db.defaults({ facts: [
  "Dogs have three eyelids.",
  "Dogs' noses are wet to help absorb scent chemicals.",
  "The Basenji is the only breed of dog that cannot bark.",
  "A dog's sense of smell is 10,000 times stronger than humans.",
  "Greyhounds can run up to 45 miles per hour.",
  "Dalmatian puppies are born completely white.",
  "Dogs have about 1,700 taste buds, humans have approximately 9,000.",
  "The Labrador Retriever has been the most popular dog breed in the U.S. for many years.",
  "Dogs' sweat glands are primarily located in their paw pads.",
  "The average dog can understand around 165 words."
]}).write();

app.get('/api/dogfact', async (req, res) => {
  const { language } = req.query;
  const facts = db.get('facts').value();
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  
  if (language && language !== 'en') {
    try {
      const translatedFact = await translateText(randomFact, `en|${language}`);
      res.json({ fact: translatedFact, language });
    } catch (error) {
      console.error('Translation error:', error);
      res.json({ fact: randomFact, language, translationError: true });
    }
  } else {
    res.json({ fact: randomFact, language: language || 'en' });
  }
});

// Add new endpoint to get all facts
app.get('/api/dogfacts', async (req, res) => {
  const { language } = req.query;
  const facts = db.get('facts').value();
  
  if (language && language !== 'en') {
    try {
      const translationPromises = facts.map(fact => 
        translateText(fact, `en|${language}`)
      );
      const translatedFacts = await Promise.all(translationPromises);
      res.json({ facts: translatedFacts, language });
    } catch (error) {
      console.error('Translation error:', error);
      res.json({ facts, language, translationError: true });
    }
  } else {
    res.json({ facts, language: language || 'en' });
  }
});

// Add new endpoint to add a dog fact
app.post('/api/dogfact', async (req, res) => {
  const { fact, language } = req.body;
  
  if (!fact || typeof fact !== 'string' || fact.trim() === '') {
    return res.status(400).json({ error: 'Invalid fact. Please provide a non-empty string.' });
  }
  
  let factToStore = fact;
  
  // If the fact is in a different language, translate it to English before storing
  if (language && language !== 'en') {
    try {
      factToStore = await translateText(fact, `${language}|en`);
    } catch (error) {
      console.error('Translation error:', error);
      // Continue with the original text if translation fails
    }
  }
  
  // Add the new fact to our collection
  db.get('facts').push(factToStore).write();
  
  const totalFacts = db.get('facts').size().value();
  
  res.status(201).json({ 
    message: 'Dog fact added successfully',
    fact: factToStore,
    originalFact: fact,
    language: language || 'en',
    totalFacts
  });
});

// Serve static files from the React app if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});