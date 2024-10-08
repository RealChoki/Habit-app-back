const fastifyPlugin = require('fastify-plugin')
const Ajv = require('ajv').default
const ajv = new Ajv()
const validateConfig = ajv.compile(require('../../data/schemas/configSchema.json'))

const logObject = {
  component: 'configPlugin',
  action: 'validate',
  object: 'config'
}

async function configPlugin(app) {
  const config = {
    http: {
      host: 'localhost',
      port: 3000
    },
    mongo: {
      url: 'mongodb://localhost:27017/katretter'
    },
    authorizationPublicKey: 'not-set'
  }

  if (process.env.HTTP_HOST) {
    config.http.host = process.env.HTTP_HOST
  }

  if (process.env.HTTP_PORT) {
    config.http.port = parseInt(process.env.HTTP_PORT)
  }

  if(process.env.MONGO_URL){
    config.mongo.url = process.env.MONGO_URL
  }
  
  if (process.env.AUTHORIZATION_PUBLIC_KEY) {
    config.authorizationPublicKey = process.env.AUTHORIZATION_PUBLIC_KEY
  }

  if (!validateConfig(config)) {
    throw new Error('Failed to validate config. Process will exit. Errors: ' + JSON.stringify(validateConfig.errors))
  }
  logObject.status = 'success'
  app.log.info(logObject, `Successfully validated config. Using config: mongodb.url=${config.mongo.url}`)
  app.decorate('config', config)
}
module.exports = fastifyPlugin(configPlugin)