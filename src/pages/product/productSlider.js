// import './productSlider.scss'
// import PropTypes from 'prop-types'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Navigation, Thumbs } from 'swiper'
// import { useState } from 'react'

// const productSlider = (props) => {
//     const images = props.images
//     const [activeThumb, setActiveThumb] = useState()
//     return (
//         <>
//             <Swiper
//                 loop={true}
//                 spaceBetween={10}
//                 navigation={true}
//                 modules={[Navigation, Thumbs]}
//                 grabCursor={true}
//                 thumbs={{ swiper: activeThumb }}
//                 className='product-images-slider'
//             >
//                 {
//                     props.images.map((item, index) => (
//                         <SwiperSlide key={index}>
//                             <img src={item.photo} alt="product images" />
//                         </SwiperSlide>
//                     ))
//                 }
//             </Swiper>
//             <Swiper
//                 onSwiper={setActiveThumb}
//                 loop={true}
//                 spaceBetween={10}
//                 slidesPerView={4}
//                 modules={[Navigation, Thumbs]}
//                 className='product-images-slider-thumbs'
//             >
//                 {
//                     props.images.map((item, index) => (
//                         <SwiperSlide key={index}>
//                             <div className="product-images-slider-thumbs-wrapper">
//                                 <img src={item.photo} alt="product images" />
//                             </div>
//                         </SwiperSlide>
//                     ))
//                 }
//             </Swiper>
//         </>
//     )

// }
// export default productSlider