# Multilingual Greetings API

A Node.js API that provides greetings in multiple languages based on time of day and tone preferences.
VERCEL URL - https://assignment-2-distributed-apps.vercel.app
## Table of Contents
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Error Handling](#error-handling)

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
node index.js
```
The server will run on `http://localhost:3000`

## API Endpoints

### 1. Get Times of Day
Returns all available times of day.

- **URL:** `https://assignment-2-distributed-apps.vercel.app/api/timesOfDay`
- **Method:** `GET`
- **URL Params:** None
- **Success Response:**
  ```json
  {
    "timesOfDay": [
      "Morning",
      "Afternoon",
      "Evening"
    ]
  }
  ```

### 2. Get Supported Languages
Returns all supported languages.

- **URL:** `https://assignment-2-distributed-apps.vercel.app/api/languages`
- **Method:** `GET`
- **URL Params:** None
- **Success Response:**
  ```json
  {
    "languages": [
      "English",
      "French",
      "Spanish"
    ]
  }
  ```

### 3. Get Available Tones
Returns all available tones.

- **URL:** `https://assignment-2-distributed-apps.vercel.app/api/tones`
- **Method:** `GET`
- **URL Params:** None
- **Success Response:**
  ```json
  {
    "tones": [
      "Casual",
      "Formal"
    ]
  }
  ```

### 4. Get Greeting
Returns a greeting based on the provided parameters.

- **URL:** `https://assignment-2-distributed-apps.vercel.app/api/greet`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Request Body:**
  ```json
  {
    "timeOfDay": "Morning",
    "language": "English",
    "tone": "Formal"
  }
  ```
- **Success Response:**
  ```json
  {
    "greetingMessage": "I wish you a pleasant morning"
  }
  ```

## Examples

### Example 1: Getting a Formal Morning Greeting in English
**Request:**
```bash
curl -X POST https://assignment-2-distributed-apps.vercel.app/api/greet \
-H "Content-Type: application/json" \
-d '{
    "timeOfDay": "Morning",
    "language": "English",
    "tone": "Formal"
}'
```

**Response:**
```json
{
    "greetingMessage": "I wish you a pleasant morning"
}
```

### Example 2: Getting a Casual Evening Greeting in Spanish
**Request:**
```bash
curl -X POST https://assignment-2-distributed-apps.vercel.app/api/greet \
-H "Content-Type: application/json" \
-d '{
    "timeOfDay": "Evening",
    "language": "Spanish",
    "tone": "Casual"
}'
```

**Response:**
```json
{
    "greetingMessage": "Buenas noches"
}
```

## Error Handling

The API returns appropriate error messages for various scenarios:

### 1. Invalid Time of Day
```json
{
    "error": "Greeting not found",
    "details": "No greeting found for timeOfDay: Midnight, language: English, tone: Formal"
}
```

### 2. Missing Required Fields
```json
{
    "errors": [
        "timeOfDay is required"
    ]
}
```

### 3. Invalid Language
```json
{
    "error": "Greeting not found",
    "details": "No greeting found for timeOfDay: Morning, language: German, tone: Formal"
}
