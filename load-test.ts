import { helloWorld } from "./galani";


export const config = {
  target: 'https://galaniprojects.de/eng.html',
  phases: [{
    // injects 5 user every second for 10 seconds  
    name: "constantArrival",
    duration: 10, 
    arrivalRate: 10,
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


