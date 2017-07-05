function Pipes(option) {
    this.ctx = option.ctx;
    this.topImg = option.topImg;
    this.bottomImg = option.bottomImg;
    this.canvasX = option.canvasX;

    this.space = 150;
    this.pipeSpeed = 2;
    this.topY = 0;
    this.bottomY = 0;
    this.pipeW = option.topImg.width;
    this.pipeH = option.topImg.height;
    this.getY();
}
Pipes.prototype = {
    constructor: Pipes,
    drawPipes: function() {
        this.canvasX -= this.pipeSpeed;
        if (this.canvasX < -3 * this.pipeW) {
            this.canvasX += 3 * this.pipeW * 6;
            this.getY();
        }

        this.ctx.drawImage(this.topImg, this.canvasX, this.topY, this.pipeW, this.pipeH);
        this.ctx.rect(this.canvasX, this.topY, this.pipeW, this.pipeH);
        // this.ctx.fillRect(this.canvasX, this.topY, this.pipeW, this.pipeH);
        this.ctx.drawImage(this.bottomImg, this.canvasX, this.bottomY, this.pipeW, this.pipeH);
        this.ctx.rect(this.canvasX, this.bottomY, this.pipeW, this.pipeH);

    },
    getY: function() {
        this.topY = -(Math.random() * 250 + 120);
        this.bottomY = this.topY + this.pipeH + this.space;
    }
}