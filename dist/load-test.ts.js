var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// load-test.ts
var load_test_exports = {};
__export(load_test_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(load_test_exports);

// galani.ts
var import_test = require("@playwright/test");
async function helloWorld(page) {
  await page.goto("https://galaniprojects.de/eng.html");
  await page.getByRole("link", { name: "Our Expertise" }).click();
  await (0, import_test.expect)(page.getByRole("heading", { name: "Expertise" })).toBeVisible();
}

// load-test.ts
var config = {
  target: "https://galaniprojects.de/eng.html",
  phases: [
    {
      // injects 5 user every second for 10 seconds  
      name: "constantArrival",
      duration: 10,
      arrivalRate: 5
    }
    // {
    // // Pause
    // name: "Pause,",
    // pause: 5,
    // }, 
    // {
    // // ramp up:
    // name: "RampUp",
    // duration: 5,
    // arrivalRate: 1,
    // rampTo: 5,
    // },
    // {
    //     name: "fixed",
    //     duration: 5,
    //     arrivalCount: 10,
    // }
  ],
  engines: {
    playwright: {
      //launchOptions: { headless: false },
    }
  }
};
var scenarios = [
  {
    engine: "playwright",
    testFunction: helloWorld
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbG9hZC10ZXN0LnRzIiwgIi4uL2dhbGFuaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaGVsbG9Xb3JsZCB9IGZyb20gXCIuL2dhbGFuaVwiO1xuXG5cbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIHRhcmdldDogJ2h0dHBzOi8vZ2FsYW5pcHJvamVjdHMuZGUvZW5nLmh0bWwnLFxuICBwaGFzZXM6IFt7XG4gICAgLy8gaW5qZWN0cyA1IHVzZXIgZXZlcnkgc2Vjb25kIGZvciAxMCBzZWNvbmRzICBcbiAgICBuYW1lOiBcImNvbnN0YW50QXJyaXZhbFwiLFxuICAgIGR1cmF0aW9uOiAxMCwgXG4gICAgYXJyaXZhbFJhdGU6IDUsXG4gICAgfSxcbiAgICAvLyB7XG4gICAgLy8gLy8gUGF1c2VcbiAgICAvLyBuYW1lOiBcIlBhdXNlLFwiLFxuICAgIC8vIHBhdXNlOiA1LFxuXG4gICAgLy8gfSwgXG4gICAgLy8ge1xuICAgIC8vIC8vIHJhbXAgdXA6XG4gICAgLy8gbmFtZTogXCJSYW1wVXBcIixcbiAgICAvLyBkdXJhdGlvbjogNSxcbiAgICAvLyBhcnJpdmFsUmF0ZTogMSxcbiAgICAvLyByYW1wVG86IDUsXG4gICAgLy8gfSxcbiAgICAvLyB7XG4gICAgLy8gICAgIG5hbWU6IFwiZml4ZWRcIixcbiAgICAvLyAgICAgZHVyYXRpb246IDUsXG4gICAgLy8gICAgIGFycml2YWxDb3VudDogMTAsXG4gICAgLy8gfVxuICAgIFxuXG5dLFxuICBlbmdpbmVzOiB7XG4gICAgcGxheXdyaWdodDoge1xuICAgICAgLy9sYXVuY2hPcHRpb25zOiB7IGhlYWRsZXNzOiBmYWxzZSB9LFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgc2NlbmFyaW9zID0gW1xuICB7XG4gICAgZW5naW5lOiAncGxheXdyaWdodCcsXG4gICAgdGVzdEZ1bmN0aW9uOiBoZWxsb1dvcmxkXG4gIH0sXG5dO1xuXG5cbiIsICJpbXBvcnQgeyBQYWdlLCBleHBlY3QgfSBmcm9tICdAcGxheXdyaWdodC90ZXN0JztcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGVsbG9Xb3JsZChwYWdlOiBQYWdlKSB7XG4gICAgYXdhaXQgcGFnZS5nb3RvKCdodHRwczovL2dhbGFuaXByb2plY3RzLmRlL2VuZy5odG1sJyk7XG4gICAgYXdhaXQgcGFnZS5nZXRCeVJvbGUoJ2xpbmsnLCB7IG5hbWU6ICdPdXIgRXhwZXJ0aXNlJyB9KS5jbGljaygpO1xuICAgIGF3YWl0IGV4cGVjdChwYWdlLmdldEJ5Um9sZSgnaGVhZGluZycsIHsgbmFtZTogJ0V4cGVydGlzZScgfSkpLnRvQmVWaXNpYmxlKCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxrQkFBNkI7QUFHN0IsZUFBc0IsV0FBVyxNQUFZO0FBQ3pDLFFBQU0sS0FBSyxLQUFLLG9DQUFvQztBQUNwRCxRQUFNLEtBQUssVUFBVSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU07QUFDOUQsWUFBTSxvQkFBTyxLQUFLLFVBQVUsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFDLENBQUMsRUFBRSxZQUFZO0FBQy9FOzs7QURKTyxJQUFNLFNBQVM7QUFBQSxFQUNwQixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFFUCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixhQUFhO0FBQUEsSUFDYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXFCSjtBQUFBLEVBQ0UsU0FBUztBQUFBLElBQ1AsWUFBWTtBQUFBO0FBQUEsSUFFWjtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sWUFBWTtBQUFBLEVBQ3ZCO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsRUFDaEI7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
