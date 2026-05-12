import { test, expect } from "@playwright/test";

async function openScientific(page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Scientific/i }).click();
  await expect(page.getByTestId("scientific-calc")).toBeVisible();
  return page.getByTestId("scientific-calc");
}

test("sin(0) = 0 dan cos(0) = 1", async ({ page }) => {
  const scientificCalc = await openScientific(page);

  await scientificCalc.getByRole("button", { name: "0" }).click();
  await scientificCalc.getByRole("button", { name: "sin" }).click();
  await expect(page.getByTestId("display")).toHaveText("0");

  await scientificCalc.getByRole("button", { name: "C", exact: true }).click();
  await scientificCalc.getByRole("button", { name: "0" }).click();
  await scientificCalc.getByRole("button", { name: "cos" }).click();
  await expect(page.getByTestId("display")).toHaveText("1");
});

test("√(-1) menampilkan Error", async ({ page }) => {
  const scientificCalc = await openScientific(page);

  await scientificCalc.getByRole("button", { name: "1" }).click();
  await scientificCalc.getByRole("button", { name: "±" }).click();
  await scientificCalc.getByRole("button", { name: "√" }).click();
  await expect(page.getByTestId("display")).toHaveText("Error");
});

test("log(0) menampilkan Error", async ({ page }) => {
  const scientificCalc = await openScientific(page);

  await scientificCalc.getByRole("button", { name: "0" }).click();
  await scientificCalc.getByRole("button", { name: "log" }).click();
  await expect(page.getByTestId("display")).toHaveText("Error");
});

test("faktorial(5) = 120", async ({ page }) => {
  const scientificCalc = await openScientific(page);

  await scientificCalc.getByRole("button", { name: "5" }).click();
  await scientificCalc.getByRole("button", { name: "n!" }).click();
  await expect(page.getByTestId("display")).toHaveText("120");
});
