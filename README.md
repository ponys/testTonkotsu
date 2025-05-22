# Dog Facts API

A simple API that serves random dog facts and allows adding new ones.

## Setup

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server runs on port 3000 by default, or you can set a custom port with the `PORT` environment variable.

## API Endpoints

### Get a Random Dog Fact

```
GET /api/dogfact
```

#### Response

```json
{
  "fact": "Dogs have three eyelids."
}
```

### Get All Dog Facts

```
GET /api/dogfacts
```

#### Response

```json
{
  "facts": [
    "Dogs have three eyelids.",
    "Dogs' noses are wet to help absorb scent chemicals.",
    "The Basenji is the only breed of dog that cannot bark.",
    "..."
  ]
}
```

### Add a New Dog Fact

```
POST /api/dogfact
```

#### Request Body

```json
{
  "fact": "Your new dog fact here"
}
```

#### Response

```json
{
  "message": "Dog fact added successfully",
  "fact": "Your new dog fact here",
  "totalFacts": 11
}
```

#### Error Response

```json
{
  "error": "Invalid fact. Please provide a non-empty string."
}
```

## Data Storage

The API uses [lowdb](https://github.com/typicode/lowdb) to store facts in a file called `db.json`. The database is initialized with a set of default facts if it doesn't exist.