# SOLID Principles Explained Simply

The SOLID principles are five design guidelines that help you write better, more maintainable code. Let me break each one down with simple JavaScript examples.

## 1. **S - Single Responsibility Principle (SRP)**
*A class should have only ONE reason to change.*

**Bad Example:**
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Handles user data AND email sending - too many responsibilities!
  saveToDatabase() {
    console.log(`Saving ${this.name} to database...`);
  }

  sendWelcomeEmail() {
    console.log(`Sending email to ${this.email}...`);
  }
}
```

**Good Example:**
```javascript
// Each class has ONE job
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    console.log(`Saving ${user.name} to database...`);
  }
}

class EmailService {
  sendWelcomeEmail(user) {
    console.log(`Sending email to ${user.email}...`);
  }
}
```

## 2. **O - Open/Closed Principle (OCP)**
*Open for extension, closed for modification.*

You should be able to add new features without changing existing code.

**Bad Example:**
```javascript
class PaymentProcessor {
  processPayment(type, amount) {
    if (type === 'credit') {
      console.log(`Processing credit card payment: $${amount}`);
    } else if (type === 'paypal') {
      console.log(`Processing PayPal payment: $${amount}`);
    }
    // Need to modify this class every time we add a new payment method!
  }
}
```

**Good Example:**
```javascript
// Base class
class Payment {
  process(amount) {
    throw new Error('process() must be implemented');
  }
}

// Extend for new payment types
class CreditCardPayment extends Payment {
  process(amount) {
    console.log(`Processing credit card payment: $${amount}`);
  }
}

class PayPalPayment extends Payment {
  process(amount) {
    console.log(`Processing PayPal payment: $${amount}`);
  }
}

class CryptoPayment extends Payment {
  process(amount) {
    console.log(`Processing crypto payment: $${amount}`);
  }
}

// No need to modify existing code when adding new payment methods!
```

## 3. **L - Liskov Substitution Principle (LSP)**
*Subtypes must be substitutable for their base types.*

Child classes should work anywhere the parent class works, without breaking things.

**Bad Example:**
```javascript
class Bird {
  fly() {
    console.log('Flying...');
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!"); // Breaks the contract!
  }
}

function makeBirdFly(bird) {
  bird.fly(); // This will crash if bird is a Penguin
}
```

**Good Example:**
```javascript
class Bird {
  move() {
    console.log('Moving...');
  }
}

class Sparrow extends Bird {
  move() {
    console.log('Flying...');
  }
}

class Penguin extends Bird {
  move() {
    console.log('Swimming...');
  }
}

function makeBirdMove(bird) {
  bird.move(); // Works with any bird!
}
```

## 4. **I - Interface Segregation Principle (ISP)**
*Don't force classes to implement methods they don't need.*

**Bad Example:**
```javascript
class Machine {
  print() {}
  scan() {}
  fax() {}
}

class SimplePrinter extends Machine {
  print() {
    console.log('Printing...');
  }

  scan() {
    throw new Error("This printer can't scan!"); // Forced to implement unused methods
  }

  fax() {
    throw new Error("This printer can't fax!");
  }
}
```

**Good Example:**
```javascript
// Split into smaller, focused interfaces
class Printer {
  print() {
    console.log('Printing...');
  }
}

class Scanner {
  scan() {
    console.log('Scanning...');
  }
}

class SimplePrinter extends Printer {
  // Only implements what it needs
}

class AllInOnePrinter {
  constructor() {
    this.printer = new Printer();
    this.scanner = new Scanner();
  }

  print() {
    this.printer.print();
  }

  scan() {
    this.scanner.scan();
  }
}
```

## 5. **D - Dependency Inversion Principle (DIP)**
*Depend on abstractions, not concrete implementations.*

High-level modules shouldn't depend on low-level modules. Both should depend on abstractions.

**Bad Example:**
```javascript
class MySQLDatabase {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

class UserService {
  constructor() {
    this.database = new MySQLDatabase(); // Tightly coupled to MySQL!
  }

  saveUser(user) {
    this.database.save(user);
  }
}
```

**Good Example:**
```javascript
// Abstraction (interface-like)
class Database {
  save(data) {
    throw new Error('save() must be implemented');
  }
}

class MySQLDatabase extends Database {
  save(data) {
    console.log('Saving to MySQL:', data);
  }
}

class MongoDatabase extends Database {
  save(data) {
    console.log('Saving to MongoDB:', data);
  }
}

class UserService {
  constructor(database) { // Inject the dependency!
    this.database = database;
  }

  saveUser(user) {
    this.database.save(user);
  }
}

// Now we can easily swap databases
const service1 = new UserService(new MySQLDatabase());
const service2 = new UserService(new MongoDatabase());
```

## Quick Summary

- **S**: One class, one job
- **O**: Add new features without changing old code
- **L**: Child classes should work like their parents
- **I**: Don't force unused methods on classes
- **D**: Depend on abstractions, inject dependencies

These principles help you write code that's easier to test, maintain, and extend!
