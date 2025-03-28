import { orderPurchase } from "./orderPurchase";

export const config = {
  target: "https://businesscentral.dynamics.com/",
  phases: [
    {
      name: "gradual-load",
      arrivalRate: 50, // 50 users/sec
      duration: 20, // for 20 seconds → 50 * 20 = 1000
      maxVusers: 1000,
    },
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
      //launchOptions: { headless: false },
    },
  },
};

export const scenarios = [
  {
    engine: "playwright",
    testFunction: orderPurchase,
  },
];
