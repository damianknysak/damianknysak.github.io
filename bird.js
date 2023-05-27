class Bird {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.speed = createVector(random(1, 4), random(-2, 2));
        this.animationPart = 0;
        this.isKilled = 0;
        if (this.speed.mag() < 3) this.speed.setMag(10);
        this.c = color(random(255), random(255), random(255));
    }

    show(index) {
        if(index % 5 == 0){
            this.animationPart++;
        }
        if(this.animationPart > 8){
            this.animationPart = 0;
        }
        push();
        stroke(this.c);
        strokeWeight(3);
        noFill();
        translate(this.pos.x,this.pos.y);
        image(images[this.animationPart], -50, -50, 100, 100);
        pop();
    }

    update() {
        this.pos.add(this.speed);
        if (this.pos.y < 0 && this.isKilled == 0) this.speed.y = -this.speed.y;
        if (this.pos.y > height && this.isKilled == 0) this.speed.y = -this.speed.y;
    }

    isDestroyed(){
        if (this.pos.x > width + 100) return true;
    }

    kill(){
        this.isKilled = 1;
        this.speed.y = 10;
        birdKillSound.volume(0.01);
        birdKillSound.play();
    }

    distance(){
        return dist(mouseX, mouseY, this.pos.x, this.pos.y);
    }
}