# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: scientific.spec.js >> sin(0) = 0 dan cos(0) = 1
- Location: tests\scientific.spec.js:10:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('scientific-calc')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('scientific-calc')

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
          - button "Scientific" [active] [ref=e13]:
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
  3  | async function openScientific(page) {
  4  |   await page.goto("/");
  5  |   await page.getByRole("button", { name: /Scientific/i }).click();
> 6  |   await expect(page.getByTestId("scientific-calc")).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  7  |   return page.getByTestId("scientific-calc");
  8  | }
  9  | 
  10 | test("sin(0) = 0 dan cos(0) = 1", async ({ page }) => {
  11 |   const scientificCalc = await openScientific(page);
  12 | 
  13 |   await scientificCalc.getByRole("button", { name: "0" }).click();
  14 |   await scientificCalc.getByRole("button", { name: "sin" }).click();
  15 |   await expect(page.getByTestId("display")).toHaveText("0");
  16 | 
  17 |   await scientificCalc.getByRole("button", { name: "C", exact: true }).click();
  18 |   await scientificCalc.getByRole("button", { name: "0" }).click();
  19 |   await scientificCalc.getByRole("button", { name: "cos" }).click();
  20 |   await expect(page.getByTestId("display")).toHaveText("1");
  21 | });
  22 | 
  23 | test("√(-1) menampilkan Error", async ({ page }) => {
  24 |   const scientificCalc = await openScientific(page);
  25 | 
  26 |   await scientificCalc.getByRole("button", { name: "1" }).click();
  27 |   await scientificCalc.getByRole("button", { name: "±" }).click();
  28 |   await scientificCalc.getByRole("button", { name: "√" }).click();
  29 |   await expect(page.getByTestId("display")).toHaveText("Error");
  30 | });
  31 | 
  32 | test("log(0) menampilkan Error", async ({ page }) => {
  33 |   const scientificCalc = await openScientific(page);
  34 | 
  35 |   await scientificCalc.getByRole("button", { name: "0" }).click();
  36 |   await scientificCalc.getByRole("button", { name: "log" }).click();
  37 |   await expect(page.getByTestId("display")).toHaveText("Error");
  38 | });
  39 | 
  40 | test("faktorial(5) = 120", async ({ page }) => {
  41 |   const scientificCalc = await openScientific(page);
  42 | 
  43 |   await scientificCalc.getByRole("button", { name: "5" }).click();
  44 |   await scientificCalc.getByRole("button", { name: "n!" }).click();
  45 |   await expect(page.getByTestId("display")).toHaveText("120");
  46 | });
  47 | 
```