class Wallet {
  constructor() {
    this.users = {};
  }

  /**
   * Creates a new user with an initial balance of 0.
   * @param {string} userId - The ID of the user to create.
   * @throws Will throw an error if the user already exists.
   */
  createUser(userId) {
    if (this.users[userId]) {
      throw new Error(`User with id ${userId} already exist.`)
    }
    this.users[userId] = { 
      balance: 0,
      transactions: []
    };
    console.log(`User with id ${userId} created.`);
  }

  /**
   * Gets the balance of the specified user.
   * @param {string} userId - The ID of the user to get the balance of.
   * @returns {number} The balance of the spesific user.
   * @throws Will throw an error if the user does not exist.
   */
  getBalance(userId) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
    return this.users[userId].balance;
  }

  /**
   * Tops up the balance of the specified user.
   * @param {string} userId - The ID of the user to top up.
   * @param {number} amount - The amount to top up.
   * @returns {number} The new balance of the spesific user.
   * @throws Will throw an error if the user does not exist or if the top up amount is not positive.
   */
  topUp(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
    if (amount <= 0) {
      throw new Error(`The top up amount must be greater than zero.`);
    }
    this.users[userId].balance += amount;
    this.users[userId].transactions.push({ type: 'top-up', amount });
    console.log(`${userId} topped up with amount ${amount}. New balance: ${this.users[userId].balance}.`);
    return this.users[userId].balance;
  }

  /**
   * Withdraws the specified amount from the user's balance.
   * @param {string} userId - The ID of the user to withdraw from.
   * @param {number} amount - The amount to withdraw.
   * @returns {number} The new balance of the spesific user.
   * @throws Will throw an error if the user does not exist, if the amount is not positive, or if the balance is insufficient.
   */
  withdraw(userId, amount) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
    if (amount <= 0) {
      throw new Error(`The withdrawal amount must be greater than zero.`);
    }
    if (this.users[userId].balance < amount) {
      throw new Error(`Insufficient balance. Check your balance.`);
    }
    this.users[userId].balance -= amount;
    this.users[userId].transactions.push({ type: 'withdrawal', amount });
    console.log(`${userId} withdrew with amount ${amount}. New balance: ${this.users[userId].balance}.`);
    return this.users[userId].balance;
  }

  /**
   * Gets the transaction history of the specified user.
   * @param {string} userId - The ID of the user to get the transaction history of.
   * @returns {Array} The transaction history of the user.
   * @throws Will throw an error if the user does not exist.
   */
  getTransactionHistory(userId) {
    if (!this.users[userId]) {
      throw new Error(`User with id ${userId} does not exist.`);
    }
    return this.users[userId].transactions;
  }

  /**
   * Logs the transaction history for a given user.
   * @param {string} userId - The ID of the user whose transaction history will be logged.
   */
  getLogTransactionHistory(userId) {
    try {
      console.log(`Transaction history for ${userId}:`, this.getTransactionHistory(userId));
    } catch (error) {
      console.log(error.message); 
    }
  }

}



// Wallet class usage and test cases!
const wallet = new Wallet();

try {
  // Test Case 1: Create a new user and check initial balance
  wallet.createUser('user1');
  console.log('Initial balance:', wallet.getBalance('user1')); 

  // Test Case 2: Top up balance with a positive amount
  console.log('Balance after top up:', wallet.topUp('user1', 10000)); 

  // Test Case 3: Attempt to top up with a negative amount (should throw an error)
  try {
    wallet.topUp('user1', -5000);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 4: Withdraw a positive amount less than the balance
  console.log('Balance after withdrawal:', wallet.withdraw('user1', 5000)); 

  // Test Case 5: Attempt to withdraw a negative amount (should throw an error)
  try {
    wallet.withdraw('user1', -5000);
  } catch (error) {
    console.log(error.message);
  }

  // Test Case 6: Attempt to withdraw more than the balance (should throw an error)
  try {
    wallet.withdraw('user1', 10000);
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
    wallet.topUp('user2', 5000);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 10: Attempt to withdraw from a non-existent user (should throw an error)
  try {
    wallet.withdraw('user2', 5000);
  } catch (error) {
    console.log(error.message); 
  }

  // Test Case 11: Get transaction history for an existing spesific user
  wallet.getLogTransactionHistory('user1');

} catch (error) {
  console.error('Error:', error.message);
}
