import React from 'react'
import notFoundPic from "./../../assets/notFound.jpeg"
import styles from "./NotFound.module.css"
export default function NotFound() {
  return (
    <>
      <div className="container mx-auto w-2/4 mt-24 text-center">
        <img src={notFoundPic} className="w-full" alt="" />
      </div>
    </>
  )
}
