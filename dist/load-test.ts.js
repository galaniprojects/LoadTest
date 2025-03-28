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
      name: "gradual-load",
      arrivalRate: 1,
      // 50 users/sec
      duration: 1,
      // for 20 seconds → 50 * 20 = 1000
      maxVusers: 2
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
      launchOptions: { headless: false }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbG9hZC10ZXN0LnRzIiwgIi4uL29yZGVyUHVyY2hhc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBvcmRlclB1cmNoYXNlIGZyb20gXCIuL29yZGVyUHVyY2hhc2VcIjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZyA9IHtcbiAgdGFyZ2V0OiBcImh0dHBzOi8vYnVzaW5lc3NjZW50cmFsLmR5bmFtaWNzLmNvbS9cIixcbiAgcGhhc2VzOiBbXG4gICAge1xuICAgICAgbmFtZTogXCJncmFkdWFsLWxvYWRcIixcbiAgICAgIGFycml2YWxSYXRlOiAxLCAvLyA1MCB1c2Vycy9zZWNcbiAgICAgIGR1cmF0aW9uOiAxLCAvLyBmb3IgMjAgc2Vjb25kcyBcdTIxOTIgNTAgKiAyMCA9IDEwMDBcbiAgICAgIG1heFZ1c2VyczogMixcbiAgICB9LFxuICAgIC8vICAge1xuICAgIC8vICAgICBuYW1lOiBcInJhbXAtdXBcIixcbiAgICAvLyAgICAgYXJyaXZhbFJhdGU6IDIwLFxuICAgIC8vICAgICByYW1wVG86IDEwMCxcbiAgICAvLyAgICAgZHVyYXRpb246IDMwLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgbmFtZTogXCJzdXN0YWluXCIsXG4gICAgLy8gICAgIGFycml2YWxDb3VudDogNTAwLFxuICAgIC8vICAgICBkdXJhdGlvbjogMTUsXG4gICAgLy8gICB9LFxuICAgIC8vICAge1xuICAgIC8vICAgICBuYW1lOiBcImNvb2wtZG93blwiLFxuICAgIC8vICAgICBhcnJpdmFsUmF0ZTogNTAsXG4gICAgLy8gICAgIHJhbXBUbzogMCxcbiAgICAvLyAgICAgZHVyYXRpb246IDE1LFxuICAgIC8vICAgfSxcbiAgXSxcbiAgZW5naW5lczoge1xuICAgIHBsYXl3cmlnaHQ6IHtcbiAgICAgIGxhdW5jaE9wdGlvbnM6IHsgaGVhZGxlc3M6IGZhbHNlIH0sXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBzY2VuYXJpb3MgPSBbXG4gIHtcbiAgICBlbmdpbmU6IFwicGxheXdyaWdodFwiLFxuICAgIHRlc3RGdW5jdGlvbjogb3JkZXJQdXJjaGFzZSxcbiAgfSxcbl07XG4iLCAiaW1wb3J0IHsgUGFnZSwgZXhwZWN0LCBCcm93c2VyQ29udGV4dCB9IGZyb20gXCJAcGxheXdyaWdodC90ZXN0XCI7XG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5cbmNvbnN0IG9yZGVyUHVyY2hhc2UgPSBhc3luYyAocGFnZTogUGFnZSkgPT4ge1xuICAvLyBFeHRlbmQgdGltZW91dCB0byBoYW5kbGUgc2xvdyBpZnJhbWUvcGFnZSBsb2FkcyB1bmRlciBsb2FkXG4gIHBhZ2Uuc2V0RGVmYXVsdFRpbWVvdXQoMTUwMDApO1xuXG4gIC8vIExvYWQgYXV0aGVudGljYXRpb24gc3RhdGUgKGNvb2tpZS1iYXNlZClcbiAgY29uc3QgY29udGV4dDogQnJvd3NlckNvbnRleHQgPSBwYWdlLmNvbnRleHQoKTtcbiAgY29uc3Qgc3RvcmFnZVN0YXRlID0gSlNPTi5wYXJzZShcbiAgICBmcy5yZWFkRmlsZVN5bmMoXCIuLy5hdXRoL2xvZ2luLmpzb25cIiwgXCJ1dGYtOFwiKVxuICApO1xuICBhd2FpdCBjb250ZXh0LmFkZENvb2tpZXMoc3RvcmFnZVN0YXRlLmNvb2tpZXMpO1xuXG4gIC8vIEdvIHRvIEJ1c2luZXNzIENlbnRyYWxcbiAgYXdhaXQgcGFnZS5nb3RvKFwiaHR0cHM6Ly9idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tL1wiLCB7XG4gICAgd2FpdFVudGlsOiBcImxvYWRcIixcbiAgfSk7XG5cbiAgLy8gV2FpdCB1cCB0byAyMHMgZm9yIHRoZSBpZnJhbWUgZWxlbWVudCB0byBleGlzdCAobm90IG5lY2Vzc2FyaWx5IHZpc2libGUpXG4gIGF3YWl0IHBhZ2Uud2FpdEZvclNlbGVjdG9yKFwiLmRlc2lnbmVyLWNsaWVudC1mcmFtZVwiLCB7IHRpbWVvdXQ6IDIwMDAwIH0pO1xuXG4gIC8vIEdldCB0aGUgaWZyYW1lIG9uY2UgaXQncyBwcmVzZW50XG4gIGNvbnN0IGlmcmFtZUhhbmRsZSA9IGF3YWl0IHBhZ2UuJChcIi5kZXNpZ25lci1jbGllbnQtZnJhbWVcIik7XG4gIGlmICghaWZyYW1lSGFuZGxlKSB0aHJvdyBuZXcgRXJyb3IoXCJpZnJhbWUgZWxlbWVudCBub3QgZm91bmRcIik7XG5cbiAgY29uc3QgaWZyYW1lID0gYXdhaXQgaWZyYW1lSGFuZGxlLmNvbnRlbnRGcmFtZSgpO1xuICBpZiAoIWlmcmFtZSkgdGhyb3cgbmV3IEVycm9yKFwiaWZyYW1lIG5vdCB5ZXQgbG9hZGVkXCIpO1xuXG4gIGF3YWl0IGlmcmFtZS53YWl0Rm9yU2VsZWN0b3IoJ2E6aGFzLXRleHQoXCJFaW5rYXVmc2Jlc3RlbGxcIiknLCB7XG4gICAgdGltZW91dDogMjAwMDAsXG4gIH0pO1xuICBjb25zdCBwdXJjaGFzZU9yZGVyc0J1dHRvbiA9IGlmcmFtZS5sb2NhdG9yKCdhOmhhcy10ZXh0KFwiRWlua2F1ZnNiZXN0ZWxsXCIpJyk7XG5cbiAgaWYgKCFpZnJhbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2V0IGlmcmFtZSBjb250ZW50XCIpO1xuICB9XG5cbiAgLy8gV2FpdCBmb3IgdGhlIFwiUHVyY2hhc2UgT3JkZXJzXCIgbGluayB0byBiZSB2aXNpYmxlXG5cbiAgYXdhaXQgZXhwZWN0KHB1cmNoYXNlT3JkZXJzQnV0dG9uKS50b0JlVmlzaWJsZSgpO1xuICBhd2FpdCBwdXJjaGFzZU9yZGVyc0J1dHRvbi5jbGljaygpO1xuXG4gIGNvbnN0IHB1cmNoYXNlT3JkZXJQYWdlID0gaWZyYW1lLmdldEJ5VGV4dChcIkVpbmthdWZzYmVzdGVsbHVuZ2VuXCIsIHtcbiAgICBleGFjdDogdHJ1ZSxcbiAgfSk7XG4gIGF3YWl0IGV4cGVjdChwdXJjaGFzZU9yZGVyUGFnZSkudG9CZVZpc2libGUoKTtcblxuICBjb25zdCBuZXdCdXR0b24gPSBpZnJhbWUuZ2V0QnlSb2xlKFwibWVudWl0ZW1cIiwgeyBuYW1lOiBcIk5ldVwiIH0pO1xuICBhd2FpdCBuZXdCdXR0b24uY2xpY2soKTtcblxuICBjb25zdCB2ZW5kb3JOYW1lID0gaWZyYW1lLmdldEJ5TGFiZWwoXCJLcmVkaXRvcmVubmFtZVwiLCB7IGV4YWN0OiB0cnVlIH0pO1xuICBjb25zdCB2ZW5kb3JOYW1lRHJvcERvd24gPSBpZnJhbWUuZ2V0QnlMYWJlbChcIldcdTAwRTRobGVuIFNpZSBlaW5lbiBXZXJ0IGZcdTAwRkNyXCIpO1xuICBjb25zdCBkb2N1bWVudERhdGVGaWVsZCA9IGlmcmFtZS5nZXRCeVJvbGUoXCJjb21ib2JveFwiLCB7XG4gICAgbmFtZTogXCJCZWxlZ2RhdHVtXCIsXG4gIH0pO1xuICBjb25zdCB2ZW5kb3JJbnZvaWNlID0gaWZyYW1lLmdldEJ5TGFiZWwoXCJLcmVkLi1SZWNobnVuZ3Nuci5cIik7XG5cbiAgYXdhaXQgZXhwZWN0KGRvY3VtZW50RGF0ZUZpZWxkKS50b0JlRW1wdHkoKTtcbiAgYXdhaXQgZXhwZWN0KHZlbmRvckludm9pY2UpLnRvQmVFbXB0eSgpO1xuXG4gIGF3YWl0IHZlbmRvck5hbWVEcm9wRG93bi5jbGljaygpO1xuXG4gIGNvbnN0IG9rQnV0dG9uID0gaWZyYW1lLmdldEJ5Um9sZShcImJ1dHRvblwiLCB7IG5hbWU6IFwiT0tcIiB9KTtcbiAgYXdhaXQgb2tCdXR0b24uY2xpY2soKTtcblxuICBhd2FpdCBleHBlY3QodmVuZG9yTmFtZSkubm90LnRvQmVFbXB0eSgpO1xuICBhd2FpdCBleHBlY3QoZG9jdW1lbnREYXRlRmllbGQpLm5vdC50b0JlRW1wdHkoKTtcblxuICBjb25zdCBpbnZvaWNlTnVtYmVyID0gTWF0aC5mbG9vcigxMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMCkudG9TdHJpbmcoKTtcbiAgYXdhaXQgdmVuZG9ySW52b2ljZS5maWxsKGludm9pY2VOdW1iZXIpO1xuICBhd2FpdCBleHBlY3QodmVuZG9ySW52b2ljZSkubm90LnRvQmVFbXB0eSgpO1xuXG4gIGNvbnN0IGl0ZW1OdW1iZXIgPSBpZnJhbWUuZ2V0QnlSb2xlKFwiY29tYm9ib3hcIiwge1xuICAgIG5hbWU6IFwiTnIuXCIsXG4gICAgZXhhY3Q6IHRydWUsXG4gIH0pO1xuICBjb25zdCBpdGVtVGFibGVOdW1iZXIgPSBpZnJhbWUuZ2V0QnlMYWJlbChcIjE4OTYtU1wiKTtcblxuICBhd2FpdCBpdGVtTnVtYmVyLmNsaWNrKCk7XG4gIGF3YWl0IGl0ZW1UYWJsZU51bWJlci5jbGljaygpO1xuXG4gIGNvbnN0IHVuaXRQcmljZUlucHV0ID0gaWZyYW1lLmdldEJ5Um9sZShcInRleHRib3hcIiwge1xuICAgIG5hbWU6IFwiRUstUHJlaXMgT2huZSBNd1N0LlwiLFxuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcbiAgY29uc3QgdG90YWxQcmljZUlucHV0ID0gaWZyYW1lLmdldEJ5Um9sZShcInRleHRib3hcIiwge1xuICAgIG5hbWU6IFwiWmVpbGVuYmV0cmFnIE9obmUgTXdTdC5cIixcbiAgICBleGFjdDogdHJ1ZSxcbiAgfSk7XG5cbiAgYXdhaXQgdW5pdFByaWNlSW5wdXQud2FpdEZvcigpO1xuXG4gIGNvbnN0IHF1YW50aXR5ID0gaWZyYW1lLmdldEJ5Um9sZShcInRleHRib3hcIiwge1xuICAgIG5hbWU6IFwiTWVuZ2VcIixcbiAgICBleGFjdDogdHJ1ZSxcbiAgfSk7XG4gIGF3YWl0IHF1YW50aXR5LmZpbGwoXCIxMFwiKTtcbiAgYXdhaXQgcGFnZS5jbGljayhcImJvZHlcIik7XG5cbiAgY29uc3QgdW5pdFByaWNlVmFsdWUgPSBhd2FpdCB1bml0UHJpY2VJbnB1dC5pbnB1dFZhbHVlKCk7XG4gIGNvbnN0IHRvdGFsUHJpY2VWYWx1ZSA9IGF3YWl0IHRvdGFsUHJpY2VJbnB1dC5pbnB1dFZhbHVlKCk7XG4gIC8vIE9wdGlvbmFsIG1hdGggY2hlY2tzIGNhbiBnbyBoZXJlIGlmIG5lZWRlZFxuXG4gIGNvbnN0IHN0YXR1cyA9IGlmcmFtZS5nZXRCeVJvbGUoXCJ0ZXh0Ym94XCIsIHsgbmFtZTogXCJTdGF0dXNcIiB9KTtcbiAgY29uc3Qgc3RhdHVzT3BlbiA9IGF3YWl0IHN0YXR1cy50ZXh0Q29udGVudCgpO1xuXG4gIGNvbnN0IHBlcm1pc3Npb25CdXR0b24gPSBpZnJhbWUubG9jYXRvcihcbiAgICAnYnV0dG9uW2FyaWEtbGFiZWw9XCJHZW5laG1pZ3VuZyBhbmZvcmRlcm5cIl0nXG4gICk7XG5cbiAgYXdhaXQgcGVybWlzc2lvbkJ1dHRvbi5jbGljaygpO1xuXG4gIGNvbnN0IHNlbmRQZXJtaXNzaW9uQnV0dG9uID0gaWZyYW1lLmxvY2F0b3IoXG4gICAgJ2J1dHRvblthcmlhLWxhYmVsPVwiR2VuZWhtaWd1bmdzYW5mb3JkZXJ1bmcgc2VuZGVuXCJdJ1xuICApO1xuXG4gIGF3YWl0IHNlbmRQZXJtaXNzaW9uQnV0dG9uLmNsaWNrKCk7XG5cbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBpZnJhbWUuZ2V0QnlSb2xlKFwibWVudWl0ZW1cIiwgeyBuYW1lOiBcIlN0YXJ0XCIgfSk7XG5cbiAgYXdhaXQgc3RhcnRCdXR0b24uY2xpY2soKTtcbiAgYXdhaXQgcGFnZS53YWl0Rm9yVGltZW91dCgxMDAwKTtcbiAgY29uc3Qgc3RhdHVzUmVsZWFzZSA9IGF3YWl0IHN0YXR1cy50ZXh0Q29udGVudCgpO1xuXG4gIGNvbnN0IHBvc3RCdXR0b24gPSBpZnJhbWUuZ2V0QnlSb2xlKFwiYnV0dG9uXCIsIHtcbiAgICBuYW1lOiBcIkJ1Y2hlbi4uLlwiLFxuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcbiAgYXdhaXQgcG9zdEJ1dHRvbi5jbGljaygpO1xuICBhd2FpdCBwYWdlLndhaXRGb3JUaW1lb3V0KDEwMDApO1xuICBhd2FpdCBva0J1dHRvbi5jbGljaygpO1xuXG4gIGNvbnN0IHllc0J1dHRvbiA9IGlmcmFtZS5nZXRCeVJvbGUoXCJidXR0b25cIiwgeyBuYW1lOiBcIkphXCIgfSk7XG4gIGF3YWl0IHllc0J1dHRvbi5jbGljaygpO1xuXG4gIGNvbnN0IHBvc3RlZFB1cmNoYXNlUGFnZSA9IGlmcmFtZS5nZXRCeVRleHQoXCJHZWIuIEVpbmthdWZzcmVjaG51bmdcIiwge1xuICAgIGV4YWN0OiB0cnVlLFxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9yZGVyUHVyY2hhc2U7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7O0FDQUEsa0JBQTZDO0FBQzdDLGdCQUFlO0FBRWYsSUFBTSxnQkFBZ0IsT0FBTyxTQUFlO0FBRTFDLE9BQUssa0JBQWtCLElBQUs7QUFHNUIsUUFBTSxVQUEwQixLQUFLLFFBQVE7QUFDN0MsUUFBTSxlQUFlLEtBQUs7QUFBQSxJQUN4QixVQUFBQSxRQUFHLGFBQWEsc0JBQXNCLE9BQU87QUFBQSxFQUMvQztBQUNBLFFBQU0sUUFBUSxXQUFXLGFBQWEsT0FBTztBQUc3QyxRQUFNLEtBQUssS0FBSyx5Q0FBeUM7QUFBQSxJQUN2RCxXQUFXO0FBQUEsRUFDYixDQUFDO0FBR0QsUUFBTSxLQUFLLGdCQUFnQiwwQkFBMEIsRUFBRSxTQUFTLElBQU0sQ0FBQztBQUd2RSxRQUFNLGVBQWUsTUFBTSxLQUFLLEVBQUUsd0JBQXdCO0FBQzFELE1BQUksQ0FBQztBQUFjLFVBQU0sSUFBSSxNQUFNLDBCQUEwQjtBQUU3RCxRQUFNLFNBQVMsTUFBTSxhQUFhLGFBQWE7QUFDL0MsTUFBSSxDQUFDO0FBQVEsVUFBTSxJQUFJLE1BQU0sdUJBQXVCO0FBRXBELFFBQU0sT0FBTyxnQkFBZ0IsaUNBQWlDO0FBQUEsSUFDNUQsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUNELFFBQU0sdUJBQXVCLE9BQU8sUUFBUSwrQkFBK0I7QUFFM0UsTUFBSSxDQUFDLFFBQVE7QUFDWCxVQUFNLElBQUksTUFBTSw4QkFBOEI7QUFBQSxFQUNoRDtBQUlBLFlBQU0sb0JBQU8sb0JBQW9CLEVBQUUsWUFBWTtBQUMvQyxRQUFNLHFCQUFxQixNQUFNO0FBRWpDLFFBQU0sb0JBQW9CLE9BQU8sVUFBVSx3QkFBd0I7QUFBQSxJQUNqRSxPQUFPO0FBQUEsRUFDVCxDQUFD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
