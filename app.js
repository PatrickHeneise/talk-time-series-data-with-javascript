import Fastify from 'fastify'
import { getDailyOutput, getLastRow } from './lib/queries.js'

const fastify = Fastify({
  logger: true,
})

fastify.get('/last', async (request, reply) => {
  return getLastRow()
})

fastify.get('/daily', async (request, reply) => {
  return getDailyOutput()
})

try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
