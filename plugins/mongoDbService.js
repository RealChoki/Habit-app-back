const fastifyPlugin = require('fastify-plugin')

async function mongoPlugin(app) {
  app.register(require('@fastify/mongodb'), { forceClose: true, url: `${app.config.mongo.url}` })
  app.log.info(
    {
      component: 'mongoDbService',
      action: 'process',
      status: 'success',
      object: 'database connection'
    },
    'Mongo connection established.'
  )

  async function getAlarm(alarmID) {
    return app.mongo.db.collection('alarms').findOne({ id: alarmID })
  }

  app.decorate('mongoDbService', {
    getAlarm,
  })
}

module.exports = fastifyPlugin(mongoPlugin)