# Backend (admin reviews)

Minimal Express backend for storing and managing reviews. Admin-only endpoints require an admin token sent via the `x-admin-token` header or `Authorization: Bearer <token>`.

Quick start:

```powershell
cd backend
npm install
cp .env.example .env
# set a strong token in .env -> ADMIN_TOKEN
npm run dev
```

Endpoints:
- `GET /reviews` - public: returns all reviews
- `POST /reviews` - admin: add a review (body: `{ author, rating:number, text, service }`)
- `PUT /reviews/:id` - admin: update review
- `DELETE /reviews/:id` - admin: delete review

Notes:
- Data is stored in `reviews.json` for simplicity. Replace with a DB for production.
- Protect `ADMIN_TOKEN` and use HTTPS in production.
