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