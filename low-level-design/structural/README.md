# 🧱 Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient. They focus on how objects are composed to form larger structures, using inheritance and composition to create bigger structures from individual parts.

## Adapter Pattern

The Adapter pattern allows objects with incompatible interfaces to collaborate. It converts the interface of a class into another interface that clients expect.

**When to Use:**
- When you want to use an existing class but its interface doesn't match what you need
- When you want to create a reusable class that cooperates with unrelated classes
- When you need to work with multiple subclasses that don't implement a common interface

```javascript
// Target interface
class MediaPlayer {
  play(audioType, fileName) {
    throw new Error("Play method must be implemented");
  }
}

// Adaptee - the class that needs adaptation
class AdvancedMediaPlayer {
  playVlc(fileName) {
    console.log(`Playing VLC file: ${fileName}`);
  }
  
  playMp4(fileName) {
    console.log(`Playing MP4 file: ${fileName}`);
  }
}

// Concrete adapter
class MediaAdapter extends MediaPlayer {
  constructor(audioType) {
    super();
    if (audioType === "vlc") {
      this.advancedPlayer = new AdvancedMediaPlayer();
    } else if (audioType === "mp4") {
      this.advancedPlayer = new AdvancedMediaPlayer();
    }
  }
  
  play(audioType, fileName) {
    if (audioType === "vlc") {
      this.advancedPlayer.playVlc(fileName);
    } else if (audioType === "mp4") {
      this.advancedPlayer.playMp4(fileName);
    }
  }
}

// Concrete implementation
class AudioPlayer extends MediaPlayer {
  play(audioType, fileName) {
    if (audioType === "mp3") {
      console.log(`Playing MP3 file: ${fileName}`);
    } else if (audioType === "vlc" || audioType === "mp4") {
      const mediaAdapter = new MediaAdapter(audioType);
      mediaAdapter.play(audioType, fileName);
    } else {
      console.log(`Invalid media type: ${audioType}`);
    }
  }
}

// Usage
const audioPlayer = new AudioPlayer();
audioPlayer.play("mp3", "song.mp3");    // Native support
audioPlayer.play("vlc", "movie.vlc");  // Adapted support
audioPlayer.play("mp4", "video.mp4");  // Adapted support
```

## Bridge Pattern

The Bridge pattern separates abstraction from implementation so that the two can vary independently. This pattern involves an interface which acts as a bridge between abstraction and implementation.

**When to Use:**
- When you want to avoid permanent binding between abstraction and its implementation
- When both the abstractions and implementations should be extensible by subtyping
- When you need to share an implementation among multiple objects

```javascript
// Implementor interface
class DrawAPI {
  drawCircle(radius, x, y) {
    throw new Error("drawCircle method must be implemented");
  }
}

// Concrete implementations
class RedCircle extends DrawAPI {
  drawCircle(radius, x, y) {
    console.log(`Drawing Circle[ color: red, radius: ${radius}, x: ${x}, y: ${y}]`);
  }
}

class GreenCircle extends DrawAPI {
  drawCircle(radius, x, y) {
    console.log(`Drawing Circle[ color: green, radius: ${radius}, x: ${x}, y: ${y}]`);
  }
}

// Abstraction
class Shape {
  constructor(drawAPI) {
    this.drawAPI = drawAPI;
  }
  
  draw() {
    throw new Error("Draw method must be implemented");
  }
}

// Refined abstraction
class Circle extends Shape {
  constructor(x, y, radius, drawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  
  draw() {
    this.drawAPI.drawCircle(this.radius, this.x, this.y);
  }
}

// Usage
const redCircle = new Circle(100, 100, 10, new RedCircle());
const greenCircle = new Circle(100, 100, 10, new GreenCircle());

redCircle.draw();   // Drawing Circle[ color: red, radius: 10, x: 100, y: 100]
greenCircle.draw(); // Drawing Circle[ color: green, radius: 10, x: 100, y: 100]
```

