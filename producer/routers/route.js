import express from 'express'
import { SendMessage } from '../controllers/message.js'

export const router = express.Router()

router.post("/message", SendMessage)