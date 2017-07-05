//同时加载多张图片的封装
function loadImg(imgArr, callback) {
    var count = 0;
    var imgList = [];
    for (var i = 0; i < imgArr.length; i++) {
        var img = new Image();
        img.src = "./images/" + imgArr[i] + ".png";
        imgList[imgArr[i]] = img;
        img.onload = function() {
            count++;
            if (count == imgArr.length) {
                callback(imgList);
            }
        }
    }
}
/*绘制天空的函数封装*/
function Sky(option) {
    this.ctx = option.ctx;
    this.skyImg = option.skyImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.skySpeed = 2;
    this.skyW = option.skyImg.width;
}
Sky.prototype = {
    constructor: Sky,
    drawSky: function() {
        this.canvasX -= this.skySpeed;
        if (this.canvasX < -this.skyW) {
            this.canvasX += 2 * this.skyW;
        }
        this.ctx.drawImage(this.skyImg, this.canvasX, this.canvasY);
    }
}

/*绘制陆地的封装*/
function Land(option) {
    this.ctx = option.ctx;
    this.landImg = option.landImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.landSpeed = 2;
    this.landW = option.landImg.width;
    this.LandH = option.landImg.height;
}
Land.prototype = {
    constructor: Land,
    drawLand: function() {
        this.canvasX -= this.landSpeed;
        if (this.canvasX < -this.landW) {
            this.canvasX += this.landW * 4;
        }
        this.ctx.drawImage(this.landImg, this.canvasX, this.canvasY);
    }
}

//绘制小鸟的封装
function Bird(option) {
    this.ctx = option.ctx;
    this.birdImg = option.birdImg;
    this.canvasX = option.canvasX;
    this.canvasY = option.canvasY;

    this.g = 0.0003;
    this.birdW = option.birdImg.width / 3;
    this.birdH = option.birdImg.height;
    this.maxAngle = 45;
    this.maxSpeed = 0.45;
    this.birdSpeed = 0;
    this.birdIndex = 0;
}
Bird.prototype = {
        constructor: Bird,
        drawBird: function(offsetT) {
            /*重力加速度公式：
             *移动距离=速度*时间间隔+g*时间间隔*时间间隔/2；
             *末速度=初速度+g*时间间隔
             */
            var distance = this.birdSpeed * offsetT + this.g * offsetT * offsetT / 2;
            this.birdSpeed = this.birdSpeed + this.g * offsetT;
            var currentAngle = this.maxAngle * this.birdSpeed / this.maxSpeed;
            if (currentAngle > 45) {
                currentAngle = 45;
            }
            this.canvasY += distance;

            this.ctx.save();
            this.ctx.translate(this.canvasX + this.birdW / 2, this.canvasY + this.birdH / 2);
            this.ctx.rotate(Math.PI / 180 * currentAngle);
            this.ctx.drawImage(this.birdImg, this.birdW * this.birdIndex, 0, this.birdW, this.birdH, -this.birdW / 2, -this.birdH / 2, this.birdW, this.birdH);
            this.ctx.restore();
            this.birdIndex++;
            if (this.birdIndex > 2) {
                this.birdIndex = 0;
            }
        }
    }
    //绘制管道的封装
function Pipe(option) {
    this.ctx = option.ctx;
    this.topPipe = option.topPipe;
    this.bottomPipe = option.bottomPipe;
    this.canvasX = option.canvasX;

    this.pipeSpeed = 2;
    this.space = 150;
    this.pipeH = option.topPipe.height;
    this.pipeW = option.topPipe.width;
    this.topY = 0;
    this.bottomY = 0;
    this.getY();
}
Pipe.prototype = {
    constructor: Pipe,
    drawPipe: function() {
        this.canvasX -= this.pipeSpeed;
        if (this.canvasX < -this.pipeW * 3) {
            this.canvasX += 3 * this.pipeW * 6;
            this.getY();
        }
        this.ctx.drawImage(this.topPipe, this.canvasX, this.topY, this.pipeW, this.pipeH);
        this.ctx.rect(this.canvasX, this.topY, this.pipeW, this.pipeH);
        this.ctx.drawImage(this.bottomPipe, this.canvasX, this.bottomY, this.pipeW, this.pipeH);
        this.ctx.rect(this.canvasX, this.bottomY, this.pipeW, this.pipeH);
    },
    getY: function() {
        this.topY = -(Math.random() * 250 + 120);
        this.bottomY = this.topY + this.pipeH + this.space;
    }
}