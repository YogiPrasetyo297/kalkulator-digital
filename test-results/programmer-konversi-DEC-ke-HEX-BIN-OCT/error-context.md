# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: programmer.spec.js >> konversi DEC ke HEX BIN OCT
- Location: tests\programmer.spec.js:11:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('programmer-calc')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('programmer-calc')

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
          - button "Programmer" [active] [ref=e16]:
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
  3  | async function openProgrammer(page) {
  4  |   await page.goto("/");
  5  |   await page.getByRole("button", { name: /Programmer/i }).click();
  6  |   const programmerCalc = page.getByTestId("programmer-calc");
> 7  |   await expect(programmerCalc).toBeVisible();
     |                                ^ Error: expect(locator).toBeVisible() failed
  8  |   return programmerCalc;
  9  | }
  10 | 
  11 | test("konversi DEC ke HEX BIN OCT", async ({ page }) => {
  12 |   const programmerCalc = await openProgrammer(page);
  13 | 
  14 |   await programmerCalc.getByRole("button", { name: "Clear" }).click();
  15 |   await programmerCalc.getByRole("button", { name: "1" }).click();
  16 |   await programmerCalc.getByRole("button", { name: "0" }).click();
  17 | 
  18 |   await expect(programmerCalc.getByTestId("display")).toHaveText("10");
  19 |   await expect(programmerCalc.getByTestId("hex-display")).toHaveText("A");
  20 |   await expect(programmerCalc.getByTestId("oct-display")).toHaveText("12");
  21 |   await expect(programmerCalc.getByTestId("bin-display")).toHaveText("1010");
  22 | });
  23 | 
  24 | test("input huruf di mode DEC tidak diterima", async ({ page }) => {
  25 |   const programmerCalc = await openProgrammer(page);
  26 | 
  27 |   await programmerCalc.getByRole("button", { name: "Clear" }).click();
  28 |   await expect(
  29 |     programmerCalc.getByRole("button", { name: "A", exact: true })
  30 |   ).toBeDisabled();
  31 | 
  32 |   await expect(programmerCalc.getByTestId("display")).toHaveText("0");
  33 | });
  34 | 
  35 | test("operasi AND bekerja", async ({ page }) => {
  36 |   const programmerCalc = await openProgrammer(page);
  37 | 
  38 |   await programmerCalc.getByRole("button", { name: "Clear" }).click();
  39 |   await programmerCalc.getByRole("button", { name: "1" }).click();
  40 |   await programmerCalc.getByRole("button", { name: "2" }).click();
  41 |   await programmerCalc.getByRole("button", { name: "AND" }).click();
  42 |   await programmerCalc.getByRole("button", { name: "1" }).click();
  43 |   await programmerCalc.getByRole("button", { name: "0" }).click();
  44 |   await programmerCalc.getByRole("button", { name: "=" }).click();
  45 | 
  46 |   await expect(programmerCalc.getByTestId("display")).toHaveText("8");
  47 |   await expect(programmerCalc.getByTestId("bin-display")).toHaveText("1000");
  48 | });
  49 | 
```