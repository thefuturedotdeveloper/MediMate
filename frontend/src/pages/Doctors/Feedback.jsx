import React, { useState } from 'react';

import FeedbackForm from './FeedbackForm';

import avatar from '../../assets/images/avatar-icon.png'
import { formatDate } from '../../utils/formatDate';
import { AiFillStar } from 'react-icons/ai'

const Feedback = (props) => {

    let doctorData = props.value

    const [showFeedbackForm, setShowFeedbackForm] = useState(false)

    return (
        <div>
            <div className='mb-[50px]'>
                <h4 className='text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]'>All reviews {doctorData != null ? (doctorData.totalRating != 0 ? `(${doctorData.totalRating})` : "(0)") : "-"}</h4>

                {
                    doctorData != null ? doctorData.reviews.map((obj, index) => {
                        return (
                            <div key={index} className='flex justify-between gap-10 mb-[30px]'>
                                <div className='flex gap-3'>
                                    <figure>
                                        <img className="w-[26px] h-[26px] rounded-full" src={obj.user.photo != undefined ? obj.user.photo : avatar} alt="" />
                                    </figure>

                                    <div>
                                        <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>{obj.user.name}</h5>
                                        <p className='text-[14px] leading-6 text-textColor'>{formatDate(obj.createdAt)}</p>
                                        <p className='text__para mt-3 font-medium text-[15px]'>{obj.reviewText}</p>
                                    </div>
                                </div>

                                <div className='flex gap-1'>
                                    {[...Array(Math.floor(obj.rating)).keys()].map((_, index) => <AiFillStar key={index} color='#0067FF' />)}
                                </div>
                            </div>
                        )
                    }) : 'No Reviews'
                }

                {/* <div className='flex justify-between gap-10 mb-[30px]'>
                    <div className='flex gap-3'>
                        <figure>
                            <img className="w-full" src={avatar} alt="" />
                        </figure>

                        <div>
                            <h5 className='text-[16px] leading-6 text-primaryColor font-bold'>Ali Ahmed</h5>
                            <p className='text-[14px] leading-6 text-textColor'>{formatDate("02-14-2023")}</p>
                            <p className='text__para mt-3 font-medium text-[15px]'>Good Services, Highly Recommended</p>
                        </div>
                    </div>

                    <div className='flex gap-1'>
                        {[...Array(5).keys()].map((_, index) => <AiFillStar key={index} color='#0067FF' />)}
                    </div>
                </div> */}
            </div>

            {!showFeedbackForm && <div className='text-center'>
                <button className='btn' onClick={() => {
                    setShowFeedbackForm(true)
                }}>Give Feedback</button>
            </div>}

            {showFeedbackForm && <FeedbackForm />}

        </div>
    )
}

export default Feedback
