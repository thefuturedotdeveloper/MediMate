import Doctor from '../models/DoctorSchema.js'
import Booking_2 from  '../models/BookingSchema2.js'

//All CRUD Operations For Doctors
export const updateDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set: req.body}, {new: true})

        res.status(200).json({success: true, message: 'Successfully Updated', data: updatedDoctor})
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to Update'})
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id
    try {
        await Doctor.findByIdAndDelete(id)

        res.status(200).json({success: true, message: 'Successfully Deleted'})
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to Delete'})
    }
}

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id
    try {
        const doctor = await Doctor.findById(id).populate('reviews').populate('appointments').select("-password")

        res.status(200).json({success: true, message: 'Doctor Found', data: doctor})
    } catch (error) {
        res.status(404).json({success: false, message: 'No Doctor Found', data: error.message})
    }
}

//can Search with Query
export const getAllDoctor = async (req, res) => {
    try {
        const {query} = req.query
        let doctors

        if(query){
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization : {$regex: query, $options: "i"}}
                ]
            }).select("-password")
        }
        else{
            doctors = await Doctor.find({}).select("-password")
        }

        res.status(200).json({success: true, message: 'Doctors Found', data: doctors})
    } catch (error) {
        res.status(404).json({success: false, message: 'No Doctors Found'})
    }
}

//get Doctor by Appointment ID
export const getDoctorByAppointmentID = async (req, res) => {
    const appointmentId = req.params.appointmentId
    try {
        const appointment = await Booking_2.findById(appointmentId)
        if(!appointment){
            throw new Error('Appointment Not Found')
        }

        const doctor = await Doctor.findById(appointment.doctor)
        if(!doctor){
            throw new Error('Doctor Not Found')
        }

        res.status(200).json({success: true, message: 'Doctors Found', data: doctor})
    } catch (error) {
        res.status(404).json({success: false, message: error.message})
    }
}