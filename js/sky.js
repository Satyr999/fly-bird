function Sky(option) {
    this.ctx = option.ctx;
    this.skyImg = option.skyImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.width = option.skyImg.width;
    this.speed = 2;
}
Sky.prototype = {
    constructor: Sky,
    drawSky: function() {
        this.canvasX -= this.speed;
        if (this.canvasX < -this.width) {
            this.canvasX += 2 * this.width;
        }
        this.ctx.drawImage(this.skyImg, this.canvasX, this.canvasY);
    }
}