// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Varaiveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variaves oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//colisão raquete
let colidiu = false;

//Placar do jogo
let meuPonto = 0;
let pontoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
 trilha = loadSound("sons/trilha.mp3");
 ponto = loadSound("sons/ponto.mp3");
 raquetada = loadSound("sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);  
  //verificaColisaoRaquete();
  //movimentaRaqueteOponenteReal(); 
  movimentaRaqueteOponente(); 
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);  
  incluirPlacar();
  marcaPonto();
}


function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio< 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}


function movimentaMinhaRaquete(){
  if(keyIsDown(87)){
    yRaquete -= 10; 
  }
  if(keyIsDown(83)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
   if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio  < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
     velocidadeXBolinha *= -1;
     raquetada.play();
   }
}

function verificaColisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// função para joga com duas pessoas  //
function movimentaRaqueteOponenteReal(){
  if(keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 10; 
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 10;
  }
}

// função para jogar contra o computador
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontoOponente >= meuPonto) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}


function incluirPlacar(){ 
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255,140,0)); 
  rect(110, 10, 40, 20);
  fill(255);
  text(meuPonto, 130, 26);
  fill(color(255,140,0)); 
  rect(450, 10, 40, 20);
  fill(255);
  text(pontoOponente, 470, 26);
}

function marcaPonto(){
  if(xBolinha > 590){
    meuPonto += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontoOponente += 1;
    ponto.play();
  }
}