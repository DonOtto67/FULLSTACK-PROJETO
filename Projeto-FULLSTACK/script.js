const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

// Tamanho do Bloco
const tileSize = 50;

//CONST DAS IMAGENS
const blocoImg = new Image();
const gramaImg = new Image();
const paredeImg = new Image();
const vidaExtraImg = new Image();
const escudoImg = new Image();
const trocaImg = new Image();
const lentidaoImg = new Image();

// FRAMES VITÓRIA RATO
const ratoVitoriaFrames = [];
// Cria um array com os caminhos (paths) das imagens dos frames da animação
const ratoVitoriaSprites = [
    "imagens/r1.png",
    "imagens/r2.png",
    "imagens/r3.png",
    "imagens/r4.png",
    "imagens/r5.png",
];
// CARREGAR FRAMES
ratoVitoriaSprites.forEach(src => {
    // Percorre cada item do array "ratoVitoriaSprites"
    const img = new Image(); // Cria um novo objeto de imagem para armazenar o frame atual
    img.src = src; // Define o caminho da imagem (faz o navegador carregar a imagem)
    ratoVitoriaFrames.push(img); // Adiciona a imagem dos frames da vitória
});

let frameRatoVitoria = 0; // Cria uma variável que controla qual frame da animação está sendo exibido atualmente e começa no 0


// TROCAR FRAME DO RATO
setInterval(() => { // Executa a função repetidamente a cada 0,25 segundos
    frameRatoVitoria++; // Avança para o próximo frame da animação
    if (frameRatoVitoria >= ratoVitoriaFrames.length) { // Verifica se chegou no último frame da animação
        frameRatoVitoria = 0; // Se chegou no final, volta para o primeiro frame 
    }
    // SE PLAYER 1 GANHOU
    if (
        jogoAcabou &&
        textoVitoria.textContent.includes("PLAYER 1 VENCEU!")  // Verifica se o jogo ja acabou e o texto da vitoria do p1
    ) {
        const ratoImg = // Pega o elemento HTML da imagem do rato na tela
            document.getElementById("ratoVitoria");

        if (ratoImg) { // Garante que o elemento existe antes de usar
            ratoImg.src = // Troca a imagem exibida pelo frame atual da animação
                ratoVitoriaFrames[ frameRatoVitoria ].src;
        }
    } 
}, 250); // Define o intervalo de execução

// ANIMAÇÃO DO GATO VENCEDOR
const gatoVitoriaFrames = [ // Array com os caminhos das imagens (frames) da animação de vitória do gato
    "imagens/g1.png",
    "imagens/g2.png",
    "imagens/g3.png",
    "imagens/g4.png",
    "imagens/g5.png"
];
const gatoVitoriaImgs = []; // Array vazio que vai armazenar os frames carregados
let frameGatoVitoria = 0; // Variável que controla qual frame da animação está sendo exibido atualmente e começa no 0

// CARREGAR FRAMES
gatoVitoriaFrames.forEach(src => { // Percorre cada item do array "gatoVitoriaFrames"
    const img = new Image();
    img.src = src;// Define o caminho da imagem,
    gatoVitoriaImgs.push(img);// Esse array vai conter todos os frames já como objetos Image
});

// TROCAR FRAME
setInterval(() => {
    frameGatoVitoria++; // Executa essa função repetidamente a cada 0,25s
    if (frameGatoVitoria >= gatoVitoriaImgs.length) { // Verifica se passou do último frame da animação
        frameGatoVitoria = 0;// Loop (infinito)
    }

    // SE O PLAYER 2 GANHOU
    if (    // Verifica se o jogo terminou e o texto do p2 apareceu
        jogoAcabou &&
        textoVitoria.textContent.includes("PLAYER 2 VENCEU!")
    ) {
        const gatoImg = // Pega o elemento HTML da imagem do gato
            document.getElementById("gatoVitoria");
        if (gatoImg) { // Garante que o elemento existe antes de modificar
            gatoImg.src =
                gatoVitoriaImgs[frameGatoVitoria].src; // Atualiza a imagem com o frame atual da animação
        }
    }
}, 250);

// CONST DOS SONS
const somExplosao = document.getElementById("somExplosao");
const somMorte = document.getElementById("somMorte");
const musicaFundo = document.getElementById("musicaFundo");
const somVitoria = document.getElementById("somVitoria");

// INICIAR MÚSICA
document.addEventListener("click", () => { // Isso significa que qualquer clique do usuário vai ativar a função
    musicaFundo.volume = 0.2; // Define o volume da música de fundo para 20% (0.2)
    musicaFundo.play().catch(err => { // O .catch captura possíveis erros (ex: bloqueio do navegador)
        console.log("Erro ao tocar música:", err); // Mostra no console caso a música não consiga tocar
    });
}, { once: true }); // O { once: true } faz com que esse evento rode apenas uma vez

// Variável booleana que indica se a imagem da lentidão já foi carregada
let lentidaoCarregada = false; 
lentidaoImg.onload = () => { // Função que é chamada automaticamente quando a imagem terminar de carregar
    lentidaoCarregada = true;// Marca que a imagem da lentidão já foi carregada com sucesso
};

lentidaoImg.src = "imagens/lento.png";// Define o caminho da imagem da lentidão e inicia o carregamento dela

// Variável que indica se a imagem de troca já foi carregada
let trocaCarregada = false;
trocaImg.onload = () => {
    trocaCarregada = true;// Marca como carregada
};

trocaImg.src = "imagens/reverse.png";// Caminho da imagem do power-up de troca (reverse)

// Variável que indica se a imagem do escudo já foi carregada
let escudoCarregado = false;
escudoImg.onload = () => {// Função executada quando a imagem do escudo carrega
    escudoCarregado = true;// Marca que o escudo já foi carregado
};
escudoImg.src = "imagens/escudo.png";


// Variável que indica se a imagem de vida extra já foi carregada
let vidaExtraCarregada = false;

vidaExtraImg.onload = () => {
    // Executa quando a imagem de vida extra terminar de carregar

    vidaExtraCarregada = true;
    // Marca que foi carregada com sucesso
};

vidaExtraImg.src = "imagens/vidaextra.png";
// Caminho da imagem de vida extra e inicia o carregamento

// TAMANHO DO CANVAS
canvas.width = 1050;// Define a largura do canvas (área de desenho do jogo) como 1050 pixels
canvas.height = 850;// Define a altura do canvas como 850 pixels

