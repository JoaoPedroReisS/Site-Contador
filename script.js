// =============================================
//  NAVEGAÇÃO ENTRE TELAS
// =============================================
const btnEntrar   = document.getElementById('btn-entrar');
const btnVoltar   = document.getElementById('btn-voltar');
const telaInicial  = document.getElementById('tela-inicial');
const telaConteudo = document.getElementById('tela-conteudo');

btnEntrar.addEventListener('click', () => {
    telaInicial.classList.add('escondido');
    telaConteudo.classList.remove('escondido');
    // Garante que o contador começa a atualizar assim que a tela aparece
    atualizarContador();
});

btnVoltar.addEventListener('click', () => {
    telaConteudo.classList.add('escondido');
    telaInicial.classList.remove('escondido');
});

// =============================================
//  LÓGICA DO CONTADOR EM TEMPO REAL
// =============================================

// Guarda os valores anteriores para detectar mudança e animar
const anteriores = {};

function animarBloco(id, novoValor) {
    const el = document.getElementById(id);
    if (!el) return;

    const chave = id;
    if (anteriores[chave] !== novoValor) {
        anteriores[chave] = novoValor;
        el.classList.remove('mudando');
        // Força reflow para reiniciar a animação
        void el.offsetWidth;
        el.classList.add('mudando');
    }
    el.textContent = novoValor;
}

function atualizarContador() {
    // Data de início: 16/12/2020 às 17:30:00
    // Nota: Em JS os meses vão de 0 a 11 (Dezembro = 11)
    const dataInicio = new Date(2020, 11, 16, 17, 30, 0);
    const agora      = new Date();

    let anos    = agora.getFullYear() - dataInicio.getFullYear();
    let meses   = agora.getMonth()    - dataInicio.getMonth();
    let dias    = agora.getDate()     - dataInicio.getDate();
    let horas   = agora.getHours()    - dataInicio.getHours();
    let minutos = agora.getMinutes()  - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    // Ajustes para valores negativos na subtração de datas
    if (segundos < 0) { segundos += 60; minutos--; }
    if (minutos  < 0) { minutos  += 60; horas--;   }
    if (horas    < 0) { horas    += 24; dias--;     }
    if (dias     < 0) {
        const diasMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += diasMesAnterior;
        meses--;
    }
    if (meses < 0) { meses += 12; anos--; }

    // Atualiza cada bloco com animação de flip quando o valor muda
    animarBloco('num-anos',    anos);
    animarBloco('num-meses',   meses);
    animarBloco('num-dias',    dias);
    animarBloco('num-horas',   horas);
    animarBloco('num-minutos', minutos);
    animarBloco('num-segundos', segundos);
}

// Atualiza a cada 1 segundo
setInterval(atualizarContador, 1000);
atualizarContador(); // Executa imediatamente ao carregar

// =============================================
//  PARTÍCULAS DE CORAÇÃO NO CANVAS
// =============================================
const canvas = document.getElementById('canvas-particulas');
const ctx    = canvas.getContext('2d');

// Ajusta o canvas ao tamanho da janela
function redimensionarCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
redimensionarCanvas();
window.addEventListener('resize', redimensionarCanvas);

// Cria N partículas de corações
const NUM_PARTICULAS = 28;
const particulas = [];

// Cores possíveis para as partículas
const coresPart = [
    'rgba(192, 57, 90, 0.55)',
    'rgba(224, 84, 112, 0.45)',
    'rgba(247, 168, 184, 0.6)',
    'rgba(212, 168, 83, 0.4)',
];

class Particula {
    constructor() {
        this.resetar();
    }

    resetar() {
        this.x    = Math.random() * canvas.width;
        this.y    = canvas.height + Math.random() * 120;   // começa abaixo
        this.tam  = Math.random() * 14 + 7;                // tamanho 7-21
        this.vel  = Math.random() * 0.6 + 0.25;           // velocidade de subida
        this.deri = (Math.random() - 0.5) * 0.6;          // deriva lateral
        this.rot  = Math.random() * Math.PI * 2;           // rotação inicial
        this.velRot = (Math.random() - 0.5) * 0.03;       // velocidade de rotação
        this.alfa = Math.random() * 0.5 + 0.3;            // opacidade
        this.cor  = coresPart[Math.floor(Math.random() * coresPart.length)];
    }

    atualizar() {
        this.y   -= this.vel;
        this.x   += this.deri;
        this.rot += this.velRot;

        // Reposiciona quando sair pelo topo
        if (this.y < -30) this.resetar();
    }

    desenhar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rot);
        ctx.globalAlpha = this.alfa;

        // Desenha coração via bezier
        const s = this.tam;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.3);
        ctx.bezierCurveTo( s * 0.6, -s, s * 1.1, -s * 0.1, 0,  s * 0.7);
        ctx.bezierCurveTo(-s * 1.1, -s * 0.1, -s * 0.6, -s, 0, -s * 0.3);
        ctx.closePath();
        ctx.fillStyle = this.cor;
        ctx.fill();

        ctx.restore();
    }
}

// Inicializa partículas em posições aleatórias (não só na base)
for (let i = 0; i < NUM_PARTICULAS; i++) {
    const p = new Particula();
    p.y = Math.random() * canvas.height; // distribui pela tela desde o início
    particulas.push(p);
}

function animarParticulas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particulas) {
        p.atualizar();
        p.desenhar();
    }
    requestAnimationFrame(animarParticulas);
}

animarParticulas();
