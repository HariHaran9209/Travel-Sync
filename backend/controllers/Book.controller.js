import Book from '../models/Book.model.js'
import Package from '../models/Package.model.js'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend = 'http://localhost:5173'

const placeBooking = async (req, res) => {
    try {
        const newBook = new Book({
            userId: req.userId,
            packages: req.body.packages, // [{ packageId, name, date, peopleCount, price }]
            totalAmount: Number(req.body.totalAmount),
            contactDetails: req.body.contactDetails,
            address: req.body.address, // <-- this must be present
        })

        await newBook.save()

        const line_items = req.body.packages.map(pkg => {
            const price = Number(pkg.pricePerPerson);
            const qty = Number(pkg.numberOfPeople);

            if (isNaN(price) || isNaN(qty)) {
                throw new Error(`Invalid pricePerPerson or numberOfPeople for package: ${JSON.stringify(pkg)}`);
            }

            return {
                price_data: {
                currency: "inr",
                product_data: {
                    name: pkg.packageName
                },
                unit_amount: price * 100
                },
                quantity: qty
            }
            });



        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${frontend}/verify?success=true&bookingId=${newBook._id}`,
            cancel_url: `${frontend}/verify?success=false&bookingId=${newBook._id}`
        })

        res.status(200).json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}`})
    }
}

const verifyBooking = async (req, res) => {
    const { bookingId, success } = req.body
    try {
        if (success || success === 'true') {
            await Book.findByIdAndUpdate(bookingId, { payment: true })
            res.status(200).json({ success: true, message: 'Booking Confirmed' })
        } else {
            await Book.findByIdAndDelete(bookingId)
            res.status(500).json({ success: false, message: 'Booking Cancelled' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}`})
    }
}

const userBookings = async (req, res) => {
    try {
        const bookings = await Book.find({ userId: req.userId })
        res.status(200).json({ success: true, data: bookings })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}` })
    }
}

const listBookings = async (req, res) => {
    try {
        const bookings = await Book.find({}).populate('packages.packageId')
        res.status(200).json({ success: true, data: bookings })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}`})
    }
}

const updateBookingStatus = async (req, res) => {
    try {
        await Book.findByIdAndUpdate(req.body.bookingId, { status: req.body.status })
        res.status(200).json({ success: true, message: `Status Updated` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}`})
    }
}

export { placeBooking, verifyBooking, userBookings, listBookings, updateBookingStatus }