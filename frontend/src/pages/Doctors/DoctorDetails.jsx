import React, { useEffect, useState } from "react";
import Loader from '../../components/Loader/Loader'

import Feedback from './Feedback'
import DoctorAbout from './DoctorAbout'
import SidePanel from "./SidePanel";

import doctorImg from '../../assets/images/doctor-img02.png'
import starIcon from '../../assets/images/Star.png'

const DoctorsDetails = () => {

    const [loader, setloader] = useState(true)
    const [doctorData, setdoctorData] = useState(null)

    useEffect(() => {
        const populateData = async () => {

            var result = await fetch(`https://medimate-qdye.onrender.com/api/v1${window.location.pathname}`).then((res) => { return res.json() })

            setloader(false)
            setdoctorData(result.data)
        }

        populateData()
    }, [])

    const [tab, setTab] = useState('about')

    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                {
                    loader ? <div className="flex justify-center items-center h-[250px]"><Loader /></div> : <>
                        <div className="grid md:grid-cols-3 gap-[50px]">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-5">
                                    <figure className="max-w-[200px] max-h-[200px]">
                                        <img src={doctorData != null ? (doctorData.photo != undefined ? (doctorData.photo != '' ? doctorData.photo : doctorImg) : doctorImg) : doctorImg} alt="" className='w-full h-full rounded-lg' />
                                    </figure>

                                    <div>
                                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">{doctorData != null ? (doctorData.specialization ? doctorData.specialization : "Specialization Not Entered") : "Surgeon"}</span>
                                        <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">{doctorData != null ? (doctorData.name ? doctorData.name : "Aasif Ali") : "Aasif Ali"}</h3>
                                        <div className="flex items-center gap-[6px]">
                                            <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                                                <img src={starIcon} alt="" /> {doctorData != null ? (doctorData.averageRating != 0 ? doctorData.averageRating : 'No Ratings') : '-'}
                                            </span>
                                            <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-400 text-textColor">{doctorData != null ? (doctorData.totalRating != 0 ? `(${doctorData.totalRating})` : 0) : '-'} </span>
                                        </div>
                                        <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                                            {doctorData != null ? (doctorData.bio != undefined ? doctorData.bio : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, explicabo. Odio repellendus ducimus illum cumque omnis, quam illo. Et suscipit, cumque dignissimos deleniti aliquid vitae quas. Repudiandae voluptas repellat ipsa.') :
                                                "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                                    <button onClick={() => setTab('about')} className={` ${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>About</button>

                                    <button onClick={() => setTab('feedback')} className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}>Feedback</button>
                                </div>

                                <div className="mt-[50px]">
                                    {
                                        tab === 'about' && <DoctorAbout value={doctorData} />
                                    }

                                    {
                                        tab === 'feedback' && <Feedback value={doctorData} />
                                    }
                                </div>
                            </div>

                            <div>
                                <SidePanel value={doctorData} />
                            </div>
                        </div>
                    </>
                }
            </div>
        </section>
    )
}

export default DoctorsDetails