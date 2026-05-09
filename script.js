const imagensReais = [
    "imagens/reais/real1.jpg", "imagens/reais/real2.jpg", "imagens/reais/real3.jpg",
    "imagens/reais/real4.jpg", "imagens/reais/real5.jpg", "imagens/reais/real6.jpg",
    "imagens/reais/real7.jpg", "imagens/reais/real8.jpg", "imagens/reais/real9.jpg",
    "imagens/reais/real10.jpg", "imagens/reais/real11.jpg", "imagens/reais/real12.jpg",
    "imagens/reais/real13.jpg", "imagens/reais/real14.jpg", "imagens/reais/real15.jpg",
    "imagens/reais/real16.jpg", "imagens/reais/real17.jpg", "imagens/reais/real18.jpg",
    "imagens/reais/real19.jpg"
];

const imagensIA = [
    { img: "imagens/fake/fake1.jpeg", erro: "Há uma marca d'água 'StyleGAN2' no canto. A armação dos óculos é assimétrica e os dentes se fundem." },
    { img: "imagens/fake/fake2.jpeg", erro: "A textura do cabelo é muito sólida, como um bloco, e o fundo borrado não tem profundidade fotográfica." },
    { img: "imagens/fake/fake3.jpeg", erro: "A roupa da criança derrete e se mistura com o fundo sem fronteiras claras." },
    { img: "imagens/fake/fake4.jpg", erro: "Os fios de grama se fundem diretamente com o focinho do cachorro de uma forma biologicamente impossível." },
    { img: "imagens/fake/fake5.jpg", erro: "A pelagem parece pintada a óleo. Faltam os detalhes nítidos e individuais dos fios de pelo." },
    { img: "imagens/fake/fake6.jpg", erro: "As garras do pinguim estão deformadas, sem definição, e se fundem diretamente com a pedra." },
    { img: "imagens/fake/fake7.jpg", erro: "Os bigodes do leopardo nascem de lugares aleatórios e se cruzam de forma caótica." },
    { img: "imagens/fake/fake8.png", erro: "Repare nas mãos segurando os copos de café: os dedos estão derretidos e fundidos ao papel." },
    { img: "imagens/fake/fake9.png", erro: "A floresta sofre do 'efeito brócolis': as folhas se repetem infinitamente sem criar troncos lógicos." },
    { img: "imagens/fake/fake10.png", erro: "As gotas d'água parecem pintadas e não refratam a luz. As pétalas da flor têm anatomia irreal." },
    { img: "imagens/fake/fake11.png", erro: "As ondas se chocam com as pedras de uma forma que desafia a gravidade e a física natural da água." },
    { img: "imagens/fake/fake12.png", erro: "As árvores refletidas na água e a névoa não batem com a perspectiva 3D real do ambiente." },
    { img: "imagens/fake/fake13.webp", erro: "A pata dianteira do cão está deformada e a gravidade do pulo não condiz com a tensão muscular." },
    { img: "imagens/fake/fake14.webp", erro: "A fumaça saindo da xícara parece sólida e a musculatura tem uma simetria artificial excessiva." },
    { img: "imagens/fake/fake15.webp", erro: "Dê um zoom na moça sentada ao fundo (de blusa branca): o rosto dela está completamente desfigurado, um erro clássico de IA em rostos secundários." }
];


let perguntasSelecionadas = [];
let indiceAtual = 0;
let pontuacao = 0;
let flagRespondido = false;
let respostaCorretaDaRodada = ""; 


function embaralharArray(array) {
    let arrayEmbaralhado = [...array];
    for (let i = arrayEmbaralhado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayEmbaralhado[i], arrayEmbaralhado[j]] = [arrayEmbaralhado[j], arrayEmbaralhado[i]];
    }
    return arrayEmbaralhado;
}


function gerarRodadas() {
    const reaisEmbaralhadas = embaralharArray(imagensReais);
    const iaEmbaralhadas = embaralharArray(imagensIA);
    
    let rodadas = [];
   
    for (let i = 0; i < 10; i++) {
        rodadas.push({
            imgReal: reaisEmbaralhadas[i],
            imgIA: iaEmbaralhadas[i].img,
            explicacao: `A imagem gerada por IA (falsa) tem o seguinte erro: ${iaEmbaralhadas[i].erro} A outra imagem é uma fotografia 100% autêntica.`
        });
    }
    return rodadas;
}


