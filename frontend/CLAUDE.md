# Archify — Claude uchun loyiha konteksti

## Loyiha haqida
Archify — arxitektura platformasi. Next.js 15 (frontend) + NestJS (backend).

## Muhim: auth email emas, PHONE ishlatadi
Login va register da `email` o'rniga `phone` (+998XXXXXXXXX format).

## Backend
- **Papka:** `C:\Users\x.sultanov\Downloads\Telegram Desktop\ArxPro-Backend-main\ArxPro-Backend-main`
- **Port:** 5000
- **Env:** `NEXT_PUBLIC_API_URL=http://localhost:5000`
- **Global prefix:** `/api`

### Auth endpointlar
| Method | URL | Body |
|--------|-----|------|
| POST | `/api/auth/login` | `{ phone, password }` |
| POST | `/api/auth/register` | `{ phone, password, nickName?, role? }` |
| POST | `/api/auth/send-sms` | `{ phone, nickName? }` |
| POST | `/api/auth/verify-code` | `{ phone, code }` |
| POST | `/api/user/forget-password` | `{ phone, password }` |
| GET | `/api/user/:id` | Bearer token kerak |

### Response format
```json
{ "message": "...", "statusCode": 200, "data": {...}, "error": null }
```

### JWT payload
```json
{ "id": "uuid", "role": "user|admin|architektor" }
```

## Frontend autentifikatsiya
- JWT token → `access_token` cookie da (httpOnly)
- Login bo'lgach `router.replace('/')` bilan bosh sahifaga o'tadi
- Dashboard page hozircha yo'q

## User type
```ts
interface User {
  id?: string
  phone: string
  role: string
  nickName?: string
  email?: string
  password?: string
}
```

## .env.local
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
