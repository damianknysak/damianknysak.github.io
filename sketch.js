function deleteFromArray(array, el) {
  const index = array.indexOf(el);
  if (index > -1) { // only splice array when item is found
    array.splice(index, 1); // 2nd parameter means remove one item only
  }
  return array;
}
let images = [];
let x, y;
let radius;
let birds;
let clocks;
let awards;
let bombs;

let bg;
let liWynik = document.querySelector(".Wynik");
let liWszystkie = document.querySelector(".LiczbaPtakow");
let liCzas = document.querySelector(".Czas");
let liCelnosc = document.querySelector(".Celnosc");
let alarmClock; 
let awardImg;
let bombImg;

let index;
let birdCounter;
let birdsKilledCounter;
let value;
let startTime;
let seconds;
let timeLeft;

//temporary vars onClicked
let birdToBeKilled;
let bombFriendly = true;

//sounds
let explodeSound;
let birdKillSound;
let awardSound;
let clockSound;
let bgSound;
function preload() {
  images[0] = loadImage('test/ptak1.png');
  images[1] = loadImage('test/ptak2.png');
  images[2] = loadImage('test/ptak3.png');
  images[3] = loadImage('test/ptak4.png');
  images[4] = loadImage('test/ptak5.png');
  images[5] = loadImage('test/ptak6.png');
  images[6] = loadImage('test/ptak7.png');
  images[7] = loadImage('test/ptak8.png');
  images[8] = loadImage('test/ptak9.png');
  bg = loadImage('test/bg.png');
  alarmClock = loadImage('test/budzik.png');
  awardImg = loadImage('test/award.png');
  bombImg = loadImage('test/bomb.png');

  explodeSound = loadSound('assets/explosion.wav');
  birdKillSound = createAudio('assets/bird_kill.wav');
  awardSound = createAudio('assets/award.mp3');
  clockSound = createAudio('assets/clock.mp3');
  bgSound = createAudio('assets/background.mp3');
  
 
}

function setup(bombFriendlyStatus = true) {
  frameRate(60);
  let cnv = createCanvas(windowWidth, windowHeight); 
  bgSound.play();
  radius = 60;
  birds = [];
  clocks = [];
  awards = [];
  bombs = [];


  index = 0;
  birdCounter = 0;
  birdsKilledCounter = 0;
  value = 0;
  startTime = new Date();
  seconds = startTime.getSeconds();

  //temporary vars onClicked
  birdToBeKilled = null;
  bombFriendly = bombFriendlyStatus;

}


function draw() {
 
  //reset the game
  if(isGameStarted > -1){
    bgSound.volume(0.4);
    bgSound.loop();
    birds.length = 0;
    isGameStarted = -1;
    setup(false);
  }

  liCzas.innerText = `0:${getTime()}`;
  if(getTime() == 0){
    startTime = new Date();
    let cel = birdsKilledCounter != birdCounter ? (birdsKilledCounter/birdCounter * 100).toPrecision(2) : 100;
    gameFinished(birdsKilledCounter, birdCounter, cel);
  }  
  let cel = birdsKilledCounter != birdCounter ? (birdsKilledCounter/birdCounter * 100).toPrecision(2) : 100;
  liWynik.innerHTML = birdsKilledCounter;
  liWszystkie.innerHTML = birdCounter;
  liCelnosc.innerHTML = cel > 99 ? 100 : cel;
  background(bg);

  changeCursor();

  //clocks, birds, bombs, awards
  spawnNewElements();

}


function getTime(){
  const currTime = new Date();
  let difSeconds = currTime.getSeconds();
  let wynik = 59 + (seconds - difSeconds);
  if(wynik > 59) wynik -= 60;
  let wynikStr = wynik > 9 ? `${wynik}` : `0${wynik}`;
  return wynikStr;
}

