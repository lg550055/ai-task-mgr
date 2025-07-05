# Task Manager App
A full-stack task management application built with **React**, **Express**, and **SQLite**. Users can securely log in, manage their tasks, and receive AI-powered suggestions to boost productivity.

---
## Approach and Trade-offs for current version
1. Priority given to have fully working backend and frontend, which left the following for follow up commit:
    - Style
    - Actual AI suggestions
2. To expedite development used SQLLite locally
3. Kept architecture as simple as possible:
    - Backend: express + sqllite
    - Frontend: react + (tailwind css)
    - Simple authentication

---
## Features
- User authentication with sessions (Express + SQLite)
- Task CRUD (create, update, complete, delete)
- Due date handling
- Active/completed task filtering
- AI-generated task suggestions (OpenAI or fallback) <- live suggestions coming soon
- Fully responsive layout (Tailwind CSS) <- coming soon
- Filter preference persists via `localStorage`

---
## Tech Stack
### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js (Express)
- SQLite
- Express-session
- OpenAI SDK

---
## Setup Instructions
### 1. Clone the repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run dev  # or node server.js
```

> Login credentials:
> - alice / alice123
> - bob / bob123

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: [http://localhost:5173](http://localhost:5173)  
Backend runs at: [http://localhost:4000](http://localhost:4000)

---
## Environment Variables
### `.env` (Backend)
```
PORT=4000
SESSION_SECRET=your_session_secret
OPENAI_API_KEY=sk-...
```

---
## API Endpoints

| Method | Route            | Description                      |
|--------|------------------|----------------------------------|
| POST   | /auth/login      | User login                       |
| POST   | /auth/logout     | User logout                      |
| GET    | /tasks           | Get user tasks                   |
| POST   | /tasks           | Create new task                  |
| PATCH  | /tasks/:id       | Update task                      |
| DELETE | /tasks/:id       | Delete task                      |
| POST   | /ai/suggest      | Get AI task suggestions          |

---
## AI Suggestions - Currently mock suggestions
- Uses OpenAI GPT-3.5 if `OPENAI_API_KEY` is set in `.env`
- Falls back to mock suggestions if API fails

---
## Deployment - to be implemented
- Frontend: Vercel, Netlify, or static host
- Backend: Render, Railway, or Node host

---
## License
MIT © 2025 Leopoldo Gonzalez