let direcao = ''; // Variável global que guarda a direção do movimento (ex: cima, baixo, esquerda, direita)
// MATRIZ PARA DEFINIR OS BLOCOS
const map = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// RANDOMIZAR OS SPAWNS DA PAREDE(2)
for (let y = 0; y < map.length; y++) {// Loop que percorre todas as linhas do mapa (eixo Y)
    for (let x = 0; x < map[y].length; x++) {// Loop que percorre todas as colunas de cada linha (eixo X)
        if (map[y][x] === 0) {// Verifica se a posição atual é um espaço vazio (0)
            if ((x <= 2 && y <= 2)) continue;// Impede gerar paredes muito perto do canto superior esquerdo
            if ((x >= map[0].length - 3 && y >= map.length - 3)) continue;// Impede gerar paredes muito perto do canto inferior direito
            if (Math.random() < 0.67) {// Se for menor que 0.67 (67% de chance), cria uma parede
                map[y][x] = 2;// Transforma o espaço vazio (0) em parede (2)
            }
        }
    }
}
// SPAWM DOS JOGADORES SEMPRE = 0                        
map[1][1] = 0;                                            // libera o bloco inicial do jogador 1
map[1][2] = 0;                                            // libera espaço ao lado do spawn do jogador 1
map[2][1] = 0;                                            // libera espaço abaixo do spawn do jogador 1

let maxY = map.length - 1;                                // guarda o último índice da linha do mapa (altura máxima)
let maxX = map[0].length - 1;                             // guarda o último índice da coluna do mapa (largura máxima)

map[maxY - 1][maxX - 1] = 0;                              // libera o bloco do spawn do jogador 2 (canto inferior direito)
map[maxY - 1][maxX - 2] = 0;                              // libera espaço ao lado do spawn do jogador 2
map[maxY - 2][maxX - 1] = 0;                              // libera espaço acima do spawn do jogador 2

//FUNCAO PARA DESENHAR O MAPA                               // função responsável por renderizar o mapa no canvas

function mapa() {                                           // inicia a função que desenha o mapa na tela
    for (let y = 0; y < map.length; y++) {                  // percorre todas as linhas do mapa (eixo Y)
        for (let x = 0; x < map[y].length; x++) {           // percorre todas as colunas de cada linha (eixo X)

            if (map[y][x] === 1) {                          // se o valor for 1, desenha uma parede
                ctx.drawImage(                               // desenha a imagem no canvas
                    paredeImg,                               // imagem da parede
                    x * tileSize,                            // posição X calculada pelo tamanho do bloco
                    y * tileSize,                            // posição Y calculada pelo tamanho do bloco
                    tileSize,                                // largura do bloco
                    tileSize                                 // altura do bloco
                );
            } 
            else if (map[y][x] === 2) {                     // se o valor for 2, desenha um bloco quebrável
                ctx.drawImage(
                    blocoImg,                                // imagem do bloco quebrável
                    x * tileSize,                            // posição X no canvas
                    y * tileSize,                            // posição Y no canvas
                    tileSize,                                // largura do bloco
                    tileSize                                 // altura do bloco
                );

            } 
            else {                                          // se for 0 (ou qualquer outro valor), desenha chão
                ctx.drawImage(
                    gramaImg,                                // imagem do chão/grama
                    x * tileSize,                            // posição X no canvas
                    y * tileSize,                            // posição Y no canvas
                    tileSize,                                // largura do bloco
                    tileSize                                 // altura do bloco
                );
            }
        }
    }
}

//PARA GARANTIR QUE AS IMAGENS SEJAM CARREGADAS          

let carregadas = 0;                                        // contador de imagens carregadas

function carregou() {                                      // função chamada sempre que uma imagem termina de carregar
    carregadas++;                                          // incrementa o contador de imagens carregadas

    if (carregadas === 3) {                               // verifica se todas as 3 imagens principais foram carregadas
        mapa(); //CHAMAR FUNCAO MAPA                       // desenha o mapa somente quando tudo estiver pronto
    }
}

blocoImg.onload = carregou;                               // chama a função quando a imagem do bloco carregar
gramaImg.onload = carregou;                               // chama a função quando a imagem da grama carregar
paredeImg.onload = carregou;                              // chama a função quando a imagem da parede carregar


//DEFINICAO DE CADA IMAGEM
blocoImg.src = "imagens/bloco.jpg";
gramaImg.src = "imagens/grama.png";
paredeImg.src = "imagens/parede.png";

// ====================== RATO ======================
const rato = {                                            
    x: tileSize,                                           // posição inicial X do rato
    y: tileSize,                                           // posição inicial Y do rato
    width: tileSize - 2,                                  // largura do rato 
    height: tileSize - 2,                                 // altura do rato 
    speed: 2,                                             // velocidade de movimento do rato
    direction: "down",                                   // direção inicial do movimento
    frames: {                                             // objeto que guarda animações por direção
        up: [],                                           // frames de animação andando para cima
        down: [],                                         // frames de animação andando para baixo
        left: [],                                         // frames de animação andando para a esquerda
        right: []                                         // frames de animação andando para a direita
    },
    currentFrame: 0,                                      // índice do frame atual da animação
    lastFrameTime: Date.now(),                            // marca o tempo da última troca de frame
    frameInterval: 120,                                   // intervalo (ms) entre mudanças de frame
    invencivel: false,                                   // indica se o rato está invencível
    escudo: false,                                       // indica se o rato tem escudo ativo
    shieldTimeout: null,                                // armazena o timer do escudo
    controlesInvertidos: false,                          // se os controles estão invertidos
    timerTroca: null,                                    // timer usado para efeitos temporários
    negativo: false,                                     // efeito visual/estado negativo
    lento: false                                         // indica se o rato está com lentidão aplicada
};

// DEFINIR FRAMES
const ratoFrames = {                                       
    up: [                                                  // frames quando o rato está andando para cima
        "imagens/costas1.png",                             
        "imagens/costas2.png",                            
        "imagens/costas3.png"                              
    ],
    down: [                                                // frames quando o rato anda para baixo
        "imagens/frente1.png",                             
        "imagens/frente2.png",                             
        "imagens/frente3.png"                              
    ],
    left: [                                                // frames quando o rato anda para a esquerda
        "imagens/esquerda1.png",                           
        "imagens/esquerda2.png"                            
    ],
    right: [                                               // frames quando o rato anda para a direita
        "imagens/direita1.png",                            
        "imagens/direita2.png"                             
    ]
};

// CARREGAR FRAMES                                        
function carregarFrames() {                               // inicia a função de carregamento dos frames
    for (let dir in ratoFrames) {                         // percorre cada direção 
        ratoFrames[dir].forEach(src => {                  // percorre cada caminho de imagem dentro da direção atual
            const img = new Image();                      // cria um novo objeto de imagem
            img.src = src;                                // define o caminho da imagem 
            rato.frames[dir].push(img);                  // adiciona a imagem carregada dentro da animação do rato na direção correspondente
        });
    }
}
carregarFrames();                                         // chama a função para iniciar o carregamento dos frames

