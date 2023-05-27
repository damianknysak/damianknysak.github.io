let startBtn = document.querySelectorAll(".startBtn");
let quitBtn = document.querySelector(".quitBtn");
let nav = document.querySelector("nav");
let navInGame = document.querySelector(".nav-inGame");
let modalWynikowy = document.querySelector(".modalWynikowy");
let modalRanking = document.querySelector(".modalRanking");
let recordsBtn = document.querySelectorAll(".recordsBtn");
let modalBonus = document.querySelector(".modalBonus");
let tablicaWynikow = [];
let tablicaObecna = [];

let isGameStarted = -1;




//game will start
startBtn.forEach(element => {
      element.addEventListener("click", () => {
      if(modalRanking.classList.length < 2) modalRanking.classList.add("inactive");
      startGame(1);
    });
});

//game will end
quitBtn.addEventListener("click", quitGame);

//modal ranking
recordsBtn.forEach(ranking => {
    ranking.addEventListener("click", () => {
        modalRanking.classList.toggle("inactive");
        if(modalWynikowy.classList.length < 2) modalWynikowy.classList.add("inactive"); 
        let list = document.querySelector(".rankingList");
        list.innerHTML = "";
        tablicaWynikow.sort((a, b) => b[0] - a[0]);
        let maxRecords = 0;
        tablicaWynikow.forEach(wynik => {
            if(maxRecords < 11){
                    let li = document.createElement("li");
                    if(maxRecords == 0){
                        li.innerHTML = `<b>Wynik: ${wynik[0]}, Liczba Ptaków: ${wynik[1]}, Celność: ${wynik[2]}%</b>`;
                    }
                    else{
                        li.innerText = `Wynik: ${wynik[0]}, Liczba Ptaków: ${wynik[1]}, Celność: ${wynik[2]}%`;
                    }
                    list.appendChild(li);
            }
            maxRecords++;
        });
    });
});


function startGame(level){
  console.log(`startuje na poziomie ${level}`);
  nav.classList.add("inactive");
  navInGame.classList.remove("inactive");
  isGameStarted = level;
  tablicaObecna = [];
  modalWynikowy.classList.add("inactive");
}

function quitGame(){
  navInGame.classList.add("inactive");
  nav.classList.remove("inactive");
  isGameStarted = -1;
  
}
function gameFinished(wynik, lPtakow, celnosc){
  quitGame();
  let curr_array = [wynik, lPtakow, celnosc];
  if(tablicaObecna.length == 0){
    tablicaObecna = curr_array;
    pokazWyniki();
  }
}
function pokazWyniki(){
  //wyświetlanie wyniku
  if(tablicaObecna.length > 0){
    let divWszystkie = document.querySelector(".divWszystkie");
    let divWynik = document.querySelector(".divWynik");
    let divCelnosc = document.querySelector(".divCelnosc");
    divWszystkie.innerText = `Liczba ptaków: ${tablicaObecna[1]}`;
    divWynik.innerText = `Wynik: ${tablicaObecna[0]}`;
    divCelnosc.innerText = `Celność: ${tablicaObecna[2]}%`;
    tablicaWynikow.push(tablicaObecna);
    tablicaWynikow.sort((a,b) => a-b);
    console.log(tablicaWynikow);
    modalWynikowy.classList.remove("inactive");
  }
}

function showBonus(index){
  modalBonus.classList.remove("inactive");
  modalBonus.children.forEach(child => {
    if(child.classList.length == 2) child.classList.add("inactive");
  });
  if(index == 1){
    let awardBonus = document.querySelector(".bonusAward");
    awardBonus.classList.remove("inactive");
    setTimeout(() => {
      awardBonus.classList.add("inactive");
      modalBonus.classList.add("inactive");
    }, 1000);
  }
  if(index == 2){
    let timeBonus = document.querySelector(".bonusTime");
    timeBonus.classList.remove("inactive");
    setTimeout(() => {
      timeBonus.classList.add("inactive");
      modalBonus.classList.add("inactive");
    }, 1000);
  }
  if(index == 3){
    let bombBonus = document.querySelector(".bonusBomb");
    bombBonus.classList.remove("inactive");
    setTimeout(() => {
      bombBonus.classList.add("inactive");
      modalBonus.classList.add("inactive");
    }, 1000);
  }
  
}
