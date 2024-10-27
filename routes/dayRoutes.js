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

  fastify.get('/week/:startDate/:endDate', async (request, reply) => {
    const { startDate, endDate } = request.params;
    const { userId } = request.query;
  
    try {
      const user = await User.findById(userId);
      if (!user) return reply.status(404).send({ message: 'User not found' });
  
      // Parse the start and end dates
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Ensure the start date is a Monday and the end date is a Sunday
      start.setDate(start.getDate() - start.getDay() + 1); // Set to Monday
      end.setDate(end.getDate() - end.getDay() + 7); // Set to Sunday
  
      // Fetch existing day data for the week
      const weekData = await DayData.find({
        userId,
        timestamp: {
          $gte: start,
          $lt: end,
        },
      });
  
      // Create day data for missing days
      const existingDays = weekData.map(day => day.timestamp.toISOString().split('T')[0]);
      const createdDays = [];
  
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toISOString().split('T')[0];
        if (!existingDays.includes(formattedDate)) {
          const newDayData = new DayData({
            userId,
            timestamp: d,
            completed: false,
          });
  
          // Check for existing document before saving
          const existingDay = await DayData.findOne({ userId, timestamp: d });
          if (!existingDay) {
            const savedDayData = await newDayData.save();
            createdDays.push(savedDayData);
          }
        }
      }
  
      // Combine existing and newly created day data
      const combinedData = [...weekData, ...createdDays];
      return reply.send(combinedData);
    } catch (error) {
      return reply.status(500).send({ message: error.message });
    }
  });
  
}

module.exports = dayDataRoutes
