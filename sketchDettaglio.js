let coloreRettangolo = '#D5D5F2'

let margine = 30;
let angoli = 20;
let gap = 15;

let spazioEta = 100;

let fasceEta = [
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65-74",
    "75+"
];

let coloriEta = [
  "#52B5D5",
  "#8383F7",
  "#EA336C",
  "#F2A8DF",
  "#EC612A",
  "#F6C543",
  "#54B8A0"
];

let etaSelezionata = 1;

let altezza;

let altezzaInferiore;

let larghezzaTotale;


//quando apro la pagina è già sul genere che ho selezionato, ricorda quale bottone è attivo
let genereSelezionato = "UOMO";

let posizioni = [];


async function setup(){
    createCanvas(windowWidth, windowHeight);
   //larghezza totale dsponibile
   larghezzaTotale = width - margine * 2 - gap * 2 - spazioEta;
    
    data = await loadTable("assets/databaseEtaGenere.csv", ",", "header");
    
    //altezza rettangoli superiori
     altezza = height * 0.35;
    //altezza rettangoli inferiori
     altezzaInferiore = height * 0.42;


    for(let i = 0; i < 11; i++){
        posizioni[i] ={
            x: random(margine + 50, margine + larghezzaTotale  * 0.5 + gap - 50),
            y: random(90 + altezza + gap + 50, 90 + altezza + gap + altezzaInferiore - 50)
        };
    }
}

function draw(){
    background('#FFFDF5');
    noStroke();

    fill('#47403C');
    textSize(28);
    textAlign(LEFT, CENTER);
    text("UOMO DI 25-34 ANNI", margine + 60, 45);
    
    //faccia
    fill('#8383F7');
     rect(margine, 15, 50, 50, 10);
    //ellipse(margine + 25, 40, 50, 50); tonda

    //occhi
    fill('#FFFDF5');
    ellipse(margine + 18, 35, 4, 4);
    ellipse(margine + 32, 35, 4, 4);

    //sorriso
    noFill();
    stroke('#FFFDF5');
    strokeWeight(1.5);
    arc(margine + 25, 42, 18, 15, 0, PI);





//prima riga 25% + 25%+50% e seconda riga 50%+25%+25% (due blocchi)
let larghezza1 = larghezzaTotale * 0.25;
let larghezza2 = larghezzaTotale * 0.25;
let larghezza3 = larghezza1 + gap + larghezza2;

//altezza rettangoli superiori
altezza = height * 0.35;
//altezza rettangoli inferiori
altezzaInferiore = height * 0.42;

fill(coloreRettangolo);

    //prima riga
    rect(margine, 90, larghezza1, altezza, angoli); //posione x, y, larghezza, altezza, angoli arrotondati

   
    rect(margine + larghezza1 + gap, 90, larghezza2, altezza, angoli);

   
    rect(margine + larghezza3 + gap, 90 + altezzaInferiore + gap, larghezza3, altezza, angoli);margine + larghezza1 + gap + larghezza2 + gap, 90

   //seconda riga
    rect(margine, 90 + altezza + gap, larghezza3, altezzaInferiore, angoli); //posione x, y, larghezza, altezza, angoli arrotondati

  
    rect(margine + larghezza1 + gap + larghezza2 + gap, 90, larghezza1, altezzaInferiore, angoli);

  
    rect(margine + larghezza1 + gap + larghezza2 + gap + larghezza2 + gap, 90, larghezza2, altezzaInferiore, angoli);

    //rettangolo destinatari
    let riga = 5; //mettendo la sette non funzionava
    let colonne = [
       "Padre",
       "Madre",
       "Suocero",
       "Suocera",
       "Fratello o sorella, cognato o cognata, nipoti",
       "Figlio o figlia, genero o nuora, nipoti", "Nonno/a", 
       "Altro parente",
       "Amici" ,
       "Vicini",
       "Altra persona"
    ];

    for(let i = 0; i < colonne.length; i++){
        let valore = data.getNum(riga, i + 21);
        let diametro = valore * 2.5 + 35;

        let x = posizioni[i].x;
        let y = posizioni[i].y;

        fill('#8383F7');
        noStroke();
        ellipse(x, y, diametro, diametro);

        //scritte percentuale e categoria
        fill('#FFFDF5');
        textSize(12);
        textAlign(CENTER, CENTER);
        text(valore + "%", x, y - 7);

        textSize(9);
        text(colonne[i], x, y + 9);
    }

    disegnaFasceEta();
    
    //blocco dei pulsanti
    let xBottoni  = width - margine - 180;
    let yBottoni = 31;

   
    //pulsanti
    disegnaPulsante("UOMO", xBottoni, yBottoni, "UOMO");
    disegnaPulsante("TOTALE", xBottoni + 60, yBottoni, "TOTALE");
    disegnaPulsante("DONNA", xBottoni + 120, yBottoni, "DONNA");
    
    noFill();
    stroke('#47403C');
    strokeWeight(1);
    rect(xBottoni, yBottoni, 180, 28, 8);

}

//pulsanti genere
function disegnaPulsante(testo, x, y, valore){
if(genereSelezionato == valore){
    fill('#8383F7')
}else{
    fill('#FFFDF5')
}
noStroke();
rect(x, y, 60, 28, 8);

if(genereSelezionato == valore){
    fill('#FFFDF5')
}else{
    fill('#47403C')
}

textSize(11);
textAlign(CENTER, CENTER);
text(testo, x + 30,y +14);
}

function disegnaFasceEta(){
    let xCerchio =  width - margine - spazioEta + 50;
    let yIniziale = 90 + 12;
    let yFinale = 90 + altezza + gap + altezzaInferiore - 12;
    let distanza = (yFinale - yIniziale) / (fasceEta.length - 1);

//barra
    stroke('#47403C');
    strokeWeight(1.5);
    line(xCerchio, yIniziale, xCerchio, yFinale);

    for (let i = 0; i < fasceEta.length; i++){
        let y = yIniziale + i * distanza;

        //cerchi
        if(etaSelezionata == i){
            fill(coloriEta[i]);
            }else{
              fill('#FFFDF5');
        }

        stroke(coloriEta[i]);
        strokeWeight(2);

        ellipse(xCerchio, y, 25, 25);

        //scritta per fasce
        noStroke();
        fill(coloriEta[i]);
        textSize(14);
        textAlign(LEFT, CENTER);

        text(fasceEta[i], xCerchio + 15, y);

    }

}


//Bottoni
function mousePressed(){

    //bottoni genere
    let xBottoni = width - margine - 180;
    let yBottoni = 31;

    if(mouseX >= xBottoni && mouseX <= xBottoni + 180 &&
        mouseY >= yBottoni && mouseY <= yBottoni +28)
{
if(mouseX < xBottoni + 60){
    genereSelezionato = "UOMO";
}else if(mouseX < xBottoni + 120){
     genereSelezionato = "TOTALE";
}else{
    genereSelezionato = "DONNA";
}
return;
}

//bottoni cerchietti
let xCerchio =  width - margine - spazioEta + 50;
let yIniziale = 90 + 12;
let yFinale = 90 + altezza + gap + altezzaInferiore - 12;

let distanza = (yFinale - yIniziale) / (fasceEta.length -1);

for(let i = 0; i < fasceEta.length; i++){
    let y = yIniziale + i * distanza;
    let d = dist(mouseX, mouseY, xCerchio, y);

    if(d < 15){ //dist distanza tra mouse e centro del pallino, se è inferiore a 15 abbiamo cliccato abbastanza vicino
        etaSelezionata = i; //aggiorna la fascia
        return;
    }
}
}

