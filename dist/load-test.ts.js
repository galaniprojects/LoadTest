var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// load-test.ts
var load_test_exports = {};
__export(load_test_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(load_test_exports);

// orderPurchase.ts
var import_test = require("@playwright/test");
var import_fs = __toESM(require("fs"));
var orderPurchase = async (page) => {
  page.setDefaultTimeout(15e3);
  const context = page.context();
  const storageState = JSON.parse(
    import_fs.default.readFileSync("./.auth/login.json", "utf-8")
  );
  await context.addCookies(storageState.cookies);
  await page.goto("https://businesscentral.dynamics.com/", {
    waitUntil: "load"
  });
  await page.waitForSelector(".designer-client-frame", { timeout: 2e4 });
  const iframeHandle = await page.$(".designer-client-frame");
  if (!iframeHandle)
    throw new Error("iframe element not found");
  const iframe = await iframeHandle.contentFrame();
  if (!iframe)
    throw new Error("iframe not yet loaded");
  await iframe.waitForSelector('a:has-text("Einkaufsbestell")', {
    timeout: 2e4
  });
  const purchaseOrdersButton = iframe.locator('a:has-text("Einkaufsbestell")');
  if (!iframe) {
    throw new Error("Failed to get iframe content");
  }
  await (0, import_test.expect)(purchaseOrdersButton).toBeVisible();
  await purchaseOrdersButton.click();
  const purchaseOrderPage = iframe.getByText("Einkaufsbestellungen", {
    exact: true
  });
  await (0, import_test.expect)(purchaseOrderPage).toBeVisible();
  const newButton = iframe.getByRole("menuitem", { name: "Neu" });
  await newButton.click();
  const vendorName = iframe.getByLabel("Kreditorenname", { exact: true });
  const vendorNameDropDown = iframe.getByLabel("W\xE4hlen Sie einen Wert f\xFCr");
  const documentDateField = iframe.getByRole("combobox", {
    name: "Belegdatum"
  });
  const vendorInvoice = iframe.getByLabel("Kred.-Rechnungsnr.");
  await (0, import_test.expect)(documentDateField).toBeEmpty();
  await (0, import_test.expect)(vendorInvoice).toBeEmpty();
  await vendorNameDropDown.click();
  const okButton = iframe.getByRole("button", { name: "OK" });
  await okButton.click();
  await (0, import_test.expect)(vendorName).not.toBeEmpty();
  await (0, import_test.expect)(documentDateField).not.toBeEmpty();
  const invoiceNumber = Math.floor(1e4 + Math.random() * 9e4).toString();
  await vendorInvoice.fill(invoiceNumber);
  await (0, import_test.expect)(vendorInvoice).not.toBeEmpty();
  const itemNumber = iframe.getByRole("combobox", {
    name: "Nr.",
    exact: true
  });
  const itemTableNumber = iframe.getByLabel("1896-S");
  await itemNumber.click();
  await itemTableNumber.click();
  const unitPriceInput = iframe.getByRole("textbox", {
    name: "EK-Preis Ohne MwSt.",
    exact: true
  });
  const totalPriceInput = iframe.getByRole("textbox", {
    name: "Zeilenbetrag Ohne MwSt.",
    exact: true
  });
  await unitPriceInput.waitFor();
  const quantity = iframe.getByRole("textbox", {
    name: "Menge",
    exact: true
  });
  await quantity.fill("10");
  await page.click("body");
  const unitPriceValue = await unitPriceInput.inputValue();
  const totalPriceValue = await totalPriceInput.inputValue();
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
  await page.waitForTimeout(1e3);
  const statusRelease = await status.textContent();
  const postButton = iframe.getByRole("button", {
    name: "Buchen...",
    exact: true
  });
  await postButton.click();
  await page.waitForTimeout(1e3);
  await okButton.click();
  const yesButton = iframe.getByRole("button", { name: "Ja" });
  await yesButton.click();
  const postedPurchasePage = iframe.getByText("Geb. Einkaufsrechnung", {
    exact: true
  });
};
var orderPurchase_default = orderPurchase;

// load-test.ts
var config = {
  target: "https://businesscentral.dynamics.com/",
  phases: [
    {
      name: "1000-users-at-once",
      arrivalCount: 5,
      duration: 1,
      maxVusers: 1e3,
      ensure: false
    }
    //   {
    //     name: "ramp-up",
    //     arrivalRate: 20,
    //     rampTo: 100,
    //     duration: 30,
    //   },
    //   {
    //     name: "sustain",
    //     arrivalCount: 500,
    //     duration: 15,
    //   },
    //   {
    //     name: "cool-down",
    //     arrivalRate: 50,
    //     rampTo: 0,
    //     duration: 15,
    //   },
  ],
  engines: {
    playwright: {
      launchOptions: { headless: true }
    }
  }
};
var scenarios = [
  {
    engine: "playwright",
    testFunction: orderPurchase_default
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbG9hZC10ZXN0LnRzIiwgIi4uL29yZGVyUHVyY2hhc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBvcmRlclB1cmNoYXNlIGZyb20gXCIuL29yZGVyUHVyY2hhc2VcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgdGFyZ2V0OiBcImh0dHBzOi8vYnVzaW5lc3NjZW50cmFsLmR5bmFtaWNzLmNvbS9cIixcbiAgcGhhc2VzOiBbXG4gICAge1xuICAgICAgbmFtZTogXCIxMDAwLXVzZXJzLWF0LW9uY2VcIixcbiAgICAgIGFycml2YWxDb3VudDogNSxcbiAgICAgIGR1cmF0aW9uOiAxLFxuICAgICAgbWF4VnVzZXJzOiAxMDAwLFxuICAgICAgZW5zdXJlOiBmYWxzZSxcbiAgICB9LFxuICAgIC8vICAge1xuICAgIC8vICAgICBuYW1lOiBcInJhbXAtdXBcIixcbiAgICAvLyAgICAgYXJyaXZhbFJhdGU6IDIwLFxuICAgIC8vICAgICByYW1wVG86IDEwMCxcbiAgICAvLyAgICAgZHVyYXRpb246IDMwLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgbmFtZTogXCJzdXN0YWluXCIsXG4gICAgLy8gICAgIGFycml2YWxDb3VudDogNTAwLFxuICAgIC8vICAgICBkdXJhdGlvbjogMTUsXG4gICAgLy8gICB9LFxuICAgIC8vICAge1xuICAgIC8vICAgICBuYW1lOiBcImNvb2wtZG93blwiLFxuICAgIC8vICAgICBhcnJpdmFsUmF0ZTogNTAsXG4gICAgLy8gICAgIHJhbXBUbzogMCxcbiAgICAvLyAgICAgZHVyYXRpb246IDE1LFxuICAgIC8vICAgfSxcbiAgXSxcbiAgZW5naW5lczoge1xuICAgIHBsYXl3cmlnaHQ6IHtcbiAgICAgIGxhdW5jaE9wdGlvbnM6IHsgaGVhZGxlc3M6IHRydWUgfSxcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHNjZW5hcmlvcyA9IFtcbiAge1xuICAgIGVuZ2luZTogXCJwbGF5d3JpZ2h0XCIsXG4gICAgdGVzdEZ1bmN0aW9uOiBvcmRlclB1cmNoYXNlLFxuICB9LFxuXTtcbiIsICJpbXBvcnQgeyBQYWdlLCBleHBlY3QsIEJyb3dzZXJDb250ZXh0IH0gZnJvbSBcIkBwbGF5d3JpZ2h0L3Rlc3RcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuY29uc3Qgb3JkZXJQdXJjaGFzZSA9IGFzeW5jIChwYWdlOiBQYWdlKSA9PiB7XG4gIC8vIEV4dGVuZCB0aW1lb3V0IHRvIGhhbmRsZSBzbG93IGlmcmFtZS9wYWdlIGxvYWRzIHVuZGVyIGxvYWRcbiAgcGFnZS5zZXREZWZhdWx0VGltZW91dCgxNTAwMCk7XG5cbiAgLy8gTG9hZCBhdXRoZW50aWNhdGlvbiBzdGF0ZSAoY29va2llLWJhc2VkKVxuICBjb25zdCBjb250ZXh0OiBCcm93c2VyQ29udGV4dCA9IHBhZ2UuY29udGV4dCgpO1xuICBjb25zdCBzdG9yYWdlU3RhdGUgPSBKU09OLnBhcnNlKFxuICAgIGZzLnJlYWRGaWxlU3luYyhcIi4vLmF1dGgvbG9naW4uanNvblwiLCBcInV0Zi04XCIpXG4gICk7XG4gIGF3YWl0IGNvbnRleHQuYWRkQ29va2llcyhzdG9yYWdlU3RhdGUuY29va2llcyk7XG5cbiAgLy8gR28gdG8gQnVzaW5lc3MgQ2VudHJhbFxuICBhd2FpdCBwYWdlLmdvdG8oXCJodHRwczovL2J1c2luZXNzY2VudHJhbC5keW5hbWljcy5jb20vXCIsIHtcbiAgICB3YWl0VW50aWw6IFwibG9hZFwiLFxuICB9KTtcblxuICAvLyBXYWl0IHVwIHRvIDIwcyBmb3IgdGhlIGlmcmFtZSBlbGVtZW50IHRvIGV4aXN0IChub3QgbmVjZXNzYXJpbHkgdmlzaWJsZSlcbiAgYXdhaXQgcGFnZS53YWl0Rm9yU2VsZWN0b3IoXCIuZGVzaWduZXItY2xpZW50LWZyYW1lXCIsIHsgdGltZW91dDogMjAwMDAgfSk7XG5cbiAgLy8gR2V0IHRoZSBpZnJhbWUgb25jZSBpdCdzIHByZXNlbnRcbiAgY29uc3QgaWZyYW1lSGFuZGxlID0gYXdhaXQgcGFnZS4kKFwiLmRlc2lnbmVyLWNsaWVudC1mcmFtZVwiKTtcbiAgaWYgKCFpZnJhbWVIYW5kbGUpIHRocm93IG5ldyBFcnJvcihcImlmcmFtZSBlbGVtZW50IG5vdCBmb3VuZFwiKTtcblxuICBjb25zdCBpZnJhbWUgPSBhd2FpdCBpZnJhbWVIYW5kbGUuY29udGVudEZyYW1lKCk7XG4gIGlmICghaWZyYW1lKSB0aHJvdyBuZXcgRXJyb3IoXCJpZnJhbWUgbm90IHlldCBsb2FkZWRcIik7XG5cbiAgYXdhaXQgaWZyYW1lLndhaXRGb3JTZWxlY3RvcignYTpoYXMtdGV4dChcIkVpbmthdWZzYmVzdGVsbFwiKScsIHtcbiAgICB0aW1lb3V0OiAyMDAwMCxcbiAgfSk7XG4gIGNvbnN0IHB1cmNoYXNlT3JkZXJzQnV0dG9uID0gaWZyYW1lLmxvY2F0b3IoJ2E6aGFzLXRleHQoXCJFaW5rYXVmc2Jlc3RlbGxcIiknKTtcblxuICBpZiAoIWlmcmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZXQgaWZyYW1lIGNvbnRlbnRcIik7XG4gIH1cblxuICAvLyBXYWl0IGZvciB0aGUgXCJQdXJjaGFzZSBPcmRlcnNcIiBsaW5rIHRvIGJlIHZpc2libGVcblxuICBhd2FpdCBleHBlY3QocHVyY2hhc2VPcmRlcnNCdXR0b24pLnRvQmVWaXNpYmxlKCk7XG4gIGF3YWl0IHB1cmNoYXNlT3JkZXJzQnV0dG9uLmNsaWNrKCk7XG5cbiAgY29uc3QgcHVyY2hhc2VPcmRlclBhZ2UgPSBpZnJhbWUuZ2V0QnlUZXh0KFwiRWlua2F1ZnNiZXN0ZWxsdW5nZW5cIiwge1xuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcbiAgYXdhaXQgZXhwZWN0KHB1cmNoYXNlT3JkZXJQYWdlKS50b0JlVmlzaWJsZSgpO1xuXG4gIGNvbnN0IG5ld0J1dHRvbiA9IGlmcmFtZS5nZXRCeVJvbGUoXCJtZW51aXRlbVwiLCB7IG5hbWU6IFwiTmV1XCIgfSk7XG4gIGF3YWl0IG5ld0J1dHRvbi5jbGljaygpO1xuXG4gIGNvbnN0IHZlbmRvck5hbWUgPSBpZnJhbWUuZ2V0QnlMYWJlbChcIktyZWRpdG9yZW5uYW1lXCIsIHsgZXhhY3Q6IHRydWUgfSk7XG4gIGNvbnN0IHZlbmRvck5hbWVEcm9wRG93biA9IGlmcmFtZS5nZXRCeUxhYmVsKFwiV1x1MDBFNGhsZW4gU2llIGVpbmVuIFdlcnQgZlx1MDBGQ3JcIik7XG4gIGNvbnN0IGRvY3VtZW50RGF0ZUZpZWxkID0gaWZyYW1lLmdldEJ5Um9sZShcImNvbWJvYm94XCIsIHtcbiAgICBuYW1lOiBcIkJlbGVnZGF0dW1cIixcbiAgfSk7XG4gIGNvbnN0IHZlbmRvckludm9pY2UgPSBpZnJhbWUuZ2V0QnlMYWJlbChcIktyZWQuLVJlY2hudW5nc25yLlwiKTtcblxuICBhd2FpdCBleHBlY3QoZG9jdW1lbnREYXRlRmllbGQpLnRvQmVFbXB0eSgpO1xuICBhd2FpdCBleHBlY3QodmVuZG9ySW52b2ljZSkudG9CZUVtcHR5KCk7XG5cbiAgYXdhaXQgdmVuZG9yTmFtZURyb3BEb3duLmNsaWNrKCk7XG5cbiAgY29uc3Qgb2tCdXR0b24gPSBpZnJhbWUuZ2V0QnlSb2xlKFwiYnV0dG9uXCIsIHsgbmFtZTogXCJPS1wiIH0pO1xuICBhd2FpdCBva0J1dHRvbi5jbGljaygpO1xuXG4gIGF3YWl0IGV4cGVjdCh2ZW5kb3JOYW1lKS5ub3QudG9CZUVtcHR5KCk7XG4gIGF3YWl0IGV4cGVjdChkb2N1bWVudERhdGVGaWVsZCkubm90LnRvQmVFbXB0eSgpO1xuXG4gIGNvbnN0IGludm9pY2VOdW1iZXIgPSBNYXRoLmZsb29yKDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwKS50b1N0cmluZygpO1xuICBhd2FpdCB2ZW5kb3JJbnZvaWNlLmZpbGwoaW52b2ljZU51bWJlcik7XG4gIGF3YWl0IGV4cGVjdCh2ZW5kb3JJbnZvaWNlKS5ub3QudG9CZUVtcHR5KCk7XG5cbiAgY29uc3QgaXRlbU51bWJlciA9IGlmcmFtZS5nZXRCeVJvbGUoXCJjb21ib2JveFwiLCB7XG4gICAgbmFtZTogXCJOci5cIixcbiAgICBleGFjdDogdHJ1ZSxcbiAgfSk7XG4gIGNvbnN0IGl0ZW1UYWJsZU51bWJlciA9IGlmcmFtZS5nZXRCeUxhYmVsKFwiMTg5Ni1TXCIpO1xuXG4gIGF3YWl0IGl0ZW1OdW1iZXIuY2xpY2soKTtcbiAgYXdhaXQgaXRlbVRhYmxlTnVtYmVyLmNsaWNrKCk7XG5cbiAgY29uc3QgdW5pdFByaWNlSW5wdXQgPSBpZnJhbWUuZ2V0QnlSb2xlKFwidGV4dGJveFwiLCB7XG4gICAgbmFtZTogXCJFSy1QcmVpcyBPaG5lIE13U3QuXCIsXG4gICAgZXhhY3Q6IHRydWUsXG4gIH0pO1xuICBjb25zdCB0b3RhbFByaWNlSW5wdXQgPSBpZnJhbWUuZ2V0QnlSb2xlKFwidGV4dGJveFwiLCB7XG4gICAgbmFtZTogXCJaZWlsZW5iZXRyYWcgT2huZSBNd1N0LlwiLFxuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcblxuICBhd2FpdCB1bml0UHJpY2VJbnB1dC53YWl0Rm9yKCk7XG5cbiAgY29uc3QgcXVhbnRpdHkgPSBpZnJhbWUuZ2V0QnlSb2xlKFwidGV4dGJveFwiLCB7XG4gICAgbmFtZTogXCJNZW5nZVwiLFxuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcbiAgYXdhaXQgcXVhbnRpdHkuZmlsbChcIjEwXCIpO1xuICBhd2FpdCBwYWdlLmNsaWNrKFwiYm9keVwiKTtcblxuICBjb25zdCB1bml0UHJpY2VWYWx1ZSA9IGF3YWl0IHVuaXRQcmljZUlucHV0LmlucHV0VmFsdWUoKTtcbiAgY29uc3QgdG90YWxQcmljZVZhbHVlID0gYXdhaXQgdG90YWxQcmljZUlucHV0LmlucHV0VmFsdWUoKTtcbiAgLy8gT3B0aW9uYWwgbWF0aCBjaGVja3MgY2FuIGdvIGhlcmUgaWYgbmVlZGVkXG5cbiAgY29uc3Qgc3RhdHVzID0gaWZyYW1lLmdldEJ5Um9sZShcInRleHRib3hcIiwgeyBuYW1lOiBcIlN0YXR1c1wiIH0pO1xuICBjb25zdCBzdGF0dXNPcGVuID0gYXdhaXQgc3RhdHVzLnRleHRDb250ZW50KCk7XG5cbiAgY29uc3QgcGVybWlzc2lvbkJ1dHRvbiA9IGlmcmFtZS5sb2NhdG9yKFxuICAgICdidXR0b25bYXJpYS1sYWJlbD1cIkdlbmVobWlndW5nIGFuZm9yZGVyblwiXSdcbiAgKTtcblxuICBhd2FpdCBwZXJtaXNzaW9uQnV0dG9uLmNsaWNrKCk7XG5cbiAgY29uc3Qgc2VuZFBlcm1pc3Npb25CdXR0b24gPSBpZnJhbWUubG9jYXRvcihcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJHZW5laG1pZ3VuZ3NhbmZvcmRlcnVuZyBzZW5kZW5cIl0nXG4gICk7XG5cbiAgYXdhaXQgc2VuZFBlcm1pc3Npb25CdXR0b24uY2xpY2soKTtcblxuICBjb25zdCBzdGFydEJ1dHRvbiA9IGlmcmFtZS5nZXRCeVJvbGUoXCJtZW51aXRlbVwiLCB7IG5hbWU6IFwiU3RhcnRcIiB9KTtcblxuICBhd2FpdCBzdGFydEJ1dHRvbi5jbGljaygpO1xuICBhd2FpdCBwYWdlLndhaXRGb3JUaW1lb3V0KDEwMDApO1xuICBjb25zdCBzdGF0dXNSZWxlYXNlID0gYXdhaXQgc3RhdHVzLnRleHRDb250ZW50KCk7XG5cbiAgY29uc3QgcG9zdEJ1dHRvbiA9IGlmcmFtZS5nZXRCeVJvbGUoXCJidXR0b25cIiwge1xuICAgIG5hbWU6IFwiQnVjaGVuLi4uXCIsXG4gICAgZXhhY3Q6IHRydWUsXG4gIH0pO1xuICBhd2FpdCBwb3N0QnV0dG9uLmNsaWNrKCk7XG4gIGF3YWl0IHBhZ2Uud2FpdEZvclRpbWVvdXQoMTAwMCk7XG4gIGF3YWl0IG9rQnV0dG9uLmNsaWNrKCk7XG5cbiAgY29uc3QgeWVzQnV0dG9uID0gaWZyYW1lLmdldEJ5Um9sZShcImJ1dHRvblwiLCB7IG5hbWU6IFwiSmFcIiB9KTtcbiAgYXdhaXQgeWVzQnV0dG9uLmNsaWNrKCk7XG5cbiAgY29uc3QgcG9zdGVkUHVyY2hhc2VQYWdlID0gaWZyYW1lLmdldEJ5VGV4dChcIkdlYi4gRWlua2F1ZnNyZWNobnVuZ1wiLCB7XG4gICAgZXhh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
