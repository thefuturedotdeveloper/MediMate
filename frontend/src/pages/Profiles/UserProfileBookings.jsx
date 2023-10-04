import React, { useEffect, useState } from 'react'
import DoctorCard from '../../components/Doctors/DoctorCard'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

import { doctors } from './../../assets/data/doctors';
import avatar from '../../assets/images/doctor-img01.png'
import starIcon from '../../assets/images/Star.png'

const UserProfileBookings = (props) => {

    const doctorData = props.value.length != 0 ? props.value : []


    return (
        <>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-2'>My bookings</h3>

            <div className='w-full flex justify-center items-center flex-wrap'>

                {doctorData.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                ))}

                {/* <div>
                    <div>
                        <img src={avatar} className='w-full' alt="" />
                    </div>

                    <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
                        Aasif Ali
                    </h2>

                    <div className="mt-2 lg:mt-4 flex items-center justify-between">
                        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[18px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                            Surgeon
                        </span>

                        <div className="flex items-center gap-[6px]">
                            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-hedingColor">
                                <img src={starIcon} alt="" /> 3.9
                            </span>
                            <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">(500)</span>
                        </div>
                    </div>

                    <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
                        <div>
                            <h3 className='text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor'>
                                +1500 patients
                            </h3>
                            <p className="text-[14px] leading-6 font-[400] text-textColor">
                                At Neuroscience Hospital
                            </p>
                        </div>

                        <Link
                            to={`/doctors/01`}
                            className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
                        >
                            <BsArrowRight className='group-hover:text-white w-6 h-5' />
                        </Link>

                    </div>
                </div> */}

            </div>
        </>
    )
}

export default UserProfileBookings