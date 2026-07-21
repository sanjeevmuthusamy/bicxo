# BiCXO Agile Sprint Board

A simplified full-stack Kanban board built with Angular, Express.js, and PostgreSQL.

## Project Structure

- `frontend/` - Angular application
- `backend/` - Express.js REST API
- `database/` - PostgreSQL schema and seed scripts

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

The API starts on `http://localhost:3000`.

Health check:

```bash
GET http://localhost:3000/api/health
```

Task endpoints:

```bash
GET http://localhost:3000/api/tasks
GET http://localhost:3000/api/tasks?assigneeId=user-1
POST http://localhost:3000/api/tasks
PUT http://localhost:3000/api/tasks/:id
PATCH http://localhost:3000/api/tasks/:id/status
```

## Database Setup

Create the PostgreSQL database:

```bash
createdb bicxo_sprint_board
psql -U postgres -d bicxo_sprint_board -f database/schema.sql
psql -U postgres -d bicxo_sprint_board -f database/seed.sql
```
