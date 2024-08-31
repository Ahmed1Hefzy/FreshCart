import React, { useContext, useEffect, useState } from 'react'
import styles from "./FeatureProducts.module.css"
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function FeatureProducts() {

  let {addProductToCart}= useContext(CartContext)
  async function addToCart(productId){
    let response =  await addProductToCart(productId)
    // console.log(response);
  }

  //Call data by react Query
  function getFeatureProducts(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }
  let {data,isLoading,isFetching,isError,error} = useQuery({
    queryKey:["featureProducts"],
    queryFn: getFeatureProducts,
    // staleTime:5000,
    // retry:4,
    // retryDelay:2000,
    // refetchInterval:6000
  })


  // ***Normal way for fetching data***
  // const[ products , setProducts ] = useState([])
  // const[ isLoading , setIsLoading ] = useState(true)
  // async function getProducts() {
  //   return axios.get("https://ecommerce.routemisr.com/api/v1/products").then((data)=>{
  //     console.log(data.data.data);
  //     setProducts(data.data.data);
  //     setIsLoading(false)
  //   }).catch((error)=>{
  //     console.log(error);
  //     setIsLoading(false)
  //   })
  // }
  // useEffect(()=>{
  //   getProducts()
  // },[])


  return (
    <>
      <div className="container mx-auto">
        {isLoading ? <Loader/>:<div className="flex flex-wrap ">
          {data?.data.data.map((product, key )=><div key={product.id} className="w-1/4">
            <div className="product p-4 rounded">
            
            <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className="w-full" alt="" />
            <h5 className="text-main text-center">{product.category?.name}</h5>
            <p className="pl-5">{product.title.split(" ").splice(0,2).join(" ")}</p>
            <div className="flex justify-between items-center pl-5">
            <p className="w-1/2" >{product.price}EGP</p>
            <div className="w-1/2"><i className="fa fa-star rating-color"></i>{product.ratingsQuantity}</div>
            </div>
            </Link>

          <div className="text-center">
            <button onClick={()=>addToCart(product.id)} className="btn bg-main text-white px-3 py-2 rounded-md my-5"> +Add To Cart</button>
          </div>
            </div>
          </div>)}
        </div>}
      </div> 
      {/* ***Normal way for fetching data***
      <div className="container mx-auto">
        {isLoading ? <Loader/>:<div className="flex flex-wrap ">
          {products.map((product)=><div key={product.id} className="w-1/4">
            <div className="product p-4 rounded">
            <img src={product.imageCover} className="w-full" alt="" />
          <h5 className="text-main">{product.category.name}</h5>
          <p>{product.title.split(" ").splice(0,2).join(" ")}</p>
          <div className="flex justify-between items-center">
            <p className="w-1/2" >{product.price}EGP</p>
            <div className="w-1/2"><i className="fa fa-star rating-color"></i>{product.ratingsQuantity}</div>
          </div>
          <div className="text-center">
            <button className="btn bg-main text-white px-3 py-2 rounded-md my-5"> +Add To Cart</button>
          </div>
            </div>
          </div>)}
        </div>}
      </div> */}
    </>
  )
}
