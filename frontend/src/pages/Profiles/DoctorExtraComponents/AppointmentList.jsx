import React from 'react'
import avatar from '../../../assets/images/doctor-img01.png'
import { formatDate } from '../../../utils/formatDate'

const AppointmentList = (props) => {

    const appointmentData = props.value

    // {appointmentData.user.photo != undefined ? (appointmentData.user.photo != '' ? appointmentData.user.photo : avatar) : avatar}

    return (
        <>
            <li className='flex justify-between px-2 py-4 bg-white border-b-[1px] border-textColor hover:bg-slate-100'>
                <div className='flex w-[40%]'>
                    <div className='w-[60px] h-[60px] rounded-full border-[2px] border-black mr-2'>
                        <img src={appointmentData.user.photo != undefined ? (appointmentData.user.photo != '' ? appointmentData.user.photo : avatar) : avatar} alt="" className='w-full h-full rounded-full' />
                    </div>
                    <div className='flex flex-col justify-center items-start'>
                        <h4 className='font-semibold text-[16px] text-headingColor'>{appointmentData.user.name}</h4>
                        <p className='font-thin text-[12px] text-textColor flex-wrap'>{appointmentData.user.email}</p>
                    </div>
                </div>

                {/* <div className='flex justify-center items-center text-[16px] text-textColor'>
                    <p>MALE</p>
                </div> */}

                <div className='flex justify-center items-center text-[16px] text-textColor'>
                    <p>{appointmentData.ticketPrice}</p>
                </div>

                <div className='flex justify-center items-center text-[16px] text-textColor'>
                    <p>{appointmentData.paymentMethod}</p>
                </div>

                <div className='flex justify-center items-center text-[16px] text-textColor'>
                    <p>{appointmentData.status.toUpperCase()}</p>
                </div>

                <div className='flex justify-center items-center flex-col text-[16px] text-textColor'>
                    <p>{new Date(appointmentData.createdAt).toLocaleDateString('en-GB')}</p>
                    {/* <p>2024</p> */}
                </div>
            </li>
        </>
    )
}

export default AppointmentList