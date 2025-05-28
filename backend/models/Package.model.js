import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    pricePerPerson: { type: Number, required: true },
    durationDays: { type: Number },
    images: [{ type: String }],
}, { timestamps: true })

const Package = mongoose.models.Package || mongoose.model('Package', packageSchema)

export default Package