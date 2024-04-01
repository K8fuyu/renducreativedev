import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor(clock) {
        super();
        this.clock = clock; // Référence à l'horloge
        this.update();
    }

    update() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        // Mise à jour de l'horloge avec l'heure actuelle
        this.clock.updateTime(hours, minutes, seconds);

        // Déclencher l'événement 'update' avec l'heure actuelle
        this.trigger('update', { hours, minutes, seconds });

        // Mettre à jour l'heure toutes les secondes
        setTimeout(() => this.update(), 1000);
    }
}
