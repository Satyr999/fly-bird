function Land(option) {
    this.ctx = option.ctx;
    this.landImg = option.landImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.landSpeed = 2;
    this.landW = option.landImg.width;
    this.landH = option.landImg.height;
}
Land.prototype = {
    constructor: Land,
    drawLand: function() {
        this.canvasX -= this.landSpeed;
        if (this.canvasX < -this.landW) {
            this.canvasX += 4 * this.landW;
        }
        this.ctx.drawImage(this.landImg, this.canvasX, this.canvasY);
    }
}