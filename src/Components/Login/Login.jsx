import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { data } from 'autoprefixer';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  let {token , setToken}=useContext(TokenContext)
  const [userMessage,setuserMessage]=useState(null)
  const [userError,setuserError]=useState(null)
  const [isLoading,setisLoading]=useState(false)
  
  let navigate = useNavigate()
  let mySchema = Yup.object({
    email:Yup.string().required("enter your email").email("invalid email"),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{3,8}$/,"password not valid "),
  })
  let formik=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:mySchema,
    onSubmit:(values)=>{
      loginForm(values);
      
    }
  })
  async function loginForm(values){
    setisLoading(true)
    return  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).then((data)=>{
    console.log(data.data.message);
    setuserMessage(data.data.message);
    // set token on local storage
    localStorage.setItem("userToken" , data.data.token)
    // set token to all components  
    setToken(data.data.token)
    setisLoading(false)
    navigate("/")
  }).catch((err)=>{
    console.log(err.response.data.message);
    setisLoading(false)
    setuserError(err.response.data.message);
  })
  }
  return (
    <>
    <div className=" container px-12 text-2xl">
      <h1 className= "text-main text-2xl ">Login Now:</h1>
      {userError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">{userError}</div>:null}
      {userMessage? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert"> {userMessage} </div>:null}
      <form onSubmit={formik.handleSubmit}>
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
        <div className=" text-end my-4">
          {isLoading?<button type='submit' className=" bg-main text-white px-5 py-3 rounded-lg "><i className="fa fa-spinner fa-spin"></i></button>:<button type='submit' className=" bg-main text-white px-5 py-3 rounded-lg " disabled={!(formik.isValid&&formik.dirty)} >Login</button>}
          
        </div>
          
      </form>
    </div>
  </>
  )
}
