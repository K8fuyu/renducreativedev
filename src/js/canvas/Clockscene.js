export default class Clockscene {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.clock = new Clock(this.context, this.canvas.width / 2, this.canvas.height / 2, Math.min(this.canvas.width, this.canvas.height) * 0.4);
        this.time = new Date();
    }

    draw() {
        this.clearCanvas();
        this.clock.drawClockFace();
        this.clock.drawHourHand(this.time.getHours(), this.time.getMinutes());
        this.clock.drawMinuteHand(this.time.getMinutes());
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
