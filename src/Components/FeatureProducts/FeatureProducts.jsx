import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function FeatureProducts() {
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

  // Call data by react Query
  function getFeatureProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  
  let { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["featureProducts"],
    queryFn: getFeatureProducts,
    // staleTime:5000,
    // retry:4,
    // retryDelay:2000,
    // refetchInterval:6000
  })

  if (isError) {
    return (
      <div className="container mx-auto text-center py-8">
        <h2 className="text-red-600">Error loading products: {error.message}</h2>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto">
        {isLoading ? <Loader/> : (
          <div className="flex flex-wrap">
            {data?.data.data.map((product, key) => (
              <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <div className="product p-4 rounded shadow-lg hover:shadow-xl transition-shadow">
                  <Link to={`/productdetails/${product.id}`}>
                    <img src={product.imageCover} className="w-full h-48 object-cover" alt={product.title} />
                    <h5 className="text-main text-center mt-2">{product.category?.name}</h5>
                    <p className="pl-2 text-sm font-semibold">{product.title.split(" ").splice(0,2).join(" ")}</p>
                    <div className="flex justify-between items-center pl-2">
                      <p className="w-1/2">{product.price} EGP</p>
                      <div className="w-1/2 flex items-center">
                        <i className="fa fa-star rating-color text-yellow-400"></i>
                        <span className="ml-1">{product.ratingsAverage || product.ratingsQuantity}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="text-center">
                    <button 
                      onClick={() => addToCart(product.id)} 
                      className="btn bg-main text-white px-3 py-2 rounded-md my-3 hover:bg-green-700 transition-colors"
                    >
                      + Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}