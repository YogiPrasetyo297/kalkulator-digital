import { test, expect } from "@playwright/test";

test.describe("UI/UX & Layout Verification", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Responsivitas Mobile", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("tidak ada overflow horizontal pada body", async ({ page }) => {
      const overflow = await page.evaluate(() => {
        return document.body.scrollWidth > document.body.clientWidth;
      });
      expect(overflow).toBe(false);
    });

    test("4 tombol sidebar tetap visible dan dapat diklik di mobile", async ({ page }) => {
      const modes = ["Standard", "Scientific", "Programmer", "Converter"];
      for (const mode of modes) {
        // Di mobile, buka menu dulu karena sidebar hidden
        await page.getByRole("button", { name: "Buka menu" }).click();
        const btn = page.getByRole("button", { name: mode });
        await expect(btn).toBeVisible();
        await btn.click();
        // Gunakan h1 (Mode title) agar lebih spesifik
        await expect(
          page.getByRole("heading", { name: new RegExp(mode, "i"), level: 1 })
        ).toBeVisible();
      }
    });
  });

  test.describe("Switch Mode — State Reset", () => {
    test("Standard -> Scientific: display reset ke 0", async ({ page }) => {
      // Input angka di standard
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "2", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("12");

      // Pindah mode
      await page.getByRole("button", { name: "Scientific" }).click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });

    test("Scientific -> Programmer: display reset ke 0", async ({ page }) => {
      await page.getByRole("button", { name: "Scientific" }).click();
      await page.getByRole("button", { name: "π" }).click();
      await expect(page.getByTestId("display")).not.toHaveText("0");

      await page.getByRole("button", { name: "Programmer" }).click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });

    test("Programmer -> Standard: display reset ke 0", async ({ page }) => {
      await page.getByRole("button", { name: "Programmer" }).click();
      await page.getByRole("button", { name: "5" }).click();
      await expect(page.getByTestId("display")).toHaveText("5");

      await page.getByRole("button", { name: "Standard" }).click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });
  });

  test.describe("Display Overflow", () => {
    test("input 15 digit di Standard tidak meluber", async ({ page }) => {
      for (let i = 0; i < 15; i++) {
        await page.getByRole("button", { name: "9" }).click();
      }
      
      const isOverflowing = await page.getByTestId("display").evaluate((el) => {
        return el.scrollWidth > el.offsetWidth;
      });
      expect(isOverflowing).toBe(false);
    });

    test("teks Error tidak terpotong", async ({ page }) => {
      // 1 / 0 = Error
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "÷", exact: true }).click();
      await page.getByRole("button", { name: "0", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      
      const display = page.getByTestId("display");
      await expect(display).toHaveText("Error");
      
      const isOverflowing = await display.evaluate((el) => {
        return el.scrollWidth > el.offsetWidth;
      });
      expect(isOverflowing).toBe(false);
    });
  });

  test.describe("Tombol Disabled — Visual State", () => {
    test("Programmer DEC: tombol A-F disabled", async ({ page }) => {
      await page.getByRole("button", { name: "Programmer" }).click();
      // Pastikan di mode DEC (default)
      const btnA = page.getByRole("button", { name: "A", exact: true });
      await expect(btnA).toBeDisabled();
      
      const btnF = page.getByRole("button", { name: "F", exact: true });
      await expect(btnF).toBeDisabled();
    });
  });

  test.describe("Keyboard Navigation", () => {
    test("tombol Standard bisa difokus via Tab", async ({ page }) => {
      // Focus element pertama
      await page.keyboard.press("Tab");
      
      // Kita asumsikan tombol sidebar atau kalkulator mendapat fokus
      // Kita cek apakah ada element yang aktif yang merupakan button
      const activeElementTagName = await page.evaluate(() => document.activeElement.tagName);
      expect(activeElementTagName).toBe("BUTTON");
    });
  });

  test.describe("History — Standard Mode", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
      // Bersihkan localStorage sebelum tiap test
      await page.evaluate(() => localStorage.removeItem('calc-history'));
      await page.reload();
    });

    test("hasil kalkulasi muncul di history setelah klik =", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      await expect(page.getByText("2").last()).toBeVisible();
    });

    test("history tetap ada setelah refresh", async ({ page }) => {
      await page.getByRole("button", { name: "5", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "3", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      await page.reload();
      await expect(page.getByText("8").last()).toBeVisible();
    });

    test("history tidak muncul jika hasil Error", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "÷", exact: true }).click();
      await page.getByRole("button", { name: "0", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      // Panel history tetap kosong
      await expect(page.getByText("Belum ada data.")).toBeVisible();
    });

    test("tombol hapus semua membersihkan history", async ({ page }) => {
      await page.getByRole("button", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      await page.getByRole("button", { name: "Hapus semua" }).click();
      await expect(page.getByText("Belum ada data.")).toBeVisible();
    });
  });

  test.describe("Mobile Viewport — Fitur Spesifik", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("hamburger menu bisa dibuka dan mode bisa dipilih", async ({ page }) => {
      await page.getByRole("button", { name: "Buka menu" }).click();
      await expect(
        page.getByRole("button", { name: "Scientific" })
      ).toBeVisible();
      await page.getByRole("button", { name: "Scientific" }).click();
      // Drawer tutup setelah pilih mode
      await expect(
        page.getByRole("button", { name: "Scientific" })
      ).not.toBeVisible();
    });

    test("icon history muncul di display Standard", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "Lihat history" })
      ).toBeVisible();
    });

    test("history drawer muncul saat icon diklik", async ({ page }) => {
      await page.getByRole("button", { name: "Lihat history" }).click();
      await expect(
        page.getByRole("heading", { name: "History", exact: true })
      ).toBeVisible();
    });

    test("memory row muncul di atas tombol CE", async ({ page }) => {
      await expect(
        page.getByRole("button", { name: "MC", exact: true }).first()
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "M+", exact: true }).first()
      ).toBeVisible();
    });

    test("Programmer mobile tidak overflow vertikal berlebihan", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Buka menu" }).click();
      await page.getByRole("button", { name: "Programmer" }).click();
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      // Tidak lebih dari 3x tinggi viewport
      expect(bodyHeight).toBeLessThan(667 * 3);
    });
  });
});
