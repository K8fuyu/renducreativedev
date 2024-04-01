// main.js

import ClockScene from "./clockScene";
import Time from "./time";
import Scenario from "./js/scenarios/Scenario";

const clockScene = new ClockScene('canvas-clock');

const time = new Time();

time.on('update', (currentTime) => {
    clockScene.updateTime(currentTime);
});

// Mettre en pause le rafraîchissement de l'horloge lorsque la fenêtre est inactive
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        time.start();
    } else {
        time.stop();
    }
});

const scene = new Scenario();

const scene2 = new Scenario('canvas-scene-2');
