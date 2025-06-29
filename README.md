# 💸 Expense Tracker – CODEXPEDITION Project

Aplikasi pencatat pengeluaran pribadi berbasis **Next.js 15** dan **Supabase** yang membantu kamu memantau keuangan harian dengan fitur input data, filter, dan visualisasi dalam grafik.

🚀 Dibuat dalam rangka belajar fullstack development selama libur semester (**Proyek CODEXPEDITION**)

---

## ✨ Fitur
- Tambah pengeluaran (judul, jumlah, kategori, tanggal)
- Lihat daftar pengeluaran dalam tabel
- Hapus data pengeluaran
- Filter berdasarkan bulan atau kategori (coming soon)
- Visualisasi data pengeluaran (Pie / Bar Chart – coming soon)
- UI responsive dan mobile friendly

---

## 🛠️ Teknologi
- **Next.js 15 (App Router)**
- **Supabase** – database & API
- **Tailwind CSS** – styling

---

## 📦 Setup Lokal

### 1. Clone Repo & Install
```bash
git clone https://github.com/username/expense-tracker.git
cd expense-tracker
npm install
```

### 2. Buat .env.local
Isi dengan data dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx
```
### 3. Jalankan Lokal
```bash
npm run dev
```
Akses di: http://localhost:3000
