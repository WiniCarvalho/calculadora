const tela = document.getElementById('tela');

let operando = false;
let numeroAtual = '0';
let numeroAnterior = '';
let operacao = '';

function atualizarTela() {
    tela.textContent = numeroAtual;
}

function adicionarNumero(num) {
    if (operando) {
        numeroAtual = num === '.' ? '0.' : num;
        operando = false;
    } else {
        if (num === '.' && !numeroAtual.includes('.')) {
            numeroAtual += '.';
        } else if (num !== '.') {
            numeroAtual = numeroAtual === '0' ? num : numeroAtual + num;
        }
    }
    atualizarTela();
}

function definirOperacao(oper) {
    if (numeroAnterior !== '') {
        calcular();
    }
    operacao = oper;
    numeroAnterior = numeroAtual;
    operando = true;
}

function calcular() {
    const num1 = parseFloat(numeroAnterior);
    const num2 = parseFloat(numeroAtual);
    let resultado;

    switch (operacao) {
        case 'somar':
            resultado = num1 + num2;
            break;
        case 'subtrair':
            resultado = num1 - num2;
            break;
        case 'multiplicar':
            resultado = num1 * num2;
            break;
        case 'dividir':
            resultado = num2 === 0 ? 'Erro' : num1 / num2;
            break;
        case 'porcentagem':
            resultado = num1 * (num2 / 100);
            break;
        case 'raiz':
            resultado = Math.sqrt(num2);
            break;
        default:
            return;
    }

    numeroAtual = isNaN(resultado) ? 'Erro' : resultado.toString();
    numeroAnterior = '';
    operacao = '';
    atualizarTela();
}

function limpar() {
    numeroAtual = '0';
    numeroAnterior = '';
    operacao = '';
    atualizarTela();
}

function inverterSinal() {
    numeroAtual = (parseFloat(numeroAtual) * -1).toString();
    atualizarTela();
}

document.querySelectorAll('.btn[data-numero]').forEach((botao) => {
    botao.addEventListener('click', () => adicionarNumero(botao.textContent));
});

document.querySelectorAll('.btn[data-acao]').forEach((botao) => {
    botao.addEventListener('click', () => {
        const acao = botao.getAttribute('data-acao');

        switch (acao) {
            case 'limpar':
                limpar();
                break;
            case 'igual':
                calcular();
                break;
            case 'inverter':
                inverterSinal();
                break;
            default:
                definirOperacao(acao);
        }
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key)) return adicionarNumero(key);
    if (key === '.') return adicionarNumero('.');
    if (['+', '-', '*', '/'].includes(key)) {
        const mapa = { '+': 'somar', '-': 'subtrair', '*': 'multiplicar', '/': 'dividir' };
        return definirOperacao(mapa[key]);
    }
    if (key === 'Enter') return calcular();
    if (key === 'Escape') return limpar();
});