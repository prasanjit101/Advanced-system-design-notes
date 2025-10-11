# Chapter 2: Fundamental Concepts and Metrics

## Key System Design Metrics

Understanding the fundamental metrics of system design is crucial for building efficient, scalable systems. These metrics help us measure and reason about system performance, reliability, and user experience.

## Latency

**Definition**: Latency is the time it takes for a request to travel from the client to the server and back. It measures the delay between sending a request and receiving a response.

**Simple Explanation**: Think of latency as the "wait time" – how long you have to wait before you see any result after making a request.

**Real-world Example**: 
- When you click on a website link, latency is the time between clicking and seeing the first byte of the webpage
- On a video call, latency is the delay between when someone speaks and when you hear it
- In a gaming context, latency determines how quickly your actions are registered in the game

**Measurement**: Usually measured in milliseconds (ms)
- Excellent: < 50ms
- Good: 50-100ms
- Acceptable: 100-250ms
- Poor: > 250ms

## Throughput

**Definition**: Throughput is the number of requests a system can process in a given time period, typically measured in requests per second (RPS) or transactions per second (TPS).

**Simple Explanation**: Throughput measures how much work a system can do in a given time. It's like asking "How many customers can this restaurant serve per hour?"

**Real-world Example**:
- An e-commerce website that processes 10,000 orders per second during Black Friday
- A social media platform serving 500,000 posts per minute during a major event
- A payment processing system handling 1,000 transactions per second

**Measurement**: Requests per second, transactions per second, operations per second

## Availability

**Definition**: Availability is the percentage of time a system is operational and accessible when required. It's expressed as a percentage of uptime over total time.

**Simple Explanation**: Availability tells you how often a system is "up" and working. If a system is 99% available, it means it's down about 8 hours per year.

**Availability Levels**:
- 99% ("Two nines"): 3.65 days downtime per year
- 99.9% ("Three nines"): 8.76 hours downtime per year
- 99.99% ("Four nines"): 52.6 minutes downtime per year
- 99.999% ("Five nines"): 5.26 minutes downtime per year

**Real-world Example**:
- Amazon AWS promises 99.99% availability for its S3 storage service
- Google Search aims for 99.99% availability (only about 5 minutes of downtime per year)
- A banking system might require 99.999% availability during business hours

## Reliability

**Definition**: Reliability is the probability that a system will perform its intended function without failure over a specified period under stated conditions.

**Simple Explanation**: Reliability is about consistent, predictable behavior. A reliable system doesn't just work when it's up – it works correctly consistently.

**Real-world Example**:
- A navigation app that consistently provides accurate directions 99.9% of the time
- A database that doesn't lose data during normal operations
- An email service that delivers messages correctly every time

**Measurement**: Often expressed as Mean Time Between Failures (MTBF)
- MTBF = Total uptime / Number of failures

## Scalability

**Definition**: Scalability is the capability of a system to handle a growing amount of work by adding resources to the system.

**Simple Explanation**: Scalability means a system can grow to handle more users, data, or requests without degrading performance.

**Types of Scalability**:
- **Horizontal Scaling (Scale-out)**: Adding more machines to the resource pool
- **Vertical Scaling (Scale-up)**: Adding more power (CPU, RAM) to an existing machine

**Real-world Example**:
- Netflix automatically adds more servers during peak viewing hours
- Instagram scales its image processing systems during major events when photo uploads spike
- A ride-sharing app adds more instances during rush hour

**Measurement**: How performance metrics change as load increases
- Linear scalability: Performance increases proportionally with resources
- Sub-linear scalability: Performance increases less than proportionally with resources

## Consistency

**Definition**: Consistency refers to the guarantee that all nodes in a distributed system see the same data at the same time. It's one part of the CAP theorem (Consistency, Availability, Partition tolerance).

**Simple Explanation**: If you update data in one place, consistency ensures that update is immediately visible everywhere else in the system.

**Types of Consistency**:
- **Strong Consistency**: All nodes see the same data at the same time
- **Eventual Consistency**: All nodes will eventually see the same data, but not immediately
- **Causal Consistency**: If one event potentially causes another, the system maintains the order

**Real-world Example**:
- Bank account balance: You need strong consistency - when you deposit money, the balance should update immediately everywhere
- Social media posts: Eventual consistency is acceptable - it's okay if your new post takes a few seconds to show up for other users

## Durability

**Definition**: Durability is the guarantee that once a transaction has been committed, it will remain committed even in case of system failures.

**Simple Explanation**: Durability ensures that data won't be lost once it's saved. It's "permanent" storage - your data stays there even if the system crashes.

**Real-world Example**:
- A bank transaction: Once completed, it must remain in the records permanently
- Photo uploads: Once uploaded, photos must remain accessible even if the server crashes
- Email sent: The sent email must be permanently stored on the server

**Measurement**: Usually measured as the probability that data will survive a system failure
- Often expressed as number of 9s (99.9999% durability = 6 nines)

## Measuring and Monitoring Metrics

To properly manage these metrics, systems need to implement monitoring:

```mermaid
graph LR
    A[Application] --> B[Metrics Collection]
    B --> C[Monitoring System]
    C --> D[Alerts Dashboard]
    D --> E[Operations Team]
    E --> F[Response Actions]
```

**Key Monitoring Practices**:
1. **Set Baselines**: Understand normal performance patterns
2. **Create Alerts**: Get notified when metrics exceed thresholds
3. **Track Trends**: Monitor how metrics change over time
4. **Correlate Events**: Understand how system changes affect metrics

## Trade-offs Between Metrics

Understanding the relationships between these metrics is crucial:

- **Latency vs. Throughput**: Often, optimizing for low latency can reduce throughput, and vice versa
- **Consistency vs. Availability**: The CAP theorem states you can't have all three (Consistency, Availability, Partition tolerance) simultaneously
- **Reliability vs. Cost**: Higher reliability often requires more redundancy and therefore higher costs

## Conclusion

These fundamental metrics form the foundation of system design. Understanding them allows you to:
- Make informed decisions about system architecture
- Set appropriate performance goals
- Identify bottlenecks when they arise
- Balance trade-offs effectively

The key is to understand which metrics matter most for your specific use case and design your system accordingly. Different applications have different priorities - a financial trading system prioritizes low latency, while a backup system prioritizes durability.