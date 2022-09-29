const tiles = document.getElementsByClassName('tile');
const jogadorVez = document.getElementById('sJogadorDaVez');
const vencedor = document.getElementById('vencedor');
const timer = document.getElementById('timer');
var inicio = new Date();
var jogada = 0;
var tempo = false;
var comecou = 'x';

function manejaEventos(adiciona) {
  if (adiciona) {
    paraTimer(false);
    for (let indice = 0; indice < tiles.length; indice++) {
      tiles[indice].addEventListener('click', clicouCasa, false);
      tiles[indice].classList.add('casa-vazia');
    }
  } else {
    paraTimer(true);
    for (let indice = 0; indice < tiles.length; indice++) {
      tiles[indice].removeEventListener('click', clicouCasa, false);
      tiles[indice].classList.remove('casa-vazia');
    }
  }
}

function clicouCasa(evento) {
  jogada++;
  if (jogada % 2 == 0) {
    jogadorVez.innerText = 'X';
    negritaJogadorDaVez('x', 'o');
    fazJogo(evento, 'o');
  } else {
    jogadorVez.innerText = 'O';
    negritaJogadorDaVez('o', 'x');
    fazJogo(evento, 'x');
  }
}

function negritaJogadorDaVez(qualNegritar, qualNormalizar) {
  document.getElementById(qualNegritar + '-jogador').classList.add('negrito');
  document.getElementById(qualNormalizar + '-jogador').classList.remove('negrito');
}

function fazJogo(evento, jogador) {
  evento.target.removeEventListener('click', clicouCasa, false);
  evento.target.classList.remove('casa-vazia');
  evento.target.classList.add(jogador);
  verificaVitoria(jogador);
}

function verificaVitoria(jogador) {
  if (verificaLinhas(jogador) || verificaColunas(jogador) || verificaDiagonais(jogador)) {
    vitoria(jogador);
  } else if ((comecou == 'x' && jogada > 8) || (comecou == 'o' && jogada > 9)){
    velha();
  }
}

function verificaLinhas(jogador) {
  for (let indice = 1; indice < 4; indice++) {
    const linha = document.getElementsByClassName('linha' + indice);
    if (linha[0].classList.contains(jogador) && linha[1].classList.contains(jogador) && linha[2].classList.contains(jogador)) {
      piscaVitoria(linha);
      return true;
    }
  }
  return false;
}

function verificaColunas(jogador) {
  for (let indice = 1; indice < 4; indice++) {
    const coluna = document.getElementsByClassName('coluna' + indice);
    if (coluna[0].classList.contains(jogador) && coluna[1].classList.contains(jogador) && coluna[2].classList.contains(jogador)) {
      piscaVitoria(coluna);
      return true;
    }
  }
  return false;
}

function verificaDiagonais(jogador) {
  for (indice = 1; indice < 3; indice++) {
    const diagonal = document.getElementsByClassName('diagonal' + indice);
    if (diagonal[0].classList.contains(jogador) && diagonal[1].classList.contains(jogador) && diagonal[2].classList.contains(jogador)) {
      piscaVitoria(diagonal);
      return true;
    }
  }
  return false;
}

function vitoria(jogador) {
  atualizaVitorias(jogador);
  atualizaPontos(jogador);
  atualizaTempo(jogador);
  manejaEventos(false);
  vencedor.innerText = 'Vitória do ' + jogador.toUpperCase() + '!';
}

function atualizaTempo(jogador) {
  const placarTempo = document.getElementById(jogador + '-tempo');
  let tempoPartida = parseFloat((timer.innerText).replace(':', '.'));
  let tempoJogador = parseFloat((placarTempo.innerText).replace(':', '.')) || Infinity;

  if (tempoPartida < tempoJogador) {placarTempo.innerText = timer.innerText;}
  destacaTempo();
}

