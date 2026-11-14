

let coloriEta = [
  "#52B5D5",
  "#8383F7",
  "#EA336C",
  "#F2A8DF",
  "#EC612A",
  "#F6C543",
  "#54B8A0"
];

let database;
let bottoneOrdina;
let bottoneDettaglio;
let ordinaAttivo = false;
let palliniCasuali = [];
let sliderGenere;
let genereSelezionato = 1;
let ultimoGenere = 1;


async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // creare lo slider per selezionare il genere
  sliderGenere = createSlider(0, 2, 1, 1);
  sliderGenere.position(40, windowHeight - 75);
  sliderGenere.size(270);
  sliderGenere.style("accent-color", "#47403C");

  // caricare il database
  database = await loadTable("assets/databaseEtaGenere.csv", ",", "header");

  genereSelezionato = sliderGenere.value();
  ultimoGenere = genereSelezionato;

  generaPalliniCasuali();


  // creare il bottone ORDINA
  bottoneOrdina = createButton("ORDINA");
  bottoneOrdina.position(windowWidth - 330, windowHeight - 103);
  bottoneOrdina.size(76, 76);
  bottoneOrdina.style("background-color", "#E9DCCA");
  bottoneOrdina.style("color", "#47403C");
  bottoneOrdina.style("border", "none");
  bottoneOrdina.style("border-radius", "50%");
  bottoneOrdina.style("font-family", "Instrument Sans");
  bottoneOrdina.style("font-size", "13px");


  // creare il bottone VAI AL DETTAGLIO
  bottoneDettaglio = createButton("VAI AL DETTAGLIO →");
  bottoneDettaglio.position(windowWidth - 220, windowHeight - 89);
  bottoneDettaglio.size(180, 48);
  bottoneDettaglio.style("background-color", "#E9DCCA");
  bottoneDettaglio.style("color", "#47403C");
  bottoneDettaglio.style("border", "none");
  bottoneDettaglio.style("border-radius", "12px");
  bottoneDettaglio.style("font-family", "Instrument Sans");
  bottoneDettaglio.style("font-size", "14px");


  // cambiare l'aspetto del bottone quando viene premuto
  bottoneOrdina.mousePressed(function() {

    ordinaAttivo = !ordinaAttivo;

    if (ordinaAttivo) {
      bottoneOrdina.style("background-color", "#47403C");
      bottoneOrdina.style("color", "#FFFDF5");
    } else {
      bottoneOrdina.style("background-color", "#E9DCCA");
      bottoneOrdina.style("color", "#47403C");
    }

  });


  // passare alla pagina di dettaglio
  bottoneDettaglio.mousePressed(function() {
    window.location.href = "dettaglio.html";
  });

}


function draw() {
  background("#FFFDF5");

  // leggere la posizione dello slider
  genereSelezionato = sliderGenere.value();

  // rigenerare la disposizione casuale quando cambia il genere
  if (genereSelezionato != ultimoGenere) {
    ultimoGenere = genereSelezionato;
    generaPalliniCasuali();
  }

  // individuare la prima riga del genere selezionato
  let rigaIniziale = 0;

  if (genereSelezionato == 0) {
    rigaIniziale = 8;
  }

  if (genereSelezionato == 2) {
    rigaIniziale = 16;
  }


  let distanzaX = width / 8;
  let distanzaPallini = 15;

  let percentualiEta = [];

  // leggere le percentuali dal database
  for (let i = 0; i < 7; i++) {
    percentualiEta[i] = database.getNum(
      rigaIniziale + i,
      "tavola_2_persone_che_hanno_fornito_almeno_1_aiuto"
    );
  }


  // disegnare le sette colonne
  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < 20; j++) {

      for (let k = 0; k < 5; k++) {

        let posizione = (19 - j) * 5 + k;

        // colorare gli elementi in base alla modalità scelta
        if (ordinaAttivo) {

          if (posizione < percentualiEta[i]) {
            fill(coloriEta[i]);
          } else {
            fill("#E9DCCA");
          }

        } else {

          if (palliniCasuali[i][posizione] == true) {
            fill(coloriEta[i]);
          } else {
            fill("#E9DCCA");
          }

        }

        noStroke();

        let x = distanzaX * (i + 1) + k * distanzaPallini;
        let y = 80 + j * distanzaPallini;

        // cambiare la forma in base al genere selezionato
        if (genereSelezionato == 0) {
          push();
          translate(x, y);
          rotate(PI / 4);
          rectMode(CENTER);
          rect(0, 0, 9, 9, 2);
          pop();

        } else if (genereSelezionato == 1) {
          circle(x, y, 9);

        } else if (genereSelezionato == 2) {
          rectMode(CENTER);
          rect(x, y, 9, 9, 2);
        }

      }
    }
  }


  // scrivere le fasce d'età e le percentuali
  textAlign(CENTER);
  textSize(14);
  fill("#47403C");

  for (let i = 0; i < 7; i++) {

    let fasciaEta = database.get(
      rigaIniziale + i,
      "fascia_eta"
    );

    let x = distanzaX * (i + 1) + 2 * distanzaPallini;

    text(fasciaEta, x, 400);
    text(percentualiEta[i] + "%", x, 422);
  }


  // disegnare gli indicatori del genere
  disegnaSelettoreGenere();

}


// generare una disposizione casuale degli elementi per ogni colonna
function generaPalliniCasuali() {

  let rigaIniziale = 0;

  if (genereSelezionato == 0) {
    rigaIniziale = 8;
  }

  if (genereSelezionato == 2) {
    rigaIniziale = 16;
  }

  for (let i = 0; i < 7; i++) {

    palliniCasuali[i] = [];

    for (let j = 0; j < 100; j++) {
      palliniCasuali[i][j] = false;
    }

    for (let j = 0; j < ceil(database.getNum(
      rigaIniziale + i,
      "tavola_2_persone_che_hanno_fornito_almeno_1_aiuto"
    )); j++) {

      let posizione = ceil(random(0, 99));

      while (palliniCasuali[i][posizione] == true) {
        posizione = ceil(random(0, 99));
      }

      palliniCasuali[i][posizione] = true;
    }
  }

}


// disegnare il selettore del genere
function disegnaSelettoreGenere() {

  let y = height - 100;

  let coloreNeutro = "#E9DCCA";
  let coloreAttivo = "#47403C";


  // rombo per le donne
  push();
  translate(45, y);
  rotate(PI / 4);

  if (genereSelezionato == 0) {
    fill(coloreAttivo);
  } else {
    fill(coloreNeutro);
  }

  rectMode(CENTER);
  rect(0, 0, 18, 18, 4);
  pop();


  // cerchio per entrambi
  if (genereSelezionato == 1) {
    fill(coloreAttivo);
  } else {
    fill(coloreNeutro);
  }

  circle(175, y, 18);


  // quadrato per gli uomini
  if (genereSelezionato == 2) {
    fill(coloreAttivo);
  } else {
    fill(coloreNeutro);
  }

  rectMode(CENTER);
  rect(305, y, 18, 18, 4);


  // etichette del selettore
  fill("#47403C");
  textAlign(CENTER);
  textSize(12);

  text("DONNE", 45, y + 25);
  text("ENTRAMBI", 175, y + 25);
  text("UOMINI", 305, y + 25);

}
