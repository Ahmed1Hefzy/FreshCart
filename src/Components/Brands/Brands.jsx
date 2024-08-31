import React, { useEffect } from 'react'
import styles from "./Brands.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../Redux/productSlice'
export default function Brands() {

let dispatch = useDispatch();
let {brands} =  useSelector((state)=>state.productRedux)
console.log(brands?.data)
useEffect(()=>{
  getData()
},[])

  async function getData(){
    await dispatch(getBrands())
  }

  return (
    <>
      <div className=" container mx-auto px-11">

      </div>
    </>
  )
}
