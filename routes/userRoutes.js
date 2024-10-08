const User = require('../models/User');
const bcrypt = require('bcrypt');

// Importing schemas
const createUserParams = require('../schemas/createUserParams.json');
const getUserParams = require('../schemas/getUserParams.json');

async function userRoutes(fastify, options) {

  // Register a new user
  fastify.post('/users/register', {
    schema: {
      body: createUserParams
    }
  }, async (request, reply) => {
    const { name, username, email, password } = request.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword
      });

      const savedUser = await newUser.save();
      return reply.status(201).send(savedUser);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });

  // Get all users
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await User.find();
      return reply.send(users);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Get a user by ID
  fastify.get('/users/id/:id', {
    schema: {
      params: getUserParams
    }
  }, async (request, reply) => {
    try {
      const user = await User.findOne({ id: request.params.id });
      if (!user) return reply.status(404).send({ message: 'User not found' });
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  fastify.get('/users/username/:username', 
    async (request, reply) => {
    try {
      const user = await User.findOne({ username: request.params.username });
      if (!user) return reply.status(404).send({ message: 'User not found' });
      return reply.send(user);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Update a user
  fastify.put('/users/:id', {
    schema: {
      params: getUserParams,
      body: createUserParams
    }
  }, async (request, reply) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
      return reply.send(updatedUser);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });

  // Delete a user
  fastify.delete('/users/:id', {
    schema: {
      params: getUserParams
    }
  }, async (request, reply) => {
    try {
      await User.findByIdAndDelete(request.params.id);
      return reply.send({ message: 'User deleted' });
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}

module.exports = userRoutes;
