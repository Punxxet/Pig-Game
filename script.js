'use strict';

const player0 = document.querySelector('.player--0'); // player 1
const player1 = document.querySelector('.player--1'); // player 2

const score0 = document.getElementById('score--0'); // total score of player 0
const score1 = document.getElementById('score--1'); // total score of player 1

const current0 = document.getElementById('current--0'); // current score of player 0
const current1 = document.getElementById('current--1'); // current score of player 1

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');



let scores,currentScore,activePlayer,playing;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    

    score0.textContent = 0;
    score1.textContent = 0;

    current0.textContent = 0;
    current1.textContent = 0;

    diceEl.classList.add('hidden');

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.add('player--active');
    player1.classList.remove('player--active');


}

init();

const swithPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // remove the hidden class
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      activePlayer = activePlayer == 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

// on pressing the hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      swithPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
btnNew.addEventListener('click', init());
