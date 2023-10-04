import React from 'react';
import { formatDate } from '../../utils/formatDate';

const DoctorAbout = (props) => {

    let doctorData = props.value

    return (
        <div>
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>About of <span className='text-irisBlueColor font-bold text-[24px] leading-9'>{doctorData != null ? (doctorData.name ? doctorData.name : "Aasif Ali") : "Aasif Ali"}</span></h3>
                <p className='text__para text-justify'>
                    {doctorData != null ? (doctorData.about === undefined ? 'No Abouts' : doctorData.about) :
                        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi, consectetur quaerat. Enim accusantium natus sint pariatur, ex, reiciendis numquam itaque architecto sit error iusto beatae. Dicta culpa quod architecto corrupti."}
                </p>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>

                <ul className='pt-4 md:p-5'>
                    {
                        doctorData != null ? doctorData.qualifications.map((obj, index) => {
                            return (
                                <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                                    <div>
                                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formatDate(obj.startingDate)} - {formatDate(obj.endingDate)}</span>
                                        <p className='text-[16px] leading-6 font-medium text-textColor'>{obj.degree}</p>
                                    </div>
                                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                                        {obj.university}
                                    </p>
                                </li>
                            )
                        }) : <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[0px]'>
                            <div>
                                <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{formatDate('07-04-2010')} - {formatDate('07-04-2014')}</span>
                                <p className='text-[16px] leading-6 font-medium text-textColor'>PHD in Surgeon</p>
                            </div>
                            <p className='text-[14px] leading-5 font-medium text-textColor'>
                                New Apollo Hospital, New York
                            </p>
                        </li>
                    }
                </ul>
            </div>

            <div className='mt-12'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience</h3>

                <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                    {
                        doctorData != null ? doctorData.experiences.map((obj, index) => {
                            return (
                                <li key={index} className='p-4 rounded bg-[#fff9ea]'>
                                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>{formatDate(obj.startingDate)} - {formatDate(obj.endingDate)}</span>
                                    <p className='text-[16px] leading-6 font-medium text-textColor'>{obj.position}</p>
                                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                                        {obj.hospital}
                                    </p>
                                </li>
                            )
                        }) : <li className='p-4 rounded bg-[#fff9ea]'>
                            <span className='text-yellowColor text-[15px] leading-6 font-semibold'>{formatDate('07-04-2010')} - {formatDate('07-04-2014')}</span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>Sr. Surgeon</p>
                            <p className='text-[14px] leading-5 font-medium text-textColor'>
                                New Apollo Hospital, New York
                            </p>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DoctorAbout
