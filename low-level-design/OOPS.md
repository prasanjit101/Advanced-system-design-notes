# Object-Oriented Programming (OOP) Principles

## 1. **Encapsulation**
*"Bundling data and methods together, hiding internal details"*

Think of it like a TV remote - you press buttons without knowing the complex circuitry inside.

```javascript
class BankAccount {
  #balance = 0; // Private field (# makes it private)

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(`Deposited $${amount}`);
    }
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.#balance); // ❌ Error! Can't access private field
```

**Why?** You can't accidentally mess with the balance directly - you must use the methods provided.

---

## 2. **Abstraction**
*"Showing only essential features, hiding complexity"*

Like driving a car - you use steering wheel and pedals, not worrying about engine mechanics.

```javascript
class CoffeeMachine {
  #boilWater() {
    console.log("Boiling water...");
  }

  #grindBeans() {
    console.log("Grinding beans...");
  }

  #brew() {
    console.log("Brewing...");
  }

  // Simple interface - hides complex steps
  makeCoffee() {
    this.#boilWater();
    this.#grindBeans();
    this.#brew();
    console.log("☕ Coffee ready!");
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee(); // Just one simple method!
```

---

## 3. **Inheritance**
*"Child classes inherit properties from parent classes"*

Like how a child inherits traits from parents.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks: Woof!`);
  }

  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this.name} meows: Meow!`);
  }
}

const dog = new Dog("Buddy");
dog.speak(); // Buddy barks: Woof!
dog.fetch(); // Buddy fetches the ball

const cat = new Cat("Whiskers");
cat.speak(); // Whiskers meows: Meow!
```

**Why?** Avoid repeating code. Both Dog and Cat share common Animal properties.

---

## 4. **Polymorphism**
*"Same interface, different implementations"*

Like how both a guitar and piano are "played" but in different ways.

```javascript
class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

// Same method name, different behavior
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Circle(3)
];

shapes.forEach(shape => {
  console.log(`Area: ${shape.area()}`);
});
// Area: 78.54
// Area: 24
// Area: 28.27
```

**Why?** You can treat different objects uniformly - just call `area()` without worrying about what specific shape it is.

---

## Real-World Combined Example

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }

  start() {
    console.log(`${this.brand} is starting...`);
  }
}

class Car extends Vehicle {
  #fuel = 100;

  start() {
    if (this.#fuel > 0) {
      super.start();
      console.log("Engine running!");
    } else {
      console.log("Out of fuel!");
    }
  }

  drive() {
    this.#fuel -= 10;
    console.log(`Driving... Fuel: ${this.#fuel}%`);
  }
}

class ElectricCar extends Vehicle {
  #battery = 100;

  start() {
    super.start();
    console.log("Silent electric start!");
  }

  drive() {
    this.#battery -= 5;
    console.log(`Driving silently... Battery: ${this.#battery}%`);
  }
}

const tesla = new ElectricCar("Tesla");
const toyota = new Car("Toyota");

tesla.start();
tesla.drive();

toyota.start();
toyota.drive();
```

**Summary:**
- **Encapsulation**: Fuel and battery are private
- **Abstraction**: Simple `start()` and `drive()` methods
- **Inheritance**: Car and ElectricCar inherit from Vehicle
- **Polymorphism**: Both have `start()` and `drive()` but work differently
