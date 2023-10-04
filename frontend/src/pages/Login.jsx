import React, { useContext, useEffect, useState } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import { userContext } from '../routes/Routers'
import Loader from '../components/Loader/Loader';

const Login = (props) => {
    
    const { state, dispatch } = useContext(userContext)
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (props.value.isLoggedin === true) {
            navigate('/home')
        }
    }, [])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        //Handling Registeration
        const result = await fetch('https://medimate-qdye.onrender.com/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }).then((res) => { return res.json() })

        
        console.log(result)
        if (result.status === false) {
            alert(result.message)
            setLoading(false)
        } else {
            setLoading(false)
            const user_data = {
                id: result.data._id,
                token: result.token,
                role: result.role
            }
            localStorage.setItem('user-info', JSON.stringify(user_data))
            // dispatch({type: "USER", payload: true})
            props.value.setIsLoggedIn(true)
            alert(result.message)
            navigate('/home')
        }
    }

    return (
        <section className='px-5 lg:px-0'>
            <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10'>
                <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'> Hello! <span className='text-primaryColor'>Welcome</span> Back</h3>

                <form className='py-4 md:py-0' onSubmit={submitHandler}>
                    <div className='mb-5'>
                        <input type="email" placeholder='Enter Your Email' name='email' value={formData.email} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer' required />
                    </div>

                    <div className='mb-5'>
                        <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleInputChange} className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColorcursor-pointer' required />
                    </div>

                    <div className='mt-7'>
                        { loading ? <div className='flex justify-center items-center'><Loader/></div> : <button type='submit' className='w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-4 py-2'>Login</button>}
                    </div>

                    <p className='mt-5 text-textColor text-center'>Don't have an Account? <Link to='/register' className='text-primaryColor font-medium ml-1'>Register</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Login