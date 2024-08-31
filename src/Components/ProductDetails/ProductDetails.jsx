import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
  let {id} = useParams()
  console.log(id);

  //add  to cart  using cartContext
  let {addProductToCart}= useContext(CartContext)
  async function addToCart(productId){
    let response =  await addProductToCart(productId)
    // console.log(response);
  }



  
  const [productdetails , setProductDetails] =useState({})
  const [isLoading , setIsLoading] =useState(true)
  const [errorMessage , setErrorMessage] =useState(null)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:2000,
    arrows:false,
  };

  async function getProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then((data)=>{
      setProductDetails(data?.data.data)
      setIsLoading(false)
    }).catch((error)=>{

      setErrorMessage(error.message)
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    getProductDetails()

  },[])

  return (
    <>
      <div className="container mx-auto mt-20">
        {isLoading?<Loader/>:null }
        <div className="flex">
          <div className="w-1/4">

            <Slider {...settings}>
              {productdetails?.images?.map((src,key)=><img key={src} src={src} alt="" />)}
            </Slider>

          </div>
          <div className="w-3/4 mt-10">
            <h1 className="text-black font-bold text-2xl my-5">{productdetails.title}</h1>
            <h3 className="text-gray-700 my-7">{productdetails.description}</h3>
            <p className="my-5">{productdetails.category?.name}</p>
            <div className="flex justify-between items-center">
              <p className="w-1/2">{productdetails.price}EGP</p> 
              <div className="w-1/2"><i className="fa fa-star rating-color">{productdetails.ratingsQuantity}</i></div>
          </div>


          <Helmet>
                <meta charSet="utf-8" />
                <title>{productdetails.title}</title>
            </Helmet>


          <div className="text-center">
            <button onClick={()=>addToCart(productdetails.id)} className="btn bg-main w-full text-white px-3 py-2 rounded-md my-5"> +Add To Cart</button>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
