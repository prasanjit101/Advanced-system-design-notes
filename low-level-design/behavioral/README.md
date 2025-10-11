# 🔄 Behavioral Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects. They describe not just patterns of objects or classes but also the patterns of communication between them. These patterns characterize complex control flow that's difficult to follow at runtime.

## Iterator Pattern

The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It's one of the most commonly used patterns.

**When to Use:**
- To access an aggregate object's contents without exposing its internal representation
- To support multiple traversals of aggregate objects
- To provide a uniform interface for traversing different aggregate structures

```javascript
class NumberCollection {
  constructor() {
    this.numbers = [];
  }
  
  addNumber(number) {
    this.numbers.push(number);
  }
  
  // Create an iterator for this collection
  createIterator() {
    return new NumberIterator(this.numbers);
  }
}

class NumberIterator {
  constructor(numbers) {
    this.numbers = numbers;
    this.position = 0;
  }
  
  hasNext() {
    return this.position < this.numbers.length;
  }
  
  next() {
    if (this.hasNext()) {
      return this.numbers[this.position++];
    }
    return null;
  }
  
  reset() {
    this.position = 0;
  }
}

// Usage
const collection = new NumberCollection();
collection.addNumber(1);
collection.addNumber(2);
collection.addNumber(3);

const iterator = collection.createIterator();

console.log("Iterating through collection:");
while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Output: 1, 2, 3

iterator.reset();
console.log("Iterating again:");
for (let i = 0; i < 2; i++) {
  if (iterator.hasNext()) {
    console.log(iterator.next());
  }
}
```

## Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically. This is also known as the Publish-Subscribe pattern.

**When to Use:**
- When an abstraction has two aspects that depend on each other
- When one object changes, other objects should be notified
- When you want to create a mechanism that can notify multiple objects without making them tightly coupled

```javascript
// Observer interface
class Observer {
  update(subject) {
    throw new Error("Update method must be implemented");
  }
}

// Subject interface
class Subject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify() {
    this.observers.forEach(observer => observer.update(this));
  }
}

// Concrete subject
class NewsAgency extends Subject {
  constructor() {
    super();
    this.news = "";
  }
  
  setNews(news) {
    this.news = news;
    this.notify();
  }
  
  getNews() {
    return this.news;
  }
}

// Concrete observers
class NewsChannel extends Observer {
  constructor(name) {
    super();
    this.name = name;
    this.news = "";
  }
  
  update(subject) {
    this.news = subject.getNews();
    console.log(`${this.name} received news: ${this.news}`);
  }
}

// Usage
const agency = new NewsAgency();
const cnn = new NewsChannel("CNN");
const bbc = new NewsChannel("BBC");

agency.attach(cnn);
agency.attach(bbc);

agency.setNews("New JavaScript framework released!");
// Output:
// CNN received news: New JavaScript framework released!
// BBC received news: New JavaScript framework released!

agency.detach(bbc);
agency.setNews("Stock market rises!");
// Output: Only CNN receives the news
```

## Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

**When to Use:**
- When you have multiple related algorithms
- When you need to switch between algorithms during runtime
- When you want to avoid conditional statements for different behaviors

```javascript
// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error("Pay method must be implemented");
  }
}

// Concrete strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(name, cardNumber, cvv, dateOfExpiry) {
    super();
    this.name = name;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.dateOfExpiry = dateOfExpiry;
  }
  
  pay(amount) {
    console.log(`${amount} paid with credit/debit card`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  
  pay(amount) {
    console.log(`${amount} paid using PayPal`);
  }
}

class BitcoinStrategy extends PaymentStrategy {
  constructor(walletId, password) {
    super();
    this.walletId = walletId;
    this.password = password;
  }
  
  pay(amount) {
    console.log(`${amount} paid using Bitcoin`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
  
  pay(paymentStrategy) {
    const amount = this.calculateTotal();
    paymentStrategy.pay(amount);
  }
}

// Item class
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem(new Item("Laptop", 500));
cart.addItem(new Item("Mouse", 20));

const creditCard = new CreditCardStrategy("John Doe", "123456789", "123", "12/25");
const paypal = new PayPalStrategy("john@example.com", "password");

cart.pay(creditCard); // 520 paid with credit/debit card
cart.pay(paypal);    // 520 paid using PayPal
```

