# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: secondary-display.spec.js >> Expression Display Verification (Single Display Design) >> Standard Mode >> display '1+1' setelah klik 1, +, 1
- Location: tests\secondary-display.spec.js:20:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('display')
Expected: "1+1"
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
                - button "1" [active] [ref=e59]
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
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test.describe("Expression Display Verification (Single Display Design)", () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     await page.goto("/");
  6   |   });
  7   | 
  8   |   test.describe("Standard Mode", () => {
  9   |     test("display '1' setelah klik angka 1", async ({ page }) => {
  10  |       await page.getByRole("button", { name: "1", exact: true }).click();
  11  |       await expect(page.getByTestId("display")).toHaveText("1");
  12  |     });
  13  | 
  14  |     test("display '1+' setelah klik 1 lalu +", async ({ page }) => {
  15  |       await page.getByRole("button", { name: "1", exact: true }).click();
  16  |       await page.getByRole("button", { name: "+", exact: true }).click();
  17  |       await expect(page.getByTestId("display")).toHaveText("1+");
  18  |     });
  19  | 
  20  |     test("display '1+1' setelah klik 1, +, 1", async ({ page }) => {
  21  |       await page.getByRole("button", { name: "1", exact: true }).click();
  22  |       await page.getByRole("button", { name: "+", exact: true }).click();
  23  |       await page.getByRole("button", { name: "1", exact: true }).click();
> 24  |       await expect(page.getByTestId("display")).toHaveText("1+1");
      |                                                 ^ Error: expect(locator).toHaveText(expected) failed
  25  |     });
  26  | 
  27  |     test("display '2' setelah klik =", async ({ page }) => {
  28  |       await page.getByRole("button", { name: "1", exact: true }).click();
  29  |       await page.getByRole("button", { name: "+", exact: true }).click();
  30  |       await page.getByRole("button", { name: "1", exact: true }).click();
  31  |       await page.getByRole("button", { name: "=", exact: true }).click();
  32  |       await expect(page.getByTestId("display")).toHaveText("2");
  33  |     });
  34  | 
  35  |     test("display '0' setelah klik C", async ({ page }) => {
  36  |       await page.getByRole("button", { name: "1", exact: true }).click();
  37  |       await page.getByRole("button", { name: "+", exact: true }).click();
  38  |       await page.getByRole("button", { name: "C", exact: true }).click();
  39  |       await expect(page.getByTestId("display")).toHaveText("0");
  40  |     });
  41  |   });
  42  | 
  43  |   test.describe("Scientific Mode", () => {
  44  |     test.beforeEach(async ({ page }) => {
  45  |       await page.getByRole("button", { name: "Scientific" }).click();
  46  |     });
  47  | 
  48  |     test("display '3' setelah klik √ dari angka 9", async ({ page }) => {
  49  |       await page.getByRole("button", { name: "9", exact: true }).click();
  50  |       await page.getByRole("button", { name: "√", exact: true }).click();
  51  |       // Rule: "sin/cos/tan/log/ln/√/x² diklik... reset ke '' dan tampilkan hasil"
  52  |       await expect(page.getByTestId("display")).toHaveText("3");
  53  |     });
  54  | 
  55  |     test("display '2^' saat klik xʸ dari angka 2", async ({ page }) => {
  56  |       await page.getByRole("button", { name: "2", exact: true }).click();
  57  |       await page.getByRole("button", { name: "xʸ", exact: true }).click();
  58  |       await expect(page.getByTestId("display")).toHaveText("2^");
  59  |     });
  60  | 
  61  |     test("display '2^3' saat klik 2, xʸ, 3", async ({ page }) => {
  62  |       await page.getByRole("button", { name: "2", exact: true }).click();
  63  |       await page.getByRole("button", { name: "xʸ", exact: true }).click();
  64  |       await page.getByRole("button", { name: "3", exact: true }).click();
  65  |       await expect(page.getByTestId("display")).toHaveText("2^3");
  66  |     });
  67  | 
  68  |     test("display '0' setelah C", async ({ page }) => {
  69  |       await page.getByRole("button", { name: "9", exact: true }).click();
  70  |       await page.getByRole("button", { name: "C", exact: true }).click();
  71  |       await expect(page.getByTestId("display")).toHaveText("0");
  72  |     });
  73  |   });
  74  | 
  75  |   test.describe("Programmer Mode", () => {
  76  |     test.beforeEach(async ({ page }) => {
  77  |       await page.getByRole("button", { name: "Programmer" }).click();
  78  |     });
  79  | 
  80  |     test("display '5 AND ' saat klik AND dari angka 5", async ({ page }) => {
  81  |       await page.getByRole("button", { name: "5", exact: true }).click();
  82  |       await page.getByRole("button", { name: "AND", exact: true }).click();
  83  |       await expect(page.getByTestId("display")).toHaveText("5 AND ");
  84  |     });
  85  | 
  86  |     test("display hasil setelah klik =", async ({ page }) => {
  87  |       await page.getByRole("button", { name: "5", exact: true }).click();
  88  |       await page.getByRole("button", { name: "AND", exact: true }).click();
  89  |       await page.getByRole("button", { name: "2", exact: true }).click();
  90  |       await page.getByRole("button", { name: "=", exact: true }).click();
  91  |       await expect(page.getByTestId("display")).toHaveText("0"); // 101 & 010 = 0
  92  |     });
  93  | 
  94  |     test("display '0' setelah Clear", async ({ page }) => {
  95  |       await page.getByRole("button", { name: "5", exact: true }).click();
  96  |       await page.getByLabel("Clear").click();
  97  |       await expect(page.getByTestId("display")).toHaveText("0");
  98  |     });
  99  |   });
  100 | });
  101 | 
```