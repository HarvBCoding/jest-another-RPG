const Player = require('../lib/Player');
// imports the Potion() constructor into the test extablishing Potion as a useable variable
const Potion = require('../lib/Potion.js');

// jest.mock() mocks/replaces the constructor's implementation w/ our faked data
jest.mock('../lib/Potion.js');


test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets player stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player  = new Player('Dave');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test('gets players health value', () => {
    const player = new Player('Dave');

    // the expect.stringContaining() method is an expect method that can be used to make sure the string includes the players health
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
})

test('checks if player is alive or not', () => {
    const player = new Player('Dave');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0

    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
})