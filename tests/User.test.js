const User = require('../src/User')

describe('User', () => {
  it('should create a new user with correct properties', () => {
    const user = new User('user1', 'password1', 20);

    expect(user.username).toBe('user1');
    expect(user.password).toBe('password1');
    expect(user.age).toBe(20);
    expect(user.loggedIn).toBe(false);
  });

  it('should login a user successfully', () => {
    const user = new User('user1', 'password1', 20);

    user.login('password1');

    expect(user.loggedIn).toBe(true);
  });

  it('should throw an error when logging in with incorrect password', () => {
    const user = new User('user1', 'password1', 20);

    expect(() => user.login('wrongpassword')).toThrowError('Incorrect password');
  });

  it('should logout a user successfully', () => {
    const user = new User('user1', 'password1', 20);
    user.loggedIn = true;

    user.logout();

    expect(user.loggedIn).toBe(false);
  });
});


