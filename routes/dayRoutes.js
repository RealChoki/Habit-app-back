const DayData = require('../models/Day')
const User = require('../models/User')

async function dayDataRoutes(fastify, options) {

  // Create new day data for a user
  fastify.post('/users/:userId/daydata', async (request, reply) => {
    const { userId } = request.params

    try {
      const user = await User.findById(userId)
      if (!user) return reply.status(404).send({ message: 'User not found' })

      const newDayData = new DayData(request.body)
      const savedDayData = await newDayData.save()

      return reply.status(201).send(savedDayData)
    } catch (error) {
      return reply.status(400).send({ message: error.message })
    }
  })

  // Get all day data for a user
  fastify.get('/users/:userId/daydata', async (request, reply) => {
    try {
      const dayData = await DayData.find({ userId: request.params.userId })
      return reply.send(dayData)
    } catch (error) {
      return reply.status(500).send({ message: error.message })
    }
  })

  // Get specific day data by ID
  fastify.get('/daydata/:dayDataId', async (request, reply) => {
    try {
      const dayData = await DayData.findById(request.params.dayDataId)
      if (!dayData) return reply.status(404).send({ message: 'Day data not found' })
      return reply.send(dayData)
    } catch (error) {
      return reply.status(500).send({ message: error.message })
    }
  })
}

module.exports = dayDataRoutes
