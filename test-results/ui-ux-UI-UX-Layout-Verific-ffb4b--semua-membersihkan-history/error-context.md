# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-ux.spec.js >> UI/UX & Layout Verification >> History — Standard Mode >> tombol hapus semua membersihkan history
- Location: tests\ui-ux.spec.js:152:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Hapus semua' })

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
  125 | 
  126 |     test("hasil kalkulasi muncul di history setelah klik =", async ({ page }) => {
  127 |       await page.getByRole("button", { name: "1", exact: true }).click();
  128 |       await page.getByRole("button", { name: "+", exact: true }).click();
  129 |       await page.getByRole("button", { name: "1", exact: true }).click();
  130 |       await page.getByRole("button", { name: "=", exact: true }).click();
  131 |       await expect(page.getByText("2").last()).toBeVisible();
  132 |     });
  133 | 
  134 |     test("history tetap ada setelah refresh", async ({ page }) => {
  135 |       await page.getByRole("button", { name: "5", exact: true }).click();
  136 |       await page.getByRole("button", { name: "+", exact: true }).click();
  137 |       await page.getByRole("button", { name: "3", exact: true }).click();
  138 |       await page.getByRole("button", { name: "=", exact: true }).click();
  139 |       await page.reload();
  140 |       await expect(page.getByText("8").last()).toBeVisible();
  141 |     });
  142 | 
  143 |     test("history tidak muncul jika hasil Error", async ({ page }) => {
  144 |       await page.getByRole("button", { name: "1", exact: true }).click();
  145 |       await page.getByRole("button", { name: "÷", exact: true }).click();
  146 |       await page.getByRole("button", { name: "0", exact: true }).click();
  147 |       await page.getByRole("button", { name: "=", exact: true }).click();
  148 |       // Panel history tetap kosong
  149 |       await expect(page.getByText("Belum ada data.")).toBeVisible();
  150 |     });
  151 | 
  152 |     test("tombol hapus semua membersihkan history", async ({ page }) => {
  153 |       await page.getByRole("button", { name: "2", exact: true }).click();
  154 |       await page.getByRole("button", { name: "+", exact: true }).click();
  155 |       await page.getByRole("button", { name: "2", exact: true }).click();
  156 |       await page.getByRole("button", { name: "=", exact: true }).click();
> 157 |       await page.getByRole("button", { name: "Hapus semua" }).click();
      |                                                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  158 |       await expect(page.getByText("Belum ada data.")).toBeVisible();
  159 |     });
  160 |   });
  161 | 
  162 |   test.describe("Mobile Viewport — Fitur Spesifik", () => {
  163 |     test.use({ viewport: { width: 375, height: 667 } });
  164 | 
  165 |     test.beforeEach(async ({ page }) => {
  166 |       await page.goto("/");
  167 |     });
  168 | 
  169 |     test("hamburger menu bisa dibuka dan mode bisa dipilih", async ({ page }) => {
  170 |       await page.getByRole("button", { name: "Buka menu" }).click();
  171 |       await expect(
  172 |         page.getByRole("button", { name: "Scientific" })
  173 |       ).toBeVisible();
  174 |       await page.getByRole("button", { name: "Scientific" }).click();
  175 |       // Drawer tutup setelah pilih mode
  176 |       await expect(
  177 |         page.getByRole("button", { name: "Scientific" })
  178 |       ).not.toBeVisible();
  179 |     });
  180 | 
  181 |     test("icon history muncul di display Standard", async ({ page }) => {
  182 |       await expect(
  183 |         page.getByRole("button", { name: "Lihat history" })
  184 |       ).toBeVisible();
  185 |     });
  186 | 
  187 |     test("history drawer muncul saat icon diklik", async ({ page }) => {
  188 |       await page.getByRole("button", { name: "Lihat history" }).click();
  189 |       await expect(
  190 |         page.getByRole("heading", { name: "History", exact: true })
  191 |       ).toBeVisible();
  192 |     });
  193 | 
  194 |     test("memory row muncul di atas tombol CE", async ({ page }) => {
  195 |       await expect(
  196 |         page.getByRole("button", { name: "MC", exact: true }).first()
  197 |       ).toBeVisible();
  198 |       await expect(
  199 |         page.getByRole("button", { name: "M+", exact: true }).first()
  200 |       ).toBeVisible();
  201 |     });
  202 | 
  203 |     test("Programmer mobile tidak overflow vertikal berlebihan", async ({
  204 |       page,
  205 |     }) => {
  206 |       await page.getByRole("button", { name: "Buka menu" }).click();
  207 |       await page.getByRole("button", { name: "Programmer" }).click();
  208 |       const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  209 |       // Tidak lebih dari 3x tinggi viewport
  210 |       expect(bodyHeight).toBeLessThan(667 * 3);
  211 |     });
  212 |   });
  213 | });
  214 | 
```