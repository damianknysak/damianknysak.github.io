class Award {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.speed = createVector(random(1, 4), random(-2, 2));
        this.animationPart = 0;
        this.isKilled = 0;
        this.c = color(random(255), random(255), random(255));
    }

    show(index) {
        push();
        stroke(this.c);
        strokeWeight(3);
        noFill();
        translate(this.pos.x,this.pos.y);
        image(awardImg, -50, -50, 60, 45);
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
    }
    distance(){
        return dist(mouseX, mouseY, this.pos.x, this.pos.y);
    }

    sound(){
        awardSound.volume(0.1);
        awardSound.play();
    }
}