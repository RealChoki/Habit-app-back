const User = require('../models/User')
const bcrypt = require('bcrypt')

// Importing schemas
const createUserParams = require('../schemas/createUserParams.json')
const getUserByIDParams = require('../schemas/getUserByIDParams.json')
const getUserByUsernameParams = require('../schemas/getUserByUsernameParams.json')

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
      const { id, name, username, email, password } = request.body

      try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
          id, // Use your custom id
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

  // Define a helper function to find a user by any field
  async function findUserByField(field, value, reply) {
    try {
      const query = {}
      query[field] = value
      const user = await User.findOne(query).lean()

      if (!user) {
        return reply.status(404).send({ success: false, message: 'User not found' })
      }

      return reply.send({ success: true, data: user })
    } catch (error) {
      return reply.status(500).send({ success: false, message: error.message })
    }
  }

  // Get a user by custom ID (your `id` field)
  fastify.get(
    '/users/id/:id',
    {
      schema: {
        params: getUserByIDParams
      }
    },
    async (request, reply) => {
      return findUserByField('id', request.params.id, reply)
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
      return findUserByField('username', request.params.username, reply)
    }
  )

  // Update a user (use your custom `id` field)
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
        const updatedUser = await User.findOneAndUpdate({ id: request.params.id }, request.body, {
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

  // Delete a user by custom `id`
  fastify.delete(
    '/users/:id',
    {
      schema: {
        params: getUserByIDParams
      }
    },
    async (request, reply) => {
      try {
        const deletedUser = await User.findOneAndDelete({ id: request.params.id })

        if (!deletedUser) {
          return reply.status(404).send({ success: false, message: 'User not found' })
        }

        return reply.send({ success: true, message: 'User deleted' })
      } catch (error) {
        return reply.status(500).send({ success: false, message: error.message })
      }
    }
  )
}

module.exports = userRoutes
