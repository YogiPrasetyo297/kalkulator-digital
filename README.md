# 🧮 Kalkulator Digital

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![Playwright](https://img.shields.io/badge/Tested_with-Playwright-45ba4b?logo=playwright)
![License](https://img.shields.io/badge/License-Academic-blue)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)

> Kalkulator berbasis web dengan 4 mode: Standard, Scientific, Programmer, dan Converter.  
> Dibangun dengan Next.js 16 + Tailwind CSS. Responsif di desktop maupun mobile.

🔗 **Live Demo:** [kalkulator-digital.vercel.app](https://kalkulator-digital.vercel.app)

---

## ✨ Fitur

### 🔢 Standard
Operasi dasar: `+` `−` `×` `÷`, persen, akar kuadrat, pangkat dua, inverse, serta **Memory** (MC/MR/M+/M−) dan **History** kalkulasi.

### 🔬 Scientific
Fungsi trigonometri (`sin`, `cos`, `tan`), logaritma (`log`, `ln`), eksponen, faktorial (`n!`), konstanta `π` dan `e`. Mendukung mode **DEG** dan **RAD**.

### 💻 Programmer
Konversi basis bilangan real-time: **HEX / DEC / OCT / BIN**.  
Operasi bitwise: `AND` `OR` `XOR` `NOT` `Lsh` `Rsh`.

### 🔄 Converter
Konversi satuan lintas kategori:
- 📏 Panjang, ⚖️ Berat, 🌡️ Suhu, 📐 Luas, 💨 Kecepatan
- 💾 Data (bit → TB), 📐 Sudut (deg ↔ rad ↔ grad)

---

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|-----------|------------|
| Next.js 16 | App Router, tanpa Turbopack |
| Tailwind CSS | Styling utility-first |
| JavaScript | Vanilla JS, tanpa TypeScript |
| Playwright | End-to-end testing |
| Vercel | Hosting & auto-deploy |

---

## 🚀 Cara Menjalankan Lokal

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

```bash
# Build production
npm run build
npm run start
```

---

## 🧪 Testing

Menggunakan **Playwright** untuk pengujian E2E otomatis.

```bash
# Jalankan semua test
npm run test

# Jalankan dengan UI Playwright
npm run test:ui
```

---

## 📁 Struktur Project

```text
kalkulator-digital/
├── public/              # Aset statis (favicon, logo, dll)
├── src/
│   ├── app/             # Routing & Layout (Next.js App Router)
│   │   ├── globals.css  # Styling global (Tailwind)
│   │   ├── layout.js    # Root layout (Header & Sidebar wrapper)
│   │   └── page.js      # Main page (Logic switch mode)
│   └── components/      # Komponen Kalkulator per Mode
│       ├── Converter.js
│       ├── ProgrammerCalc.js
│       ├── ScientificCalc.js
│       ├── Sidebar.js   # Navigasi mode
│       └── StandardCalc.js
├── tests/               # Automated Tests (Playwright)
├── package.json         # Dependencies & Scripts
└── playwright.config.js # Konfigurasi Playwright
```
