import { test, expect } from "@playwright/test";

test("tombol angka muncul 0-9", async ({ page }) => {
  await page.goto("/");
  for (const n of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
    await expect(page.getByRole("button", { name: n })).toBeVisible();
  }
});

test("2 + 3 = 5", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "+", exact: true }).click();
  await page.getByRole("button", { name: "3", exact: true }).click();
  await page.getByRole("button", { name: "=", exact: true }).click();
  await expect(page.getByTestId("display")).toHaveText("5");
});

test("pembagian dengan nol tidak crash", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "9", exact: true }).click();
  await page.getByRole("button", { name: "÷", exact: true }).click();
  await page.getByRole("button", { name: "0", exact: true }).click();
  await page.getByRole("button", { name: "=", exact: true }).click();
  await expect(page.getByTestId("display")).toHaveText("Error");
});
