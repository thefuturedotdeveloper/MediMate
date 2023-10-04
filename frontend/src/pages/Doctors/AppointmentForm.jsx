import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';
import { underline } from '@cloudinary/url-gen/qualifiers/textDecoration';



const AppointmentForm = (props) => {

    //Fetching data from PROPS
    var doctorData = props.value.doctorData

    //Initializing Variables
    const [userData, setuserData] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null);
    const [paymentMethod, setpaymentMethod] = useState('')

    //Defining Days Array based on Doctor's Timeslots
    var daysArray = []
    doctorData != null ? doctorData.timeSlots.forEach((obj) => {
        if (obj.day == 'Sunday') {
            daysArray.push(0)
        }
        else if (obj.day == 'Monday') {
            daysArray.push(1)
        }
        else if (obj.day == 'Tuesday') {
            daysArray.push(2)
        }
        else if (obj.day == 'Wednesday') {
            daysArray.push(3)
        }
        else if (obj.day == 'Thursday') {
            daysArray.push(4)
        }
        else if (obj.day == 'Friday') {
            daysArray.push(5)
        }
        else if (obj.day == 'Saturday') {
            daysArray.push(6)
        }
    }) : daysArray.push('')

    const navigate = useNavigate()

    //handle Input Change
    const handleInputChange = (e) => {
        if (e.target.name === 'paymentMethod') {
            setpaymentMethod(e.target.value)
        }
    }

    //handling Submit Appointment
    const handleSubmitAppointment = async (e) => {
        e.preventDefault()

        if (localStorage.getItem('user-info') != null) {
            var token = JSON.parse(localStorage.getItem('user-info')).token

            const updateAppointments = {
                ticketPrice: doctorData != null ? doctorData.ticketPrice : '',
                appointmentDate: selectedDate,
                // status : "pending",
                paymentMethod: paymentMethod
            }

            //Handling Data Updation
            const result = await fetch(`https://medimate-qdye.onrender.com/api/v1${window.location.pathname}/bookings`, {
                method: 'POST',
                body: JSON.stringify(updateAppointments),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => { return res.json() })

            if (result.success === true) {
                alert(result.message)
                props.value.setshowAppointmentForm(false)
                setSelectedDate(null)
                setpaymentMethod('')
            } else {
                alert(result.message)
            }

        } else {
            alert('Please Login First')
            navigate('/login')
        }
    }

    //For Dynamic Date Picker
    const isDayAllowed = (date) => {
        const dayOfWeek = date.getDay();
        // return allowedDays.includes(dayOfWeek);
        return daysArray.includes(dayOfWeek);
    };

    useEffect(() => {
        const fetchData = async () => {
            var userId = localStorage.getItem('user-info') != null ? JSON.parse(localStorage.getItem('user-info')).id : ''
            var token = localStorage.getItem('user-info') != null ? JSON.parse(localStorage.getItem('user-info')).token : ''
            const result = await fetch(`https://medimate-qdye.onrender.com/api/v1/users/${userId}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => { return res.json() })

            setuserData(result.data)
        }

        fetchData()
    }, [])

    return (
        <form action="" onSubmit={handleSubmitAppointment}>
            <div className='mt-[38px] border-t-[3px] border-solid border-textColor'>
                <h3 className='flex justify-between items-center p-3 text-headingColor text-[20px] leading-6 font-semibold mb-4 text-center'>Fill Up the Form <span onClick={() => {
                    props.value.setshowAppointmentForm(false)
                    setSelectedDate(null)
                    setpaymentMethod('')
                }} className=' text-[25px] leading-7 text-headingColor cursor-pointer'><MdCancel /></span></h3>
            </div>

            <div className='mb-5 flex flex-col justify-center items-start p-3 rounded-md shadow-lg border-[2px] border-dashed border-textColor'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Name*</label>
                <input value={userData != null ? userData.name : ''} onChange={handleInputChange} type="text" placeholder='Name*' name='name' className='w-full pl-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
            </div>

            <div className='mb-5 flex flex-col justify-center items-start p-3 rounded-md shadow-lg border-[2px] border-dashed border-textColor'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Email*</label>
                <input value={userData != null ? userData.email : ''} onChange={handleInputChange} type="email" placeholder='Email*' name='email' className='w-full pl-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
            </div>

            <div className='mb-5 flex flex-col justify-center items-start p-3 rounded-md shadow-lg border-[2px] border-dashed border-textColor'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Ticket Price*</label>
                <input value={doctorData != null ? doctorData.ticketPrice : ''} onChange={handleInputChange} type="text" placeholder='Ticket Price*' name='ticketPrice' className='w-full pl-2 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required readOnly />
            </div>

            <div className='mb-5 flex flex-col justify-center items-start p-3 rounded-md shadow-lg border-[2px] border-dashed border-textColor'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Appointment Date*</label>
                <div className='w-full pl-2 py-3 border-b border-solid border-[#0066ff61] cursor-pointer'>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        filterDate={isDayAllowed}
                        placeholderText="Select a specific day"
                        className='focus:outline-none text-[16px] leading-7 text-headingColor placeholder:text-textColor'
                        required
                    />
                </div>
            </div>

            <div className='flex flex-col justify-center items-start p-3 rounded-md shadow-lg border-[2px] border-dashed border-textColor'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Payment Method*</label>
                <select value={paymentMethod} onChange={handleInputChange} name="paymentMethod" id="" className='text-textColor font-semibold text-[15px] leading-7 pl-2 py-3 w-full border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor' required>
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>

            <button type='submit' className='btn px-2 w-full rounded-md mt-[16px]'>Book Appointment</button>
        </form>
    )
}

export default AppointmentForm