## Command Pattern

The Command pattern turns a request into a stand-alone object that contains all information about the request. This transformation allows you to parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.

**When to Use:**
- When you want to parameterize objects with operations
- When you want to specify, queue, and execute requests at different times
- When you want to support undo/redo operations
- When you want to log changes that need to be redone in case of a system crash

```javascript
// Command interface
class Command {
  execute() {
    throw new Error("Execute method must be implemented");
  }
  
  undo() {
    throw new Error("Undo method must be implemented");
  }
}

// Receiver
class Light {
  constructor(name) {
    this.name = name;
    this.isOn = false;
  }
  
  turnOn() {
    this.isOn = true;
    console.log(`${this.name} light is ON`);
  }
  
  turnOff() {
    this.isOn = false;
    console.log(`${this.name} light is OFF`);
  }
}

// Concrete commands
class TurnOnLightCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOn();
  }
  
  undo() {
    this.light.turnOff();
  }
}

class TurnOffLightCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() {
    this.light.turnOff();
  }
  
  undo() {
    this.light.turnOn();
  }
}

// Invoker
class Switch {
  constructor() {
    this.history = [];
  }
  
  storeAndExecute(command) {
    this.history.push(command);
    command.execute();
  }
  
  undoLast() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
    }
  }
}

// Usage
const livingRoomLight = new Light("Living Room");
const kitchenLight = new Light("Kitchen");

const switch1 = new Switch();
const switch2 = new Switch();

const turnOnLivingRoomLight = new TurnOnLightCommand(livingRoomLight);
const turnOffLivingRoomLight = new TurnOffLightCommand(livingRoomLight);
const turnOnKitchenLight = new TurnOnLightCommand(kitchenLight);

switch1.storeAndExecute(turnOnLivingRoomLight); // Living Room light is ON
switch2.storeAndExecute(turnOnKitchenLight);    // Kitchen light is ON
switch1.storeAndExecute(turnOffLivingRoomLight); // Living Room light is OFF

switch1.undoLast(); // Undo: Living Room light is ON again
```

## State Pattern

The State pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class. This pattern is useful when an object's behavior depends on its state and must change its behavior at runtime based on that state.

**When to Use:**
- When an object's behavior depends on its state
- When operations have large conditional statements that depend on the object's state
- When state-specific code is scattered across multiple operations

```javascript
// State interface
class State {
  handle(context) {
    throw new Error("Handle method must be implemented");
  }
}

// Concrete states
class ReadyState extends State {
  handle(context) {
    console.log("Player is ready to play");
    context.setState(new PlayingState());
  }
}

class PlayingState extends State {
  handle(context) {
    console.log("Player is currently playing");
    context.setState(new PausedState());
  }
}

class PausedState extends State {
  handle(context) {
    console.log("Player is paused");
    context.setState(new ReadyState());
  }
}

class StoppedState extends State {
  handle(context) {
    console.log("Player is stopped");
    context.setState(new ReadyState());
  }
}

// Context
class Player {
  constructor() {
    this.state = new ReadyState();
  }
  
  setState(state) {
    this.state = state;
  }
  
  getState() {
    return this.state;
  }
  
  pressPlay() {
    this.state.handle(this);
  }
  
  pressStop() {
    if (!(this.state instanceof StoppedState)) {
      console.log("Player stopped");
      this.setState(new StoppedState());
    } else {
      console.log("Player already stopped");
    }
  }
}

// Usage
const player = new Player();

player.pressPlay(); // Player is ready to play -> Player is currently playing
player.pressPlay(); // Player is currently playing -> Player is paused
player.pressPlay(); // Player is paused -> Player is ready to play
player.pressStop(); // Player stopped
player.pressPlay(); // Player is ready to play -> Player is currently playing
```

## Template Method Pattern

The Template Method pattern defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure. It's a behavioral pattern that allows you to define the basic steps of an algorithm and allow subclasses to provide implementations for one or more steps.

