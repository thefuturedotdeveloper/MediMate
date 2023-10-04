import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';


const FeedbackForm = () => {

    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState('')

    const navigate = useNavigate()

    const handleSubmitReview = async (e) => {
        e.preventDefault()

        if (localStorage.getItem('user-info') == null) {
            alert("Login First")
            navigate('/login')
        } else {
            var token = JSON.parse(localStorage.getItem('user-info')).token

            const reviewData = {
                reviewText: reviewText,
                rating: rating
            }

            //Handling Data Updation
            const result = await fetch(`http://localhost:3000/api/v1${window.location.pathname}/reviews`, {
                method: 'POST',
                body: JSON.stringify(reviewData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then((res) => { return res.json() })

            if (result.success === true) {
                alert(result.message)
                navigate('/home')
            } else {
                alert(result.message)
            }
        }
    }

    return (
        <form action="">
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>How would you rate the Overall experience</h3>

                <div>
                    {[...Array(5).keys()].map((_, index) => {
                        index += 1;

                        return (
                            <button key={index} type='button' className={`${index <= ((rating && hover) || hover) ? 'text-yellowColor' : 'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer`} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)} onDoubleClick={() => { setHover(0); setRating(0) }}>
                                <span><AiFillStar /></span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>Share your feedback or suggestions</h3>

                <textarea className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md' rows="5" placeholder='Write your Message' value={reviewText} onChange={(e) => {
                    setReviewText(e.target.value)
                }}></textarea>
            </div>

            <button type='submit' className='btn' onClick={handleSubmitReview}>Submit Feedback</button>
        </form>
    )
}

export default FeedbackForm
