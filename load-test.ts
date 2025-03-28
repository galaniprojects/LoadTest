import orderPurchase from "./orderPurchase";

export const config = {
  target: "https://businesscentral.dynamics.com/",
  phases: [
    {
      name: "100-users-at-once",
      arrivalCount: 100,
      duration: 1,
      maxVusers: 100,
      ensure: false,
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
      launchOptions: { headless: true },
    },
  },
};

export const scenarios = [
  {
    engine: "playwright",
    testFunction: orderPurchase,
  },
];
