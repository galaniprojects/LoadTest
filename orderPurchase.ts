import { Page, expect, BrowserContext } from "@playwright/test";
import fs from "fs";

const orderPurchase = async (page: Page) => {
  // Extend timeout to handle slow iframe/page loads under load
  page.setDefaultTimeout(15000);

  // Load authentication state (cookie-based)
  const context: BrowserContext = page.context();
  const storageState = JSON.parse(
    fs.readFileSync("./.auth/login.json", "utf-8")
  );
  await context.addCookies(storageState.cookies);

  // Go to Business Central
  await page.goto("https://businesscentral.dynamics.com/", {
    waitUntil: "load",
  });

  // Wait up to 20s for the iframe element to exist (not necessarily visible)
  await page.waitForSelector(".designer-client-frame", { timeout: 20000 });

  // Get the iframe once it's present
  const iframeHandle = await page.$(".designer-client-frame");
  if (!iframeHandle) throw new Error("iframe element not found");

  const iframe = await iframeHandle.contentFrame();
  if (!iframe) throw new Error("iframe not yet loaded");

  await iframe.waitForSelector('a:has-text("Einkaufsbestell")', {
    timeout: 20000,
  });
  const purchaseOrdersButton = iframe.locator('a:has-text("Einkaufsbestell")');

  if (!iframe) {
    throw new Error("Failed to get iframe content");
  }

  // Wait for the "Purchase Orders" link to be visible

  // await expect(purchaseOrdersButton).toBeVisible();
  await purchaseOrdersButton.click();

  const purchaseOrderPage = iframe.getByText("Einkaufsbestellungen", {
    exact: true,
  });
  // await expect(purchaseOrderPage).toBeVisible();

  const newButton = iframe.getByRole("menuitem", { name: "Neu" });
  await newButton.click();

  const vendorName = iframe.getByLabel("Kreditorenname", { exact: true });
  const vendorNameDropDown = iframe.getByLabel("Wählen Sie einen Wert für");
  const documentDateField = iframe.getByRole("combobox", {
    name: "Belegdatum",
  });
  const vendorInvoice = iframe.getByLabel("Kred.-Rechnungsnr.");

  // await expect(documentDateField).toBeEmpty();
  // await expect(vendorInvoice).toBeEmpty();

  await vendorNameDropDown.click();

  const okButton = iframe.getByRole("button", { name: "OK" });
  await okButton.click();

  // await expect(vendorName).not.toBeEmpty();
  // await expect(documentDateField).not.toBeEmpty();

  const invoiceNumber = Math.floor(10000 + Math.random() * 90000).toString();
  await vendorInvoice.fill(invoiceNumber);
  // await expect(vendorInvoice).not.toBeEmpty();

  const itemNumber = iframe.getByRole("combobox", {
    name: "Nr.",
    exact: true,
  });
  const itemTableNumber = iframe.getByLabel("1896-S");

  await itemNumber.click();
  await itemTableNumber.click();

  const unitPriceInput = iframe.getByRole("textbox", {
    name: "EK-Preis Ohne MwSt.",
    exact: true,
  });
  const totalPriceInput = iframe.getByRole("textbox", {
    name: "Zeilenbetrag Ohne MwSt.",
    exact: true,
  });

  await unitPriceInput.waitFor();

  const quantity = iframe.getByRole("textbox", {
    name: "Menge",
    exact: true,
  });
  await quantity.fill("10");
  await page.click("body");

  const unitPriceValue = await unitPriceInput.inputValue();
  const totalPriceValue = await totalPriceInput.inputValue();
  // Optional math checks can go here if needed

  const status = iframe.getByRole("textbox", { name: "Status" });
  const statusOpen = await status.textContent();

  const permissionButton = iframe.locator(
    'button[aria-label="Genehmigung anfordern"]'
  );

  await permissionButton.click();

  const sendPermissionButton = iframe.locator(
    'button[aria-label="Genehmigungsanforderung senden"]'
  );

  await sendPermissionButton.click();

  const startButton = iframe.getByRole("menuitem", { name: "Start" });

  await startButton.click();
  await page.waitForTimeout(1000);
  const statusRelease = await status.textContent();

  const postButton = iframe.getByRole("button", {
    name: "Buchen...",
    exact: true,
  });
  await postButton.click();
  await page.waitForTimeout(1000);
  await okButton.click();

  // const yesButton = iframe.getByRole("button", { name: "Ja" });
  // await yesButton.click();

  // const postedPurchasePage = iframe.getByText("Geb. Einkaufsrechnung", {
  //   exact: true,
  // });
};

export default orderPurchase;
