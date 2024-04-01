export default class Clock {
    constructor(context, centerX, centerY, radius) {
        this.context = context;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    drawClockFace() {
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = 'white';
        this.context.fill();

        // Dessiner les chiffres
        this.context.font = '20px Arial';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            const angle = (i - 3) * (Math.PI * 2) / 12;
            const x = this.centerX + Math.cos(angle) * (this.radius * 0.8);
            const y = this.centerY + Math.sin(angle) * (this.radius * 0.8);
            this.context.fillText(i, x, y);
        }
        this.context.closePath();
    }

    drawHourHand(hour, minute) {
        const hourAngle = (hour % 12 + minute / 60) * (Math.PI * 2) / 12;
        const hourLength = this.radius * 0.5;
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY);
        this.context.lineTo(this.centerX + Math.cos(hourAngle) * hourLength, this.centerY + Math.sin(hourAngle) * hourLength);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 5;
        this.context.stroke();
        this.context.closePath();
    }

    drawMinuteHand(minute) {
        const minuteAngle = minute * (Math.PI * 2) / 60;
        const minuteLength = this.radius * 0.7;
        this.context.beginPath();
        this.context.moveTo(this.centerX, this.centerY);
        this.context.lineTo(this.centerX + Math.cos(minuteAngle) * minuteLength, this.centerY + Math.sin(minuteAngle) * minuteLength);
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 3;
        this.context.stroke();
        this.context.closePath();
    }
}
