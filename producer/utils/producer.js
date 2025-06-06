import { Kafka } from 'kafkajs'
import dotenv from 'dotenv'
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const kafka = new Kafka({
  clientId: 'node-producer',
  brokers: [process.env.KAFKA_BROKER],
});

export const producer = kafka.producer();

export const initProducer = async () => {
  try {
    await producer.connect()
    console.log("[KAFKA] Producer connected")
  } catch (err){
    console.error("[KAFKA] Failed to connect producer. Reason: ", err)
  }
}

export const stopProducer = async () => {
  try {
    await producer.disconnect()
    console.log("[KAFKA] Producer disconnected")
  } catch (err){
    console.error("[KAFKA] Failed to disconnect producer. Reason: ", err)
  }
}

