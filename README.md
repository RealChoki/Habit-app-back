# Fastify-MongoDB Application

This project is a Fastify-based server application integrated with MongoDB using Mongoose. The purpose of this project is to provide a simple, scalable backend that can handle routes related to users, habits, and days. It includes routing for basic CRUD operations and demonstrates how to connect a Fastify application to a MongoDB database.

## Features

- **Fastify Framework**: High-performance Node.js web framework for building fast and low-overhead web servers.
- **MongoDB with Mongoose**: Uses Mongoose to connect and interact with a MongoDB database.
- **Modular Routing**: Separation of routes for different entities (Users, Habits, Days) for better maintainability and scalability.
- **Built-in Logging**: Fastify provides built-in logging capabilities, ensuring better error handling and debugging.

## MongoDB Configuration

The application supports both **local** and **online** MongoDB connections. You can switch between the two by modifying the MongoDB connection string in the `index.js` file or using environment variables.

### 1. MongoDB Connection

To use a MongoDB instance running locally on your machine, set the connection string as:
'mongodb://localhost:27017/habit-app'

## Technologies Used

- **Node.js**: JavaScript runtime environment used for backend server development.
- **Fastify**: Web framework for Node.js focused on speed and low overhead.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **MongoDB**: NoSQL database used for storing and managing data.
- **JavaScript (ES6+)**: Modern JavaScript features are used throughout the codebase.

## Routes Overview

This project includes three main sets of routes:

1. **User Routes**: Handle user-related operations.
2. **Habit Routes**: Manage user habits, tracking them over time.
3. **Day Routes**: Track daily activities, associating them with habits.

Each route file exports a function that Fastify registers as part of the server. This keeps the routing logic modular and clean.

Example route in `userRoutes.js`:

```javascript
// userRoutes.js
async function userRoutes(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    return { message: 'List of users' }
  })
}

module.exports = userRoutes


Mongo data:
User
{
  "_id": { "$oid": "60d5ec49a7211c12345e6abc" },
  "username": "test",
  "email": "test@gmail.com",
  "password": "test",
  "habits": [
    {
      "habitId": { "$oid": "671e3e1f8616eac34564bc81" }
    }
  ]
}

habit
{
        "_id": "671e3e1f8616eac34564bc81",
        "type": "yesno",
        "frequency": "daily",
        "title": "Drink Water",
        "description": "A habit to drink at least 2 liters of water daily.",
        "completed": false,
        "__v": 0
}

daily habit:
{
  "userId": { "$oid": "60d5ec49a7211c12345e6abc" },
  "habitId": { "$oid": "671e3e1f8616eac34564bc81" },
  "timestamp": { "$date": "2024-10-27T00:00:00Z" },
  "completed": false
}

day:
{
  "userId": { "$oid": "60d5ec49a7211c12345e6abc" },
  "timestamp": { "$date": "2024-10-27T00:00:00Z" },
  "dailyHabits": [
    { "$oid": "60d5ec49a7211c12345e6abc" }
  ],
  "completed": false
}