import { test, expect } from "@playwright/test";

test("sidebar muncul dengan 4 menu", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /Standard/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Scientific/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Programmer/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Converter/i })).toBeVisible();
});

test("default mode adalah Standard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("standard-calc")).toBeVisible();
});
