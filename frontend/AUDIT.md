# Archify — Loyiha Audit Hisoboti

> Sana: 2026-05-03  
> Tahlil qilingan branch: `hayotjon-branch`

---

## Umumiy Ko'rinish

Loyiha **Next.js 15** (App Router) + **Appwrite** + **TypeScript** asosida qurilgan. Tuzilma yaxshi: `actions/`, `components/`, `hooks/`, `lib/` papkalari to'g'ri ajratilgan. Asosiy muammolar — sintaktik xatolar, tugallanmagan funksiyalar va production uchun tayyorlanmagan joylar.

---

## KRITIK XATOLAR

### 1. ESLint konfiguratsiyasida sintaksis xatosi — `eslint.config.mjs`

**Muammo:** `rules` o'rniga `rulees` yozilgan, va kalit nomi noto'g'ri.

```js
// eslint.config.mjs — 14-15 qator (XATO)
{rulees:{
  "t@typescript-eslint/no-explicit-any":"off"
}}
```

**To'g'ri yozilishi:**

```js
{
  rules: {
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

**Ta'sir:** ESLint umuman ishlamaydi, TypeScript qoidalari qo'llanilmaydi.

---

### 2. `getCookie` funksiyasi hech narsa qaytarmaydi — `lib/cookie.ts`

**Muammo:** Funksiya `void` qaytaradi, natijani `return` qilmayapti.

```ts
// lib/cookie.ts — 5-8 qator (XATO)
export async function getCookie(name: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.get(name)  // return yo'q!
}
```

**To'g'ri yozilishi:**

```ts
export async function getCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)
}
```

**Ta'sir:** Cookie o'qib bo'lmaydi — autentifikatsiya sessiyasi ishlamaydi.

---

## YUQORI MUHIMLIK

### 3. OAuth2 redirect URL hardcode qilingan — `components/forms/login.form.tsx`

```ts
// 63-64 qatorlar
successUrl: 'http://localhost:3000',
failureUrl: 'http://localhost:3000',
```

Production muhitida buziladi. `.env` o'zgaruvchisi ishlatilishi kerak:

```ts
successUrl: process.env.NEXT_PUBLIC_APP_URL!,
failureUrl: process.env.NEXT_PUBLIC_APP_URL!,
```

---

### 4. Contact forma backend bilan bog'lanmagan — `components/forms/contact.form.tsx`

```ts
// Faqat console.log, hech qanday API chaqiruvi yo'q
console.log(values)
```

Forma topshirilganda foydalanuvchiga hech narsa yetkazilmaydi — xabar yuborilmaydi.

---

### 5. `console.log` / `console.error` production kodda qolgan

| Fayl | Soni |
|------|------|
| `actions/auth.action.ts` | 2 |
| `actions/user.action.ts` | 3 |
| `actions/otp.action.ts` | 2 |
| `components/forms/login.form.tsx` | 2 |
| `components/forms/register.form.tsx` | 1 |
| `components/forms/forgot-password.form.tsx` | 1 |
| `components/forms/verification.form.tsx` | 3 |
| `components/forms/recovery-password.form.tsx` | 1 |
| `components/forms/contact.form.tsx` | 1 |

Jami: **16 ta** — production build oldidan olib tashlanishi kerak.

---

### 6. `err: any` tipi catch bloklarida — bir nechta fayl

```ts
// YOMON
} catch (err: any) {

// YAXSHI
} catch (err) {
  const message = err instanceof Error ? err.message : 'Xatolik yuz berdi'
```

**Fayllar:** `forgot-password.form.tsx`, `register.form.tsx`, `verification.form.tsx`

---

## O'RTA MUHIMLIK

### 7. `.env.example` fayli yo'q

Loyiha ishlashi uchun quyidagi muhit o'zgaruvchilari talab qilinadi, lekin hech qerda hujjatlashtirilmagan:

```env
APPWRITE_API_KEY=
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_OTPS_COLLECTION_ID=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
NEXT_PUBLIC_APP_URL=
```

---

### 8. `setCookie` funksiyasi ikki joyda aniqlangan

- `lib/cookie.ts` — to'g'ri joy
- `actions/user.action.ts` — 131-136 qator, dublikat

`user.action.ts` dagi nusxani olib tashlash, `lib/cookie.ts` dan import qilish lozim.

---

### 9. Foydalanilmagan importlar

| Fayl | Import |
|------|--------|
| `lib/validations.ts` | `email` (zod'dan) |
| `hooks/use-forgot-password.ts` | `User` turi |

---

### 10. `categories.section.tsx` to'liq emas

Komponent faqat section header render qiladi, tarkib yo'q. Tugallanmagan funksionallik.

---

### 11. Middleware (himoyalangan routelar) yo'q

Foydalanuvchi autentifikatsiyasini talab qiluvchi routelar uchun `middleware.ts` mavjud emas. Hozircha faqat auth layout redirect qiladi, lekin server tomonida himoya yo'q.

---

### 12. Error Boundary yo'q

Komponent xatoligi butun sahifani buzishi mumkin. `app/error.tsx` va `app/global-error.tsx` fayllarini qo'shish tavsiya etiladi.

---

## PAST MUHIMLIK

### 13. Cookie xavfsizligi

Cookie o'rnatilayotganda `httpOnly` va `secure` flaglari ko'rsatilmagan:

```ts
// lib/cookie.ts
cookieStore.set(key, value)

// Tavsiya:
cookieStore.set(key, value, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax'
})
```

---

### 14. Sahifalarda Lorem Ipsum matnlar

- `components/sections/hero.section.tsx`
- `components/sections/about.section.tsx`
- `components/sections/statistics.section.tsx`

Real kontent yoki dinamik ma'lumotlar bilan almashtirilishi kerak.

---

## Xulosa Jadvali

| Daraja | Soni | Holat |
|--------|------|-------|
| Kritik | 2 | Darhol tuzatilsin |
| Yuqori | 4 | Build oldidan tuzatilsin |
| O'rta | 6 | Sprint davomida tuzatilsin |
| Past | 3 | Keyingi iteratsiyada |

---

## Tezkor Tuzatish Tartibi

1. `eslint.config.mjs` — `rulees` → `rules`, `"t@typescript..."` → `"@typescript..."`
2. `lib/cookie.ts` — `getCookie` ga `return` qo'shish
3. `lib/validations.ts` — foydalanilmayan `email` importini olib tashlash
4. `components/forms/login.form.tsx` — hardcoded URL → `process.env.NEXT_PUBLIC_APP_URL`
5. `.env.example` faylini yaratish
6. Barcha `console.log` / `console.error` ni olib tashlash
