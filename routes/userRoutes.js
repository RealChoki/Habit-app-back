const User = require('../models/User')
const DailyHabit = require('../models/DailyHabit')
const Habit = require('../models/Habit')
const bcrypt = require('bcrypt')

// Importing schemas
const createUserParams = require('../schemas/createUserParams.json')
const getUserByIDParams = require('../schemas/getUserByIDParams.json')
const getUserByUsernameParams = require('../schemas/getUserByUsernameParams.json')
const updateUserBodySchema = require('../schemas/updateUserBodySchema.json')

async function userRoutes(fastify, options) {
  // Register a new user
  fastify.post(
    '/users/register',
    {
      schema: {
        body: createUserParams
      }
    },
    async (request, reply) => {
      const { name, username, email, password } = request.body

      try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
          name,
          username,
          email,
          password: hashedPassword
        })

        const savedUser = await newUser.save()
        return reply.status(201).send({ success: true, data: savedUser })
      } catch (error) {
        return reply.status(400).send({ success: false, message: error.message })
      }
    }
  )

  // Get all users
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await User.find().lean()
      return reply.send({ success: true, data: users })
    } catch (error) {
      return reply.status(500).send({ success: false, message: error.message })
    }
  })

  // Get a user by MongoDB _id
  fastify.get(
    '/users/id/:id',
    {
      schema: {
        params: getUserByIDParams
      }
    },
    async (request, reply) => {
      try {
        const user = await User.findById(request.params.id).lean()

        if (!user) {
          return reply.status(404).send({ success: false, message: 'User not found' })
        }

        return reply.send({ success: true, data: user })
      } catch (error) {
        return reply.status(500).send({ success: false, message: error.message })
      }
    }
  )

  // Get a user by username
  fastify.get(
    '/users/username/:username',
    {
      schema: {
        params: getUserByUsernameParams
      }
    },
    async (request, reply) => {
      try {
        const user = await User.findOne({ username: request.params.username }).lean()

        if (!user) {
          return reply.status(404).send({ success: false, message: 'User not found' })
        }

        return reply.send({ success: true, data: user })
      } catch (error) {
        return reply.status(500).send({ success: false, message: error.message })
      }
    }
  )

  // Update a user by MongoDB _id
  fastify.put(
    '/users/:id',
    {
      schema: {
        params: getUserByIDParams,
        body: updateUserBodySchema
      }
    },
    async (request, reply) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body, {
          new: true,
          lean: true
        })

        if (!updatedUser) {
          return reply.status(404).send({ success: false, message: 'User not found' })
        }

        return reply.send({ success: true, data: updatedUser })
      } catch (error) {
        return reply.status(400).send({ success: false, message: error.message })
      }
    }
  )

  // Delete a user by MongoDB _id
  fastify.delete(
    '/users/:id',
    {
      schema: {
        params: getUserByIDParams
      }
    },
    async (request, reply) => {
      try {
        const userId = request.params.id;
  
        // Step 1: Find the user and their habits
        const user = await User.findById(userId).populate('habits.habitId');
  
        if (!user) {
          return reply.status(404).send({ success: false, message: 'User not found' });
        }
  
        // Step 2: Collect habit IDs to delete
        const habitIds = user.habits.map(habit => habit.habitId);
  
        // Step 3: Delete Daily Habits associated with these habits
        await DailyHabit.deleteMany({ habitId: { $in: habitIds } });
  
        // Step 4: Delete the Habits themselves
        await Habit.deleteMany({ _id: { $in: habitIds } });
  
        // Step 5: Delete the User
        const deletedUser = await User.findByIdAndDelete(userId);
  
        return reply.send({ success: true, message: 'User and associated habits deleted' });
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ success: false, message: error.message });
      }
    }
  );
  

  // Login route
  fastify.post('/users/login', async (request, reply) => {
    const { username, password } = request.body

    try {
      const user = await User.findOne({ username }).lean()

      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        return reply.status(401).send({ success: false, message: 'Invalid credentials' })
      }

      return reply.send({ success: true, message: 'Login successful', user })
    } catch (error) {
      return reply.status(500).send({ success: false, message: error.message })
    }
  })
}

module.exports = userRoutes
