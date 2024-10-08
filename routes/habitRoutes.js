const Habit = require('../models/Habit');
const User = require('../models/User');

// Importing schemas
const createHabitParams = require('../schemas/createHabitParams.json');
const getHabitParams = require('../schemas/getHabitParams.json');

async function habitRoutes(fastify, options) {

  // Create a new habit for a user
  fastify.post('/users/:userId/habits', {
    schema: {
      params: {
        type: 'object',
        properties: {
          userId: { type: 'string', minLength: 8 }
        },
        required: ['userId']
      },
      body: createHabitParams
    }
  }, async (request, reply) => {
    const { userId } = request.params;

    try {
      const user = await User.findById(userId);
      if (!user) return reply.status(404).send({ message: 'User not found' });

      const newHabit = new Habit(request.body);
      const savedHabit = await newHabit.save();

      user.habits.push(savedHabit._id);
      await user.save();

      return reply.status(201).send(savedHabit);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });

  // Get all habits
  fastify.get('/habits', async (request, reply) => {
    try {
      const habits = await Habit.find();
      return reply.send(habits);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Get a habit by ID
  fastify.get('/habits/:habitId', {
    schema: {
      params: getHabitParams
    }
  }, async (request, reply) => {
    try {
      const habit = await Habit.findById(request.params.habitId);
      if (!habit) return reply.status(404).send({ message: 'Habit not found' });
      return reply.send(habit);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });

  // Update a habit
  fastify.put('/habits/:habitId', {
    schema: {
      params: getHabitParams,
      body: createHabitParams
    }
  }, async (request, reply) => {
    try {
      const updatedHabit = await Habit.findByIdAndUpdate(request.params.habitId, request.body, { new: true });
      return reply.send(updatedHabit);
    } catch (error) {
      return reply.status(400).send({ message: error.message });
    }
  });

  // Delete a habit
  fastify.delete('/habits/:habitId', {
    schema: {
      params: getHabitParams
    }
  }, async (request, reply) => {
    try {
      await Habit.findByIdAndDelete(request.params.habitId);
      return reply.send({ message: 'Habit deleted' });
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
}

module.exports = habitRoutes;
