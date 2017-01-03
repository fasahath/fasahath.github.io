/**
 * Created by Fasahath on 31-Dec-16.
 *
 * Thanks to Scott Murray!
 * I have just converted the code to p5.js.
 */

var numParticles = 250;
if (window.innerWidth <= 480) {
    numParticles = 50;
}

var maxVelocity = 10;
var newHueVal;

var xc, yc, dia;


function Particle(_x, _y, _d) {
    this.l = new p5.Vector(_x,_y,0); //location
    this.v = new p5.Vector(_x,_y,0); //velocity
    this.v.set(random(-maxVelocity, maxVelocity), random(-maxVelocity, maxVelocity), 0);
    this.d = _d; //diameter
    this.h = 0;  //hue
    this.b = 0;	 //brightness
    this.newHueFlag = false;
}

Particle.prototype.flagForNewHue = function() {
    this.newHueFlag = true;
};

Particle.prototype.newHue = function() {
    this.d += 1.5;
    this.h = newHueVal;
    this.b = random(25,75);
};

Particle.prototype.update = function() {
    this.l.add(this.v);
    if(this.l.x < 0 || this.l.x > width || this.l.y < 0 || this.l.y > height){
        this.l.set(mouseX, mouseY, 0);
        this.v.set(random(-maxVelocity, maxVelocity), random(-maxVelocity, maxVelocity), 0);
        if(this.newHueFlag) {
            this.newHue();
            this.newHueFlag = false;
        }
    }
};

Particle.prototype.render = function() {
    stroke(this.h);
    fill(this.h, 100, this.b);
    ellipse(this.l.x, this.l.y, this.d, this.d);
};

//
var particles = new Array();

function setup(){
    createCanvas(window.innerWidth,window.innerHeight);

    frameRate(24);
    colorMode(HSB, 100);
    ellipseMode(CENTER);

    for(var i = 0; i < numParticles; i++){
        xc = width/2;
        yc = height/2;
        dia = 2;
        particles[i] = new Particle(xc, yc, dia);
    }
}

var touched = false;

function draw(){
    background(100);
	if(touched){
		touched = false;
	    for(var i = 0; i < numParticles; i++) {
		    particles[i].flagForNewHue();
	    }
		newHueVal = random(0, 100);
	}
	for (var i = 0; i < numParticles; i++){
        particles[i].update();
        particles[i].render();
    }
}


function touchStarted() {
	touched = true;
}


window.onresize = function(event) {
    createCanvas(window.innerWidth,window.innerHeight-3);
};
