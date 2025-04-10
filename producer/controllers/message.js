/// <reference path="../types/kafka_types.js" />

import { producer } from "../utils/producer.js"
import { createKafkaMessage } from "../templates/templates.js"
import {HttpStatus} from '../utils/status.js'

export const SendMessage = async (req, res) => {
    /**
     * @param {KafkaMessage} overrides
     * @returns {string} 
     */
    const { name, msg } = req.body
    await producer.send({
        topic: process.env.TOPIC_NAME,
        messages: [
            { value: createKafkaMessage({ name, msg}) },
            // { value: createKafkaMessage({ name: "Jane Doe", msg: "Hello there" }) }
          ],
      });

    res.status(HttpStatus.OK).send({message: `Message for topic ${process.env.TOPIC_NAME} sent!`}).json();
}