// DESENHAR RATO                                        
function desenharRato() {                               
    const frames = rato.frames[rato.direction];         // pega os frames da animação de acordo com a direção atual do rato
    // ESCUDO
    if (rato.escudo) {                                  // verifica se o rato está com escudo ativo
        ctx.globalAlpha = 0.35;                         // deixa o desenho semi-transparente
        ctx.beginPath();                                // inicia o desenho de uma forma de circulo
        ctx.arc(                                        // desenha um círculo ao redor do rato
            rato.x + rato.width / 2,                   // centro X do círculo (centro do rato)
            rato.y + rato.height / 2,                  // centro Y do círculo
            30,                                         // raio do escudo
            0,                                          // início do ângulo
            Math.PI * 2                                // fim do ângulo (círculo completo)
        );

        ctx.fillStyle = "cyan";                         // cor de preenchimento do escudo
        ctx.fill();                                     // aplica o preenchimento

        ctx.strokeStyle = "white";                      // cor da borda do escudo
        ctx.lineWidth = 3;                              // espessura da borda
        ctx.stroke();                                   // desenha a borda

        ctx.globalAlpha = 1;                            // restaura a opacidade normal
    }

    // EFEITO NEGATIVO
    if (rato.negativo) {                                
        ctx.save();                                     
        ctx.filter =
            "brightness(1.2) sepia(1) saturate(6) hue-rotate(-20deg)";// aplica filtro visual (efeito distorcido/negativo)
        ctx.drawImage(
            frames[rato.currentFrame],                 // frame atual da animação
            rato.x,                                    // posição X
            rato.y,                                    // posição Y
            rato.width,                                // largura
            rato.height                                // altura
        );
        ctx.restore();                                  // restaura o canvas ao estado normal
        return;                                         // interrompe a função para não desenhar novamente
    }

    // EFEITO AZUL (LENTO)
    if (rato.lento) {                                   
        ctx.save();                                     
        ctx.filter =
            "brightness(1.2) hue-rotate(180deg) saturate(4)";// aplica filtro azul (efeito de lentidão)
        ctx.drawImage(
            frames[rato.currentFrame],                 // frame atual
            rato.x,                                    // posição X
            rato.y,                                    // posição Y
            rato.width,                                // largura
            rato.height                                // altura
        );
        ctx.restore();                                  // restaura estado do canvas
        return;                                         // impede que o desenho normal aconteça também
    }

    // NORMAL
    ctx.drawImage(                                      // desenha o rato normalmente sem efeitos
        frames[rato.currentFrame],                     // frame atual da animação
        rato.x,                                        // posição X
        rato.y,                                        // posição Y
        rato.width,                                    // largura
        rato.height                                    // altura
    );
}

// TECLAS DO P1
const teclas = {

    w: false,
    a: false,
    s: false,
    d: false
};

// CONTROLES                                             

document.addEventListener("keydown", (e) => {           // ve quando uma tecla é pressionada
    if (e.key.toLowerCase() in teclas) {                // ve se a tecla está no conjunto de controles do Player 1
        teclas[e.key.toLowerCase()] = true;             // marca a tecla como pressionada
    }
    if (e.key in teclasP2) {                           // verifica se a tecla pertence ao Player 2
        teclasP2[e.key] = true;                        // marca a tecla do Player 2 como pressionada
    }
    if (e.code === "Space") {                         // verifica se a tecla pressionada é o Espaço
        colocarBomba(rato);                           // P1 coloca uma bomba
    }
    if (e.code === "Enter") {                        // verifica se a tecla pressionada é Enter
        colocarBomba(gato);                          // P2 coloca uma bomba
    }
});

// EVENTO DE SOLTAR TECLA                                
document.addEventListener("keyup", (e) => {             // ve quando o usuário solta uma tecla
    if (e.key.toLowerCase() in teclas) {               // verifica se a tecla faz parte dos controles do P1
        teclas[e.key.toLowerCase()] = false;           // marca a tecla como não apertada
    }
});

// COLISÃO DO P1                                         
function colisao(px, py, player) {                     // recebe posição futura (px, py) e o objeto do player
    // LIMITES DO PLAYER
    const left = Math.floor(px / tileSize);           
    const right = Math.floor(                          
        (px + player.width - 1) / tileSize
    );
    const top = Math.floor(py / tileSize);            
    const bottom = Math.floor(                        
        (py + player.height - 1) / tileSize
    );

    // SAIR DO MAPA
    if (
        top < 0 ||                                   // passou do limite superior do mapa
        bottom >= map.length ||                     // passou do limite inferior do mapa
        left < 0 ||                                 // passou do limite esquerdo
        right >= map[0].length                      // passou do limite direito
    ) {

        return true;                               // colisão detectada (fora do mapa)
    }

    // COLISÃO COM PAREDES/BLOCOS
    const tiles = [                                // pega os 4 cantos do player no mapa
        map[top][left],                          
        map[top][right],                         
        map[bottom][left],                       
        map[bottom][right]                        
    ];
    if (
        tiles.includes(1) ||                      // se encostar em parede
        tiles.includes(2)                         // ou em bloco quebrável
    ) {
        return true;                             // bloqueia movimento
    }
    // COLISÃO COM BOMBAS

    for (const bomba of bombas) {               // percorre todas as bombas ativas no mapa
        const bombaLeft = bomba.tileX;          // posição da bomba no grid (X)
        const bombaRight = bomba.tileX;         // mesma posição (bombas ocupam 1 tile)
        const bombaTop = bomba.tileY;           // posição da bomba no grid (Y)
        const bombaBottom = bomba.tileY;        // mesma posição

        // VERIFICAR SE ENCOSTOU
        const encostou = !(                    // checa se o player está sobre a bomba
            right < bombaLeft ||               // player está à esquerda da bomba
            left > bombaRight ||              // player está à direita da bomba
            bottom < bombaTop ||              // player está acima da bomba
            top > bombaBottom                 // player está abaixo da bomba
        );

        // RATO
        if (player === rato) {                // se o player for o rato
            if (
                encostou &&                  // está em cima da bomba
                bomba.ratoPodePassar        // ainda tem permissão para atravessar
            ) {
                continue;                   // ignora colisão
            }
            if (!encostou) {               // se já não está mais sobre a bomba
                bomba.ratoPodePassar = false; // remove permissão de atravessar
            }
        }

        // GATO
        if (player === gato) {           
            if (
                encostou &&
                bomba.gatoPodePassar
            ) {
                continue;               
            }
            if (!encostou) {
                bomba.gatoPodePassar = false; 
            }
        }

        // COLISÃO FINAL
        if (encostou) {                // se realmente colidiu com a bomba
            return true;             // bloqueia movimento
        }
    }

    // SEM COLISÃO
    return false;                 // movimento permitido 
}

