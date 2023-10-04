import React from 'react'
import AppointmentList from './DoctorExtraComponents/AppointmentList'

const DoctorProfileAppointments = (props) => {

  const appointmentData = props.value != null ? props.value.appointments : []

  console.log(appointmentData)

  return (
    <>
      <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-2'>My Appointments</h3>

      <ul className='w-full shadow-lg'>
        <li className='flex justify-between font-semibold text-[14px] bg-slate-300 p-2'>
          <h4 className='w-[39%]'>Name</h4>
          {/* <h4>Gender</h4> */}
          <h4>Price</h4>
          <h4>Payment</h4>
          <h4>Status</h4>
          <h4>Booked On</h4>
        </li>

        {
          appointmentData.map((obj, index) => {
            return (
              <AppointmentList key={index} value = {obj}/>
            )
          })
        }

        {
          appointmentData.length == 0 && <h3 className='text-headingColor text-[22px] leading-9 font-thin mb-2 p-4 text-center'>No Appointments</h3>
        }

        {/* <AppointmentList value={appointmentData}/> */}

      </ul>
    </>
  )
}

export default DoctorProfileAppointments