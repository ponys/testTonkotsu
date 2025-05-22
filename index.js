const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/dogfact', (req, res) => {
  const facts = [
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
  ];
  
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  
  res.json({ fact: randomFact });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});