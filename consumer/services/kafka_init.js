/// <reference path="../types/kafka_types.js" />

import {Kafka} from 'kafkajs'
import dotenv from 'dotenv'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const kafka = new Kafka({
  clientId: 'node-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

export const initKafkaConsumer = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: process.env.TOPIC_NAME, fromBeginning: true })
    await consumer.subscribe({ topic: process.env.ANOTHER_TOPIC_NAME, fromBeginning: true })
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const rawValue = message.value.toString()
  
        try {
          /** @type {KafkaMessage} */
          const data = JSON.parse(rawValue)
  
          if (topic === 'test-topic') {
            console.log(`[Consumer] ${data.name} with ${data.id} says ${data.msg} at ${data.timestamp}`)
          } else if (topic === 'another-test-topic') {
            console.log(`[Consumer] ${message.value.toString()}`)
          }
        } catch (err) {
          console.error('[Consumer] Failed to parse message:', rawValue)
        }
      },
    })
};