document.addEventListener("DOMContentLoaded", function() {
    const avisoErro = document.getElementById("aviso-js");
    if (avisoErro) avisoErro.style.display = "none";

    const areaQuiz = document.getElementById("area-quiz");
    if (areaQuiz) {
        areaQuiz.classList.remove("oculto");
        
        
        perguntasSelecionadas = gerarRodadas();
        carregarRodada();
    }
});

function carregarRodada() {
    flagRespondido = false;
    
    document.getElementById("feedback-caixa").classList.add("oculto");
    document.getElementById("img-A").style.borderColor = "var(--dust-grey)"; 
    document.getElementById("img-B").style.borderColor = "var(--dust-grey)";

    const imgA = document.getElementById("img-A");
    const imgB = document.getElementById("img-B");

    
    const fallbackImage = "https://placehold.co/600x400/403d39/fffcf2?text=Imagem+Nao+Encontrada";
    imgA.onerror = function() { this.src = fallbackImage; };
    imgB.onerror = function() { this.src = fallbackImage; };
    
    const rodada = perguntasSelecionadas[indiceAtual];

  
    const imagemRealNaEsquerda = Math.random() < 0.5;

    if (imagemRealNaEsquerda) {
        imgA.src = rodada.imgReal;
        imgB.src = rodada.imgIA;
        respostaCorretaDaRodada = "A";
    } else {
        imgA.src = rodada.imgIA;
        imgB.src = rodada.imgReal;
        respostaCorretaDaRodada = "B";
    }

    
    document.getElementById("progresso-quiz").innerText = `Análise de Autenticidade: ${indiceAtual + 1} de 10`;
}

function verificarResposta(escolha) {
    if (flagRespondido) return; 
    flagRespondido = true;

    const rodada = perguntasSelecionadas[indiceAtual];
    const acertou = (escolha === respostaCorretaDaRodada);

    if (acertou) pontuacao++;

    const imgA = document.getElementById("img-A");
    const imgB = document.getElementById("img-B");

    
    if (escolha === 'A') {
        imgA.style.borderColor = acertou ? "var(--cor-sucesso)" : "var(--cor-alerta)";
        imgB.style.borderColor = acertou ? "var(--cor-alerta)" : "var(--cor-sucesso)"; 
    } else {
        imgB.style.borderColor = acertou ? "var(--cor-sucesso)" : "var(--cor-alerta)";
        imgA.style.borderColor = acertou ? "var(--cor-alerta)" : "var(--cor-sucesso)";
    }

    const caixaFeedback = document.getElementById("feedback-caixa");
    caixaFeedback.classList.remove("oculto", "acerto", "erro");
    caixaFeedback.classList.add(acertou ? "acerto" : "erro");
    
    document.getElementById("feedback-titulo").innerText = acertou ? "✅ Visão Apurada!" : "❌ A IA te enganou!";
    document.getElementById("feedback-texto").innerText = rodada.explicacao;
    document.getElementById("btn-proximo").innerText = (indiceAtual === perguntasSelecionadas.length - 1) ? "Ver Relatório Final" : "Avançar para a Próxima";
}

function proximaRodada() {
    indiceAtual++;
    if (indiceAtual < perguntasSelecionadas.length) {
        carregarRodada();
    } else {
        document.getElementById("area-quiz").classList.add("oculto");
        document.getElementById("area-resultado").classList.remove("oculto");
        document.getElementById("pontuacao-final").innerText = pontuacao;
        
        let msg = document.getElementById("mensagem-resultado");
        if (pontuacao >= 8) {
            msg.innerHTML = "Excelente! Você tem um <strong>olho clínico de perito</strong>. Você consegue identificar os padrões sintéticos mesmo fora de contexto.";
        } else if (pontuacao >= 5) {
            msg.innerHTML = "Bom trabalho! Mas <strong>a tecnologia conseguiu te enganar</strong> algumas vezes. Procure sempre por falhas lógicas e de física.";
        } else {
            msg.innerHTML = "Atenção! <strong>A IA te enganou na maioria das vezes</strong>. Retorne à seção de teoria e aprenda a procurar erros em mãos, reflexos e fundos.";
        }
    }
}