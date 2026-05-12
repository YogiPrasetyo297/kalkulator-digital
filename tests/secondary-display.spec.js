import { test, expect } from "@playwright/test";

test.describe("Expression Display Verification (Single Display Design)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Standard Mode", () => {
    test("display '1' setelah klik angka 1", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("1");
    });

    test("display '1+' setelah klik 1 lalu +", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("1+");
    });

    test("display '1+1' setelah klik 1, +, 1", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "1", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("1+1");
    });

    test("display '2' setelah klik =", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("2");
    });

    test("display '0' setelah klik C", async ({ page }) => {
      await page.getByRole("button", { name: "1", exact: true }).click();
      await page.getByRole("button", { name: "+", exact: true }).click();
      await page.getByRole("button", { name: "C", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });
  });

  test.describe("Scientific Mode", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Scientific" }).click();
    });

    test("display '3' setelah klik √ dari angka 9", async ({ page }) => {
      await page.getByRole("button", { name: "9", exact: true }).click();
      await page.getByRole("button", { name: "√", exact: true }).click();
      // Rule: "sin/cos/tan/log/ln/√/x² diklik... reset ke '' dan tampilkan hasil"
      await expect(page.getByTestId("display")).toHaveText("3");
    });

    test("display '2^' saat klik xʸ dari angka 2", async ({ page }) => {
      await page.getByRole("button", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "xʸ", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("2^");
    });

    test("display '2^3' saat klik 2, xʸ, 3", async ({ page }) => {
      await page.getByRole("button", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "xʸ", exact: true }).click();
      await page.getByRole("button", { name: "3", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("2^3");
    });

    test("display '0' setelah C", async ({ page }) => {
      await page.getByRole("button", { name: "9", exact: true }).click();
      await page.getByRole("button", { name: "C", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });
  });

  test.describe("Programmer Mode", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Programmer" }).click();
    });

    test("display '5 AND ' saat klik AND dari angka 5", async ({ page }) => {
      await page.getByRole("button", { name: "5", exact: true }).click();
      await page.getByRole("button", { name: "AND", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("5 AND ");
    });

    test("display hasil setelah klik =", async ({ page }) => {
      await page.getByRole("button", { name: "5", exact: true }).click();
      await page.getByRole("button", { name: "AND", exact: true }).click();
      await page.getByRole("button", { name: "2", exact: true }).click();
      await page.getByRole("button", { name: "=", exact: true }).click();
      await expect(page.getByTestId("display")).toHaveText("0"); // 101 & 010 = 0
    });

    test("display '0' setelah Clear", async ({ page }) => {
      await page.getByRole("button", { name: "5", exact: true }).click();
      await page.getByLabel("Clear").click();
      await expect(page.getByTestId("display")).toHaveText("0");
    });
  });
});
