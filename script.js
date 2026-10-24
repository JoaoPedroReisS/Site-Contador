// Seleciona os elementos pelo ID
const btnEntrar = document.getElementById('btn-entrar');
const btnVoltar = document.getElementById('btn-voltar');
const telaInicial = document.getElementById('tela-inicial');
const telaConteudo = document.getElementById('tela-conteudo');

// Ação ao clicar em "Entrar no Site"
btnEntrar.addEventListener('click', () => {
    telaInicial.classList.add('escondido');      // Esconde a tela inicial
    telaConteudo.classList.remove('escondido'); // Mostra a tela de conteúdo
});

// Ação ao clicar em "Voltar"
btnVoltar.addEventListener('click', () => {
    telaConteudo.classList.add('escondido');    // Esconde a tela de conteúdo
    telaInicial.classList.remove('escondido');  // Mostra a tela inicial
});
// Navegação entre telas

btnEntrar.addEventListener('click', () => {
    telaInicial.classList.add('escondido');
    telaConteudo.classList.remove('escondido');
});

btnVoltar.addEventListener('click', () => {
    telaConteudo.classList.add('escondido');
    telaInicial.classList.remove('escondido');
});

// Lógica do Contador em Tempo Real
function atualizarContador() {
    // Data de início: 16/12/2020 às 17:30:00
    // Nota: Em JS os meses vão de 0 a 11 (Dezembro = 11)
    const dataInicio = new Date(2020, 11, 16, 17, 30, 0);
    const agora = new Date();

    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();
    let horas = agora.getHours() - dataInicio.getHours();
    let minutos = agora.getMinutes() - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    // Ajustes para valores negativos na subtração de datas
    if (segundos < 0) {
        segundos += 60;
        minutos--;
    }
    if (minutos < 0) {
        minutos += 60;
        horas--;
    }
    if (horas < 0) {
        horas += 24;
        dias--;
    }
    if (dias < 0) {
        const diasMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += diasMesAnterior;
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    const elementoContador = document.getElementById('contador');
    if (elementoContador) {
        elementoContador.innerText = `${anos} Anos - ${meses} Meses - ${dias} Dias - ${horas} Horas - ${minutos} Minutos - ${segundos} Segundos`;
    }
}

// Atualiza a cada 1 segundo (1000ms)
setInterval(atualizarContador, 1000);
atualizarContador(); // Executa imediatamente ao carregar