class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(`Hello this is ${this.name}`);
  }
}

class BankAccount extends Person {
  _balance = 0;

  constructor(name, balance = 0) {
    super(name);
    this._balance = balance;
  }

  deposit(amount){
    this._balance += amount
  }

  withdraw(amount){
    this._balance -= amount
  }

  get balance(){
    return this._balance
  }
}

const user1 = new Person("ali");

const user1Account = new BankAccount('ali')
console.log(user1Account.balance);
user1Account.deposit(5000)
console.log(user1Account.balance);
user1Account.withdraw(2000)
console.log(user1Account.balance);



