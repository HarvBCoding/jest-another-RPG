const inquirer = require('inquirer');
const Enemy = require('./Enemy.js');
const Player = require('./Player.js');

function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
}


// Here is where we'll set up the Enemy and Player objects
Game.prototype.initializeGame = function() {

    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // when the game starts the current enemy will be the first enemy in the array
    this.currentEnemy = this.enemies[0];

    // prompt the user for the player name
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

        // start a battle
        this.startNewBattle();
        });

};

module.exports = Game;