import React, {useState} from 'react'
import { BsTrash } from 'react-icons/bs'

const AddTimeSlot = (props) => {

    //Initializing Variables
    const [startingTime, setstartingTime] = useState(props.value.object.startingTime)
    const [endingTime, setendingTime] = useState(props.value.object.endingTime)
    const [day, setday] = useState(props.value.object.day)

    //handling Delete
    const handleDelete = () => {
        const newList = props.value.addTimeSlot.filter((object) => object.id != props.value.object.id)
        props.value.setaddTimeSlot(newList)
    }

    //handling Change in Input
    const handleChange = (e) => {

        const newData = [...props.value.addTimeSlot]

        if (e.target.id === 'startingTime') {
            setstartingTime(e.target.value)
            newData[props.value.index].startingTime = e.target.value
        }
        if (e.target.id === 'endingTime') {
            setendingTime(e.target.value)
            newData[props.value.index].endingTime = e.target.value
        }
        if (e.target.id === 'day') {
            setday(e.target.value)
            newData[props.value.index].day = e.target.value
        }

        props.value.setaddTimeSlot(newData)
    }

    return (
        <div className='flex justify-center items-center gap-2 px-2 mb-4'>
            <div className='flex justify-center items-start flex-col w-[30%] gap-2'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Day*</label>
                <select value={day} onChange={handleChange} name="" id="day" className='w-full px-4 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required>
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
            </div>
            <div className='flex justify-center items-start flex-col w-[30%] gap-2'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Starting Time*</label>
                <input value={startingTime} onChange={handleChange} type="time" name="" id="startingTime" className='w-full px-3 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
            </div>
            <div className='flex justify-center items-start flex-col w-[30%] gap-2'>
                <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Ending Time*</label>
                <input value={endingTime} onChange={handleChange} type="time" name="" id="endingTime" className='w-full px-3 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
            </div>

            <div onClick={handleDelete} className='p-2 w-auto h-8 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-700'><BsTrash /></div>
        </div>
    )
}

export default AddTimeSlot