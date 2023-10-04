//Imported Models
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'

//Importing accessories
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//Function for Generating Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_key, {
        expiresIn: '10d'
    })
}

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body
    try {
        let user = null
        if (role === 'patient') {
            user = await User.findOne({ email })
        }
        else if (role === 'doctor') {
            user = await Doctor.findOne({ email })
        }
        //Check if User Exists
        if (user) {
            return res.status(400).json({ message: 'User Already Exists' })
        }
        //if Not
        const salt = await bcrypt.genSalt(10)
        const hassPassword = await bcrypt.hash(password, salt)
        if (role === 'patient') {
            user = new User({ name, email, password: hassPassword, photo, gender, role })
        }
        if (role === 'doctor') {
            user = new Doctor({ name, email, password: hassPassword, photo, gender, role })
        }
        await user.save()
        res.status(200).json({ success: true, message: 'User Successfully Created' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error, Try Again' })
    }
}

export const login = async (req, res) => {
    const { email } = req.body
    try {
        let user = null
        const patient = await User.findOne({ email })
        const doctor = await Doctor.findOne({ email })
        if (patient) {
            user = patient
        }
        if (doctor) {
            user = doctor
        }
        //Check if User Exists or Not
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        //compare Password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid Credentials" })
        }
        //get Token
        const token = generateToken(user)
        const { password, role, appointments, ...rest } = user._doc
        res.status(200).json({ status: true, message: "Successfully Login", token, data: { ...rest }, role })
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed To Login" })
    }
}