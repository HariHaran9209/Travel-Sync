import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log(`DB Connected Successfuly`)
    } catch (error) {
        console.error(`Error While Connecting DB: ${error}`)
    }
}