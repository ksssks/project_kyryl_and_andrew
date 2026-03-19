import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import logger from './config/logger.js'
import { exec } from "child_process"
import mongoose from "mongoose"
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares 
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// health check (dependency-aware)
app.get('/health', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping()

    return res.status(200).json({
      status: "OK",
      db: "connected"
    })
  } catch (error) {
    return res.status(503).json({
      status: "ERROR",
      db: "disconnected"
    })
  }
})

app.get('/', (req, res) => {
    res.send("API Working")
})

await new Promise((resolve, reject) => {
  exec("npx migrate-mongo up", (err, stdout, stderr) => {
    if (err) {
      logger.error("Migration failed")
      reject(err)
    } else {
      logger.info("Migrations applied")
      resolve()
    }
  })
})


let server
server = app.listen(port, () => {
  logger.info(`Server started on port: ${port}`)
})

// graceful shutdown
const shutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`)

  try {
    if (server) {
      server.close(() => {
        logger.info("HTTP server closed")
      })
    }

    await mongoose.connection.close()
    logger.info("DB connection closed")

    process.exit(0)
  } catch (err) {
    logger.error({ message: "Error during shutdown", err })
    process.exit(1)
  }
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)

export default app;