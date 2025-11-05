# Backend (online-grocery)

## Setup
1. cd backend
2. npm install
3. Edit .env if needed (already included)
4. npm run dev

Routes:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/me (protected, requires Authorization: Bearer <token>)
