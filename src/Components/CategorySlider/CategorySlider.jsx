import React from 'react'
import styles from "./CategorySlider.module.css"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Slider from 'react-slick';
export default function CategorySlider() {

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay:true,
    autoplayspeed:2000,
  };

  function getCatSlider(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }
  let {data} =useQuery({
    queryKey:["categorySlider"],
    queryFn:getCatSlider
  })
  

  return (
    <>
      <div className=" container  mx-auto my-10 px-10">
        <h1 className="text-main my-3">Show Popular Categories :</h1>
        <Slider {...settings}>
          {data?.data?.data.map((cat,key) => <div key={cat} className="text-center">
          <img src={cat.image} className='h-[200px] w-[250px]' alt="" />
          <p>{cat.name}</p>
          </div>)}
        </Slider>
      </div>
    </>
  );
}
