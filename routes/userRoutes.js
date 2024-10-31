const User = require('../models/User')
const DailyHabit = require('../models/DailyHabit')
const Habit = require('../models/Habit')
const bcrypt = require('bcrypt')

// Importing schemas
const createUserSchema = require('../data/schemas/user/createUserSchema.json')
const getUserByIDSchema = require('../data/schemas/user/getUserByIDSchema.json')
const getUserByUsernameSchema = require('../data/schemas/user/getUserByUsernameSchema.json')
const updateUserBodySchema = require('../data/schemas/user/updateUserBodySchema.json')

async function userRoutes(fastify, options) {
  const handleResponse = (reply, success, dataOrMessage) => {
    const response = { success, ...(!success && { message: dataOrMessage }) }
    if (success) response.data = dataOrMessage
    return reply.send(response)
  }

  // Register a new user
  fastify.post('/users/register', { schema: { body: createUserSchema } }, async (request, reply) => {
    const { name, username, email, password } = request.body
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ name, username, email, password: hashedPassword })
      const savedUser = await newUser.save()
      return handleResponse(reply, true, savedUser)
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })

  // Get all users
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await User.find().lean()
      return handleResponse(reply, true, users)
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })

  // Get a user by MongoDB _id
  fastify.get('/users/id/:id', { schema: { params: getUserByIDSchema } }, async (request, reply) => {
    try {
      const user = await User.findById(request.params.id).lean()
      return user ? handleResponse(reply, true, user) : handleResponse(reply, false, 'User not found')
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })

  // Get a user by username
  fastify.get('/users/username/:username', { schema: { params: getUserByUsernameSchema } }, async (request, reply) => {
    try {
      const user = await User.findOne({ username: request.params.username }).lean()
      return user ? handleResponse(reply, true, user) : handleResponse(reply, false, 'User not found')
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })

  // Update a user by MongoDB _id
  fastify.put(
    '/users/:id',
    { schema: { params: getUserByIDSchema, body: updateUserBodySchema } },
    async (request, reply) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, lean: true })
        return updatedUser ? handleResponse(reply, true, updatedUser) : handleResponse(reply, false, 'User not found')
      } catch (error) {
        return handleResponse(reply, false, error.message)
      }
    }
  )

  // Delete a user by MongoDB _id
  fastify.delete('/users/:id', { schema: { params: getUserByIDSchema } }, async (request, reply) => {
    try {
      const userId = request.params.id
      const user = await User.findById(userId).populate('habits.habitId')
      if (!user) return handleResponse(reply, false, 'User not found')

      const habitIds = user.habits.map((habit) => habit.habitId)
      await DailyHabit.deleteMany({ habitId: { $in: habitIds } })
      await Habit.deleteMany({ _id: { $in: habitIds } })
      await User.findByIdAndDelete(userId)

      return handleResponse(reply, true, 'User and associated habits deleted')
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })

  // Login route
  fastify.post('/users/login', async (request, reply) => {
    const { username, password } = request.body
    try {
      const user = await User.findOne({ username }).lean()
      if (!user) return handleResponse(reply, false, 'User not found')

      const isPasswordValid = await bcrypt.compare(password, user.password)
      return isPasswordValid
        ? handleResponse(reply, true, { message: 'Login successful', user })
        : handleResponse(reply, false, 'Invalid credentials')
    } catch (error) {
      return handleResponse(reply, false, error.message)
    }
  })
}

module.exports = userRoutes