function spawnNewElements(){
  //clocks add and delete
  if(index % 333 == 0 && getTime() < 56){
    clocks.push(new Budzik(-100, random(0, height)));
    clocks.forEach(clock => {
      if (clock.isDestroyed()) {
        clocks = deleteFromArray(clocks, clock);
      }
    });
  }
  //awards add and delete
  if(index % 400 == 0){
    awards.push( new Award(-100, random(0, height)));
    awards.forEach(award => {
      if (award.isDestroyed()) {
        awards = deleteFromArray(awards, award);
      }
    });
  }
  //bombs add and delete
  if(index % 400 == 0){
    bombs.push(new Bomb(-100, random(0, height)));
    bombs.forEach(bomb => {
      if (bomb.isDestroyed()) {
        bombs = deleteFromArray(bombs, bomb);
      }
    });
  }
  //adding and deleting birds
  if (index % 40 == 0) {
    birdCounter++;
    birds.push(new Bird(-100, random(0, height)));
    birds.forEach(bird => {
      if (bird.isDestroyed()) {
        birds = deleteFromArray(birds, bird);
      }
    });
  }
  index++;
  //show birds
  birds.forEach(bird => {
    bird.show(index);
    bird.update();
  });
  //show clocks
  clocks.forEach(clock => {
    clock.show(index);
    clock.update();
  });
  //show awards
  awards.forEach(award => {
    award.show(index);
    award.update();
  });

  //show bombs
  bombs.forEach(bomb => {
    bomb.show(index);
    bomb.update();
  });

  
}

function checkClosestBird(){
  if(birds.length > 0){
    let minD = birds[0].distance();
    let curBird = birds[0];
    birds.forEach(bird => {
     if(bird.distance() < minD){
      minD = bird.distance();
      curBird = bird;
     }  
    });
    return [minD, curBird];
  }
  return [1000, null];
}

function checkClosestBomb(){
  if(bombs.length > 0){
    let minD = bombs[0].distance();
    let curBomb = bombs[0];
    bombs.forEach(bomb => {
      if(bomb.distance() < minD){
        minD = bomb.distance();
        curBomb = bomb;
      }  
    });
    return [minD, curBomb];
  }
  return [1000, null];
}

function checkClosestAward(){
  if(awards.length > 0){
      let minD = awards[0].distance();
      let curAward = awards[0];
      awards.forEach(award => {
      if(award.distance() < minD){
        minD = award.distance();
        curAward = award;
      }  
      });
      return [minD, curAward];
  }
  return [1000, null];
}

function checkClosestClock(){
  if(clocks.length > 0){
      let minD = clocks[0].distance();
      let curClock = clocks[0];
      clocks.forEach(clock => {
        if(clock.distance() < minD){
          minD = clock.distance();
          curClock = clock;
        }  
      });
      return [minD, curClock];
  }
  return [1000, null];
}

function mouseClicked() {
  //check if bird killed
  if(checkClosestBird()[0] < radius){
    birdToBeKilled = checkClosestBird()[1];
    if(birdToBeKilled.isKilled == 0){
      birdToBeKilled.kill();
        birdsKilledCounter++;
    }
  }

  //check if bomb activated
  if(checkClosestBomb()[0] < radius && bombFriendly == false){
    let bombToBeActivated = checkClosestBomb()[1];
    bombToBeActivated.explosionSound();
    showBonus(3);
    let cel = birdsKilledCounter != birdCounter ? (birdsKilledCounter/birdCounter * 100).toPrecision(2) : 100;
    gameFinished(birdsKilledCounter, birdCounter, cel);
  }

  //check if award gained
  if(checkClosestAward()[0] < radius){
    let awardToBeActivated = checkClosestAward()[1];
    birdsKilledCounter += 2;
    awardToBeActivated.sound();
    showBonus(1);
    deleteFromArray(awards, awardToBeActivated);
  }

  //check if time is gained
  if(checkClosestClock()[0] < radius){
    let timeToBeAdded = checkClosestClock()[1];
    
    const currTime = new Date();
    let difSeconds = currTime.getSeconds();
    let wynik = 59 + (seconds - difSeconds);
    if(wynik > 59) wynik -= 60;
    console.log(wynik);
    if(wynik > 55){
    }
    else{
      seconds += 4;
      timeToBeAdded.sound();
      showBonus(2);
      deleteFromArray(clocks, timeToBeAdded);
    }

    }
}

function changeCursor(){
  if (mouseX < 50 && mouseY < 50) {
    cursor('assets/crosshair.cur');
  }
}
