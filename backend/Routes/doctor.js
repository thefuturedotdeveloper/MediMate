import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctor, getSingleDoctor, getDoctorByAppointmentID } from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../Auth/verifyToken.js";
import reviewRouter from './review.js'
import bookingRouter from './booking.js'

const router = express.Router()

//nested route
router.use('/:doctorId/reviews', reviewRouter) //create a review to a specific doctor ID
router.use('/:doctorId/bookings', bookingRouter) //create a booking to a specific doctor ID


router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctor)
router.get('/bookings/:appointmentId', getDoctorByAppointmentID)
router.put('/:id', authenticate, restrict(['doctor']), updateDoctor)
router.delete('/:id', authenticate, restrict(['doctor']), deleteDoctor)

export default router