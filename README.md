# Kalkulator Digital

Proyek Kalkulator Digital untuk mata kuliah **Sistem Digital — Semester 8**. Aplikasi ini dibangun menggunakan Next.js 16 dan Tailwind CSS, dengan fokus pada fungsionalitas multi-mode dan desain yang modern serta responsif.

## 🚀 Fitur Utama

Aplikasi ini mendukung 4 mode utama:

1.  **Standard Mode**: Operasi aritmatika dasar (+, -, ×, ÷), persen, akar kuadrat, pangkat dua, dan memori.
2.  **Scientific Mode**: Fungsi trigonometri (sin, cos, tan), logaritma, eksponensial, faktorial, dan konstanta matematika (π, e). Mendukung mode DEG (Degree) dan RAD (Radian).
3.  **Programmer Mode**: Konversi basis bilangan (HEX, DEC, OCT, BIN) secara real-time dan operasi bitwise (AND, OR, XOR, NOT, Lsh, Rsh).
4.  **Converter Mode**: Konversi satuan untuk berbagai kategori seperti Panjang, Berat, Suhu, Luas, dan Kecepatan.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Testing**: Playwright
- **Language**: JavaScript (Vanilla)

## 💻 Cara Menjalankan

### Development Mode
```bash
npm install
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### Production Build
```bash
npm run build
npm run start
```

## 🧪 Pengujian

Proyek ini menggunakan Playwright untuk pengujian otomatis (E2E).

### Menjalankan Semua Test
```bash
npm run test
```

### Menjalankan Test dengan UI
```bash
npm run test:ui
```

---
*Dikembangkan oleh Yogi Prasetyo sebagai bagian dari tugas akademik.*
