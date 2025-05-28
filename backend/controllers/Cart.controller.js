import User from '../models/User.model.js'

const addToCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId

        let userData = await User.findOne(userId)
        if (!userData) {
            return res.json({ success: false, message: `User Not Found` })
        }
        
        let cartData = userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await User.findByIdAndUpdate(userId, { cartData })

        res.status(200).json({ success: true, message: `Added To Cart`})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Error Server: ${error}`})
    }
}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        
        let userData = await User.findOne(userId)
        if (!userData) {
            return res.json({ success: false, message: `User Not Found` })
        }

        let cartData = await userData.cartData

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await User.findByIdAndUpdate(userId, { cartData })

        res.status(200).json({ success: true, message: `Removed From Cart` })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Internal Server Error: ${error}`})
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.userId || req.body.userId
        let userData = await User.findOne({ userId })
        let cartData = userData.cartData
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, message: `Error: ${error}`})
    }
}

export { addToCart, removeFromCart, getCart }