const Potion = require('./Potion.js');

const Character = require('./Character.js');

class Player extends Character{
    constructor(name = '') {
        // call parent constructor here:
        // when super(name) is called it passes the name argument to the constructor() of the Character class, where name and other properties will be defined
        super(name);
    
        this.inventory = [new Potion('health'), new Potion()];
    }

    getStats() {
        return {
            potions: this.inventory.length,
            health: this.health,
            strength: this.strength,
            agility: this.agility
        };
    }

    getInventory() {
        if (this.inventory.length) {
            return this.inventory;
        }
        return false;
    }

    addPotion(potion) {
        this.inventory.push(potion);
    }

    usePotion(index) {
        // the splice() method removes itens from an array and returns the removed item(s) as a new array
    // 2 things are happening: the original inventory array has a single potion removed at the specified index value and is put into a new "removed items" array
    // then the potion at index[0] of this "removed items" array is then saved to the variable
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
        }
    }
}


module.exports = Player;