//Moonlander. Um jogo de alunissagem
//Bárbara Santana Zotto (https://github.com/Barbarazotto)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de Moelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

// contexto.rect(0, 0, 100, 100);
// contexto.fillStyle = "white";
// contexto.fill();
// contexto.strokeStyle = "black";
// contexto.stroke();

// contexto.beginPath()
// contexto.moveTo(100, 100);
// contexto.lineTo(200, 100);
// contexto.lineTo(100, 200);
// contexto.lineTo(100, 100);
// contexto.fillStyle = "black";
// contexto.fill();

let moduloLunar = {
    posicao: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "ligthgray",
    motorLigado: false,
    velocidade: {
        x: 0,
        y: 0,
    },
    combustivel: 1000
}

function desenharModoLunar(){
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura)
    contexto.fillStyle = moduloLunar.cor
    contexto.fill();
    contexto.closePath();
    
    if(moduloLunar.motorLigado){
        desenharChama();
    }
    contexto.restore();
}

function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 30); //determina o tamanho da chama
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarVelocidade(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center"
    contexto.textBaseline = "middle"
    contexto.fillStyle = "lightgray"
    let velocidade = `Velocidade: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`
    contexto.fillText(velocidade, 100, 60);
}

function mostrarCombustivel(){
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center"
    contexto.textBaseline = "middle"
    contexto.fillStyle = "lightgray"
    let combustivel = `Combustivel: ${(moduloLunar.combustivel.y).toFixed(0)}`
    contexto.fillText(combustivel, 100, 80);
}

function desenhar(){
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //Esta função atualiza a posição do módulo lunar em função de gravidade
    atracaoGravitacional();
    mostrarVelocidade();
    mostrarCombustivel();
    desenharModoLunar();
    //Esta função repete a execução da função a cada quadro
    requestAnimationFrame(desenhar);
    
}

    //Seção de controle
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = true;
    }
}
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento){
    if(evento.keyCode == 38){
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.1;
function atracaoGravitacional(){
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;
    if(moduloLunar.motorLigado){
        moduloLunar.velocidade.y -= 0.2;
    }
    moduloLunar.velocidade.y += gravidade;
}
desenhar();
