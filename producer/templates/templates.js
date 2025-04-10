/// <reference path="../types/kafka_types.js" />
import { v4 as uuidv4 } from 'uuid'

/**
 * @param {KafkaMessage} overrides
 * @returns {string} 
 */

export const createKafkaMessage = (overrides = {}) => {
    return JSON.stringify({
      id: overrides.id || uuidv4(),
      timestamp: overrides.timestamp || Date.now(),
      name: overrides.name || "Anonymous",
      msg: overrides.msg || "Hello!",
    });
  }