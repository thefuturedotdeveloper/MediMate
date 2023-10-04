import express from "express";
import { getAllBookings, createBooking, getBookingById } from "../Controllers/bookingController.js";
import { authenticate, restrict } from './../Auth/verifyToken.js'

const router = express.Router({mergeParams: true})

router.get('/', getAllBookings)
router.get('/:id', getBookingById)
router.post('/', authenticate, restrict(['patient']), createBooking)

export default router