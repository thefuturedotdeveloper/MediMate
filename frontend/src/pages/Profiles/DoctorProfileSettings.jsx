import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cloudinary } from '@cloudinary/url-gen'

import AddQualification from './DoctorExtraComponents/AddQualification'
import AddExperience from './DoctorExtraComponents/AddExperience'
import AddTimeSlot from './DoctorExtraComponents/AddTimeSlot'

import avatar from '../../assets/images/doctor-img01.png'


const DoctorProfileSettings = (props) => {
    const navigate = useNavigate()

    //handle PROPS DATA from API
    const userData = props.value

    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        bio: userData.bio || '',
        // gender: userData.gender,
        // password : '',
        specialization: userData.specialization || '',
        ticketPrice: userData.ticketPrice || '',
        qualifications: userData.qualifications || [],
        experiences: userData.experiences || [],
        timeSlots: userData.timeSlots || [],
        about: userData.about || '',
        photo: userData != null ? (userData.photo != undefined ? userData.photo : '') : '',
    })

    //Initializing Variables for Extra Components
    const [selectedFile, setSelectedFile] = useState(formData.photo)
    const [addQualification, setaddQualification] = useState(formData.qualifications)
    const [addExperience, setaddExperience] = useState(formData.experiences)
    const [addTimeSlot, setaddTimeSlot] = useState(formData.timeSlots)

    //handle Data Input
    const handleDataInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //handle File Input Change
    const handleFileInputChange = async (e) => {
        const preset_key = 'bs2h888r'  //My Cloudinary Preset_Key
        const cloud_name = 'dvirrnppm' //My Cloudinary ID
        const cld = new Cloudinary({ cloud: { cloudName: cloud_name } });

        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)

        const result = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: formData
        }).then((res) => { return res.json() })

        console.log(result)

        setSelectedFile(result.secure_url)
        // setFormData({ ...formData, [e.target.name]: result.secure_url })
    }

    //Handling Extra Components
    const handleAddQualification = () => {
        const newQualification = {
            id: addQualification.length != 0 ? addQualification.length + 1 : 1,
            startingDate: '',
            endingDate: '',
            degree: '',
            university: ''
        }
        setaddQualification([...addQualification, newQualification])
        // setaddQualification([...addQualification, addQualification.length != 0 ? addQualification[addQualification.length - 1] + 1 : 1])
    }
    const handleAddExperience = () => {
        const newExperience = {
            id: addExperience.length != 0 ? addExperience.length + 1 : 1,
            startingDate: '',
            endingDate: '',
            position: '',
            hospital: ''
        }
        setaddExperience([...addExperience, newExperience])
        // setaddExperience([...addExperience, addExperience.length != 0 ? addExperience[addExperience.length - 1] + 1 : 1])
    }
    const handleAddTimeSlot = () => {
        const newTimeSlot = {
            id: addTimeSlot.length != 0 ? addTimeSlot.length + 1 : 1,
            startingTime: '',
            endingTime: '',
            day: ''
        }
        setaddTimeSlot([...addTimeSlot, newTimeSlot])
        // setaddTimeSlot([...addTimeSlot, addTimeSlot.length != 0 ? addTimeSlot[addTimeSlot.length - 1] + 1 : 1])
    }

    //submit Handler
    const handleSubmit = async (e) => {

        e.preventDefault()

        var userId = JSON.parse(localStorage.getItem('user-info')).id
        var token = JSON.parse(localStorage.getItem('user-info')).token

        const updateData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            bio: formData.bio || '',
            // gender: userData.gender,
            // password : '',
            specialization: formData.specialization || '',
            ticketPrice: formData.ticketPrice || '',
            qualifications: addQualification || [],
            experiences: addExperience || [],
            timeSlots: addTimeSlot || [],
            about: formData.about || '',
            photo: selectedFile,
        }

        console.log(updateData)

        //Handling Data Updation
        const result = await fetch(`http://localhost:3000/api/v1/doctors/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => { return res.json() })

        // console.log(result)
        alert(result.message)
        navigate('/home')
    }

    return (
        <>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-2'>Profile Information</h3>

            <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <input value={formData.name} onChange={handleDataInput} type="text" placeholder='Name*' name='name' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
                </div>

                <div className='mb-5'>
                    <input value={formData.email} onChange={handleDataInput} type="email" placeholder='Email*' name='email' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
                </div>

                <div className='mb-5'>
                    <input value={formData.phone} onChange={handleDataInput} type="number" placeholder='Phone*' name='phone' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' />
                </div>

                <div className='mb-5'>
                    <textarea value={formData.bio} onChange={handleDataInput} rows={2} placeholder='Bio*' name='bio' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' />
                </div>

                <div className='mb-5 flex items-center justify-between'>

                    {/* <label className='text-headingColor font-bold text-[16px]leading-7'>Gender: <select value={formData.gender} name="gender" id="" className='text-textColor font-semibold text-[15px] leading-7 px-4 py-0 focus:outline-none'>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select></label> */}

                    <label className='text-headingColor font-bold text-[16px]leading-7'>Specialization: <select value={formData.specialization} onChange={handleDataInput} name="specialization" id="" className='text-textColor font-semibold text-[15px] leading-7 px-4 py-0 focus:outline-none'>
                        <option value="">Select</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Surgeon">Surgeon</option>
                        <option value="Eye Specialist">Eye Specialist</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Skin Specialist">Skin Specialist</option>
                        <option value="Gyaecanologist">Gyaecanologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Cancer Care">Cancer Care</option>
                        <option value="Labor & Delivery">Labor & Delivery</option>
                        <option value="Mental Health">Mental Health</option>\
                        <option value="other">Other</option>
                    </select></label>

                    <div className='mb-5'>
                        <input value={formData.ticketPrice} onChange={handleDataInput} type="number" placeholder='Ticket Price (in Rs.)*' name='ticketPrice' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' />
                    </div>
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label htmlFor="" className='text-headingColor font-bold text-[16px]leading-7'>Add Qualification*</label>
                    {addQualification.map((object, index) => (
                        <AddQualification key={index} value={{ addQualification, setaddQualification, object, index }} />
                    ))}
                    <div onClick={handleAddQualification} className='w-[30%] bg-textColor text-white text-[15px] leading-[30px] rounded-[5px] px-4 py-1 text-center cursor-pointer'>Add Qualification</div>
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label htmlFor="" className='text-headingColor font-bold text-[16px]leading-7'>Add Experience*</label>
                    {addExperience.map((object, index) => (
                        <AddExperience key={index} value={{ addExperience, setaddExperience, object, index }} />
                    ))}
                    <div onClick={handleAddExperience} className='w-[30%] bg-textColor text-white text-[15px] leading-[30px] rounded-[5px] px-4 py-1 text-center cursor-pointer'>Add Experience</div>
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label htmlFor="" className='text-headingColor font-bold text-[16px]leading-7'>Add Timeslots*</label>
                    {addTimeSlot.map((object, index) => (
                        <AddTimeSlot key={index} value={{ addTimeSlot, setaddTimeSlot, object, index }} />
                    ))}
                    <div onClick={handleAddTimeSlot} className='w-[30%] bg-textColor text-white text-[15px] leading-[30px] rounded-[5px] px-4 py-1 text-center cursor-pointer'>Add Timeslots</div>
                </div>

                <div className='mb-5'>
                    <textarea value={formData.about} onChange={handleDataInput} rows={2} placeholder='About*' name='about' className='w-full px-2 py-2 border-[1px] border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' />
                </div>

                <div className='mb-5 flex items-center gap-3'>
                    <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                        <img src={selectedFile != '' ? selectedFile : avatar} alt="" className='w-full rounded-full h-full' />
                    </figure>

                    <div className='relative w-[160px] h-[50px]'>
                        <input onChange={handleFileInputChange} type="file" name='photo' id='customFile' accept='.jpg, .png' className='absolute top-0 left-0 w-full opacity-0 cursor-pointer' />
                        <label htmlFor="customFile" className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0
                        .75rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>Upload Photo</label>
                    </div>
                </div>

                <div className='mt-7'>
                    <button type='submit' className='w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-2'>Update Profile</button>
                </div>
            </form>
        </>
    )
}

export default DoctorProfileSettings