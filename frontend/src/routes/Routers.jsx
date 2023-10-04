
import Home from '../pages/Home'
import Services from '../pages/Services'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Contact from '../pages/Contact'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsDetails from '../pages/Doctors/DoctorDetails'

import FindADoctor from '../pages/FindADoctor'

import UserProfile from '../pages/Profiles/UserProfile'
import DoctorProfile from '../pages/Profiles/DoctorProfile'

// import privateComponent from '../components/PrivateComponent/privateComponent.js'
import { Routes, Route } from 'react-router-dom'
import { createContext, useReducer, useState } from 'react'
import {reducer, initialState} from '../reducer/useReducer.js'

export const userContext = createContext()

const Routers = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <userContext.Provider value={{state, dispatch}}>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:id' element={<DoctorsDetails />} />
        <Route path='/login' element={<Login value = {props.value}/>} />
        <Route path='/register' element={<Signup />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/find-a-doctor' element={<FindADoctor />} />
        <Route path='/profile' element={props.value.isLoggedin === true ? (JSON.parse(localStorage.getItem('user-info')).role === 'patient' ? <UserProfile value = {props.value}/> : <DoctorProfile value = {props.value}/>) : <UserProfile value = {props.value}/>} />

      </Routes>
    </userContext.Provider>

  )
}

export default Routers