## Composite Pattern

The Composite pattern allows you to compose objects into tree structures to represent part-whole hierarchies. This pattern creates a class that contains a group of its own objects.

**When to Use:**
- When you want to represent part-whole hierarchies of objects
- When you want clients to be able to ignore the difference between compositions of objects and individual objects
- Examples: UI components, file systems, organization structures

```javascript
// Component interface
class Employee {
  constructor(name, dept, salary) {
    this.name = name;
    this.dept = dept;
    this.salary = salary;
    this.subordinates = [];
  }
  
  add(employee) {
    this.subordinates.push(employee);
  }
  
  remove(employee) {
    const index = this.subordinates.indexOf(employee);
    if (index > -1) {
      this.subordinates.splice(index, 1);
    }
  }
  
  getSubordinates() {
    return this.subordinates;
  }
  
  toString() {
    return `Employee: [Name: ${this.name}, Dept: ${this.dept}, Salary: ${this.salary}]`;
  }
}

// Usage
const CEO = new Employee("John", "CEO", 30000);

const headSales = new Employee("Robert", "Head Sales", 20000);
const headMarketing = new Employee("Michel", "Head Marketing", 20000);

const clerk1 = new Employee("Laura", "Marketing", 10000);
const clerk2 = new Employee("Bob", "Marketing", 10000);
const salesExecutive1 = new Employee("Richard", "Sales", 10000);
const salesExecutive2 = new Employee("Rob", "Sales", 10000);

CEO.add(headSales);
CEO.add(headMarketing);

headSales.add(salesExecutive1);
headSales.add(salesExecutive2);

headMarketing.add(clerk1);
headMarketing.add(clerk2);

// Print the organizational structure
console.log(CEO.toString());
for (let headEmployee of CEO.getSubordinates()) {
  console.log("  " + headEmployee.toString());
  for (let employee of headEmployee.getSubordinates()) {
    console.log("    " + employee.toString());
  }
}
```

## Decorator Pattern

The Decorator pattern attaches additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.

**When to Use:**
- When you want to add responsibilities to individual objects dynamically and transparently
- When you need to be able to remove the added responsibilities
- When subclassing would result in a proliferation of classes

```javascript
// Component interface
class Coffee {
  cost() {
    throw new Error("Cost method must be implemented");
  }
  
  description() {
    throw new Error("Description method must be implemented");
  }
}

// Concrete component
class SimpleCoffee extends Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return "Simple coffee";
  }
}

// Decorator base class
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost();
  }
  
  description() {
    return this.coffee.description();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ", milk";
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ", sugar";
  }
}

class WhipDecorator extends CoffeeDecorator {
  cost() {
    return this.coffee.cost() + 3;
  }
  
  description() {
    return this.coffee.description() + ", whip";
  }
}

// Usage
let coffee = new SimpleCoffee();
console.log(`${coffee.description()}: $${coffee.cost()}`); // Simple coffee: $5

coffee = new MilkDecorator(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`); // Simple coffee, milk: $7

