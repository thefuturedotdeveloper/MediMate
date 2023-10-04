import React, {useState} from 'react'
import { BsTrash } from 'react-icons/bs'

const AddExperience = (props) => {

    //Initializing Variables
    const [startingDate, setstartingDate] = useState(props.value.object.startingDate)
    const [endingDate, setendingDate] = useState(props.value.object.endingDate)
    const [position, setposition] = useState(props.value.object.position)
    const [hospital, sethospital] = useState(props.value.object.hospital)

    //handling Delete
    const handleDelete = () => {
        const newList = props.value.addExperience.filter((object) => object.id != props.value.object.id)
        props.value.setaddExperience(newList)
    }

    //handling Change in Input
    const handleChange = (e) => {

        const newData = [...props.value.addExperience]

        if (e.target.id === 'startingDate') {
            setstartingDate(e.target.value)
            newData[props.value.index].startingDate = e.target.value
        }
        if (e.target.id === 'endingDate') {
            setendingDate(e.target.value)
            newData[props.value.index].endingDate = e.target.value
        }
        if (e.target.id === 'position') {
            setposition(e.target.value)
            newData[props.value.index].position = e.target.value
        }
        if (e.target.id === 'hospital') {
            sethospital(e.target.value)
            newData[props.value.index].hospital = e.target.value
        }

        props.value.setaddExperience(newData)
    }

    return (
        <>
            <div className='flex justify-center items-start flex-col gap-4 px-2 mb-4'>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex justify-center items-start flex-col w-[45%] gap-2'>
                        <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Starting Date*</label>
                        <input value={startingDate} onChange={handleChange} type="date" name="" id="startingDate" className='w-full px-3 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
                    </div>
                    <div className='flex justify-center items-start flex-col w-[45%] gap-2'>
                        <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Ending Date*</label>
                        <input value={endingDate} onChange={handleChange} type="date" name="" id="endingDate" className='w-full px-4 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
                    </div>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex justify-center items-start flex-col w-[45%] gap-2'>
                        <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Position*</label>
                        <input value={position} onChange={handleChange} type="text" name="" id="position" placeholder='Position' className='w-full px-3 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
                    </div>
                    <div className='flex justify-center items-start flex-col w-[45%] gap-2'>
                        <label htmlFor="" className='text-headingColor font-medium text-[14px]leading-7'>Hospital*</label>
                        <input value={hospital} onChange={handleChange} type="text" name="" id="hospital" placeholder='Hospital' className='w-full px-3 py-3 border-[1px] border-dashed rounded-md border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
                    </div>
                </div>

                <div onClick={handleDelete} className='p-2 w-auto h-8 rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-700'><BsTrash /></div>
            </div>
        </>
    )
}

export default AddExperience