import User from '../models/User.model.js'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body
    try {
        const userExists = await User.findOne({ username })
        if (userExists) {
            return res.status(400).json({ success: false, message: `Username Already Taken` })
        }
        
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ success: false, message: `Email Already Registered` })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Enter A Valid Email!" })
        }

        if (password.length<8) {
            return res.status(400).json({ success: false, message: "Enter A Strong Password" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: `Passwords Don't Match Each Other` })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.status(200).json({ success: true, message: `User Created Successfully`, token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: `Error: ${error}` })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ success: false, message: "User Doesn't Error" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        const token = createToken(user._id)
        res.status(200).json({ success: true, message: `User Logged In Successfully`, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: `Error: ${error}` })
    }
}

export { register, login }