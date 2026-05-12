# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: standard.spec.js >> 2 + 3 = 5
- Location: tests\standard.spec.js:10:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('display')
Expected: "5"
Received: "0"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('display')
    9 × locator resolved to <p data-testid="display" class="mt-10 text-right font-mono text-white transition-all text-5xl">0</p>
      - unexpected value "0"

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
          - button "Converter" [ref=e19]:
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
                - button "=" [active] [ref=e66]
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
  3  | test("tombol angka muncul 0-9", async ({ page }) => {
  4  |   await page.goto("/");
  5  |   for (const n of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
  6  |     await expect(page.getByRole("button", { name: n })).toBeVisible();
  7  |   }
  8  | });
  9  | 
  10 | test("2 + 3 = 5", async ({ page }) => {
  11 |   await page.goto("/");
  12 |   await page.getByRole("button", { name: "2", exact: true }).click();
  13 |   await page.getByRole("button", { name: "+", exact: true }).click();
  14 |   await page.getByRole("button", { name: "3", exact: true }).click();
  15 |   await page.getByRole("button", { name: "=", exact: true }).click();
> 16 |   await expect(page.getByTestId("display")).toHaveText("5");
     |                                             ^ Error: expect(locator).toHaveText(expected) failed
  17 | });
  18 | 
  19 | test("pembagian dengan nol tidak crash", async ({ page }) => {
  20 |   await page.goto("/");
  21 |   await page.getByRole("button", { name: "9", exact: true }).click();
  22 |   await page.getByRole("button", { name: "÷", exact: true }).click();
  23 |   await page.getByRole("button", { name: "0", exact: true }).click();
  24 |   await page.getByRole("button", { name: "=", exact: true }).click();
  25 |   await expect(page.getByTestId("display")).toHaveText("Error");
  26 | });
  27 | 
```