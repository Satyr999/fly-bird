function Bird(option) {
    this.ctx = option.ctx;
    this.birdImg = option.birdImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.g = 0.0003;
    this.maxAngle = 45;
    this.maxSpeed = 0.45;
    this.birdSpeed = 0;
    this.birdIndex = 0;
    this.birdX = 0;
    this.birdW = option.birdImg.width / 3;
    this.birdH = option.birdImg.height;
}

Bird.prototype = {
    constructor: Bird,
    drawBird: function(offsetT) {
        /*重力加速度公式：
         *移动距离=速度*时间间隔+g*时间间隔*时间间隔/2；
         *末速度=初速度+g*时间间隔
         */
        this.birdSpeed = this.birdSpeed + this.g * offsetT;
        var distanceY = this.birdSpeed * offsetT + this.g * offsetT * offsetT / 2;
        this.canvasY += distanceY;
        //计算小鸟过程中头部需要旋转的角度
        var currentAngle = this.maxAngle * this.birdSpeed / this.maxSpeed;
        if (currentAngle > 45) {
            currentAngle = 45;
        }

        //让当前画布的变换不影响其他的内容
        this.birdX = this.birdIndex * this.birdW;

        ctx.save();
        //实现偏移
        ctx.translate(this.canvasX + this.birdW / 2, this.canvasY + this.birdH / 2);
        //实现旋转
        ctx.rotate(Math.PI / 180 * currentAngle);
        //绘制
        //ctx.drawImage(图片，素材X，素材Y，素材W，素材H，画布X，画布Y，素材W，素材H)；
        ctx.drawImage(this.birdImg, this.birdX, 0, this.birdW, this.birdH, -this.birdW / 2, -this.birdH / 2, this.birdW, this.birdH);
        ctx.restore();

        this.birdIndex++;
        if (this.birdIndex > 2) {
            this.birdIndex = 0;
        }
    }
}