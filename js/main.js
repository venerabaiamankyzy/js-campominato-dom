// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Errata corrige: rendere le caselle "non cliccabili" e far finire la partita è un superbonus, non è richiesto dalla consegna!
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
// BONUS
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
// Consigli del giorno: :party_wizard:
// Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
// Ad esempio
// Di cosa ho bisogno per generare i numeri?
// Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
// Le validazioni e i controlli possiamo farli anche in un secondo momento.
// SUPERBONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

/**********************************
 *                                *
 *              ON LOAD           *
 *                                *
 *********************************/
const gridEl = document.getElementById("grid");
const gridButtonEl = document.getElementById("button-play");
const selectEl = document.getElementById("difficulty");

gridButtonEl.addEventListener("click", function () {
  const selectEl = document.getElementById("difficulty").value;
  let selectValue = 0;
  if (selectEl == "easy") {
    selectValue = 1;
  } else if (selectEl == "medium") {
    selectValue = 2;
  } else if (selectEl == "hard") {
    selectValue = 3;
  }
  generatedGrid(gridEl, selectValue);
});

// genero 16 numeri casuali
const bombArray = [];

function genaratedBomb(min, max) {
  numberOfBomb = Math.floor(Math.random() * (max - min)) + min;
  return numberOfBomb;
}

for (let b = 0; b < 16; b++) {
  let bomb = genaratedBomb(1, 100);

  while (bombArray.includes(bomb)) {
    bomb = genaratedBomb(1, 100);
  }
  bombArray.push(bomb);
}
console.log("BombArray", bombArray);
/**********************************
 *                                *
 *              FUNCTIONS         *
 *                                *
 *********************************/

function generatedGrid(grid, difficulty) {
  gridEl.innerHTML = "";

  // i livelli di difficoltà
  let selectClasses;
  let dimension;
  if (difficulty == 1) {
    dimension = 100;
    selectClasses = "easy";
  } else if (difficulty == 2) {
    dimension = 81;
    selectClasses = "medium";
  } else if (difficulty == 3) {
    dimension = 49;
    selectClasses = "hard";
  }

  //numero dei square e per 100 volte sono aggiunti
  for (let i = 0; i < dimension; i++) {
    const numberOfSquare = i + 1;
    //genero un div
    const squareEl = document.createElement("div");

    // gli aggiungo la classe .square nella grid
    squareEl.classList.add("square", selectClasses);

    //gli aggiungo i numeri
    squareEl.innerHTML = numberOfSquare;

    // aggiungo un addeventlistener sul click che faccia il "toggle" della classe .active
    squareEl.addEventListener("click", function () {
      this.classList.toggle("active");
      console.log(this.innerHTML);
    });

    //lo aggiungo alla griglia
    grid.append(squareEl);
  }
}
