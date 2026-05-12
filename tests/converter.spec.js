import { test, expect } from "@playwright/test";

async function openConverter(page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Converter/i }).click();
  const converter = page.getByTestId("converter");
  await expect(converter).toBeVisible();
  return converter;
}

test("0°C = 32°F", async ({ page }) => {
  const converter = await openConverter(page);

  await converter.getByRole("button", { name: "Suhu" }).click();
  await converter.locator("#from-unit").selectOption("C");
  await converter.locator("#to-unit").selectOption("F");
  await converter.locator("#converter-input").fill("0");

  await expect(converter.getByTestId("display")).toHaveText("32");
});

test("konversi satuan yang sama tidak berubah", async ({ page }) => {
  const converter = await openConverter(page);

  await converter.getByRole("button", { name: "Panjang" }).click();
  await converter.locator("#from-unit").selectOption("m");
  await converter.locator("#to-unit").selectOption("m");
  await converter.locator("#converter-input").fill("15");

  await expect(converter.getByTestId("display")).toHaveText("15");
});

test("konversi panjang meter ke centimeter", async ({ page }) => {
  const converter = await openConverter(page);

  await converter.getByRole("button", { name: "Panjang" }).click();
  await converter.locator("#from-unit").selectOption("m");
  await converter.locator("#to-unit").selectOption("cm");
  await converter.locator("#converter-input").fill("2.5");

  await expect(converter.getByTestId("display")).toHaveText("250");
});
