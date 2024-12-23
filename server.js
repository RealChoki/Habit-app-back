require('dotenv').config();
const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')

const mongoUri = process.env.MONGODB_URI;
// const mongoUri = 'mongodb://localhost:27017/habit-app'

fastify.register(require('fastify-jwt'), {
  secret: process.env.JWT_SECRET
});

// MongoDB connection
mongoose.connect(mongoUri)
  .then(() => fastify.log.info('MongoDB connected'))
  .catch(err => fastify.log.error(err))

fastify.decorate('authenticate', async (request, reply) => {
  try {
    await request.jwtVerify(); // Verifies the JWT token from the Authorization header
  } catch (err) {
    reply.send(err); // Respond with an error if token verification fails
  }
});

// Register your routes here
const userRoutes = require('./routes/userRoutes')
const habitRoutes = require('./routes/habitRoutes')
const dailyHabitRoutes = require('./routes/dailyHabitRoutes')

fastify.register(userRoutes)
fastify.register(habitRoutes)
fastify.register(dailyHabitRoutes)

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 5000 })
    fastify.log.info(`Server listening on port 5000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
