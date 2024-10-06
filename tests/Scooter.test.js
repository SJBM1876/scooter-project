const Scooter = require('../src/Scooter')

describe('Scooter', () => {
  it('should create a new scooter with correct properties', () => {
    const scooter = new Scooter('station1');

    expect(scooter.station).toBe('station1');
    expect(scooter.user).toBeNull();
    expect(scooter.charge).toBe(100);
    expect(scooter.isBroken).toBe(false);
  });

  it('should rent a scooter successfully', () => {
    const scooter = new Scooter('station1');
    const user = { username: 'user1' };

    scooter.rent(user);

    expect(scooter.user).toBe(user);
    expect(scooter.station).toBeNull();
  });

  it('should throw an error when renting a broken scooter', () => {
    const scooter = new Scooter('station1');
    scooter.isBroken = true;
    const user = { username: 'user1' };

    expect(() => scooter.rent(user)).toThrowError('Scooter needs repair');
  });

  it('should throw an error when renting a scooter with insufficient charge', () => {
    const scooter = new Scooter('station1');
    scooter.charge = 19;
    const user = { username: 'user1' };

    expect(() => scooter.rent(user)).toThrowError('Scooter needs to charge');
  });

  it('should dock a scooter successfully', () => {
    const scooter = new Scooter('station1');
    scooter.station = null;

    scooter.dock('station2');

    expect(scooter.station).toBe('station2');
    expect(scooter.user).toBeNull();
  });
});