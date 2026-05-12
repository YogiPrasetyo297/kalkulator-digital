# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-ux.spec.js >> UI/UX & Layout Verification >> Responsivitas Mobile >> 4 tombol sidebar tetap visible dan dapat diklik di mobile
- Location: tests\ui-ux.spec.js:18:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Standard' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button', { name: 'Standard' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e5]:
      - generic [ref=e6]:
        - paragraph [ref=e7]: Kalkulator Digital
        - generic [ref=e9]:
          - button "Buka menu" [active] [ref=e10]:
            - img [ref=e11]
          - generic [ref=e13]:
            - heading "Standard Mode" [level=1] [ref=e14]
            - paragraph [ref=e15]: Kalkulasi dasar dengan memory dan history perhitungan
      - generic [ref=e18]:
        - generic [ref=e19]:
          - button "Lihat history" [ref=e21]:
            - img [ref=e22]
          - paragraph [ref=e24]: Display
          - paragraph [ref=e25]: "0"
        - generic [ref=e26]:
          - generic [ref=e27]:
            - button "MC" [ref=e28]
            - button "MR" [disabled] [ref=e29]
            - button "M-" [disabled] [ref=e30]
            - button "M+" [ref=e31]
          - generic [ref=e32]:
            - button "⌫" [ref=e33]
            - button "C" [ref=e34]
            - button "±" [ref=e35]
            - button "%" [ref=e36]
          - generic [ref=e37]:
            - button "7" [ref=e38]
            - button "8" [ref=e39]
            - button "9" [ref=e40]
            - button "÷" [ref=e41]
          - generic [ref=e42]:
            - button "4" [ref=e43]
            - button "5" [ref=e44]
            - button "6" [ref=e45]
            - button "×" [ref=e46]
          - generic [ref=e47]:
            - button "1" [ref=e48]
            - button "2" [ref=e49]
            - button "3" [ref=e50]
            - button "-" [ref=e51]
          - generic [ref=e52]:
            - button "0" [ref=e53]
            - button "." [ref=e54]
            - button "=" [ref=e55]
            - button "+" [ref=e56]
  - button "Open Next.js Dev Tools" [ref=e62] [cursor=pointer]:
    - img [ref=e63]
  - alert [ref=e66]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("UI/UX & Layout Verification", () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto("/");
  6   |   });
  7   | 
  8   |   test.describe("Responsivitas Mobile", () => {
  9   |     test.use({ viewport: { width: 375, height: 667 } });
  10  | 
  11  |     test("tidak ada overflow horizontal pada body", async ({ page }) => {
  12  |       const overflow = await page.evaluate(() => {
  13  |         return document.body.scrollWidth > document.body.clientWidth;
  14  |       });
  15  |       expect(overflow).toBe(false);
  16  |     });
  17  | 
  18  |     test("4 tombol sidebar tetap visible dan dapat diklik di mobile", async ({ page }) => {
  19  |       const modes = ["Standard", "Scientific", "Programmer", "Converter"];
  20  |       for (const mode of modes) {
  21  |         // Di mobile, buka menu dulu karena sidebar hidden
  22  |         await page.getByRole("button", { name: "Buka menu" }).click();
  23  |         const btn = page.getByRole("button", { name: mode });
> 24  |         await expect(btn).toBeVisible();
      |                           ^ Error: expect(locator).toBeVisible() failed
  25  |         await btn.click();
  26  |         // Gunakan h1 (Mode title) agar lebih spesifik
  27  |         await expect(
  28  |           page.getByRole("heading", { name: new RegExp(mode, "i"), level: 1 })
  29  |         ).toBeVisible();
  30  |       }
  31  |     });
  32  |   });
  33  | 
  34  |   test.describe("Switch Mode — State Reset", () => {
  35  |     test("Standard -> Scientific: display reset ke 0", async ({ page }) => {
  36  |       // Input angka di standard
  37  |       await page.getByRole("button", { name: "1", exact: true }).click();
  38  |       await page.getByRole("button", { name: "2", exact: true }).click();
  39  |       await expect(page.getByTestId("display")).toHaveText("12");
  40  | 
  41  |       // Pindah mode
  42  |       await page.getByRole("button", { name: "Scientific" }).click();
  43  |       await expect(page.getByTestId("display")).toHaveText("0");
  44  |     });
  45  | 
  46  |     test("Scientific -> Programmer: display reset ke 0", async ({ page }) => {
  47  |       await page.getByRole("button", { name: "Scientific" }).click();
  48  |       await page.getByRole("button", { name: "π" }).click();
  49  |       await expect(page.getByTestId("display")).not.toHaveText("0");
  50  | 
  51  |       await page.getByRole("button", { name: "Programmer" }).click();
  52  |       await expect(page.getByTestId("display")).toHaveText("0");
  53  |     });
  54  | 
  55  |     test("Programmer -> Standard: display reset ke 0", async ({ page }) => {
  56  |       await page.getByRole("button", { name: "Programmer" }).click();
  57  |       await page.getByRole("button", { name: "5" }).click();
  58  |       await expect(page.getByTestId("display")).toHaveText("5");
  59  | 
  60  |       await page.getByRole("button", { name: "Standard" }).click();
  61  |       await expect(page.getByTestId("display")).toHaveText("0");
  62  |     });
  63  |   });
  64  | 
  65  |   test.describe("Display Overflow", () => {
  66  |     test("input 15 digit di Standard tidak meluber", async ({ page }) => {
  67  |       for (let i = 0; i < 15; i++) {
  68  |         await page.getByRole("button", { name: "9" }).click();
  69  |       }
  70  |       
  71  |       const isOverflowing = await page.getByTestId("display").evaluate((el) => {
  72  |         return el.scrollWidth > el.offsetWidth;
  73  |       });
  74  |       expect(isOverflowing).toBe(false);
  75  |     });
  76  | 
  77  |     test("teks Error tidak terpotong", async ({ page }) => {
  78  |       // 1 / 0 = Error
  79  |       await page.getByRole("button", { name: "1", exact: true }).click();
  80  |       await page.getByRole("button", { name: "÷", exact: true }).click();
  81  |       await page.getByRole("button", { name: "0", exact: true }).click();
  82  |       await page.getByRole("button", { name: "=", exact: true }).click();
  83  |       
  84  |       const display = page.getByTestId("display");
  85  |       await expect(display).toHaveText("Error");
  86  |       
  87  |       const isOverflowing = await display.evaluate((el) => {
  88  |         return el.scrollWidth > el.offsetWidth;
  89  |       });
  90  |       expect(isOverflowing).toBe(false);
  91  |     });
  92  |   });
  93  | 
  94  |   test.describe("Tombol Disabled — Visual State", () => {
  95  |     test("Programmer DEC: tombol A-F disabled", async ({ page }) => {
  96  |       await page.getByRole("button", { name: "Programmer" }).click();
  97  |       // Pastikan di mode DEC (default)
  98  |       const btnA = page.getByRole("button", { name: "A", exact: true });
  99  |       await expect(btnA).toBeDisabled();
  100 |       
  101 |       const btnF = page.getByRole("button", { name: "F", exact: true });
  102 |       await expect(btnF).toBeDisabled();
  103 |     });
  104 |   });
  105 | 
  106 |   test.describe("Keyboard Navigation", () => {
  107 |     test("tombol Standard bisa difokus via Tab", async ({ page }) => {
  108 |       // Focus element pertama
  109 |       await page.keyboard.press("Tab");
  110 |       
  111 |       // Kita asumsikan tombol sidebar atau kalkulator mendapat fokus
  112 |       // Kita cek apakah ada element yang aktif yang merupakan button
  113 |       const activeElementTagName = await page.evaluate(() => document.activeElement.tagName);
  114 |       expect(activeElementTagName).toBe("BUTTON");
  115 |     });
  116 |   });
  117 | 
  118 |   test.describe("History — Standard Mode", () => {
  119 |     test.beforeEach(async ({ page }) => {
  120 |       await page.goto("/");
  121 |       // Bersihkan localStorage sebelum tiap test
  122 |       await page.evaluate(() => localStorage.removeItem('calc-history'));
  123 |       await page.reload();
  124 |     });
```