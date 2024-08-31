import React from 'react'
import styles from "./Categories.module.css"
import { useSelector } from 'react-redux'
export default function Categories() {
  //call redux
  let {counter} = useSelector((state)=>state.productRedux);



  return (
    <>
      
    </>
  )
}
