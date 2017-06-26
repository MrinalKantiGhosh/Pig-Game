/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameState, prevDice1, prevDice2;

//document.querySelector('#current-'  + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
initializeGame();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameState) {
        //Random Number
        var dice1 = Math.floor((Math.random() * 6) + 1);
        var dice2 = Math.floor((Math.random() * 6) + 1);

        //Show the Result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

        //Update the roundScore only if the dice is not show 1
        if (dice1 === 6 && prevDice1 === 6 || dice2 === 6 && prevDice2 === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            roundScore += (dice1 + dice2);
            document.getElementById('current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
        } else
            nextPlayer();
        prevDice1 = dice1;
        prevDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameState) {
        // Add Current Score to Global Score 
        scores[activePlayer] += roundScore;
        var winScore;
        var inputScore = document.querySelector('.final-score').value;

        if (inputScore)
            winScore = inputScore;
        else
            winScore = 100;
        //Check if player is win or not
        if (scores[activePlayer] >= winScore) {
            gameState = false;
            document.getElementById('name-' + activePlayer).innerHTML = '<Strong>Winner!</strong>';
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        } else {
            // Update the UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', initializeGame);

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).innerHTML = '<em>' + roundScore + '</em>';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}


function initializeGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameState = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').innerHTML = 'Player 1';
    document.getElementById('name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
