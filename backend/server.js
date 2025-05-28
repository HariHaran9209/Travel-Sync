import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './config/db.js'
import userRouter from './routes/User.route.js'
import bookRouter from './routes/Book.route.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/booking', bookRouter)

app.listen(port, () => {
    connectDB()
    console.log(`Backend Server Is Running At http://localhost:${port}`)
})