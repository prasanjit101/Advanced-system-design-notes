# 🏗️ Creational Patterns

Creational patterns provide object creation mechanisms that increase flexibility and reuse of existing code. These patterns abstract the instantiation process and make the system independent of how objects are created, composed, and represented.

## Singleton Pattern

The Singleton pattern ensures a class has only one instance and provides a global point of access to it.

**When to Use:**
- When you need exactly one instance of a class
- When you want a global access point to that instance
- Examples: Database connections, logging services, configuration objects

```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    // Initialize the database connection here
    this.connection = "Connected to Database";
    DatabaseConnection.instance = this;
    return this;
  }
  
  query(sql) {
    console.log(`Executing query: ${sql}`);
  }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
console.log(db1 === db2); // true - same instance
```

## Factory Method Pattern

The Factory Method pattern defines an interface for creating an object but lets subclasses alter the type of objects that will be created.

**When to Use:**
- When you don't know beforehand the exact types of objects to create
- When you want to delegate to subclasses the creation of objects
- Examples: UI component libraries, different notification services

```javascript
class Button {
  render() {
    throw new Error("Render method must be implemented");
  }
}

class WindowsButton extends Button {
  render() {
    console.log("Rendering a Windows button");
  }
}

class MacButton extends Button {
  render() {
    console.log("Rendering a Mac button");
  }
}

// Factory Method
class ButtonFactory {
  createButton(os) {
    if (os === "Windows") {
      return new WindowsButton();
    } else if (os === "Mac") {
      return new MacButton();
    } else {
      throw new Error("Unknown OS");
    }
  }
}

// Usage
const factory = new ButtonFactory();
const winButton = factory.createButton("Windows");
const macButton = factory.createButton("Mac");

winButton.render(); // "Rendering a Windows button"
macButton.render(); // "Rendering a Mac button"
```

## Abstract Factory Pattern

The Abstract Factory provides an interface for creating families of related objects without specifying their concrete classes.

**When to Use:**
- When you need to create objects that belong to families of related products
- When you want to guarantee compatibility between products created by the same factory
- Examples: UI themes, different database drivers for different OS

```javascript
// Abstract Factory Interface
class GUIFactory {
  createButton() {
    throw new Error("createButton method must be implemented");
  }
  
  createCheckbox() {
    throw new Error("createCheckbox method must be implemented");
  }
}

// Concrete Factories
class WindowsFactory extends GUIFactory {
  createButton() {
    return new WindowsButton();
  }
  
  createCheckbox() {
    return new WindowsCheckbox();
  }
}

class MacFactory extends GUIFactory {
  createButton() {
    return new MacButton();
  }
  
  createCheckbox() {
    return new MacCheckbox();
  }
}

// Abstract Products
class Button {
  render() {
    throw new Error("Render method must be implemented");
  }
}

class Checkbox {
  render() {
    throw new Error("Render method must be implemented");
  }
}

// Concrete Products
class WindowsButton extends Button {
  render() {
    console.log("Rendering Windows button");
  }
}

class MacButton extends Button {
  render() {
    console.log("Rendering Mac button");
  }
}

class WindowsCheckbox extends Checkbox {
  render() {
    console.log("Rendering Windows checkbox");
  }
}

class MacCheckbox extends Checkbox {
  render() {
    console.log("Rendering Mac checkbox");
  }
}

// Client code
function clientCode(factory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();
  
  button.render();
  checkbox.render();
}

// Usage
const winFactory = new WindowsFactory();
const macFactory = new MacFactory();

clientCode(winFactory); // Windows UI
clientCode(macFactory); // Mac UI
```

## Builder Pattern

The Builder pattern constructs complex objects step by step, allowing you to create different types and representations of an object using the same construction process.

**When to Use:**
- When you need to create complex objects with many optional components
- When you want to ensure objects are created in a valid state
- When you need different representations of an object
- Examples: Query builders, HTML document builders, SQL builders

```javascript
class User {
  constructor() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.age = 0;
    this.phone = "";
  }
}

class UserBuilder {
  constructor() {
    this.user = new User();
  }
  
  setFirstName(firstName) {
    this.user.firstName = firstName;
    return this; // Return this for method chaining
  }
  
  setLastName(lastName) {
    this.user.lastName = lastName;
    return this;
  }
  
  setEmail(email) {
    this.user.email = email;
    return this;
  }
  
  setAge(age) {
    this.user.age = age;
    return this;
  }
  
  setPhone(phone) {
    this.user.phone = phone;
    return this;
  }
  
  build() {
    return this.user;
  }
}

// Usage
const user = new UserBuilder()
  .setFirstName("John")
  .setLastName("Doe")
  .setEmail("john.doe@example.com")
  .setAge(30)
  .build();

console.log(user);
// Output: {firstName: "John", lastName: "Doe", email: "john.doe@example.com", age: 30, phone: ""}
```

## Prototype Pattern

The Prototype pattern specifies the kinds of objects to create using a prototypical instance and creates new objects by copying this prototype.

**When to Use:**
- When the cost of creating a new object is expensive or complex
- When you want to avoid subclassing to create objects
- When instances of a class can have one of only a few different combinations of state
- Examples: Game objects with predefined templates, cloning complex data structures

```javascript
class Car {
  constructor(make, model, year, features = []) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.features = features;
  }
  
  clone() {
    // Deep clone the object to avoid reference issues
    return new Car(
      this.make,
      this.model,
      this.year,
      [...this.features] // Shallow clone of the features array
    );
  }
  
  addFeature(feature) {
    this.features.push(feature);
  }
  
  display() {
    console.log(`Car: ${this.year} ${this.make} ${this.model}`);
    console.log(`Features: ${this.features.join(", ")}`);
  }
}

// Usage
const baseCar = new Car("Toyota", "Camry", 2022, ["AC", "Power Windows"]);

// Clone the car and modify as needed
const upgradedCar = baseCar.clone();
upgradedCar.addFeature("Leather Seats");
upgradedCar.addFeature("Sunroof");

baseCar.display(); // Original features
upgradedCar.display(); // With additional features
```

## Summary

Creational patterns help manage object creation in a controlled and flexible manner:
- **Singleton**: Ensures one instance exists
- **Factory Method**: Delegates object creation to subclasses
- **Abstract Factory**: Creates families of related objects
- **Builder**: Constructs complex objects step by step
- **Prototype**: Creates new objects by copying existing ones

These patterns promote loose coupling by reducing dependencies on concrete classes in your code.