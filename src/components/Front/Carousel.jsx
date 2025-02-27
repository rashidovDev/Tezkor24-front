import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import "../../css/carousel.css"
import { useState } from "react";

const Carousel = (props) => {

     const [currentSlide, setCurrentSlide] = useState(0);

    function SamplePrevArrow(props) {
        const {onClick} = props;
        return (
          <div className='md:w-[35px] md:h-[35px] w-[30px] md:flex hidden
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
          <div className='md:w-[35px] md:h-[35px] w-[30px] md:flex hidden
           h-[30px] absolute right-[-15px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white
          rounded-full shadow-carousel-button justify-center items-center' onClick={onClick}>
          <IoIosArrowForward color='black' size={14}/>
          </div>
        );
      }

      const settings = {
        dots: false,
        infinite: true,
      
        slidesToShow: 7,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: currentSlide > 0 ? <SamplePrevArrow /> : null,
        afterChange: (current) => setCurrentSlide(current),
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
              autoplay: true,
              autoplaySpeed: 2000,
              pauseOnHover: true,
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 2
            }
          }
        ]
      }; 
     
  return (

  
<Slider {...settings} className="">

  {Array.isArray(props.product) ? props.product.map((item, idx) => (
      <div key={idx + 1} className='relative'>
     <NavLink to={`/brand/` + item.brandID._id} >
      <img className='image-carousel 
      rounded-[15px] object-cover' src={`${url}${item.image}`} alt="" />
      </NavLink>
      </div>
     
  )) : null}

</Slider>
   
  

  // <div className="flex justify-center">
  // <div className="w-[100px] h-[70px] bg-red-300 ml-5"></div>
  // <div className="w-[100px] h-[70px] bg-red-300 ml-5"></div>
  // <div className="w-[100px] h-[70px] bg-red-300 ml-5"></div>
  // </div>
  
  )
}

export default Carousel