const Habit = require('../models/Habit');
const User = require('../models/User');
const { createDailyHabits, deleteDailyHabits } = require('../service/habitService');

// Importing schemas
const createHabitSchema = require('../data/schemas/habit/createHabitSchema.json');
const getHabitSchema = require('../data/schemas/habit/getHabitSchema.json');
const userIdParamSchema = require('../data/schemas/user/userIdParamSchema.json');
async function habitRoutes(fastify, options) {

  // Helper function for error handling
  const handleError = (reply, error, statusCode = 400) => reply.status(statusCode).send({ message: error.message });

  // POST /users/:userId/habits - Create a new habit (protected)
  fastify.post(
    '/users/:userId/habits',
    {
      schema: {
        params: userIdParamSchema,
        body: createHabitSchema
      },
      preHandler: fastify.authenticate // Protect this route
    },
    async (request, reply) => {
      console.log(`Received request for userId: ${request.params.userId}`);
      console.log("Received body:", request.body);
      const { userId } = request.params;

      try {
        const user = await User.findById(userId);
        if (!user) return reply.status(404).send({ message: 'User not found' });

        const newHabit = new Habit(request.body);
        const savedHabit = await newHabit.save();

        user.habits.push(savedHabit._id);
        await user.save();
        await createDailyHabits(savedHabit, userId);
        
        return reply.status(201).send(savedHabit);
      } catch (error) {
        handleError(reply, error);
      }
    }
  );

  // GET /habits - Get all habits (protected)
  fastify.get('/habits', { preHandler: fastify.authenticate }, async (request, reply) => {
    try {
      const habits = await Habit.find();
      return reply.send(habits);
    } catch (error) {
      handleError(reply, error, 500);
    }
  });

  // GET /habits/user/:userId - Get all habits by user ID (protected)
  fastify.get('/habits/user/:userId', { preHandler: fastify.authenticate }, async (request, reply) => {
    try {
      // Find the user by userId
      const user = await User.findById(request.params.userId);
      
      if (!user) {
        return reply.status(404).send({ message: 'User not found' });
      }
      
      // Now, fetch all habits based on the habit IDs stored in the user's `habits` array
      const habits = await Habit.find({ _id: { $in: user.habits } });
  
      return reply.send(habits);  // Send the array of habit documents
    } catch (error) {
      console.error('Error fetching habits:', error);
      handleError(reply, error, 500);
    }
  });

  // GET /habits/:habitId - Get a habit by ID (protected)
  fastify.get('/habits/:habitId', { preHandler: fastify.authenticate }, async (request, reply) => {
    try {
      const habit = await Habit.findById(request.params.habitId);
      if (!habit) return reply.status(404).send({ message: 'Habit not found' });
      return reply.send(habit);
    } catch (error) {
      handleError(reply, error, 500);
    }
  });

  // PUT /habits/:habitId - Update a habit (protected)
  fastify.put(
    '/habits/:habitId',
    {
      schema: {
        params: getHabitSchema,
        body: createHabitSchema
      },
      preHandler: fastify.authenticate // Protect this route
    },
    async (request, reply) => {
      try {
        const updatedHabit = await Habit.findByIdAndUpdate(request.params.habitId, request.body, { new: true });
        return reply.send(updatedHabit);
      } catch (error) {
        handleError(reply, error);
      }
    }
  );

  // DELETE /habits/:habitId - Delete a habit (protected)
  fastify.delete(
    '/habits/:habitId',
    {
      schema: {
        params: getHabitSchema
      },
      preHandler: fastify.authenticate // Protect this route
    },
    async (request, reply) => {
      try {
        await Habit.findByIdAndDelete(request.params.habitId);
        await deleteDailyHabits(request.params.habitId);
        return reply.send({ message: 'Habit deleted' });
      } catch (error) {
        handleError(reply, error, 500);
      }
    }
  );
}

module.exports = habitRoutes;
