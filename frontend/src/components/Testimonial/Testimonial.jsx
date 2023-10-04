import React from 'react'
import {Pagination} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import patientAvatar from '../../assets/images/patient-avatar.png'
import niteshKumar from '../../assets/images/niteshKumar.jpg'
import noraFatehi from '../../assets/images/noraFatehi.jpg'
import abdulRab from '../../assets/images/abdulRab.jpg'
import {HiStar} from 'react-icons/hi'
const Testinomial = () => {
  return (
    <div className='mt-[30px] lg:mt-[55px]'>
        <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={1} pagination={{clickable:true}}
        breakpoints={{
            640:{
                slidesPerView:1,
                spaceBetween:0,
            },
            768:{
                slidesPerView:2,
                spaceBetween:20,
            },
            1024: {
                slidesPerView:3,
                spaceBetween:30,
            }
        }}
        >
           <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px]'>
                <div className="flex item-center gap-[13px] ">
                    <img src={niteshKumar} alt="" />
                    <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                        Nitesh Kumar
                    </h4>
                    <div className="flex items-center gap-[2px]">
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>

                    </div>
                    </div>
                </div>

                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                    "Maa kasam bahot hi achcha se ilaaz kis hai. They treat so well and they are providing the best medical services"
                </p>

            </div>
           </SwiperSlide>
           <SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px]'>
                <div className="flex item-center gap-[13px] ">
                    <img src={noraFatehi} alt="" />
                    <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                        Nora Fatehi
                    </h4>
                    <div className="flex items-center gap-[2px]">
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>

                    </div>
                    </div>
                </div>

                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                    "3 mahine se pet kharab tha yahan ek baar check karwaya ab sab thik hai"
                </p>

            </div>
           </SwiperSlide><SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px]'>
                <div className="flex item-center gap-[13px] ">
                    <img src={abdulRab} alt="" />
                    <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                        Abdul Rab
                    </h4>
                    <div className="flex items-center gap-[2px]">
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>

                    </div>
                    </div>
                </div>

                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                "Full paisa wasool tha bhai, Maja aa giya check up karwake"
                </p>

            </div>
           </SwiperSlide><SwiperSlide>
            <div className='py-[30px] px-5 rounded-[13px]'>
                <div className="flex item-center gap-[13px] ">
                    <img src={patientAvatar} alt="" />
                    <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                        Aasif Ali
                    </h4>
                    <div className="flex items-center gap-[2px]">
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>
                        <HiStar className='text-yellowColor w-[18px] h-5'/>

                    </div>
                    </div>
                </div>

                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                    "I have taken medical services from them. They treat so well and they are providing the best medical services"
                </p>

            </div>
           </SwiperSlide>
        </Swiper>

    </div>
  )
}

export default Testinomial