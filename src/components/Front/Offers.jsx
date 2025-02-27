import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import "../../css/carousel.css"
import { div } from "motion/react-client";
import { useEffect, useState } from "react";
import { GET, GETBRAND } from "../../api/frontApi";
import { motion } from "framer-motion"

const Carousel = (props) => {

      const [brand, setBrand] = useState([])
      const [currentSlide, setCurrentSlide] = useState(0);

    function SamplePrevArrow(props) {
        const {onClick} = props;
        return (
          <div className='md:w-[35px] md:h-[35px] w-[30px] flex 
           h-[30px] absolute left-[-15px] top-1/2 transform 
           -translate-y-1/2 cursor-pointer z-10 bg-white
          rounded-full shadow-carousel-button  justify-center 
          items-center' onClick={onClick}>
          <IoIosArrowBack color='black' size={14}/>
      </div>
        );
      }

      const url = process.env.REACT_APP_IMAGE
      
      function SampleNextArrow(props) {
        const {onClick} = props;
        return (
          <div className='md:w-[35px] md:h-[35px] w-[30px] flex
           h-[30px] absolute right-[-15px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white
          rounded-full shadow-carousel-button justify-center items-center' onClick={onClick}>
          <IoIosArrowForward color='black' size={14}/>
          </div>
        );
      }

      const settings = {
        dots: false,
        infinite: true,
      
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: currentSlide > 0 ? <SamplePrevArrow /> : null,
        afterChange: (current) => setCurrentSlide(current),
        // initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: { 
              dots: false,
              slidesToShow: 5,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              dots: false,
              infinite: true,
              autoplay: false,
              autoplaySpeed: 4000,
              pauseOnHover: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 2
            }
          }
        ]
      }; 

        const getBrands = async () => {
          const response = await GET('/brand/front/offer')
          setBrand(response)
        }

         function getData() {
            getBrands()
          }
        
          useEffect(() => {
            getData()
          }, [])
     
  return (
<div>
<div>
<h1 className='md:text-[35px]  text-[25px] font-bold'>Offers</h1>
</div>
<Slider {...settings} className="">

  {Array.isArray(brand) ? brand.map((item, idx) => (
      <div key={idx + 1} className='relative'>
     <NavLink to={`/brand/` + item._id} >
      <img className='brightness-[0.95] hover:opacity-[0.8] image-carousel-brand 
      rounded-[15px] object-cover' src={`${url}${item.image}`} alt="" />
      </NavLink>
      </div>
     
  )) : null}

</Slider>
</div>
  )
}

export default Carousel