**When to Use:**
- When you want to let clients extend only particular steps of an algorithm
- When you have several classes that have common behavior
- When you want to control where specialization occurs in the algorithm

```javascript
// Abstract class with template method
class Game {
  // Template method - defines the algorithm skeleton
  play() {
    this.initialize();
    this.startPlay();
    this.endPlay();
  }
  
  initialize() {
    throw new Error("Initialize method must be implemented");
  }
  
  startPlay() {
    throw new Error("StartPlay method must be implemented");
  }
  
  endPlay() {
    throw new Error("EndPlay method must be implemented");
  }
}

// Concrete classes
class Cricket extends Game {
  initialize() {
    console.log("Cricket Game Initialized! Start playing.");
  }
  
  startPlay() {
    console.log("Cricket Game Started. Enjoy the game!");
  }
  
  endPlay() {
    console.log("Cricket Game Finished!");
  }
}

class Football extends Game {
  initialize() {
    console.log("Football Game Initialized! Start playing.");
  }
  
  startPlay() {
    console.log("Football Game Started. Enjoy the game!");
  }
  
  endPlay() {
    console.log("Football Game Finished!");
  }
}

// Usage
const cricket = new Cricket();
cricket.play();
// Output: 
// Cricket Game Initialized! Start playing.
// Cricket Game Started. Enjoy the game!
// Cricket Game Finished!

const football = new Football();
football.play();
// Output:
// Football Game Initialized! Start playing.
// Football Game Started. Enjoy the game!
// Football Game Finished!
```

## Visitor Pattern

The Visitor pattern allows you to separate algorithms from the objects on which they operate. It's useful when you have a relatively stable object structure but you want to perform new operations on these objects.

**When to Use:**
- When you need to perform an operation on all elements of a complex object structure
- When you want to define new operations on these objects without changing their classes
- When the classes of the elements rarely change, but you often need to add new operations

```javascript
// Visitor interface
class Visitor {
  visitElementA(element) {
    throw new Error("visitElementA must be implemented");
  }
  
  visitElementB(element) {
    throw new Error("visitElementB must be implemented");
  }
}

// Element interface
class Element {
  accept(visitor) {
    throw new Error("Accept method must be implemented");
  }
}

// Concrete elements
class ElementA extends Element {
  name = "Element A";
  
  accept(visitor) {
    visitor.visitElementA(this);
  }
}

class ElementB extends Element {
  name = "Element B";
  
  accept(visitor) {
    visitor.visitElementB(this);
  }
}

// Concrete visitors
class ConcreteVisitor1 extends Visitor {
  visitElementA(element) {
    console.log(`ConcreteVisitor1: Processing ${element.name}`);
  }
  
  visitElementB(element) {
    console.log(`ConcreteVisitor1: Processing ${element.name}`);
  }
}

class ConcreteVisitor2 extends Visitor {
  visitElementA(element) {
    console.log(`ConcreteVisitor2: Analyzing ${element.name}`);
  }
  
  visitElementB(element) {
    console.log(`ConcreteVisitor2: Analyzing ${element.name}`);
  }
}

// Object structure
class ObjectStructure {
  constructor() {
    this.elements = [];
  }
  
  add(element) {
    this.elements.push(element);
  }
  
  accept(visitor) {
    this.elements.forEach(element => element.accept(visitor));
  }
}

// Usage
const objectStructure = new ObjectStructure();
objectStructure.add(new ElementA());
objectStructure.add(new ElementB());

const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();

objectStructure.accept(visitor1);
// Output: 
// ConcreteVisitor1: Processing Element A
// ConcreteVisitor1: Processing Element B

objectStructure.accept(visitor2);
// Output:
// ConcreteVisitor2: Analyzing Element A
// ConcreteVisitor2: Analyzing Element B
```

## Mediator Pattern

The Mediator pattern defines how a set of objects interact with each other. Instead of objects communicating directly, they communicate through a mediator object, which reduces the dependencies between communicating objects.

