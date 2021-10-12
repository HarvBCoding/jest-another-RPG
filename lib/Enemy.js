const Potion = require('./Potion.js');

const Character = require('./Character.js');

// using the keyword [extends] we're able to tell one class to inherit all of the methods from another class
// combined w/ super(), we could then ass extra properties to the child object
class Enemy extends Character {
    constructor(name, weapon) {
        // call parent constructor here:
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();

    }

    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
}

module.exports = Enemy;