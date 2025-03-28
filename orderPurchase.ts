import { Page, expect } from "@playwright/test";

export async function helloWorld(page: Page) {
  await page.goto("https://businesscentral.dynamics.com/", {
    waitUntil: "load",
  });

  // Wait for the main iframe to load
  await page.waitForTimeout(7500);

  // Locate the main iframe
  const iframePage = page.frameLocator(".designer-client-frame");
  if (!iframePage) {
    throw new Error("Main iframe not found or not accessible");
  }

  // Locate and click the "Purchase Orders" button
  const purchaseOrdersButton = iframePage.locator(
    'a:has-text("Einkaufsbestell")'
  );
  await expect(purchaseOrdersButton).toBeVisible();
  await purchaseOrdersButton.click();

  const purchaseOrderPage = iframePage.getByText("Einkaufsbestellungen", {
    exact: true,
  });
  await expect(purchaseOrderPage).toBeVisible();

  await page.waitForTimeout(1000);
  const newButton = iframePage.getByRole("menuitem", { name: "Neu" });
  await newButton.click();
  const vendorName = iframePage.getByLabel("Kreditorenname", { exact: true });
  const vendorNameDropDown = iframePage.getByLabel("Wählen Sie einen Wert für");

  const contactField = iframePage.getByRole("textbox", {
    name: "Kontakt (Leer)",
  });
  const documentDateField = iframePage.getByRole("combobox", {
    name: "Belegdatum",
  });
  const vendorInvoice = iframePage.getByLabel("Kred.-Rechnungsnr.");

  await page.waitForTimeout(2000);
  // await expect(vendorName).toBeEmpty();
  await expect(documentDateField).toBeEmpty();
  await expect(vendorInvoice).toBeEmpty();

  await vendorNameDropDown.click();

  await page.waitForTimeout(2000);
  const okButton = iframePage.getByRole("button", { name: "OK" });
  await okButton.click();

  await expect(vendorName).not.toBeEmpty();
  await expect(documentDateField).not.toBeEmpty();

  const invoiceNumber = Math.floor(10000 + Math.random() * 90000).toString();
  await vendorInvoice.fill(invoiceNumber);
  await expect(vendorInvoice).not.toBeEmpty();
  const itemNumber = iframePage.getByRole("combobox", {
    name: "Nr.",
    exact: true,
  });
  const itemTableNumber = iframePage.getByLabel("1896-S");

  await itemNumber.click();
  await itemTableNumber.click();

  const unitPriceInput = iframePage.getByRole("textbox", {
    name: "EK-Preis Ohne MwSt.",
    exact: true,
  });
  const totalPriceInput = iframePage.getByRole("textbox", {
    name: "Zeilenbetrag Ohne MwSt.",
    exact: true,
  });
  await unitPriceInput.waitFor();
  const quantity = iframePage.getByRole("textbox", {
    name: "Menge",
    exact: true,
  });

  await quantity.fill("10");
  await page.click("body");
  const unitPriceValue = await unitPriceInput.inputValue();
  const totalPriceValue = await totalPriceInput.inputValue();
  // console.log(unitPriceValue);
  // console.log(totalPriceValue);
  // const unitPriceNum = Number(unitPriceValue);
  // const totalPriceNum = Number(totalPriceValue);
  // console.log(unitPriceNum);
  // console.log(totalPriceNum);
  //await expect(10 * unitPriceNum).toBe(totalPriceNum);
  const postButton = iframePage.getByRole("button", {
    name: "Buchen...",
    exact: true,
  });
  const status = iframePage.getByRole("textbox", { name: "Status" });
  const statusOpen = await status.textContent();
  //console.log(statusOpen);
  await expect(statusOpen).toBe("Offen");

  const permissionButton = iframePage.locator(
    'button[aria-label="Genehmigung anfordern"]'
  );
  await expect(permissionButton).toBeVisible();
  await page.waitForTimeout(1000);
  await permissionButton.click();
  const sendPermissionButton = iframePage.locator(
    'button[aria-label="Genehmigungsanforderung senden"]'
  );
  await expect(sendPermissionButton).toBeVisible();
  await sendPermissionButton.click();

  await page.waitForTimeout(7000);

  const startButton = iframePage.getByRole("menuitem", { name: "Start" });
  await expect(startButton).toBeVisible();
  await startButton.click();

  const statusRelease = await status.textContent();

  await expect(statusRelease).toBe("Freigegeben");

  await postButton.click();
  await page.waitForTimeout(1000);
  await okButton.click();
  const yesButton = iframePage.getByRole("button", { name: "Ja" });
  await yesButton.click();

  const postedPurchasePage = iframePage.getByText("Geb. Einkaufsrechnung", {
    exact: true,
  });
  await expect(postedPurchasePage).toBeVisible();
  const vendorInvoiceNumber = iframePage.getByLabel(invoiceNumber);
  await expect(vendorInvoiceNumber).toHaveText(invoiceNumber);
}
