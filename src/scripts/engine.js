// CONFIGURAÇÕES DO JOGO:
const tempoDeJogo = 10;
const velocidadeDoEnemy = 500; /*Velocidade descrescente*/
const volumeDoJogo = 1;


const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: tempoDeJogo,
    },
    actions: {
        timerID: setInterval(randomSquare, velocidadeDoEnemy),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerID);
        alert(`Game Over! O seu resultado foi: ${state.values.result}`);

        // Pergunta se o usuário quer reiniciar o jogo

        const restartGame = confirm('Tentar novamente?');
        if (restartGame) {
            resetGame ();   
        }
    };
};

function resetGame() {
    state.values.result = 0;
    state.view.score.textContent = 0;
    state.values.currentTime = tempoDeJogo;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.actions.timerID = setInterval(randomSquare, velocidadeDoEnemy);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function playSound(audioname) {
    let audio = new Audio(`./src/audios/${audioname}`);
    audio.volume = volumeDoJogo;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound('bonk.mp3');
            };
        })
    });
};

function initialize() {
    addListenerHitBox();
};

initialize();
