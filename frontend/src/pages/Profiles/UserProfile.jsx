import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader/Loader'
import UserProfileSettings from './UserProfileSettings'
import UserProfileBookings from './UserProfileBookings'

import avatar from '../../assets/images/doctor-img01.png'

const UserProfile = (props) => {
    const [loader, setloader] = useState(true)
    const [tab, setTab] = useState('myBookings')
    const [userData, setuserData] = useState(null)
    const [doctorData, setdoctorData] = useState([])
    const navigate = useNavigate()

    const populateUI = async () => {
        var userId = JSON.parse(localStorage.getItem('user-info')).id
        var token = JSON.parse(localStorage.getItem('user-info')).token

        var result = await fetch(`https://medimate-qdye.onrender.com/api/v1/users/${userId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        }).then((res) => { return res.json() })

        setuserData(result.data)

        var fetchedData = []
        result.data.appointments.map(async (appointmentId) => {
            var result = await fetch(`https://medimate-qdye.onrender.com/api/v1/doctors/bookings/${appointmentId}`, {
                method: 'GET',
            }).then((res) => { return res.json() })

            fetchedData = [...fetchedData, result.data]
            setdoctorData(fetchedData)
        })

        setloader(false)
    }

    useEffect(() => {
        if (props.value.isLoggedin === false) {
            navigate('/home')
        } else {
            populateUI()
        }
    }, [])

    const logoutHandler = () => {
        //Handling Logout
        if (confirm("Are you sure, you want to Logout?")) {
            localStorage.removeItem('user-info')
            props.value.setIsLoggedIn(false)
            navigate('/home')
        } else {
            return
        }
    }

    //handling Delete
    const deleteHandler = async () => {
        const userId = JSON.parse(localStorage.getItem('user-info')).id
        const token = JSON.parse(localStorage.getItem('user-info')).token
        if (confirm("Are you sure you want to delete the Account")) {
            var result = await fetch(`https://medimate-qdye.onrender.com/api/v1/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => { return res.json() })

            if (result.success === true) {
                localStorage.removeItem('user-info')
                props.value.setIsLoggedIn(false)
                alert(result.message)
                navigate('/home')
            } else {
                alert(result.message)
            }
        }
    }

    return (

        <>
            <section className='px-5 xl:px-0'>
                <div className='max-w-[1170px] mx-auto'>
                    {
                        loader ? <div className='flex justify-center items-center h-[250px]'><Loader /></div> : <>
                            <div className='grid grid-cols-1 lg:grid-cols-2'>
                                <div className=' rounded-l-lg flex items-center justify-start flex-col py-10'>
                                    <div className='rounded-full h-[100px] w-[100px] border-solid border-primaryColor border-[5px]'>
                                        <img src={userData != null ? (userData.photo != "" ? userData.photo : avatar) : avatar} alt="" className='w-full rounded-full h-full' />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='text-headingColor text-[16px] font-bold text-center'>{userData != null ? userData.name : "-"}</h3>
                                        <p className='text-textColor text-[14px] font-medium text-center'>{userData != null ? userData.email : "-"}</p>
                                        <p className='text-textColor text-[14px] font-medium text-center'>Blood Group: {userData != null ? (userData.bloodType !== undefined ? userData.bloodType : "-") : "-"}</p>
                                    </div>
                                    <div className='mt-[60px] w-1/2'>
                                        <button onClick={logoutHandler} className='w-full bg-headingColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-2 mb-2'>Logout</button>
                                        <button onClick={deleteHandler} className='w-full bg-red-500 text-white text-[20px] leading-[30px] rounded-lg px-4 py-2'>Delete Account</button>
                                    </div>
                                </div>

                                <div className='rounded-l-lg'>
                                    <div className='mb-5'>
                                        <button onClick={() => setTab('myBookings')} className={`${tab === 'myBookings' && 'bg-primaryColor text-white'} rounded-md border-[2px] border-solid border-primaryColor py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold hover:bg-primaryColor hover:text-white`}>My Bookings</button>
                                        <button onClick={() => setTab('settings')} className={`${tab === 'settings' && 'bg-primaryColor text-white'} rounded-md border-[2px] border-solid border-primaryColor py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold hover:bg-primaryColor hover:text-white`}>Settings</button>
                                    </div>

                                    {
                                        tab === 'myBookings' && <UserProfileBookings value={doctorData} />
                                    }

                                    {
                                        tab === 'settings' && <UserProfileSettings value={userData} />
                                    }

                                </div>
                            </div>
                        </>
                    }
                </div>
            </section>
        </>


    )
}

export default UserProfile