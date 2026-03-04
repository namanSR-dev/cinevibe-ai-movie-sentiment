# CineVibe — AI Movie Sentiment Analyzer

CineVibe is an AI-powered movie review analysis platform that collects real audience reviews and generates structured sentiment insights using a Large Language Model.

The system demonstrates how modern applications can combine **external APIs, AI models, and progressive UI rendering** to transform unstructured text into meaningful insights.

This project was developed to demonstrate strong skills in:

- Full-stack development
- API orchestration
- AI integration
- System design
- Error handling
- Unit testing
- Developer documentation

---

# System Architecture

The platform follows a clean service pipeline that orchestrates multiple APIs and an AI model.

![System Architecture](./public/User%20Sentiment%20Analysis-2026-03-04-152225.svg)

High-level flow:

User Input
→ Movie Metadata (OMDb API)
→ Audience Reviews (TMDB API)
→ Review Sanitization
→ AI Sentiment Analysis (Gemini)
→ Structured Insights

---

# Key Features

## Movie Metadata Retrieval

Movie details are fetched using the **OMDb API**.

Metadata includes:

- Title
- Poster
- Release date
- Director
- Genre
- Runtime
- Cast
- IMDb rating
- Plot summary

The metadata is displayed immediately to provide fast feedback to the user.

---

## Audience Review Collection

The system collects real audience reviews from **TMDB**.

Since TMDB does not directly accept IMDb IDs, the system performs a conversion:

IMDb ID → TMDB Movie ID

Reviews are then retrieved using the TMDB identifier.

---

## AI Sentiment Analysis

Audience reviews are analyzed using **Google Gemini AI**.

The model produces structured insights including:

- Overall sentiment
- Confidence level
- Summary of audience opinion
- Key strengths highlighted by viewers
- Common weaknesses mentioned in reviews

The AI output is parsed into a structured format before being rendered in the UI.

---

## Progressive UI Rendering

To improve perceived performance, the application uses a **progressive loading strategy**.

1. Movie metadata loads first
2. AI analysis runs in the background
3. Sentiment insights appear once analysis completes

Skeleton loaders and animations provide visual feedback during processing.

---

## Robust Error Handling

The system includes structured error handling to provide meaningful feedback to users.

Examples handled:

- Invalid IMDb ID
- Movie not found
- No audience reviews available
- AI analysis failure
- Network errors

Errors are displayed using **toast notifications** to maintain a clean UI.

---

# Project Architecture

```
app/
├ api/
│ ├ movie/
│ └ sentiment/

components/
├ movieCard
├ sentimentCard
├ skeleton loaders

lib/
├ api/
│ ├ omdb.ts
│ └ tmdb.ts
│
├ ai/
│ └ gemini.ts
│
└ utils/
├ validation.ts
└ parser.ts

types/
├ movie.ts
└ sentiment.ts

tests/
├ validation.test.ts
├ parser.test.ts
└ tmdb.test.ts
```

Each module has a clearly defined responsibility which helps maintain clean separation of concerns.

---

# Technology Stack

Frontend

- Next.js (App Router)
- TypeScript
- TailwindCSS
- shadcn/ui
- Framer Motion

Backend

- Next.js API Routes

External APIs

- OMDb API — movie metadata
- TMDB API — audience reviews
- Google Gemini — AI sentiment analysis

Testing

- Vitest — unit testing framework

---

# Unit Testing

The project includes unit tests to validate important logic within the system.

Tests focus on **pure functions and data transformations** rather than UI components.

### IMDb Validation

Ensures user input follows valid IMDb ID format.

Example:

```
tt0133093 → valid
tt123 → invalid
```

---

### Review Sanitization

Ensures review data is cleaned before sending it to the AI model.

The process:

- removes empty reviews
- trims whitespace
- limits review count to control token usage

---

### AI Response Parsing

Ensures AI output is safely converted into the expected sentiment format.

This prevents malformed responses from breaking the system.

---

# Performance Considerations

Several design decisions were implemented to keep the system responsive.

- Progressive data loading
- Skeleton loaders for perceived speed
- Review limiting before AI inference
- Clean API separation
- Defensive error handling

These ensure the system remains usable even when AI processing takes longer.

---

# Running the Project

Clone the repository:

git clone `https://github.com/namanSR-dev/cinevibe-ai-movie-sentiment.git`

Install dependencies:

npm install

Create environment variables:

```
OMDB_API_KEY=your_key
TMDB_API_KEY=your_key
GEMINI_API_KEY=your_key
```

Run the development server:

```
npm run dev
```

Run unit tests:
```
npm run test
```

---

# Engineering Notes

Several architectural decisions were made intentionally.

### API Separation

Movie metadata and AI analysis use different API routes.
This allows the UI to render partial results quickly.

### AI Response Validation

AI outputs are parsed and validated before rendering to prevent malformed responses from affecting the UI.

### Review Limiting

The number of reviews sent to the AI model is capped to control token usage and reduce latency.

---

# Potential Future Improvements

Possible production enhancements include:

- API response caching
- Rate limiting
- Movie search by title
- Historical sentiment tracking
- Improved AI summarization strategies

---

# Author

***Naman Singh***
B.Tech Computer Science & Engineering

***email***: namansingh99694@gmail.com

This project demonstrates full-stack development practices, structured API orchestration, and responsible integration of AI systems.

---
