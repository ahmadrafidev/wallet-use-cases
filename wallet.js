class Wallet {
  constructor() {
    this.users = {};
  }

  createUser(userId) {
    if (this.users[userId]) {
      throw new Error(`User with id ${userId} already exist.`)
    }
    this.users[userId] = { 
      balance: 0 
    };
  }

  getBalance(userId) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
    return this.users[userId].balance;
  }

  topUp(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist`);
    }
    if (amount <= 0) {
      throw new Error(`The top up amount must be greater than zero`);
    }
    this.users[userId].balance += amount;
    return this.users[userId].balance;
  }

  withdraw(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist`);
    }
    if (amount <= 0) {
      throw new Error(`The withdrawal amount must be greater than zero!`);
    }
    if (this.users[userId].balance < amount) {
      throw new Error(`Insufficient balance. Check your balance!`);
    }
    this.users[userId].balance -= amount;
    return this.users[userId].balance;
  }
}

// Wallet class usage and test cases!
const wallet = new Wallet();

try {
  // Test Case 1: Create a new user and check initial balance
  wallet.createUser('user1');
  console.log('Initial balance:', wallet.getBalance('user1')); 

  // Test Case 2: Top up balance with a positive amount
  console.log('Balance after top up:', wallet.topUp('user1', 100)); 

  // Test Case 3: Attempt to top up with a negative amount (should throw an error)
  try {
    wallet.topUp('user1', -50);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 4: Withdraw a positive amount less than the balance
  console.log('Balance after withdrawal:', wallet.withdraw('user1', 50)); 

  // Test Case 5: Attempt to withdraw a negative amount (should throw an error)
  try {
    wallet.withdraw('user1', -50);
  } catch (error) {
    console.log(error.message);
  }

  // Test Case 6: Attempt to withdraw more than the balance (should throw an error)
  try {
    wallet.withdraw('user1', 100);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 7: Attempt to create a duplicate user (should throw an error)
  try {
    wallet.createUser('user1');
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 8: Check balance for non-existent user (should throw an error)
  try {
    wallet.getBalance('user2');
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 9: Attempt to top up a non-existent user (should throw an error)
  try {
    wallet.topUp('user2', 50);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 10: Attempt to withdraw from a non-existent user (should throw an error)
  try {
    wallet.withdraw('user2', 50);
  } catch (error) {
    console.log(error.message); 
  }

} catch (error) {
  console.error('Error:', error.message);
}
