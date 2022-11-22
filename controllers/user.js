import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from '../Models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "Usr Doesnot Exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Somtin Went Wron" })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User Already Exist" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password Doesnot Same" })

        const hashPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" })

        res.json({ result, token })
    } catch (error) {
        res.json({ message:` ${error}` })
    }
}