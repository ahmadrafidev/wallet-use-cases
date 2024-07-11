class Wallet {
  constructor() {
    this.users = {};
  }

  createUser(userId) {
    if (!this.users[userId]) {
      this.users[userId] = { balance: 0 };
    }
  }

  getBalance(userId) {
    if (!this.users[userId]) {
      throw new Error(`User ${userId} does not exist`);
    }
    return this.users[userId].balance;
  }

  topUp(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User ${userId} does not exist`);
    }
    if (amount <= 0) {
      throw new Error(`Amount must be greater than zero`);
    }
    this.users[userId].balance += amount;
    return this.users[userId].balance;
  }

  withdraw(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User ${userId} does not exist`);
    }
    if (amount <= 0) {
      throw new Error(`Amount must be greater than zero`);
    }
    if (this.users[userId].balance < amount) {
      throw new Error(`Insufficient balance`);
    }
    this.users[userId].balance -= amount;
    return this.users[userId].balance;
  }
}

// Use cases
const wallet = new Wallet();
wallet.createUser('user1');
console.log('Balance after top up:', wallet.topUp('user1', 100000));
console.log('Balance after withdrawal:', wallet.withdraw('user1', 50000)); 
console.log('Current balance:', wallet.getBalance('user1')); 
