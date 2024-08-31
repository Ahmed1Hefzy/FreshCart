import React from 'react'
import styles from "./MainSlider.module.css"
import slider1 from "./../../assets/preview.jpg"
import slider2 from "./../../assets/preview2.jpg"
import slider3 from "./../../assets/preview3.jpg"
import slider4 from "./../../assets/preview4.jpg"
import slider5 from "./../../assets/e1.png"
import slider6 from "./../../assets/e2.jpg"
import Slider from 'react-slick';


export default function MainSlider() {

  var settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false,
    autoplayspeed:2000,
  };



  return (
    <>
    <div className=" container mx-auto my-10 px-10">
      <div className="flex w-full">
        <div className="w-3/4">
        <Slider {...settings}>
          <img src={slider1} className="h-[400px] w-full"  alt="" />
          <img src={slider3} className="h-[400px] w-full"  alt="" />
        </Slider></div>
        <div className="w-1/4">
        <img src={slider5} className="h-[200px] w-full"  alt="" />
        <img src={slider6} className="h-[200px] w-full"  alt="" />
        </div>
      </div>
    </div>
    </>
  )
}