// MOVIMENTO                                              
function moverRato() {                                 
    let moveu = false;                                 // variável que indica se o rato se moveu neste frame
    let cima = teclas.w;                               
    let baixo = teclas.s;                              
    let esquerda = teclas.a;                          
    let direita = teclas.d;   

    // INVERTER CONTROLES
    if (rato.controlesInvertidos) {                    

        cima = teclas.s;                               
        baixo = teclas.w;                              

        esquerda = teclas.d;                           
        direita = teclas.a;                            
    }

    // CIMA
    if (cima) {                                        // se estiver pressionando para cima
        if (rato.direction !== "up") {               // se mudou de direção
            rato.currentFrame = 0;                  // reseta animação
        }
        rato.direction = "up";                      // define direção atual
        if (!colisao(rato.x, rato.y - rato.speed, rato)) {  // verifica colisão antes de mover
            rato.y -= rato.speed;                   // move o rato para cima
            moveu = true;                          // marca o movimento
        }
    }

    // BAIXO
    if (baixo) {                                     
        if (rato.direction !== "down") {            // se mudou direção
            rato.currentFrame = 0;                 // reseta animação
        }
        rato.direction = "down";                   // define direção
        if (!colisao(rato.x, rato.y + rato.speed, rato)) {  // verifica colisão
            rato.y += rato.speed;                  // move para baixo
            moveu = true;                         // marca movimento
        }
    }

    // ESQUERDA
    if (esquerda) {                                 
        if (rato.direction !== "left") {           // mudança de direção
            rato.currentFrame = 0;                // reseta frame
        }
        rato.direction = "left";                  // define direção
        if (!colisao(rato.x - rato.speed, rato.y, rato)) {  // verifica colisão
            rato.x -= rato.speed;                 // move para esquerda
            moveu = true;                        // marca movimento
        }
    }

    // DIREITA
    if (direita) {                                   
        if (rato.direction !== "right") {          // mudança de direção
            rato.currentFrame = 0;               // reseta animação
        }
        rato.direction = "right";               // define direção
        if (!colisao(rato.x + rato.speed, rato.y, rato)) {  // verifica colisão
            rato.x += rato.speed;              // move para direita
            moveu = true;                     // marca movimento
        }
    }

    // ANIMAÇÃO
    if (moveu) {                                  
        const agora = Date.now();                // pega o tempo atual
        if (agora - rato.lastFrameTime >= rato.frameInterval) { // controla velocidade da animação
            rato.currentFrame++;               // avança para próximo frame
            if (
                rato.currentFrame >=
                rato.frames[rato.direction].length // se passou do último frame
            ) {
                rato.currentFrame = 0;        // volta para o primeiro frame
            }
            rato.lastFrameTime = agora;      // atualiza tempo do último frame
        }
    }
    else {
        rato.currentFrame = 0;              // se não moveu, volta para frame parado
    }
}

// ====================== GATO (P2) ======================  
const gato = {                                            // inicia o objeto do jogador gato
    x: (map[0].length - 2) * tileSize,                  // posição inicial X 
    y: (map.length - 2) * tileSize,                     // posição inicial Y 
    width: tileSize - 2,                               // largura do gato 
    height: tileSize - 2,                              // altura do gato 
    speed: 2,                                           // velocidade do gato
    direction: "down",                                 // direção inicial do movimento
    frames: {                                          // conjunto de animações por direção
        up: [],                                        
        down: [],                                      
        left: [],                                      
        right: []                                      
    },

    currentFrame: 0,                                   // frame atual da animação
    lastFrameTime: Date.now(),                         // último momento em que o frame foi trocado
    frameInterval: 120,                                // intervalo de tempo entre frames
    invencivel: false,                                // indica se o gato está invencível
    escudo: false,                                   // indica se o gato tem escudo ativo
    shieldTimeout: null,                            // timer do escudo
    controlesInvertidos: false,                      // se os controles estão invertidos
    timerTroca: null,                               // timer de efeitos temporários
    negativo: false,                                // efeito visual negativo ativo
    lento: false                                    // efeito de lentidão ativo
};

// FRAMES DO P2                                           

const gatoFrames = {                                      
    up: [                                                 // frames do gato andando para cima
        "imagens/gatoCostas1.png",                   
        "imagens/gatoCostas2.png",                 
        "imagens/gatoCostas3.png"                     
    ],
    down: [                                               // frames do gato andando para baixo
        "imagens/gatoFrente1.png",                     
        "imagens/gatoFrente2.png",                     
        "imagens/gatoFrente3.png"                       
    ],

    left: [                                               // frames do gato andando para esquerda
        "imagens/gatoEsquerda1.png",                    
        "imagens/gatoEsquerda2.png"                  
    ],

    right: [                                              // frames do gato andando para direita
        "imagens/gatoDireita1.png",                  
        "imagens/gatoDireita2.png"                    
    ]
};

// CARREGAR FRAMES DO P2                                
function carregarFramesGato() {                       
    for (let dir in gatoFrames) {                  // percorre cada direção (up, down, left, right)
        gatoFrames[dir].forEach(src => {          // percorre cada imagem dentro da direção atual
            const img = new Image();            // cria um objeto de imagem
            img.src = src;                    
            gato.frames[dir].push(img);     // adiciona a imagem carregada no array de frames do gato
        });
    }
}
carregarFramesGato();                           

// DESENHAR GATO                                        
function desenharGato() {                             
    const frames = gato.frames[gato.direction];      // seleciona os frames de animação conforme a direção atual
    // EFEITO LENTO
    if (gato.lento) {                                // se o gato estiver com efeito de lentidão
        ctx.filter =
        "brightness(1.1) saturate(4) hue-rotate(180deg)";// aplica filtro visual azul/alterado para indicar lentidão
    }

    // CONTROLES INVERTIDOS
    if (gato.controlesInvertidos) {                 // se os controles estiverem invertidos
        ctx.filter ="brightness(1.1) saturate(4) hue-rotate(180deg)";

    }

    // INVENCÍVEL PISCANDO
    if (gato.invencivel) {                          // se o gato estiver invencível
        if (Math.floor(Date.now() / 100) % 2 === 0) { // cria efeito de piscar alternando tempo
            ctx.globalAlpha = 0.4;                  // deixa o gato semi-transparente
        }
    }

    // ESCUDO
    if (gato.escudo) {                              // se o escudo estiver ativo
        ctx.globalAlpha = 0.35;                    // transparência do escudo
        ctx.beginPath();                           // inicia desenho do círculo
        ctx.arc(
            gato.x + gato.width / 2,             // centro X do escudo
            gato.y + gato.height / 2,            // centro Y do escudo
            30,                                  // raio do escudo
            0,
            Math.PI * 2                          // círculo completo
        );
        ctx.fillStyle = "cyan";                  // cor interna do escudo
        ctx.fill();                              
        ctx.strokeStyle = "white";               // cor da borda
        ctx.lineWidth = 3;                       // espessura da borda
        ctx.stroke();                            // desenha contorno
        ctx.globalAlpha = 1;                    // restaura transparência
    }

    // DESENHAR PERSONAGEM
    ctx.drawImage(                               // desenha o gato na tela
        frames[gato.currentFrame],             // frame atual da animação
        gato.x,                               // posição X
        gato.y,                               // posição Y
        gato.width,                          // largura
        gato.height                         // altura
    );
    // RESETAR EFEITOS
    ctx.filter = "none";                      // remove filtros visuais
    ctx.globalAlpha = 1;                      // restaura opacidade padrão
}

