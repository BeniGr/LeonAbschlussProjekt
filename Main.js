const BALL_NUM = 600;
const Ball_RADIUS = window.screen.width * 0.0058548;
const COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
const PI_2 = 2 * Math.PI
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const myBalls = new Array(BALL_NUM);
var raf;
canvas.width = window.screen.width;
canvas.height = window.screen.height;
var f = new FontFace('Roboto Slap', 'url(RobotoSlab-VariableFont_wght.ttf)');/*
var polygon = [
    [canvas.width / 100 * 36.4583, canvas.height / 100 * 45, 83205],
    [canvas.width / 100 * 40.1041, canvas.height / 100 * 45, 83205],
    [canvas.width / 100 * 40.1041, canvas.height / 100 * 39.35075],
    [canvas.width / 100 * 59.79161, canvas.height / 100 * 39.35075],
    [canvas.width / 100 * 59.79161, canvas.height / 100 * 45.83205],
    [canvas.width / 100 * 67.29162, canvas.height / 100 * 45.83205],
    [canvas.width / 100 * 67.29162, canvas.height / 100 * 55.09105],
    [canvas.width / 100 * 36.4583, canvas.height / 100 * 55.09105]
]

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};*/
f.load().then(function (font) {
    console.log(font);
    document.fonts.add(font);

    function loop() {
        ctx.beginPath(); //bg
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = colors.darkBg[0];
        ctx.fill();

        /*ctx.beginPath();
        ctx.rect(700, 520, 522, 75);
        ctx.closePath();
        ctx.fillStyle = "red"
        ctx.fill();

        ctx.beginPath();
        ctx.rect(770, 425, 380, 95);
        ctx.closePath();
        ctx.fillStyle = "blue"
        ctx.fill();*/
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < myBalls.length; i++) {
            detectCollisionWall(myBalls[i])
            for (let j = i + 1; j < myBalls.length; j++) {
                collisionBetweenBalls(myBalls[i], myBalls[j])
            }
            myBalls[i].move();
            myBalls[i].draw(ctx);
        }
        ctx.font = "bold 80px Roboto Slap";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Alles Gute", canvas.width / 2, canvas.height / 2 - 25);
        ctx.fillText("zum Bachelor", canvas.width / 2, canvas.height / + 75);
        raf = window.requestAnimationFrame(loop);
    }

    function detectCollisionWall(b) {
        if (b.x < b.radius || b.x > (canvas.width - b.radius)) {
            b.vx = -b.vx
        }
        if (b.y < b.radius || b.y > (canvas.height - b.radius)) {
            b.vy = -b.vy
        }
        /*if ((b.x + b.radius > 700 && b.x + b.radius < 1222) && (b.y + b.radius < 595 && b.y + b.radius > 520)) {
            b.vx = -b.vx;
            b.vy = -b.vy;
            console.log("call")
        }
        if ((b.x + b.radius > 770 && b.x + b.radius < 1150) && (b.y + b.radius > 425 && b.y + b.radius < 520)) {
            b.vx = -b.vx;
            b.vy = -b.vy;
            console.log("call")
        }*/
    }

    function collisionBetweenBalls(a, b) {
        let distance = Math.sqrt(((b.x - a.x) * (b.x - a.x)) + ((b.y - a.y) * (b.y - a.y)));

        if (distance < (a.radius + b.radius) + 1) {
            let tmpX = b.vx;
            let tmpY = b.vy;
            b.vx = a.vx;
            b.vy = a.vy;
            a.vx = tmpX;
            a.vy = tmpY;
            /*b.vx = -b.vx;
            a.vx = -a.vx;
            a.vy = -a.vy;
            b.vy = -b.vy;*/
        }
    }

    function spawn() {
        for (let i = 0; i < myBalls.length; i++) {
            let repeat = true;
            while (repeat) {
                console.log(i);
                let r = Ball_RADIUS + randomNumber(0, 4);
                let x = randomNumber(r * 2, (canvas.width - r * 2))
                let y = randomNumber(r * 2, (canvas.height - r * 2))
                if (allowToSpawn(x, y, r)) {
                    myBalls[i] = new Ball(x, y, r);
                    repeat = false;
                }
            }
            myBalls[i].draw(ctx);
        }
        console.log("spawned all balls");
    }

    function allowToSpawn(x, y, r) {
        let allow = true;
        myBalls.forEach(b1 => {
            if (b1 != null) { //if compareBallExists
                if (initCollisionBetweenBalls(x, y, r, b1)) { //Collision detection
                    allow = false; //dontAllowSpawn
                    return false; //break foreach
                }
            } else
                return false //break foreach
        });
        return allow;
    }


    function initCollisionBetweenBalls(x, y, r, b) {
        let distance = ((b.x - x) * (b.x - x)) + ((b.y - y) * (b.y - y));
        if ((distance < ((r + b.radius) * (r + b.radius)) + 10))
            return true;
        else
            return false;
    }

    function randomNumber(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    spawn();
    //b.draw(ctx);
    loop();
});

