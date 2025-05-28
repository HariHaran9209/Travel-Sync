import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    packages: [
        {
            packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
            packageName: { type: String, required: true },
            travelDate: { type: Date, required: true },
            numberOfPeople: { type: Number, required: true },
            pricePerPerson: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: false },
    address: {type: Object, required: true},
    status: {type: String, default: "Pending"},
    payment: {type: Boolean, default: false}
}, { timestamps: true })

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema)

export default Book