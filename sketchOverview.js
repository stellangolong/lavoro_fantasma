
let coloriEta = [
  "#52B5D5",
  "#8383F7",
  "#EA336C",
  "#F2A8DF",
  "#EC612A",
  "#F6C543",
  "#54B8A0"
];

// variabili principali
let database;
let bottoneOrdina;
let bottoneDettaglio;
let ordinaAttivo = false;
let palliniCasuali = [];


// inizializzare il progetto e caricare il database
async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // caricare il database
  database = await loadTable("assets/databaseEtaGenere.csv", ",", "header");

  // generare le disposizioni casuali
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


// disegnare la pagina
function draw() {
  background("#FFFDF5");

  // calcolare le distanze tra i pallini
  let distanzaX = width / 8;
  let distanzaPallini = min(12, distanzaX / 5);
  let diametroPallini = min(9, distanzaPallini * 0.7);
  let spazioVerticale = max(5, min(12, (height / 2 - 195) / 20));


  // disegnare il titolo DONNE
  textAlign(CENTER);
  textSize(16);
  fill("#47403C");

  text("DONNE", width / 2, 25);


  // disegnare i dati delle donne
  disegnaGenere(8, 0, 45, distanzaX, distanzaPallini,
    diametroPallini, spazioVerticale);


  // linea di divisione tra le due parti
  stroke("#E9DCCA");
  strokeWeight(1);
  line(30, height / 2, width - 30, height / 2);
  noStroke();


  // disegnare il titolo UOMINI
  textAlign(CENTER);
  textSize(16);
  fill("#47403C");

  text("UOMINI", width / 2, height / 2 + 25);


  // disegnare i dati degli uomini
  disegnaGenere(16, 1, height / 2 + 45, distanzaX,
    distanzaPallini, diametroPallini, spazioVerticale);

}


// leggere e disegnare i dati di un genere
function disegnaGenere(rigaIniziale, indiceGenere, yIniziale,
  distanzaX, distanzaPallini, diametroPallini, spazioVerticale) {

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

        // calcolare la posizione del pallino nell'array
        let posizione = (19 - j) * 5 + k;


        // colorare i pallini in base alla modalità scelta
        if (ordinaAttivo) {

          if (posizione < percentualiEta[i]) {
            fill(coloriEta[i]);
          } else {
            fill("#E9DCCA");
          }

        } else {

          if (palliniCasuali[indiceGenere][i][posizione] == true) {
            fill(coloriEta[i]);
          } else {
            fill("#E9DCCA");
          }

        }


        noStroke();

        let x = distanzaX * (i + 1) + k * distanzaPallini;
        let y = yIniziale + j * spazioVerticale;

        circle(x, y, diametroPallini);

      }

    }

  }


  // scrivere le fasce d'età e le percentuali
  textAlign(CENTER);
  textSize(12);
  fill("#47403C");

  for (let i = 0; i < 7; i++) {

    let fasciaEta = database.get(
      rigaIniziale + i,
      "fascia_eta"
    );

    let x = distanzaX * (i + 1) + 2 * distanzaPallini;
    let y = yIniziale + 20 * spazioVerticale + 16;

    text(fasciaEta, x, y);
    text(percentualiEta[i] + "%", x, y + 17);

  }

}


// generare una disposizione casuale dei pallini
function generaPalliniCasuali() {

  let righeIniziali = [8, 16];

  for (let g = 0; g < 2; g++) {

    palliniCasuali[g] = [];

    for (let i = 0; i < 7; i++) {

      palliniCasuali[g][i] = [];

      // inizializzare cento posizioni non colorate
      for (let j = 0; j < 100; j++) {
        palliniCasuali[g][i][j] = false;
      }

      // scegliere casualmente quanti pallini colorare in base alla percentuale
      for (let j = 0; j < ceil(database.getNum(
        righeIniziali[g] + i,
        "tavola_2_persone_che_hanno_fornito_almeno_1_aiuto"
      )); j++) {

        let posizione = ceil(random(0, 99));

        // se la posizione è già occupata, sceglierne un'altra
        while (palliniCasuali[g][i][posizione] == true) {
          posizione = ceil(random(0, 99));
        }

        palliniCasuali[g][i][posizione] = true;

      }

    }

  }

}
