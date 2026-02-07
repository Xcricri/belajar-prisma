# 🚀 My Project

Aplikasi web modern yang dibangun menggunakan **Next.js**, **Prisma ORM**, **Clerk Authentication**, dan **DaisyUI**.

---

## ✨ Fitur Utama

- 🔐 **Autentikasi**: Terintegrasi dengan [Clerk](https://clerk.com/) untuk manajemen user yang aman.
- 🗄️ **ORM**: Menggunakan [Prisma](https://www.prisma.io/) untuk interaksi database yang efisien.
- 🎨 **Styling**: Tampilan menarik dengan [Tailwind CSS](https://tailwindcss.com/) dan [DaisyUI](https://daisyui.com/).
- ⚡ **Framework**: [Next.js](https://nextjs.org/) untuk performa tinggi dan SEO friendly.

---

## 1️⃣ Prasyarat

Pastikan kamu sudah menginstal:

- [Node.js v18+](https://nodejs.org/)
- [npm](https://www.npmjs.com/) atau [pnpm](https://pnpm.io/)
- Akun [Clerk](https://clerk.com/) untuk mendapatkan API Keys.

---

## 2️⃣ Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/Xcricri/belajar-prisma.git
   cd my-app
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

---

## 3️⃣ Konfigurasi .env

Buat file `.env` di root direktori. Kamu bisa menyalin dari `.env.example` jika tersedia:

```env
# Database
DATABASE_URL="file:./dev.db"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# App Config
APP_URL=http://localhost:3000
```

---

## 4️⃣ Setup Database

Inisialisasi database dan generate Prisma client:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## 5️⃣ Jalankan Aplikasi

Mode pengembangan:

```bash
npm run dev
```

Aplikasi akan tersedia di: [http://localhost:3000](http://localhost:3000)

---

## 📂 Struktur Folder

```text
app/          # Route & tampilan Next.js
lib/          # Konfigurasi library (Shared Prisma client)
prisma/       # Schema & file migrasi database
public/       # File statis (Gambar, dll)
```

---

## 📜 Perintah Berguna

| Perintah            | Deskripsi                            |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Menjalankan server development       |
| `npm run build`     | Membuat build produksi               |
| `npx prisma studio` | Membuka GUI database (Prisma Studio) |
| `npx prisma format` | Merapikan file schema.prisma         |

## Sekian dari saya terimakasih
