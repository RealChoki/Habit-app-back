const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/habit-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => fastify.log.info('MongoDB connected'))
.catch(err => fastify.log.error(err))

// Register your routes here
const userRoutes = require('./routes/userRoutes')
const habitRoutes = require('./routes/habitRoutes')
const dayRoutes = require('./routes/dayRoutes')

fastify.register(userRoutes)
fastify.register(habitRoutes)
fastify.register(dayRoutes)

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
