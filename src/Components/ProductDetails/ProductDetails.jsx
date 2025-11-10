import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProductDetails.module.css"
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let { id } = useParams()
  console.log(id);

  // add to cart using cartContext
  let { addProductToCart } = useContext(CartContext)
  
  async function addToCart(productId){
    try {
      let response = await addProductToCart(productId)
      // console.log(response);
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("Failed to add product to cart")
    }
  }

  const [productdetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  async function getProductDetails(){
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(response?.data?.data || {})
      setIsLoading(false)
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      toast.error("Failed to load product details")
    }
  }

  useEffect(() => {
    getProductDetails()
  }, [id])

  if (isLoading) {
    return <Loader/>
  }

  if (errorMessage) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <h2 className="text-red-600 text-2xl">Error: {errorMessage}</h2>
        <p>Failed to load product details</p>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto mt-20 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <Slider {...settings}>
              {productdetails?.images?.map((src, key) => (
                <img key={key} src={src} alt={`Product image ${key + 1}`} className="w-full h-64 object-cover rounded-lg" />
              ))}
            </Slider>
          </div>
          
          <div className="w-full md:w-2/3 mt-4 md:mt-10">
            <h1 className="text-black font-bold text-2xl my-5">{productdetails.title}</h1>
            <h3 className="text-gray-700 my-7 leading-relaxed">{productdetails.description}</h3>
            <p className="my-5 text-lg font-semibold">Category: {productdetails.category?.name}</p>
            
            <div className="flex justify-between items-center my-6">
              <p className="text-xl font-bold text-main">{productdetails.price} EGP</p> 
              <div className="flex items-center">
                <i className="fa fa-star rating-color text-yellow-400 mr-1"></i>
                <span>{productdetails.ratingsAverage || productdetails.ratingsQuantity}</span>
              </div>
            </div>

            <Helmet>
              <meta charSet="utf-8" />
              <title>{productdetails.title}</title>
              <meta name="description" content={productdetails.description} />
            </Helmet>

            <div className="text-center">
              <button 
                onClick={() => addToCart(productdetails.id)} 
                className="btn bg-main w-full md:w-auto text-white px-6 py-3 rounded-md my-5 hover:bg-green-700 transition-colors text-lg font-semibold"
              >
                + Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}