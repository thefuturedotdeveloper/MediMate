import React, { useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'

import avatar from '../../assets/images/doctor-img01.png'
import { useNavigate } from 'react-router-dom'

const UserProfileSettings = (props) => {
    const navigate = useNavigate()

    const userData = props.value

    const [selectedFile, setSelectedFile] = useState(userData != null ? (userData.photo != undefined ? userData.photo : '') : '')
    const [formData, setFormData] = useState({
        password : '',
        photo : selectedFile,
        bloodType: userData != null ? (userData.bloodType != undefined ? userData.bloodType : '') : "",
        gender : userData.gender
    })

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleFileInputChange = async (e) => {
        const preset_key = 'bs2h888r'  //My Cloudinary Preset_Key
        const cloud_name = 'dvirrnppm' //My Cloudinary ID
        const cld = new Cloudinary({cloud: {cloudName: cloud_name}});

        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)

        const result = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body : formData
        }).then((res) => {return res.json()})

        console.log(result)

        setSelectedFile(result.secure_url)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        var userId = JSON.parse(localStorage.getItem('user-info')).id
        var token = JSON.parse(localStorage.getItem('user-info')).token

        const updateData = {}

        if(formData.password != ""){
            updateData.password = formData.password
        }
        if(formData.bloodType != ""){
            updateData.bloodType = formData.bloodType
        }
        if(formData.gender != ""){
            updateData.gender = formData.gender
        }

        updateData.photo = selectedFile

        console.log(updateData)

        //Handling Registeration
        const result = await fetch(`https://medimate-qdye.onrender.com/api/v1/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updateData),
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }).then((res) => {return res.json()})

        // console.log(result)
        alert(result.message)
        navigate('/home')
    }

    return (

        <>
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-2'>Profile Settings</h3>

            <form onSubmit={submitHandler}>
                <div className='mb-5'>
                    <input type="text" value={userData != null ? userData.name : ""} onChange={handleInputChange} placeholder='Full Name' name='name' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
                </div>

                <div className='mb-5'>
                    <input type="email" value={userData != null ? userData.email : ""} onChange={handleInputChange} placeholder='Enter your Email' name='email' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly/>
                </div>

                <div className='mb-5'>
                    <input type="password" value={formData.password} onChange={handleInputChange} placeholder='Password' name='password' className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' />
                </div>

                <div className='mb-5 flex items-center justify-between'>
                    <label className='text-headingColor font-bold text-[16px]leading-7'>Gender: <select name="gender" value={formData.gender} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-0 focus:outline-none'>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select></label>

                    <label className='text-headingColor font-bold text-[16px]leading-7'>Blood Type: <select name="bloodType" value={formData.bloodType} onChange={handleInputChange} className='text-textColor font-semibold text-[15px] leading-7 px-4 py-0 focus:outline-none'>
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select></label>
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

export default UserProfileSettings