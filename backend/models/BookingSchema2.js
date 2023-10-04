import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        doctor: {
            type: mongoose.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ticketPrice: { type: String, required: true },
        appointmentDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            default: 'Cash',
        },
    },
    { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: "name email photo",
    })

    next();
})

export default mongoose.model("Booking_2", bookingSchema);
