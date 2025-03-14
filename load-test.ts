import { helloWorld } from "./galani";


export const config = {
  target: 'https://inforos.c3c.lcl/infor/b3ef72f0-f3c0-4199-9350-8393d11584fc',
  phases: [{
    // injects 5 user every second for 10 seconds  
    name: "constantArrival",
    duration: 3, 
    arrivalRate: 100,
    maxVusers: 200
    },
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
    },
  },
};

export const scenarios = [
  {
    engine: 'playwright',
    testFunction: helloWorld
  },
];


