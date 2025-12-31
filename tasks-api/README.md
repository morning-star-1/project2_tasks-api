# Tasks API

Tasks API is a small REST service for task management, aimed at demos and API practice, with Swagger docs included.

## Quickstart
### Prerequisites
- Node.js 20+
- npm

### Run locally
```bash
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:3000/docs` for Swagger UI.

## Configuration
- `PORT` (default 3000)
- `JWT_SECRET` (placeholder in `.env.example`, update before real use)
- `NODE_ENV`

## Tests
```bash
npm test
```
