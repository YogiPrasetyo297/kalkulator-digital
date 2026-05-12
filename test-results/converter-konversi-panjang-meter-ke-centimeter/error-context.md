# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: converter.spec.js >> konversi panjang meter ke centimeter
- Location: tests\converter.spec.js:33:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('converter')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('converter')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - complementary [ref=e4]:
        - generic [ref=e5]:
          - paragraph [ref=e6]: Navigation
          - heading "Calculator" [level=2] [ref=e7]
          - paragraph [ref=e8]: Pilih mode kalkulator untuk melihat area kerja yang akan dikembangkan.
        - navigation [ref=e9]:
          - button "Standard" [ref=e10]:
            - generic [ref=e11]: Mode 1
            - generic [ref=e12]: Standard
          - button "Scientific" [ref=e13]:
            - generic [ref=e14]: Mode 2
            - generic [ref=e15]: Scientific
          - button "Programmer" [ref=e16]:
            - generic [ref=e17]: Mode 3
            - generic [ref=e18]: Programmer
          - button "Converter" [active] [ref=e19]:
            - generic [ref=e20]: Mode 4
            - generic [ref=e21]: Converter
      - generic [ref=e23]:
        - generic [ref=e24]:
          - paragraph [ref=e25]: Kalkulator Digital
          - generic [ref=e28]:
            - heading "Standard Mode" [level=1] [ref=e29]
            - paragraph [ref=e30]: Kalkulasi dasar dengan memory dan history perhitungan
        - generic [ref=e32]:
          - generic [ref=e33]:
            - generic [ref=e34]:
              - paragraph [ref=e35]: Display
              - paragraph [ref=e36]: "0"
            - generic [ref=e37]:
              - generic [ref=e38]:
                - button "MC" [ref=e39]
                - button "MR" [disabled] [ref=e40]
                - button "M-" [disabled] [ref=e41]
                - button "M+" [ref=e42]
              - generic [ref=e43]:
                - button "⌫" [ref=e44]
                - button "C" [ref=e45]
                - button "±" [ref=e46]
                - button "%" [ref=e47]
              - generic [ref=e48]:
                - button "7" [ref=e49]
                - button "8" [ref=e50]
                - button "9" [ref=e51]
                - button "÷" [ref=e52]
              - generic [ref=e53]:
                - button "4" [ref=e54]
                - button "5" [ref=e55]
                - button "6" [ref=e56]
                - button "×" [ref=e57]
              - generic [ref=e58]:
                - button "1" [ref=e59]
                - button "2" [ref=e60]
                - button "3" [ref=e61]
                - button "-" [ref=e62]
              - generic [ref=e63]:
                - button "0" [ref=e64]
                - button "." [ref=e65]
                - button "=" [ref=e66]
                - button "+" [ref=e67]
          - complementary [ref=e68]:
            - heading "Memory & History" [level=3] [ref=e69]
            - generic [ref=e70]:
              - button "MC" [ref=e71]
              - button "MR" [disabled] [ref=e72]
              - button "M-" [disabled] [ref=e73]
              - button "M+" [ref=e74]
            - heading "History" [level=3] [ref=e75]
            - generic [ref=e76]: Belum ada data.
  - button "Open Next.js Dev Tools" [ref=e82] [cursor=pointer]:
    - img [ref=e83]
  - alert [ref=e86]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | async function openConverter(page) {
  4  |   await page.goto("/");
  5  |   await page.getByRole("button", { name: /Converter/i }).click();
  6  |   const converter = page.getByTestId("converter");
> 7  |   await expect(converter).toBeVisible();
     |                           ^ Error: expect(locator).toBeVisible() failed
  8  |   return converter;
  9  | }
  10 | 
  11 | test("0°C = 32°F", async ({ page }) => {
  12 |   const converter = await openConverter(page);
  13 | 
  14 |   await converter.getByRole("button", { name: "Suhu" }).click();
  15 |   await converter.locator("#from-unit").selectOption("C");
  16 |   await converter.locator("#to-unit").selectOption("F");
  17 |   await converter.locator("#converter-input").fill("0");
  18 | 
  19 |   await expect(converter.getByTestId("display")).toHaveText("32");
  20 | });
  21 | 
  22 | test("konversi satuan yang sama tidak berubah", async ({ page }) => {
  23 |   const converter = await openConverter(page);
  24 | 
  25 |   await converter.getByRole("button", { name: "Panjang" }).click();
  26 |   await converter.locator("#from-unit").selectOption("m");
  27 |   await converter.locator("#to-unit").selectOption("m");
  28 |   await converter.locator("#converter-input").fill("15");
  29 | 
  30 |   await expect(converter.getByTestId("display")).toHaveText("15");
  31 | });
  32 | 
  33 | test("konversi panjang meter ke centimeter", async ({ page }) => {
  34 |   const converter = await openConverter(page);
  35 | 
  36 |   await converter.getByRole("button", { name: "Panjang" }).click();
  37 |   await converter.locator("#from-unit").selectOption("m");
  38 |   await converter.locator("#to-unit").selectOption("cm");
  39 |   await converter.locator("#converter-input").fill("2.5");
  40 | 
  41 |   await expect(converter.getByTestId("display")).toHaveText("250");
  42 | });
  43 | 
```