**When to Use:**
- When it's difficult to change some of the classes because they are tightly coupled to others
- When you want to reuse an object in a different context
- When you need to manage complex interactions between related objects

```javascript
// Mediator interface
class ChatRoom {
  showMessage(user, message) {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} [${user.getName()}]: ${message}`);
  }
}

class User {
  constructor(name, chatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }
  
  getName() {
    return this.name;
  }
  
  sendMessage(message) {
    this.chatRoom.showMessage(this, message);
  }
}

// Usage
const chatRoom = new ChatRoom();
const john = new User("John", chatRoom);
const jane = new User("Jane", chatRoom);

john.sendMessage("Hi there!");
// Output: 09:05:23 [John]: Hi there!

jane.sendMessage("Hello John!");
// Output: 09:05:24 [Jane]: Hello John!
```

## Memento Pattern

The Memento pattern captures and externalizes an object's internal state without violating encapsulation so that the object can be restored to this state later. It's commonly used for implementing undo mechanisms.

**When to Use:**
- When you need to implement undo/redo functionality
- When you want to save and restore the state of an object
- When you need to capture an object's state without breaking encapsulation

```javascript
// Memento
class EditorMemento {
  constructor(content) {
    this.content = content;
  }
  
  getContent() {
    return this.content;
  }
}

// Originator
class Editor {
  constructor() {
    this.content = "";
  }
  
  type(words) {
    this.content = this.content + " " + words;
  }
  
  getContent() {
    return this.content;
  }
  
  save() {
    return new EditorMemento(this.content);
  }
  
  restore(memento) {
    this.content = memento.getContent();
  }
}

// Caretaker
class EditorHistory {
  constructor() {
    this.mementos = [];
  }
  
  push(memento) {
    this.mementos.push(memento);
  }
  
  pop() {
    if (this.mementos.length === 0) {
      return null;
    }
    
    const memento = this.mementos.pop();
    return memento;
  }
  
  isEmpty() {
    return this.mementos.length === 0;
  }
}

// Usage
const editor = new Editor();
const history = new EditorHistory();

editor.type("This is the first sentence.");
history.push(editor.save());

editor.type("This is the second sentence.");
history.push(editor.save());

editor.type("This is the third sentence.");

console.log(editor.getContent()); // Current content with all sentences

editor.restore(history.pop()); // Undo third sentence
console.log(editor.getContent()); // Content with first and second sentences

editor.restore(history.pop()); // Undo second sentence
console.log(editor.getContent()); // Content with only first sentence
```

## Chain of Responsibility Pattern

The Chain of Responsibility pattern passes requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

**When to Use:**
- When you want to process objects with multiple handlers
- When you don't want the request sender to know which handler will process the request
- When you need to process different requests in different ways

```javascript
// Handler interface
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }
  
  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// Concrete handlers
class MonkeyHandler extends Handler {
  handle(request) {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends Handler {
  handle(request) {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

class DogHandler extends Handler {
  handle(request) {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}`;
    }
    return super.handle(request);
  }
}

// Usage
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log(monkey.handle("Nut"));      // Squirrel: I'll eat the Nut
console.log(monkey.handle("MeatBall")); // Dog: I'll eat the MeatBall
console.log(monkey.handle("Banana"));   // Monkey: I'll eat the Banana
console.log(monkey.handle("Cup of coffee")); // Returns null, no handler found
```

## Summary

Behavioral patterns describe communication patterns between objects:
- **Iterator**: Access elements of an aggregate object sequentially
- **Observer**: Define one-to-many dependency so state changes trigger notifications
- **Strategy**: Define algorithms, encapsulate each, and make them interchangeable
- **Command**: Encapsulate request as an object to support undo/redo operations
- **State**: Allow object to change behavior when internal state changes
- **Template Method**: Define algorithm skeleton in superclass with customizable steps
- **Visitor**: Separate algorithms from object structure they operate on
- **Mediator**: Define how objects interact to reduce dependencies
- **Memento**: Capture object state for later restoration without breaking encapsulation
- **Chain of Responsibility**: Pass requests along chain of handlers

These patterns are crucial for creating well-structured, maintainable, and extensible code.