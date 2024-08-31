import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [userMessage,setuserMessage]=useState(null)
  const [userError,setuserError]=useState(null)
  const [isLoading,setisLoading]=useState(false)
  
  let navigate = useNavigate()
  // validater
  let mySchema = Yup.object({
    name:Yup.string().required("Name is required").min(3,"can't be less than 3 chars").max(10,"max is 10 chars"),
    email:Yup.string().required("enter your email").email("invalid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/,"password not valid "),
    rePassword:Yup.string().required("enter password again").oneOf([Yup.ref("password")],"password not matched"),
    phone:Yup.string().required().matches(/^(002)?01[0125][0-9]{8}$/,"phone is not valid"),
  })
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      registerForm(values);
      
    }
  })
  async function registerForm(values){
    setisLoading(true)
    return  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).then((data)=>{
    console.log(data.data.message);
    setuserMessage(data.data.message);
    setisLoading(false)
    navigate("/login")
  }).catch((err)=>{
    console.log(err.response.data.message);
    setisLoading(false)
    setuserError(err.response.data.message);
  })
  }
  return (
    <>
      <div className=" container mx-auto px-16 text-2xl">
        <h1 className= "text-main text-2xl ">Register Now:</h1>
        {userError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{userError}</div>:null}
        {userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"> {userMessage} </div>:null}
        <form onSubmit={formik.handleSubmit}>
          <div className="my-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input name='name' type="text" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {formik.touched.name &&formik.errors.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.name}
              </div>:null}
          </div>
          <div className="my-2">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input name='email' type="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {formik.touched.email &&formik.errors.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>:null}
          </div>
          <div className="my-2">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input name='password' type="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {formik.touched.password &&formik.errors.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.password}
              </div>:null}
          </div>
          <div className="my-2">
              <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">rePassword</label>
              <input name='rePassword' type="password" onChange={formik.handleChange} value={formik.values.rePassword}  onBlur={formik.handleBlur} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {formik.touched.rePassword &&formik.errors.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.rePassword}
              </div>:null}
          </div>
          <div className="my-2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
              <input name='phone' type="tel" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {formik.touched.phone &&formik.errors.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.phone}
              </div>:null}
          </div>
          <div className=" text-end my-4">
            {isLoading?<button type='submit' className=" bg-main text-white px-5 py-3 rounded-lg "><i className="fa fa-spinner fa-spin"></i></button>:<button type='submit' className=" bg-main text-white px-5 py-3 rounded-lg " disabled={!(formik.isValid&&formik.dirty)}>Register</button>}
            
          </div>
            
        </form>
      </div>
    </>
  )
}
