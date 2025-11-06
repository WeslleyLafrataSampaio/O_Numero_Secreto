//let titulo = document.querySelector("h1");
//titulo.innerHTML = "O Número Secreto";

//let paragrafo = document.querySelector("p");
//paragrafo.innerHTML = "Escolha um número entre 1 e 100";

//  Ao invés de reescrever diversas vezes o mesmo código, criamos uma função que
//executa as váriaveis que precisamso.

// Configurações e variáveis globais
const TOTAL_NUMEROS_POSSIVEIS = 100;
let listaNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

iniciarJogo();

// Funções utilitárias
function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  falar(texto);
}

function falar(texto) {
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1.7;
  speechSynthesis.speak(fala);
}

function iniciarJogo() {
  exibirTextoNaTela("h1", "O Número Secreto!");
  exibirTextoNaTela("p", `Escolha um número entre 1 e ${TOTAL_NUMEROS_POSSIVEIS}!`);
  
console.log(numeroSecreto)
console.log(listaNumerosSorteados);
}

function limparCampo() {
  let chute = document.querySelector("input");
  chute.value = "";
}

function pluralTentativa(tentativas) {
  return tentativas > 1 ? "tentativas" : "tentativa";
}

function gerarNumeroAleatorio() {
  // Se já sorteou todos os possíveis, reinicia a lista
  if (listaNumerosSorteados.length === TOTAL_NUMEROS_POSSIVEIS) {
    listaNumerosSorteados = [];
  }

  let numeroEscolhido;

  // Gera um número aleatório que ainda não tenha sido sorteado
  do {
    numeroEscolhido = parseInt(Math.random() * TOTAL_NUMEROS_POSSIVEIS + 1);
  } while (listaNumerosSorteados.includes(numeroEscolhido));

  listaNumerosSorteados.push(numeroEscolhido);
  return numeroEscolhido;
}

// Função principal de verificação
function verificarChute() {
  let chute = Number(document.querySelector("input").value);

  if (chute < 1 || chute > 100) {
    exibirTextoNaTela("p", `Por favor, digite um número entre 1 e ${TOTAL_NUMEROS_POSSIVEIS}.`);
    limparCampo();
    return;
  }

  if (chute == numeroSecreto) {
    exibirTextoNaTela("h1", "Acertou!");
    exibirTextoNaTela("p", `Você descobriu o número secreto com ${tentativas} ${pluralTentativa(tentativas)}!`);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else if (chute > numeroSecreto) {
    exibirTextoNaTela("h1", "Tente novamente!");
    exibirTextoNaTela("p", `O número secreto é menor que ${chute}!`);
    limparCampo();
  } else {
    exibirTextoNaTela("h1", "Tente novamente!");
    exibirTextoNaTela("p", `O número secreto é maior que ${chute}!`);
    limparCampo();
  }

  tentativas++;
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  iniciarJogo();
  limparCampo();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