// TECLAS P2
const teclasP2 = {

    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// CONTROLES P2                                       
document.addEventListener("keydown", (e) => {       // detecta quando uma tecla é pressionada
    if (e.key in teclasP2) {                        // verifica se a tecla pertence aos controles do P2
        teclasP2[e.key] = true;                   // marca a tecla como pressionada
    }
});
document.addEventListener("keyup", (e) => {        // detecta quando a tecla é solta
    if (e.key in teclasP2) {                       // verifica se a tecla faz parte dos controles do P2
        teclasP2[e.key] = false;                 // marca a tecla como não pressionada
    }
});

// MOVIMENTO P2                                        
function moverGato() {                             
    let moveu = false;                              // indica se o gato se moveu neste frame
    // CONTROLES NORMAIS
    let cima = teclasP2.ArrowUp;                   
    let baixo = teclasP2.ArrowDown;                
    let esquerda = teclasP2.ArrowLeft;            
    let direita = teclasP2.ArrowRight;             

    // INVERTER CONTROLES
    if (gato.controlesInvertidos) {                
        cima = teclasP2.ArrowDown;              
        baixo = teclasP2.ArrowUp;
        esquerda = teclasP2.ArrowRight;         
        direita = teclasP2.ArrowLeft;
    }

    // CIMA
    if (cima) {                                   
        if (gato.direction !== "up") {          // se mudou de direção
            gato.currentFrame = 0;             // reseta animação
        }
        gato.direction = "up";                 // define direção
        if (!colisao(gato.x, gato.y - gato.speed, gato)) { // verifica colisão
            gato.y -= gato.speed;            // move para cima
            moveu = true;                  // marca movimento
        }
    }

    // BAIXO
    if (baixo) {                               
        if (gato.direction !== "down") {       // mudança de direção
            gato.currentFrame = 0;            // reseta animação
        }
        gato.direction = "down";             // define direção
        if (!colisao(gato.x, gato.y + gato.speed, gato)) { // verifica colisão
            gato.y += gato.speed;           // move para baixo
            moveu = true;                 // marca movimento
        }
    }

    // ESQUERDA
    if (esquerda) {                           // seta esquerda
        if (gato.direction !== "left") {     // mudou direção
            gato.currentFrame = 0;         // reseta frame
        }
        gato.direction = "left";          // direção esquerda
        if (!colisao(gato.x - gato.speed, gato.y, gato)) { // colisão
            gato.x -= gato.speed;        // move esquerda
            moveu = true;             // marca movimento
        }
    }

    // DIREITA
    if (direita) {                          // seta direita
        if (gato.direction !== "right") {  // mudança de direção
            gato.currentFrame = 0;       // reseta animação
        }
        gato.direction = "right";      // direção direita
        if (!colisao(gato.x + gato.speed, gato.y, gato)) { // colisão
            gato.x += gato.speed;     // move direita
            moveu = true;          // marca movimento
        }
    }

    // ANIMAÇÃO
    if (moveu) {                        
        const agora = Date.now();     // tempo atual
        if (agora - gato.lastFrameTime >= gato.frameInterval) { // controla velocidade da animação
            gato.currentFrame++;     // avança frame
            if (
                gato.currentFrame >=
                gato.frames[gato.direction].length // se chegou no final
            ) {
                gato.currentFrame = 0; // volta pro primeiro frame
            }
            gato.lastFrameTime = agora; // atualiza tempo
        }
    }
    else {
        gato.currentFrame = 0;        // se parado, volta pro frame inicial
    }
}

// ====================== BOMBAS ======================    
const bombas = [];                                         // array que armazena todas as bombas ativas no jogo
const explosoes = [];                                      // array que armazena explosões geradas pelas bombas
const powerUps = [];                                       // array que armazena itens/power-ups no mapa

// controles invertidos
let controlesInvertidosRato = false;                      // estado global: indica se controles do rato estão invertidos
let controlesInvertidosGato = false;                      // estado global: indica se controles do gato estão invertidos
// FRAMES DA BOMBA
const bombaFrames = [];                                    // array que vai armazenar os objetos Image da animação da bomba
const bombaSprites = [                                     // lista de caminhos das imagens da animação da bomba
    "imagens/bomba1.png",                                  
    "imagens/bomba2.png",                                 
    "imagens/bomba3.png",                           
    "imagens/bomba4.png",                                
    "imagens/bomba5.png",                               
    "imagens/bomba6.png"                                  
];

// CARREGAR FRAMES                                      
bombaSprites.forEach(src => {                           // percorre cada caminho de imagem da bomba
    const img = new Image();                            // cria um novo objeto de imagem
    img.src = src;                                      // define o caminho da imagem e inicia o carregamento
    bombaFrames.push(img);                             // adiciona a imagem carregada no array de frames da bomba
});

// COLOCAR BOMBA                                       
function colocarBomba(player) {                        // recebe o jogador que está colocando a bomba (rato ou gato)
    const tileX = Math.floor(                         // calcula a posição X da bomba
        (player.x + player.width / 2) / tileSize     // usa o centro do player para posicionar corretamente
    );
    const tileY = Math.floor(                         // calcula a posição Y da bomba 
        (player.y + player.height / 2) / tileSize    // usa o centro do player
    );

    // IMPEDIR DUAS BOMBAS NO MESMO LUGAR
    const existe = bombas.some(b =>                  // verifica se já existe bomba na mesma posição
        b.tileX === tileX &&                        // mesma coluna
        b.tileY === tileY                           // mesma linha
    );
    if (existe) return;                              // se já existe, cancela a criação da bomba

    // VERIFICAR SE O RATO ESTÁ EM CIMA
    const ratoTileX = Math.floor(                   // converte posição do rato para tile X
        (rato.x + rato.width / 2) / tileSize
    );
    const ratoTileY = Math.floor(                   // converte posição do rato para tile Y
        (rato.y + rato.height / 2) / tileSize
    );

    // VERIFICAR SE O GATO ESTÁ EM CIMA
    const gatoTileX = Math.floor(                   // converte posição do gato para tile X
        (gato.x + gato.width / 2) / tileSize
    );
    const gatoTileY = Math.floor(                   // converte posição do gato para tile Y
        (gato.y + gato.height / 2) / tileSize
    );
    bombas.push({                                   // adiciona uma nova bomba ao array de bombas
        owner: player,                             // guarda quem colocou a bomba (rato ou gato)
        tileX,                                     // posição X no grid
        tileY,                                     // posição Y no grid
        x: tileX * tileSize,                      // posição real X no canvas
        y: tileY * tileSize,                      // posição real Y no canvas
        tempo: Date.now(),                        // marca o tempo de criação da bomba
        currentFrame: 0,                         // frame atual da animação da bomba
        lastFrameTime: Date.now(),              // controle de tempo da animação

        // QUEM PODE ATRAVESSAR
        ratoPodePassar:                        // permite que o rato atravesse inicialmente se estiver em cima
            ratoTileX === tileX &&
            ratoTileY === tileY,
        gatoPodePassar:                       // permite que o gato atravesse inicialmente se estiver em cima
            gatoTileX === tileX &&
            gatoTileY === tileY
    });
}

// EXPLOSÃO                                              
function explodirBomba(bomba) {                         // recebe a bomba que será explodida
    somExplosao.currentTime = 0;                        // reinicia o som da explosão
    somExplosao.play();                                 // toca o som da explosão

    // DIREÇÕES DA EXPLOSÃO
    const direcoes = [                          // define as direções que a explosão vai atingir
        [0, 0],                                // posição da bomba
        [1, 0],                               // explosão para a direita
        [-1, 0],                             // explosão para a esquerda
        [0, 1],                             // explosão para baixo
        [0, -1]                            // explosão para cima
    ];

    // PERCORRER TODAS DIREÇÕES
    direcoes.forEach(dir => {                           // percorre cada direção da explosão
        const x = bomba.tileX + dir[0];                // calcula posição X da explosão no grid
        const y = bomba.tileY + dir[1];                // calcula posição Y da explosão no grid

        // FORA DO MAPA
        if (
            x < 0 ||                                   // verifica limite esquerdo
            x >= map[0].length ||                      // verifica limite direito
            y < 0 ||                                   // verifica limite superior
            y >= map.length                            // verifica limite inferior
        ) {
            return;                                  // ignora essa direção
        }

        // PAREDE FIXA
        if (map[y][x] === 1) {                     // se for parede indestrutível
            return;                              // explosão não passa
        }

        // BLOCO DESTRUTÍVEL

        if (map[y][x] === 2) {                   // se for bloco quebrável
            map[y][x] = 0;                      // destrói o bloco

            // CHANCE DE SPAWNAR POWERUP
            if (Math.random() < 0.15) {      // 15% de chance de spawnar item
                const tipos = [             // lista de tipos de power-up

                    "vida",
                    "escudo",
                    "troca",
                    "lentidao"
                ];

                const tipoEscolhido =     // escolhe um tipo aleatório
                    tipos[Math.floor(
                        Math.random() * tipos.length
                    )];

                powerUps.push({          // cria um power-up no mapa
                    tipo: tipoEscolhido,  // tipo do power-up
                    x: x * tileSize,     // posição X no canvas
                    y: y * tileSize,     // posição Y no canvas
                    tileX: x,           // posição no grid X
                    tileY: y            // posição no grid Y
                });
            }
        }

        // CRIAR EXPLOSÃO
        explosoes.push({               // adiciona efeito visual da explosão
            x: x * tileSize,           // posição X no canvas
            y: y * tileSize,           // posição Y no canvas
            tempo: Date.now(),         // marca o tempo da explosão
            currentFrame: 0,          // frame inicial da animação
            lastFrameTime: Date.now() // controle de animação
        });
    });
}

// FRAMES DA EXPLOSÃO
const explosaoFrames = [];

const explosaoSprites = [
    "imagens/explosao1.png",
    "imagens/explosao2.png",
    "imagens/explosao3.png",
    "imagens/explosao4.png"
];

// CARREGAR FRAMES
explosaoSprites.forEach(src => {

    const img = new Image();

    img.src = src;

    explosaoFrames.push(img);
});

// ATUALIZAR BOMBAS                                     
function atualizarBombas() {                          // inicia a função de atualização
    // BOMBAS
    for (let i = bombas.length - 1; i >= 0; i--) {   // percorre o array de trás pra frente (evita bugs ao remover itens)
        const bomba = bombas[i];                     // pega a bomba atual

        // ANIMAÇÃO DA BOMBA
        if (
            Date.now() - bomba.lastFrameTime >= 875 // verifica se já passou tempo suficiente para trocar o frame
        ) {
            if (
                bomba.currentFrame <
                bombaFrames.length - 1               // verifica se ainda não chegou no último frame
            ) {
                bomba.currentFrame++;                // avança para o próximo frame
            }
            bomba.lastFrameTime = Date.now();       // atualiza o tempo da última troca de frame
        }

        // EXPLODIR
        if (
            Date.now() - bomba.tempo >= 3500        // verifica se já passou o tempo da bomba explodir
        ) {
            explodirBomba(bomba);                  // chama função de explosão
            bombas.splice(i, 1);                  // remove a bomba do array
        }
    }

    // EXPLOSÕES
    for (let i = explosoes.length - 1; i >= 0; i--) { // percorre explosões de trás pra frente
        const exp = explosoes[i];                   // pega explosão atual

        // ANIMAÇÃO
        if (
            Date.now() - exp.lastFrameTime >= 100   // controla velocidade da animação da explosão
        ) {
            exp.currentFrame++;                    // avança frame da explosão
            exp.lastFrameTime = Date.now();       // atualiza tempo
        }

        // REMOVE AO TERMINAR
        if (
            exp.currentFrame >= explosaoFrames.length // se terminou todos os frames
        ) {
            explosoes.splice(i, 1);               // remove explosão do jogo
        }
    }
}

// DESENHAR BOMBAS
function desenharBombas() {

    bombas.forEach(bomba => {

        ctx.drawImage(
            bombaFrames[bomba.currentFrame],
            bomba.x,
            bomba.y,
            tileSize,
            tileSize
        );
    });
}

// DESENHAR EXPLOSÕES
function desenharExplosoes() {

    explosoes.forEach(exp => {

        ctx.drawImage(
            explosaoFrames[exp.currentFrame],
            exp.x,
            exp.y,
            tileSize,
            tileSize
        );
    });
}

// VIDAS
let vidasRato = 3;
let vidasGato = 3;

// ELEMENTOS HTML
const vidasRatoTexto = document.getElementById("vidasRato");
const vidasGatoTexto = document.getElementById("vidasGato");

// ATUALIZAR TEXTO                                    
function atualizarVidas() {                          // função que redesenha os corações na tela
    vidasRatoTexto.innerHTML = "";                  // limpa o conteúdo atual dos corações do rato
    vidasGatoTexto.innerHTML = "";                  // limpa o conteúdo atual dos corações do gato

    // CORAÇÕES DO RATO
    for (let i = 0; i < vidasRato; i++) {          // loop baseado no número de vidas do rato
        vidasRatoTexto.innerHTML += `<img src="imagens/coracao.png" class="coracao">`;
    }

    // CORAÇÕES DO GATO
    for (let i = 0; i < vidasGato; i++) {          // loop baseado no número de vidas do gato

        vidasGatoTexto.innerHTML += `<img src="imagens/coracao.png" class="coracao">`;
    }
}

let jogoAcabou = false;                            // indica se o jogo terminou (vitória ou derrota)
let danoFlash = 0;                                 // variável para efeito visual de dano (flash na tela)
const telaVitoria = document.getElementById("telaVitoria");  // pega o elemento da tela de vitória no HTML
const textoVitoria = document.getElementById("textoVitoria"); // pega o elemento do texto de vitória

function ativarFlashVermelho() {
    danoFlash = 10;
}
let frameVitoriaAtual = 0;

// animação da tela de vitória                          // controla a troca de frames da vitória

setInterval(() => {                                  
    if (jogoAcabou) {                                // só roda a animação se o jogo tiver terminado
        frameVitoriaAtual++;                         // avança para o próximo frame da animação
        if (frameVitoriaAtual >= ratoVitoriaFrames.length) { // se passou do último frame
            frameVitoriaAtual = 0;                 // volta para o primeiro frame (loop)
        }
    }
}, 350);                                            // intervalo de 350 milissegundos entre frames

// FINALIZAR JOGO                                     
function finalizarJogo(vencedor){                    // recebe quem venceu (PLAYER 1 ou PLAYER 2)
    jogoAcabou = true;                              // marca que o jogo terminou (bloqueia lógica do jogo)

    // PARAR MÚSICA DO JOGO
    musicaFundo.pause();                           // pausa a música de fundo

    // TOCAR SOM DE VITÓRIA
    somVitoria.currentTime = 0;                   // reinicia o som de vitória do começo
    somVitoria.volume = 0.4;                     // define volume do som de vitória
    somVitoria.play();                          // toca o som de vitória
    telaVitoria.style.display = "flex";        // exibe a tela de vitória
    textoVitoria.innerText = vencedor + " VENCEU!"; // escreve o texto principal da vitória

    // PLAYER 1 (RATO)
    if (vencedor === "PLAYER 1") {            // se o vencedor for o Player 1 (rato)
        textoVitoria.innerHTML += `          
            <img
                id="ratoVitoria"           
                src="imagens/r1.png"       
                style="
                    width:220px;          
                    image-rendering: pixelated; 
                    filter:
                        drop-shadow(0 0 10px #00aaff) 
                        drop-shadow(0 0 20px #00aaff);
                "
            >
        `;
    }

    // PLAYER 2 (GATO)

    if (vencedor === "PLAYER 2") {            // se o vencedor for o Player 2 (gato)
        textoVitoria.innerHTML += `          
            <img
                id="gatoVitoria"           
                src="imagens/g1.png"       
                style="
                    width:220px;          
                    image-rendering: pixelated; 
                    filter:
                        drop-shadow(0 0 10px #ffcc00) 
                        drop-shadow(0 0 20px #ffcc00);
                "
            >
        `;
    }
}

// ====================== MORTE ======================
// RENASCER RATO
function respawnRato() {

    rato.x = tileSize;
    rato.y = tileSize;

    rato.direction = "down";
}

// RENASCER GATO
function respawnGato() {

    gato.x = (map[0].length - 2) * tileSize;
    gato.y = (map.length - 2) * tileSize;

    gato.direction = "down";
}

// COLISÃO COM EXPLOSÃO                              
function verificarMortes() {                        // função principal de detecção de morte
    for (const exp of explosoes) {                 // percorre todas as explosões ativas

        // TILE DA EXPLOSÃO
        const expTileX = exp.x / tileSize;       // converte posição X da explosão para grid
        const expTileY = exp.y / tileSize;       // converte posição Y da explosão para grid

        // RATO
        const ratoTileX = Math.floor(           // converte posição do rato para grid X
            (rato.x + rato.width / 2) / tileSize
        );
        const ratoTileY = Math.floor(           // converte posição do rato para grid Y
            (rato.y + rato.height / 2) / tileSize
        );

        if (
            ratoTileX === expTileX &&          // verifica colisão no eixo X
            ratoTileY === expTileY            // verifica colisão no eixo Y
        ) {

            if (
                vidasRato > 0 &&             // só aplica dano se ainda tiver vidas
                !rato.invencivel           // e não estiver invencível
            ) {

                // ESCUDO
                if (rato.escudo) {        // se o rato tiver escudo ativo
                    rato.escudo = false;  // remove o escudo
                    clearTimeout(rato.shieldTimeout); // cancela timer do escudo
                    rato.invencivel = true; // ativa invencibilidade temporária
                    setTimeout(() => {   // curto período de invencibilidade pós-escudo
                        rato.invencivel = false;
                    }, 500);
                    continue;            // ignora dano nesta explosão
                }

                // TOMOU DANO
                vidasRato--;            // reduz vida do rato
                atualizarVidas();      // atualiza UI dos corações
                ativarFlashVermelho(); // efeito visual de dano
                rato.invencivel = true; // evita dano imediato repetido
                setTimeout(() => {rato.invencivel = false; }, 1500);// remove invencibilidade

                // MORTE FINAL
                if (vidasRato <= 0) { finalizarJogo("PLAYER 2"); }// gato vence
                else {

                    // ESCONDE
                    rato.x = -500;     // tira rato da tela
                    rato.y = -500;

                    // RESPAWN
                    setTimeout(() => { respawnRato();}, 750);// respawn depois de delay
                }
            }
        }

        // GATO

        const gatoTileX = Math.floor(       // converte gato para grid X
            (gato.x + gato.width / 2) / tileSize
        );
        const gatoTileY = Math.floor(       // converte gato para grid Y
            (gato.y + gato.height / 2) / tileSize
        );
        if (
            gatoTileX === expTileX &&      // colisão X
            gatoTileY === expTileY        // colisão Y
        ) {
            if (
                vidasGato > 0 &&          // ainda tem vidas
                !gato.invencivel        // não está invencível
            ) {
                // ESCUDO
                if (gato.escudo) {
                    gato.escudo = false; // remove escudo
                    clearTimeout(gato.shieldTimeout); // cancela timer
                    gato.invencivel = true; // proteção temporária
                    setTimeout(() => {
                        gato.invencivel = false;
                    }, 500);
                    continue; // ignora dano
                }

                // TOMOU DANO
                vidasGato--;            // perde vida
                atualizarVidas();      // atualiza UI
                ativarFlashVermelho(); // efeito de dano
                gato.invencivel = true; // invencibilidade temporária
                setTimeout(() => { gato.invencivel = false; }, 1500);

                // MORTE FINAL
                if (vidasGato <= 0) { finalizarJogo("PLAYER 1"); }// rato vence
                else {

                    // ESCONDE
                    gato.x = -500;     // tira da tela
                    gato.y = -500;

                    // RESPAWN
                    setTimeout(() => { respawnGato(); }, 750);
                }
            }
        }
    }
}

// DESENHAR POWER-UPS                             
function desenharPowerUps() {                        // inicia a função de desenho dos power-ups
    powerUps.forEach(power => {                    // percorre todos os power-ups ativos

        // VIDA EXTRA
        if (
            power.tipo === "vida" &&             // verifica se o tipo é vida extra
            vidaExtraCarregada                 // verifica se a imagem já carregou
        ) {
            ctx.drawImage(                   // desenha o power-up na tela
                vidaExtraImg,              // imagem da vida extra
                power.x,                  // posição X
                power.y,                  // posição Y
                tileSize,                // largura
                tileSize                // altura
            );
        }

        // ESCUDO
        if (
            power.tipo === "escudo" &&       // tipo escudo
            escudoCarregado               // imagem carregada
        ) {
            ctx.drawImage(
                escudoImg,                // imagem do escudo
                power.x,
                power.y,
                tileSize,
                tileSize
            );
        }

        // LENTIDÃO
        if (
            power.tipo === "lentidao" &&     // tipo lentidão
            lentidaoCarregada           // imagem carregada
        ) {
            ctx.drawImage(
                lentidaoImg,             // imagem da lentidão
                power.x,
                power.y,
                tileSize,
                tileSize
            );
        }

        // TROCA DE CONTROLES
        if (
            power.tipo === "troca" &&       // tipo troca de controles
            trocaCarregada             // imagem carregada
        ) {
            ctx.drawImage(
                trocaImg,              // imagem de troca
                power.x,
                power.y,
                tileSize,
                tileSize
            );
        }
    });
}

// VERIFICAR POWER-UPS                                 
function verificarPowerUps() {                       // inicia a verificação dos power-ups
    for (let i = powerUps.length - 1; i >= 0; i--) { // percorre de trás pra frente (seguro para remover itens)
        const power = powerUps[i];                  // power-up atual

        // TILE DO RATO
        const ratoTileX = Math.floor(            // converte posição X do rato para grid
            (rato.x + rato.width / 2) / tileSize
        );
        const ratoTileY = Math.floor(            // converte posição Y do rato para grid
            (rato.y + rato.height / 2) / tileSize
        );

        // TILE DO GATO
        const gatoTileX = Math.floor(            // converte posição X do gato para grid
            (gato.x + gato.width / 2) / tileSize
        );
        const gatoTileY = Math.floor(            // converte posição Y do gato para grid
            (gato.y + gato.height / 2) / tileSize
        );

        // RATO PEGOU POWERUP
        if (
            ratoTileX === power.tileX &&        // colisão no eixo X
            ratoTileY === power.tileY          // colisão no eixo Y
        ) {

            // VIDA EXTRA
            if (power.tipo === "vida") {      // power-up de vida
                if (vidasRato < 4) {        // limite máximo de vidas
                    vidasRato++;           // aumenta vida
                    atualizarVidas();     // atualiza UI
                }
            }

            // ESCUDO
            else if (power.tipo === "escudo") { // power-up escudo
                rato.escudo = true;           // ativa escudo
                clearTimeout(rato.shieldTimeout); // cancela escudo anterior
                rato.shieldTimeout = setTimeout(() => { rato.escudo = false;}, 15000);     // desativa escudo
            }

            // TROCA DE CONTROLES
            else if (power.tipo === "troca") { // inverte controles
                clearTimeout(gato.timerTroca); // remove efeito anterior
                gato.controlesInvertidos = true; // ativa inversão
                gato.negativo = true;           // efeito visual
                gato.timerTroca = setTimeout(() => { // duração do efeito
                    gato.controlesInvertidos = false; // desativa inversão
                    gato.negativo = false;            // remove efeito
                }, 10000);
            }

            // LENTIDÃO
            else if (power.tipo === "lentidao") { // reduz velocidade
                clearTimeout(gato.timerLentidao); // limpa timer anterior
                gato.lento = true;               // ativa efeito lento
                gato.negativo = false;          // remove efeito negativo
                gato.speed = 1;                // reduz velocidade
                gato.timerLentidao = setTimeout(() => { // duração
                    gato.lento = false;        // remove efeito
                    gato.speed = 2;           // restaura velocidade
                }, 10000);
            }

            // SOM POWERUP
            somPowerUp.pause();              // reinicia som
            somPowerUp.currentTime = 0;
            somPowerUp.play();              // toca som

            // REMOVER POWERUP
            powerUps.splice(i, 1);         // remove item do mapa
            continue;                      // passa para o próximo
        }

        // GATO PEGOU POWERUP
        if (
            gatoTileX === power.tileX &&   // colisão X
            gatoTileY === power.tileY     // colisão Y
        ) {

            // VIDA EXTRA
            if (power.tipo === "vida") {

                if (vidasGato < 4) {

                    vidasGato++;

                    atualizarVidas();
                }
            }

            // ESCUDO
            else if (power.tipo === "escudo") {
                gato.escudo = true;
                clearTimeout(gato.shieldTimeout);
                gato.shieldTimeout = setTimeout(() => { gato.escudo = false;}, 15000);
            }

            // TROCA DE CONTROLES
            else if (power.tipo === "troca") {
                clearTimeout(rato.timerTroca);
                rato.controlesInvertidos = true;
                rato.negativo = true;
                rato.timerTroca = setTimeout(() => {
                    rato.controlesInvertidos = false;
                    rato.negativo = false;
                }, 10000);
            }

            // LENTIDÃO
            else if (power.tipo === "lentidao") {
                clearTimeout(rato.timerLentidao);
                rato.lento = true;
                rato.negativo = false;
                rato.speed = 1;
                rato.timerLentidao = setTimeout(() => {
                    rato.lento = false;
                    rato.speed = 2;

                }, 10000);
            }

            // SOM POWERUP
            somPowerUp.pause();
            somPowerUp.currentTime = 0;
            somPowerUp.play();

            // REMOVER POWERUP
            powerUps.splice(i, 1);
        }
    }
}

// LOOP                                              
function game() {                                    // função principal que roda continuamente
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa o canvas a cada frame
    mapa();                                          // desenha o mapa (paredes, blocos, chão)
    if (!jogoAcabou) {                              // só executa lógica do jogo se ainda estiver rodando
        moverRato();                              // atualiza movimento do jogador 1
        moverGato();                              // atualiza movimento do jogador 2
        atualizarBombas();                       // atualiza lógica das bombas e explosões
        verificarMortes();                      // verifica se alguém morreu na explosão
        verificarPowerUps();                  // verifica coleta de power-ups
    }
    desenharBombas();                           // desenha bombas na tela
    desenharPowerUps();                        // desenha itens/power-ups
    desenharExplosoes();                     // desenha explosões
    desenharRato();                        // desenha jogador 1
    desenharGato();                       // desenha jogador 2

    // efeito de dano na tela
    if (danoFlash > 0) {                 // se efeito de dano estiver ativo
        ctx.fillStyle = "rgba(255, 0, 0, 0.35)"; // cor vermelha semi-transparente
        ctx.fillRect(0, 0, canvas.width, canvas.height); // cobre a tela com efeito vermelho
        danoFlash--;                   // diminui intensidade do efeito a cada frame
    }
    requestAnimationFrame(game);      // chama o próximo frame (loop infinito do jogo)
}

atualizarVidas();
game();

