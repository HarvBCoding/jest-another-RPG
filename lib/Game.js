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
                        return;
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            // lists the potions currently in the player's inventory
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        .then(({ action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);
                        });
                } else {
                    // otherwise attack enemy and reduce enemy health
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}`);
                    console.log(this.currentEnemy.getHealth());
                }
            });
    } else {
        // if it's not the player's turn the enemy will attack
        const damage = this.currentEnemy.getAttackValue();
        // health will be reduced by the amount of damage
        this.player.reduceHealth(damage);

        console.log(`You were attack by the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
        // prompt user to attack or use a potion
        // if using a potion:
            // display list of potion objects to user
            // apply selected potion effect to player
        // if attacking:
            // subtract health from the Enemy based on Player attack value
    // if it's the Enemy's turn
        // subtract health from the player based on enemy attack value
};

module.exports = Game;