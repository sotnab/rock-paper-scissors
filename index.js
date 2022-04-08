const scoreCounter = document.querySelector('.header_score-count');
const game = document.querySelector('.game');
const gameItems = document.querySelectorAll('.game_item');
const results = document.querySelector('.results_title');
const restartBtn = document.querySelector('.results_btn');
const openRules = document.querySelector('.btn-rules');
const closeRules = document.querySelector('.modal_close');
const modal = document.querySelector('.modal');

const POSITIONS = ['game_item--first', 'game_item--second', 'game_item--third'];
const HIDDEN = 'game_item--hidden'
const YOUR = 'game_item--your';
const OPPONENT = 'game_item--opponent';
const WAITING = 'game_item--waiting';
const FINAL = 'game_item--final';

let score = 0;

const pickItem = (picked, index) => {
   game.classList.remove('game--bg');

   gameItems.forEach((item) => {
      if (item.id != picked.id) item.classList.add(HIDDEN);
      item.onclick = null;
   });

   const opponentPick = randomItem(index)

   setResultPositions(picked, opponentPick);

   setTimeout(() => {
      showResults(picked, opponentPick);
   }, 2000);
}

const showResults = (pick, opponentPick) => {
   opponentPick.classList.remove(WAITING, HIDDEN);
   pick.classList.add(FINAL);

   let win = isWin(pick, opponentPick);

   if (win) {
      results.textContent = 'You win';
      scoreCounter.textContent = ++score;
   } else {
      results.textContent = 'You lose';
   }
   results.parentNode.classList.add('results--visible');
}


const setResultPositions = (pick, opponentPick) => {
   pick.classList.remove(POSITIONS[1], POSITIONS[2]);
   pick.classList.add(POSITIONS[0], YOUR);

   opponentPick.classList.remove(POSITIONS[0], POSITIONS[2]);
   opponentPick.classList.add(POSITIONS[1], WAITING, OPPONENT);
}


const restartGame = () => {
   results.parentNode.classList.remove('results--visible');
   game.classList.add('game--bg');

   gameItems.forEach((item, index) => {
      item.onclick = () => pickItem(item, index);
      item.className = '';
      item.classList.add('game_item', POSITIONS[index]);
   });
}


const randomItem = (takenIndex) => {
   while (true) {
      let index = Math.floor(Math.random() * 3);
      if (index != takenIndex) return gameItems[index];
   }
}


const toggleRules = () => {
   modal.classList.toggle('modal--visible');
}


const isWin = (player, opponent) => {
   return ((player.id == 'paper' && opponent.id == 'rock')
      || (player.id == 'scissors' && opponent.id == 'paper')
      || (player.id == 'rock' && opponent.id == 'scissors'));
}


gameItems.forEach((item, index) => item.onclick = () => pickItem(item, index));

restartBtn.onclick = restartGame;
openRules.onclick = toggleRules;
closeRules.onclick = toggleRules;