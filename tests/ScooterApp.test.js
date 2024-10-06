const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp');


describe('ScooterApp', () => {
  let app;

  beforeEach(() => {
    app = new ScooterApp();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', () => {
      const user = app.registerUser('testUser', 'password123', 25);
      expect(user).toBeDefined();
      expect(app.registeredUsers['testUser']).toBeDefined();
      expect(console.log).toHaveBeenCalledWith('User has been registered');
    });

    it('should throw an error if user is already registered', () => {
      app.registerUser('testUser', 'password123', 25);
      expect(() => app.registerUser('testUser', 'newPassword', 30)).toThrow('User already registered');
    });

    it('should throw an error if user is too young', () => {
      expect(() => app.registerUser('youngUser', 'password123', 17)).toThrow('Too young to register');
    });
  });

  describe('loginUser', () => {
    it('should log in a registered user', () => {
      app.registerUser('testUser', 'password123', 25);
      app.loginUser('testUser', 'password123');
      expect(console.log).toHaveBeenCalledWith('User has been logged in');
    });

    it('should throw an error for incorrect username or password', () => {
      app.registerUser('testUser', 'password123', 25);
      expect(() => app.loginUser('testUser', 'wrongPassword')).toThrow('Username or password is incorrect');
      expect(() => app.loginUser('nonExistentUser', 'password123')).toThrow('Username or password is incorrect');
    });
  });

  describe('logoutUser', () => {
    it('should log out a logged-in user', () => {
      app.registerUser('testUser', 'password123', 25);
      app.loginUser('testUser', 'password123');
      app.logoutUser('testUser');
      expect(console.log).toHaveBeenCalledWith('User is logged out');
    });

    it('should throw an error if user is not logged in', () => {
      expect(() => app.logoutUser('nonExistentUser')).toThrow('No such user is logged in');
    });
  });

  describe('createScooter', () => {
    it('should create a new scooter at a valid station', () => {
      const scooter = app.createScooter('station1');
      expect(scooter).toBeDefined();
      expect(app.stations['station1']).toContain(scooter);
      expect(console.log).toHaveBeenCalledWith('Created new scooter');
    });

    it('should throw an error for an invalid station', () => {
      expect(() => app.createScooter('invalidStation')).toThrow('No such station');
    });
  });

  describe('dockScooter', () => {
    it('should dock a scooter at a valid station', () => {
      const scooter = app.createScooter('station1');
      app.dockScooter(scooter, 'station2');
      expect(app.stations['station2']).toContain(scooter);
      expect(console.log).toHaveBeenCalledWith('Scooter is docked');
    });

    it('should throw an error for an invalid station', () => {
      const scooter = app.createScooter('station1');
      expect(() => app.dockScooter(scooter, 'invalidStation')).toThrow('No such station');
    });

    it('should throw an error if scooter is already at the station', () => {
      const scooter = app.createScooter('station1');
      expect(() => app.dockScooter(scooter, 'station1')).toThrow('Scooter already at station');
    });
  });

  describe('rentScooter', () => {
    it('should rent a scooter to a user', () => {
      const scooter = app.createScooter('station1');
      const user = app.registerUser('testUser', 'password123', 25);
      app.rentScooter(scooter, user);
      expect(app.stations['station1']).not.toContain(scooter);
      expect(console.log).toHaveBeenCalledWith('Scooter is rented');
    });

    it('should throw an error if scooter is not found', () => {
      const user = app.registerUser('testUser', 'password123', 25);
      const scooter = { id: 'nonexistent' };
      expect(() => app.rentScooter(scooter, user)).toThrow('Scooter not found');
    });
  });
  });


  