function destacaTempo() {
  const placarTempoX = document.getElementById('x-tempo');
  const placarTempoO = document.getElementById('o-tempo');

  let tempoX = parseFloat((placarTempoX.innerText).replace(':', '.')) || Infinity;
  let tempoO = parseFloat((placarTempoO.innerText).replace(':', '.')) || Infinity;

  if (tempoX < tempoO) {
    placarTempoX.classList.add('negrito');
    placarTempoO.classList.remove('negrito');
  } else if (tempoX > tempoO) {
    placarTempoX.classList.remove('negrito');
    placarTempoO.classList.add('negrito');
  } else {
    placarTempoX.classList.add('negrito');
    placarTempoO.classList.add('negrito');
  }
}

function atualizaPontos(jogador) {
  let pontos = Math.ceil((11 - jogada)/2);
  if (comecou == 'o' && jogador == 'x') {pontos += 1;}
  if (pontos > 1) {pontos *= 2;}

  document.getElementById(jogador + '-pontos').innerText -= -pontos;
  destacaPontos();
}

function destacaPontos() {
  const placarPontosX = document.getElementById('x-pontos');
  const placarPontosO = document.getElementById('o-pontos');

  if (parseInt(placarPontosX.innerText) > parseInt(placarPontosO.innerText)) {
    placarPontosX.classList.add('negrito');
    placarPontosO.classList.remove('negrito');
  } else if (parseInt(placarPontosX.innerText) < parseInt(placarPontosO.innerText)) {
    placarPontosX.classList.remove('negrito');
    placarPontosO.classList.add('negrito');
  } else {
    placarPontosX.classList.add('negrito');
    placarPontosO.classList.add('negrito');
  }
}

function atualizaVitorias(jogador) {
  document.getElementById(jogador + '-vitorias').innerText -= -1;
  destacaVitorias();
}

function destacaVitorias() {
  const placarVitoriasX = document.getElementById('x-vitorias');
  const placarVitoriasO = document.getElementById('o-vitorias');
  
  if (parseInt(placarVitoriasX.innerText) > parseInt(placarVitoriasO.innerText)) {
    placarVitoriasX.classList.add('negrito');
    placarVitoriasO.classList.remove('negrito');
  } else if (parseInt(placarVitoriasX.innerText) < parseInt(placarVitoriasO.innerText)) {
    placarVitoriasX.classList.remove('negrito');
    placarVitoriasO.classList.add('negrito');
  } else {
    placarVitoriasX.classList.add('negrito');
    placarVitoriasO.classList.add('negrito');
  }
}

function velha() {
  manejaEventos(false);
  setTimeout(() => {alert('Deu velha!')}, 300);
}

function temporizador() {
  const agora = new Date();
  let diferenca = agora.getTime() - inicio.getTime();
  let minutos = Math.floor(diferenca / 60000).toString();
  let segundos = Math.floor((diferenca % 60000) / 1000).toString();

  timer.innerText = minutos.padStart(2, '0') + ':' + segundos.padStart(2, '0');
}

function novaPartida() {
  if (tempo) {
    if (confirm('A partida ainda está em andamento,\ntem certeza?')) {
      resetaJogo();
    }
  } else {
    resetaJogo();
  }
}

function paraTimer(acao) {
  if (acao) {
    clearInterval(tempo);
    tempo = false;
  } else {
    vencedor.innerText = '';
    timer.innerText = '00:00';
    inicio = new Date();
    tempo = setInterval(temporizador, 1000);
  }
}

function resetaJogo() {
  limpaTabuleiro();
  manejaEventos(true);
  alternaPrimeiroJogador();
}

function alternaPrimeiroJogador() {
  if (comecou == 'o') {
    jogada = 0;
    jogadorVez.innerText = 'X';
    negritaJogadorDaVez('x', 'o');
    comecou = 'x';
  } else {
    jogada = 1;
    jogadorVez.innerText = 'O';
    negritaJogadorDaVez('o', 'x');
    comecou = 'o';
  }
}

function limpaTabuleiro() {
  for (let indice = 0; indice < tiles.length; indice++) {
    tiles[indice].classList.remove('x');
    tiles[indice].classList.remove('o');
    tiles[indice].classList.remove('pisca');
  }
}

function piscaVitoria(elemento) {
  for (let indice = 0; indice < elemento.length; indice++) {
    elemento[indice].classList.add('pisca');
  }
}

function adicionaPontosVencedor(jogador) {

  console.log(pontos);
}