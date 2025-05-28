import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: { 
            type: [
                {
                    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
                    travelDate: { type: Date, required: true },
                    numberOfPeople: { type: Number, required: true }
                }]},
            default: []
}, { timestamps: true, minimize: false })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User