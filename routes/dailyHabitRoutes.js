const DailyHabit = require('../models/DailyHabit')

async function dailyHabitsRoutes(fastify, options) {
  // Middleware to check if user ID and habit ID are valid
  const validateIds = async (request, reply) => {
    const { userId, habitId } = request.body
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return reply.status(400).send({ message: 'Invalid user ID format.' })
    }
    if (!mongoose.Types.ObjectId.isValid(habitId)) {
      return reply.status(400).send({ message: 'Invalid habit ID format.' })
    }
  }

  // Create a new Daily Habit
  fastify.post('/daily-habits', { preHandler: validateIds }, async (request, reply) => {
    try {
      const dailyHabit = new DailyHabit({
        userId: request.body.userId,
        habitId: request.body.habitId,
        timestamp: request.body.timestamp || new Date(),
        completed: request.body.completed || false,
        count: request.body.count,
        goal: request.body.goal,
        subtype: request.body.subtype,
        currentTime: request.body.currentTime,
        initialTime: request.body.initialTime,
        timerInterval: request.body.timerInterval
      })

      await dailyHabit.save()
      reply.status(201).send(dailyHabit)
    } catch (error) {
      reply.status(500).send({ message: 'Error creating daily habit', error })
    }
  })

  // Get Daily Habit via ID
  fastify.get('/daily-habits/:dailyHabitId', async (request, reply) => {
    try {
      const dailyHabitId = request.params.dailyHabitId

      const dailyHabit = await DailyHabit.findById(dailyHabitId)

      if (!dailyHabit) {
        return reply.status(404).send({ message: 'Daily Habit not found' })
      }

      reply.status(200).send(dailyHabit)
    } catch (error) {
      console.error('Error fetching daily habit:', error)
      reply.status(500).send({ message: 'Error fetching daily habit', error: error.message })
    }
  })

  // Update a Daily Habit by ID
  fastify.put('/daily-habits/:id', async (request, reply) => {
    try {
      const updatedDailyHabit = await DailyHabit.findByIdAndUpdate(request.params.id, request.body, { new: true })

      if (!updatedDailyHabit) {
        return reply.status(404).send({ message: 'Daily Habit not found' })
      }

      reply.status(200).send(updatedDailyHabit)
    } catch (error) {
      reply.status(500).send({ message: 'Error updating daily habit', error })
    }
  })

  // Delete a Daily Habit by ID
  fastify.delete('/daily-habits/:id', async (request, reply) => {
    const { id } = request.params
    try {
      const deletedDailyHabit = await DailyHabit.findByIdAndDelete(id)

      if (!deletedDailyHabit) {
        return reply.status(404).send({ message: 'Daily Habit not found' })
      }

      return reply.send({ message: 'Daily Habit deleted successfully' })
    } catch (error) {
      console.error('Error deleting daily habit:', error)
      return reply.status(500).send({ message: 'Error deleting daily habit', error: error.message })
    }
  })

  // Fetch multiple Daily Habits by their IDs using GET and query parameters
  fastify.get('/daily-habits/bulk-fetch', async (request, reply) => {
    try {
      const habitIdsParam = request.query.habitIds

      if (!habitIdsParam) {
        return reply.status(400).send({ message: 'habitIds query parameter is required.' })
      }

      const habitIdsArray = habitIdsParam.split(',').map((id) => id.trim())
      console.log('Received habit IDs:', habitIdsArray)

      const dailyHabits = await DailyHabit.find({ _id: { $in: habitIdsArray } })
      reply.status(200).send(dailyHabits)
    } catch (error) {
      console.error('Error fetching daily habits by IDs:', error)
      reply.status(500).send({ message: 'Error fetching daily habits by IDs', error: error.message })
    }
  })
}

module.exports = dailyHabitsRoutes
