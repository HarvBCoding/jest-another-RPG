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

Game.prototype.startNewBattle = function() {
    // if the player's agility is higher than the currentEnemy, then the player goes first
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    };

    console.log('Your stats are as follows:');
    console.table(this.player.getStats());

    console.log(this.currentEnemy.getDescription());

    this.battle()
};

Game.prototype.battle = function() {
    // if it's the players turn:
    if (this.isPlayerTurn) {
        // player will be prompted to attack or use a potion
        inquirer
            .prompt({
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Attack', 'Use potion']
            })
            .then(({ action }) => {
                // if user chose to use a potion
                if (action === 'Use potion') {
                    // if there is nothing in the player inventory
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");
                        // end player turn
                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // display list of potion objects from inventory to user
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            // apply selected potion effect to player
                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            this.checkEndOfBattle();
                        });
                } else {
                    // otherwise attack enemy; subtract health from the Enemy based on Player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                };
            });
    } else {
        // if it's the enemy's turn the enemy will attack
        const damage = this.currentEnemy.getAttackValue();
        // subtract health from the player based on enemy attack value
        this.player.reduceHealth(damage);

        console.log(`You were attacked by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

Game.prototype.checkEndOfBattle = function() {
    // check that both players are alive and can keep fighting
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        // switch the turn order
        this.isPlayerTurn = !this.isPlayerTurn;
        // battle again
        this.battle();
    //  the player is alive but the Enemy has been defeated
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}`);

        // the player is awarded a potion
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name}`);

        // and the round number increases
        this.roundNumber++;

        // if the number of rounds is less than the length of the enemies array
        if (this.roundNumber < this.enemies.length) {
            // then the current enemy is the next enemy in the array (using the round number as the index)
            this.currentEnemy = this.enemies[this.roundNumber];
            // start a new battle
            this.startNewBattle();

        // if the round number is greater than the length of the enemies array
        } else {
            // the player won
            console.log('You win!');
        };
    //  the player has been defeated
    } else {
        console.log("You've been defeated!");
    }
}

module.exports = Game;