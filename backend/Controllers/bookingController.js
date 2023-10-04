import Booking_2 from '../models/BookingSchema2.js'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

//get all Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking_2.find({})

        res.status(200).json({ success: true, message: 'Successful', data: bookings })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not found' })
    }
}

//get all Bookings by ID
export const getBookingById = async (req, res) => {
    const id = req.params.id
    try {
        const booking = await Booking_2.findById(id)

        res.status(200).json({ success: true, message: 'Booking Found', data: booking })
    } catch (error) {
        res.status(404).json({ success: false, message: 'No Booking Found' })
    }
}

//Create a Booking
export const createBooking = async (req, res) => {

    if (!req.body.doctor) {
        req.body.doctor = req.params.doctorId
    }
    if (!req.body.user) {
        req.body.user = req.userId
    }

    const newBooking_2 = new Booking_2(req.body)

    try {
        const savedBooking_2 = await newBooking_2.save()

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { appointments: savedBooking_2._id }
        })

        await User.findByIdAndUpdate(req.userId, {
            $push: { appointments: savedBooking_2._id }
        })

        res.status(200).json({ success: true, message: 'Booking Submitted', data: savedBooking_2 })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}