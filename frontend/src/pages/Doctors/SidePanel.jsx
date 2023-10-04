import React, { useState } from 'react';
import AppointmentForm from './AppointmentForm';

const SidePanel = (props) => {
    let doctorData = props.value

    function convertTo12HourFormat(time24) {
        // Split the time string into hours and minutes
        const [hours, minutes] = time24.split(':');

        // Determine AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        const hours12 = (hours % 12) || 12; // Handle midnight (0) as 12 in 12-hour format

        // Create the 12-hour formatted time string
        const time12 = `${hours12}:${minutes} ${period}`;

        return time12;
    }

    //show Appointment Form
    const [showAppointmentForm, setshowAppointmentForm] = useState(false)

    return (
        <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
            <div className='flex items-center justify-between'>
                <p className='text__para mt-0 font-semibold'>Ticket Price</p>
                <span className='text-[15px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>{doctorData != null ? (doctorData.ticketPrice !== '' ? doctorData.ticketPrice : "Rs. 600") : "Rs. 500"}</span>
            </div>

            <div className='mt-[30px]'>
                <p className='text__para mt-0 font-semibold text-headingColor'>Available Time Slots: </p>

                <ul className='mt-3'>

                    {
                        doctorData != null ? (doctorData.timeSlots.map((obj, index) => {
                            return (
                                <li key={index} className={`${index === doctorData.timeSlots.length - 1 ? 'mb-0' : ''} flex items-center justify-between mb-2`}>
                                    <p className='text-[15px] leading-6 text-textColor font-semibold'>{obj.day}</p>
                                    <p className='text-[15px] leading-6 text-textColor font-semibold'>{convertTo12HourFormat(obj.startingTime)} - {convertTo12HourFormat(obj.endingTime)}</p>
                                </li>
                            )
                        })) : "No Time Slots"
                    }

                </ul>
            </div>

            {/* <button className='btn px-2 w-full rounded-md'>Book Appointment</button> */}

            {!showAppointmentForm && <div>
                <button className='btn px-2 w-full rounded-md' onClick={() => {
                    setshowAppointmentForm(true)
                }}>Book Appointment</button>
            </div>}

            {showAppointmentForm && <AppointmentForm value={{setshowAppointmentForm, doctorData}}/>}
        </div>
    )
}

export default SidePanel