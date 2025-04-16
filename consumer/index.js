import Fastify from 'fastify'
import { initKafkaConsumer } from "./services/kafka_init.js"

const fastify = Fastify()

const start = async () => {
  try {
    await initKafkaConsumer()

    fastify.get('/', async () => {
      return { status: 'Kafka consumer is running!' }
    })

    await fastify.listen({ port: process.env.EXPRESS_PORT || 3000, host: '0.0.0.0' })
    console.log(`[Fastify] Server running at port ${process.env.EXPRESS_PORT || 3000}`)
  } catch (err) {
    console.error('Failed to start app:', err)
    process.exit(1)
  }
}

start()