coffee = new SugarDecorator(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`); // Simple coffee, milk, sugar: $8

coffee = new WhipDecorator(coffee);
console.log(`${coffee.description()}: $${coffee.cost()}`); // Simple coffee, milk, sugar, whip: $11
```

## Facade Pattern

The Facade pattern provides a simplified interface to a complex subsystem. It hides the complexities of the system and provides an interface to the client from which the client can access the system.

**When to Use:**
- When you want to provide a simple interface to a complex subsystem
- When there are many dependencies between clients and the implementation classes
- When you want to layer your subsystems

```javascript
// Subsystem classes
class CPU {
  freeze() {
    console.log("CPU: Freezing processor");
  }
  
  jump(position) {
    console.log(`CPU: Jumping to position ${position}`);
  }
  
  execute() {
    console.log("CPU: Executing instructions");
  }
}

class Memory {
  load(position, data) {
    console.log(`Memory: Loading ${data} at ${position}`);
    return data;
  }
}

class HardDrive {
  read(lba, size) {
    console.log(`HardDrive: Reading ${size} bytes from LBA ${lba}`);
    return "BOOT_DATA";
  }
}

// Facade
class ComputerFacade {
  constructor() {
    this.cpu = new CPU();
    this.memory = new Memory();
    this.hardDrive = new HardDrive();
  }
  
  start() {
    console.log("Starting computer...");
    this.cpu.freeze();
    this.memory.load(0, this.hardDrive.read(0, 1024));
    this.cpu.jump(0);
    this.cpu.execute();
    console.log("Computer started successfully!");
  }
}

// Usage
const computer = new ComputerFacade();
computer.start();
```

## Flyweight Pattern

The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects. It's useful when you need to create many similar objects.

**When to Use:**
- When your application needs to create a large number of similar objects
- When you want to reduce memory usage and increase performance
- When many objects share similar state that can be made external

```javascript
// Flyweight class
class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }
  
  draw(canvas, x, y) {
    console.log(`Drawing ${this.name} tree at (${x}, ${y}) with color ${this.color}`);
  }
}

// Flyweight factory
class TreeFactory {
  constructor() {
    this.treeTypes = [];
  }
  
  getTreeType(name, color, texture) {
    let type = this.treeTypes.find(t => 
      t.name === name && t.color === color && t.texture === texture
    );
    
    if (!type) {
      type = new TreeType(name, color, texture);
      this.treeTypes.push(type);
    }
    
    return type;
  }
}

// Context class
class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  draw(canvas) {
    this.type.draw(canvas, this.x, this.y);
  }
}

// Client
class Forest {
  constructor() {
    this.trees = [];
    this.treeFactory = new TreeFactory();
  }
  
  plantTree(x, y, name, color, texture) {
    const type = this.treeFactory.getTreeType(name, color, texture);
    this.trees.push(new Tree(x, y, type));
  }
  
  draw(canvas) {
    this.trees.forEach(tree => tree.draw(canvas));
  }
}

// Usage
const forest = new Forest();
forest.plantTree(1, 1, "Oak", "green", "rough");
forest.plantTree(2, 2, "Pine", "darkgreen", "smooth");
forest.plantTree(3, 3, "Oak", "green", "rough"); // Reuses the same Oak type

forest.draw("canvas");
```

## Proxy Pattern

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. There are several types of proxies: virtual, remote, protective, and smart references.

**When to Use:**
- When you want to add a wrapper and delegation to protect the real component from undue complexity
- When you need to control access to the original object
- When you want to provide additional functionality when accessing an object

```javascript
// Subject interface
class Image {
  display() {
    throw new Error("Display method must be implemented");
  }
}

// Real subject
class RealImage extends Image {
  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.loadFromDisk();
  }
  
  loadFromDisk() {
    console.log(`Loading ${this.fileName}`);
  }
  
  display() {
    console.log(`Displaying ${this.fileName}`);
  }
}

// Proxy
class ProxyImage extends Image {
  constructor(fileName) {
    super();
    this.fileName = fileName;
    this.realImage = null;
  }
  
  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName);
    }
    this.realImage.display();
  }
}

// Usage
const image = new ProxyImage("photo.jpg");

// Image will not be loaded from disk yet
image.display(); // Loading photo.jpg, then Displaying photo.jpg
image.display(); // Displaying photo.jpg (no loading this time)
```

## Summary

Structural patterns help organize class and object relationships:
- **Adapter**: Makes incompatible interfaces work together
- **Bridge**: Separates abstraction from implementation
- **Composite**: Treats individual objects and compositions uniformly
- **Decorator**: Adds responsibilities to objects dynamically
- **Facade**: Provides simple interface to complex subsystem
- **Flyweight**: Shares common parts of objects to save memory
- **Proxy**: Controls access to an object

These patterns help create more flexible and maintainable code structures.