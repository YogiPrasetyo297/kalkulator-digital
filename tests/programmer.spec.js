import { test, expect } from "@playwright/test";

async function openProgrammer(page) {
  await page.goto("/");
  await page.getByRole("button", { name: /Programmer/i }).click();
  const programmerCalc = page.getByTestId("programmer-calc");
  await expect(programmerCalc).toBeVisible();
  return programmerCalc;
}

test("konversi DEC ke HEX BIN OCT", async ({ page }) => {
  const programmerCalc = await openProgrammer(page);

  await programmerCalc.getByRole("button", { name: "Clear" }).click();
  await programmerCalc.getByRole("button", { name: "1" }).click();
  await programmerCalc.getByRole("button", { name: "0" }).click();

  await expect(programmerCalc.getByTestId("display")).toHaveText("10");
  await expect(programmerCalc.getByTestId("hex-display")).toHaveText("A");
  await expect(programmerCalc.getByTestId("oct-display")).toHaveText("12");
  await expect(programmerCalc.getByTestId("bin-display")).toHaveText("1010");
});

test("input huruf di mode DEC tidak diterima", async ({ page }) => {
  const programmerCalc = await openProgrammer(page);

  await programmerCalc.getByRole("button", { name: "Clear" }).click();
  await expect(
    programmerCalc.getByRole("button", { name: "A", exact: true })
  ).toBeDisabled();

  await expect(programmerCalc.getByTestId("display")).toHaveText("0");
});

test("operasi AND bekerja", async ({ page }) => {
  const programmerCalc = await openProgrammer(page);

  await programmerCalc.getByRole("button", { name: "Clear" }).click();
  await programmerCalc.getByRole("button", { name: "1" }).click();
  await programmerCalc.getByRole("button", { name: "2" }).click();
  await programmerCalc.getByRole("button", { name: "AND" }).click();
  await programmerCalc.getByRole("button", { name: "1" }).click();
  await programmerCalc.getByRole("button", { name: "0" }).click();
  await programmerCalc.getByRole("button", { name: "=" }).click();

  await expect(programmerCalc.getByTestId("display")).toHaveText("8");
  await expect(programmerCalc.getByTestId("bin-display")).toHaveText("1000");
});
