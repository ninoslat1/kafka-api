import dotenv from 'dotenv'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express'
import { createServer } from 'http';
import { router } from '../routers/route.js';
import cors from 'cors'
import compression from 'compression'
import { initProducer, stopProducer } from '../utils/producer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

export const app = express()
export const server = createServer(app)

app.use(cors(), express.json(), express.urlencoded({extended: true}), router, compression({level: 2}))

server.listen(process.env.EXPRESS_PORT, async () => {
    console.log(`Running on port ${process.env.EXPRESS_PORT}`)
    await initProducer()
})

const shutdown = async () => {
    console.log("\n[SHUTDOWN] Cleaning up")
    await stopProducer()
    process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)

