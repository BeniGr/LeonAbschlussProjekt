class Ball {
    constructor(x, y, radius) {
        this.x = x; //100
        this.y = y; //100
        this.radius = radius;
        let bool1 = true,
            bool2 = true;
        let zufall1 = 0;
        let zufall2 = 0;

        while(bool1){
            zufall1 = randomNumber(-18,18)
            if(zufall1 < -14 || zufall1 > 14)
                bool1 = !bool1;
        }

        while(bool2){
            zufall2 = randomNumber(-18,18)
            if(zufall2 < -14 || zufall2 > 14)
                bool2 = !bool2;
        }

        this.vx = zufall1 / 100;
        this.vy = zufall2 / 100;

        console.log(this.vx + " / " + this.vy)

        /*let bool = true;
        while(bool){
            this.vx = randomNumber(-0.05,0.05)
            this.vy = randomNumber(-0.05,0.05)
            if(this.vx != 0 && this.vy !=0)
                bool= false;
        }*/

        //gradiant variables
        this.maxGrdFactorCap = 0 - this.radius + this.radius / 100 * 28;
        this.minGrdFactorCap = 0 - this.radius * 2 + this.radius / 100 * 28
        this.grdFactor = this.maxGrdFactorCap -1 ;
        this.grdAnimationFactor = this.radius / 100 * 0.8;
        this.direction = randomNumber(1,3) === 1;
        this.directionGRD = randomNumber(1,3) === 1;


        //colors
        /*this.warmColor = "" + colors.warmBalls[randomNumber(0, 3)];
        this.coldColor = "" + colors.coldBalls[randomNumber(0, 3)];*/
        this.color = newColors2[randomNumber(0,6)];

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    calcGradiant() {
        let grd = null;

        if(this.direction)
            this.grdFactor -= this.grdAnimationFactor;
        else
            this.grdFactor += this.grdAnimationFactor;

        grd = ctx.createLinearGradient(this.x, this.y + this.grdFactor + this.maxGrdFactorCap, this.x, this.y + this.grdFactor + -this.maxGrdFactorCap);
        if(this.directionGRD){
            grd.addColorStop(1, this.warmColor);
            grd.addColorStop(0, this.coldColor);
        }else{
            grd.addColorStop(0, this.warmColor);
            grd.addColorStop(1, this.coldColor);
        }



        if(this.grdFactor < this.minGrdFactorCap || this.grdFactor > -this.minGrdFactorCap)
            this.direction = !this.direction;


        //console.log(grd)
        return grd;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }
}