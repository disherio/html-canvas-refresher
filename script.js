const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let mouseX = 400;
let mouseY = 400;

function updateMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    //console.log([mouseX, mouseY])
}

function getAngleFromVector(){
    var angle = Math.atan2()
}

function normalize(x, y) {
    let length = Math.sqrt(x*x+y*y);
    let normalX = x/length;
    let normalY = y/length;
    return [normalX, normalY]
}

const numberOfParticles = 200;

let particlesArray = [];

const ship = new Image();
ship.src = 'bitmap2.png'

// function d2r(degrees)
// {
//   var pi = Math.PI;
//   return degrees * (pi/180);
// }

class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 50;
        this.speed = Math.random() * 3 + 1;
        this.angle = Math.random() * 360;
        this.spin = Math.random() < 0.5 ? -1 : 1;
    }
    draw() {
        //ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'red';
        //ctx.fillRect(0,0, canvas.width, canvas.height);
        ctx.drawImage(ship, 0 - this.size/2, 0- this.size/2, this.size, this.size*1.5)
        ctx.restore();
    }
    update() {

        this.angle = Math.atan2(this.y-mouseY, this.x-mouseX)-(Math.PI/2);
        if (this.y > canvas.height) {
            this.y = 0  - this.size;
            this.x = Math.random() * canvas.width;
            this.size = Math.random() * 100 + 50;
            this.speed = Math.random() * 5 + 1;
        }
        if (Math.abs(this.x-mouseX) > 10  || Math.abs(this.y-mouseY) > 10) {
            this.x -= normalize(this.x-mouseX, this.y-mouseX)[0]
            this.y -= normalize(this.x-mouseX, this.y-mouseY)[1]
        }

        // this.x += (Math.cos(d2r(this.angle-90)))
        // this.y += (Math.sin(d2r(this.angle-90)))
    }
}

canvas.addEventListener("mousemove", (e) => {
    updateMousePosition(canvas, e)
})

const particle1 = new Particle();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particle1.update();
    particle1.draw();
    requestAnimationFrame(animate);
}


animate();
