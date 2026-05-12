# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui-ux.spec.js >> UI/UX & Layout Verification >> Mobile Viewport — Fitur Spesifik >> Programmer mobile tidak overflow vertikal berlebihan
- Location: tests\ui-ux.spec.js:203:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Programmer' })

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
  157 |       await page.getByRole("button", { name: "Hapus semua" }).click();
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
> 207 |       await page.getByRole("button", { name: "Programmer" }).click();
      |                                                              ^ Error: locator.click: Test timeout of 30000ms exceeded.
  208 |       const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  209 |       // Tidak lebih dari 3x tinggi viewport
  210 |       expect(bodyHeight).toBeLessThan(667 * 3);
  211 |     });
  212 |   });
  213 | });
  214 | 
```