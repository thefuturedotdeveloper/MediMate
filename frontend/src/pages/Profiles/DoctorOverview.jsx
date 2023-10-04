import React from 'react'

import DoctorAbout from '../Doctors/DoctorAbout'

import doctorImg from '../../assets/images/doctor-img02.png'
import starIcon from '../../assets/images/Star.png'

const DoctorOverview = (props) => {

    const userData = props.value

    return (
        <>
            <div className="max-w-[1170px] px-5 mx-auto">
                <div>
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-5">
                            <figure className="w-[250px] h-[250px]">
                                <img src={userData != null ? (userData.photo != undefined ? (userData.photo != '' ? userData.photo : doctorImg) : doctorImg) : doctorImg} alt="" className='w-full h-full rounded-lg overflow-hidden' />
                            </figure>

                            <div>
                                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">{userData != null ? userData.specialization || 'No Specialization' : 'No Specialization'}</span>
                                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{userData != null ? userData.name : '-'}</h3>
                                <div className="flex items-center gap-[6px]">
                                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                        <img src={starIcon} alt="" /> {userData != null ? (userData.averageRating == 0 ? "-" : userData.averageRating) : '-'}
                                    </span>
                                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-400 text-textColor">({userData != null ? (userData.totalRating == 0 ? "No Rating" : userData.totalRating) : '-'})</span>
                                </div>
                                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px] text-justify">
                                    { userData != null ? userData.bio || 
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, explicabo. Odio repellendus ducimus illum cumque omnis, quam illo. Et suscipit, cumque dignissimos deleniti aliquid vitae quas. Repudiandae voluptas repellat ipsa." : '-'
                                    }
                                </p>
                            </div>
                        </div>

                        <DoctorAbout value = {userData}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorOverview