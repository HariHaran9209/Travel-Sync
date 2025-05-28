import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers

    if (!token) {
        return res.status(401).json({ success: false, message: `No token provided` })
    }
    
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id
        next()
    } catch (error) {
        console.log(`JWT Verification failed: ${error}`)
        return res.status(401).json({ success: false, message: `Invalid Or Expired Token`})
    }
}

export default authMiddleware