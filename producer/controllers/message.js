/// <reference path="../types/kafka_types.js" />

import { producer } from "../utils/producer.js"
import { createKafkaMessage } from "../templates/templates.js"
import {HttpStatus} from '../utils/status.js'

const MAX_RETRIES = 5;
const BASE_DELAY_MS = 1000;

export const SendMessage = async (req, res) => {
    /**
     * @param {KafkaMessage} overrides
     * @returns {string} 
     */
    const { name, msg } = req.body

    try {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
              await producer.send({
                topic: process.env.TOPIC_NAME,
                messages: [{ value: createKafkaMessage({ name, msg}) }],
              });
              console.log(`[Producer] Message sent on attempt ${attempt}`);
              return;
            } catch (error) {
              console.error(`[Producer] Failed to send message (Attempt ${attempt}):`, error.message);
        
              if (attempt === MAX_RETRIES) {
                throw new Error(`[Producer] Max retries reached. Message not sent.`);
              }
        
              const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
              console.log(`[Producer] Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay))
            }
          }
    
        res.status(HttpStatus.OK).send({message: `Message for topic ${process.env.TOPIC_NAME} sent!`}).json();
    } catch (err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            error: "Failed to send Kafka message after multiple attempts.",
            detail: err.message,
          });
    }
}