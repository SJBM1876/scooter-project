// ScooterApp.js

class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password) {
    if (this.password === password) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.loggedIn = false;
  }
}

class Scooter {
  constructor(station) {
    this.station = station;
    this.user = null;
  }

  rent(user) {
    this.user = user;
    this.station = null;
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }
}

class ScooterApp {
  constructor() {
    this.stations = {
      station1: [],
      station2: [],
      station3: []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered");
    }
    if (age < 18) {
      throw new Error("Too young to register");
    }
    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log("User has been registered");
    return newUser;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (user && user.login(password)) {
      console.log("User has been logged in");
    } else {
      throw new Error("Username or password is incorrect");
    }
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (user) {
      user.logout();
      console.log("User is logged out");
    } else {
      throw new Error("No such user is logged in");
    }
  }

  createScooter(station) {
    if (this.stations[station]) {
      const scooter = new Scooter(station);
      this.stations[station].push(scooter);
      console.log("Created new scooter");
      return scooter;
    } else {
      throw new Error("No such station");
    }
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("No such station");
    }

    const existingIndex = this.stations[station].findIndex(s => s === scooter);
    if (existingIndex !== -1) {
      throw new Error("Scooter already at station");
    }

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log("Scooter is docked");
  }

  rentScooter(scooter, user) {
    for (const station in this.stations) {
      const index = this.stations[station].findIndex(s => s === scooter);
      if (index !== -1) {
        scooter.rent(user);
        this.stations[station].splice(index, 1);
        console.log("Scooter is rented");
        return;
      }
    }
    throw new Error("Scooter not found");
  }

  print() {
    console.log("Registered Users:");
    for (const username in this.registeredUsers) {
      console.log(`  - ${username}`);
    }

    console.log("Stations:");
    for (const station in this.stations) {
      console.log(`  - ${station}: ${this.stations[station].length} scooters`);
    }
  }
}

module.exports = ScooterApp;
