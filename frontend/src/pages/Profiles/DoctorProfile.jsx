import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiInformationCircle } from 'react-icons/hi'

import Loader from '../../components/Loader/Loader'
import DoctorProfileSettings from './DoctorProfileSettings'
import DoctorProfileAppointments from './DoctorProfileAppointments'
import DoctorOverview from './DoctorOverview'

const DoctorProfile = (props) => {
  const [loader, setloader] = useState(true)
  const [tab, setTab] = useState('overview')
  const [userData, setuserData] = useState(null)
  const navigate = useNavigate()

  const populateUI = async () => {
    var userId = JSON.parse(localStorage.getItem('user-info')).id
    var token = JSON.parse(localStorage.getItem('user-info')).token

    var result = await fetch(`http://localhost:3000/api/v1/doctors/${userId}`, {
      method: 'GET',
    }).then((res) => { return res.json() })

    setuserData(result.data)
    setloader(false)
  }

  //handling Logout
  const logoutHandler = () => {
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
      var result = await fetch(`http://localhost:3000/api/v1/doctors/${userId}`, {
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

  useEffect(() => {
    if (props.value.isLoggedin === false) {
      navigate('/home')
    } else {
      populateUI()
    }
  }, [])

  return (
    <>
      <section className='px-5 xl:px-0 py-10'>
        <div className='max-w-[1170px] mx-auto'>
          {
            loader ? <div className='flex justify-center items-center h-[250px]'><Loader /></div> : <>
              <div className='flex justify-center'>
                <div className=' rounded-l-lg flex items-center justify-start flex-col px-10 w-[400px]'>

                  <div className='w-full p-4 shadow-2xl bg-white rounded-l'>
                    <button onClick={() => setTab('overview')} className={`${tab === 'overview' && ' bg-textColor text-white'} w-full mb-2 rounded-md border-[2px] border-solid border-textColor py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold hover:bg-textColor hover:text-white`}>Overview</button>
                    <button onClick={() => setTab('myAppointments')} className={`${tab === 'myAppointments' && ' bg-textColor text-white'} w-full mb-2 rounded-md border-[2px] border-solid border-textColor py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold hover:bg-textColor hover:text-white`}>My Appointments</button>
                    <button onClick={() => setTab('profile')} className={`${tab === 'profile' && ' bg-textColor text-white'} w-full rounded-md border-[2px] border-solid border-textColor py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold hover:bg-textColor hover:text-white`}>Profile</button>
                  </div>
                  <div className='mt-[60px] w-full p-4 shadow-2xl bg-white rounded-l'>
                    <button onClick={logoutHandler} className='w-full bg-headingColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-2 mb-2'>Logout</button>
                    <button onClick={deleteHandler} className='w-full bg-red-500 text-white text-[20px] leading-[30px] rounded-lg px-4 py-2'>Delete Account</button>
                  </div>

                </div>

                <div className='rounded-l-lg w-[650px]'>
                  <div className='w-full p-2 rounded bg-amber-100 text-[14px] text-amber-900  mb-4'>
                    <p className='flex justify-start items-center gap-1'> <HiInformationCircle /> To get approval please complete your profile. We'll approve manually and approve within 3 days.</p>
                  </div>

                  {
                    tab === 'myAppointments' && <DoctorProfileAppointments value={userData} />
                  }

                  {
                    tab === 'profile' && <DoctorProfileSettings value={userData} />
                  }

                  {
                    tab === 'overview' && <DoctorOverview value={userData} />
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

export default DoctorProfile