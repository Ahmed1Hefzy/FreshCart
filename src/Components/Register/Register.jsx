import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userMessage, setuserMessage] = useState(null)
  const [userError, setuserError] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  
  let navigate = useNavigate()

  // **FIXED: Updated validation schema**
  let mySchema = Yup.object({
    name: Yup.string().required("Name is required").min(3,"Can't be less than 3 characters").max(20,"Maximum 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").min(6,"Password must be at least 6 characters"),
    rePassword: Yup.string().required("Confirm your password").oneOf([Yup.ref("password")],"Passwords don't match"),
    phone: Yup.string().required("Phone is required").matches(/^(002)?01[0125][0-9]{8}$/,"Egyptian phone number required"),
  })

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    }
  })

  async function registerForm(values) {
    setisLoading(true)
    setuserError(null) // Clear previous errors
    setuserMessage(null) // Clear previous messages
    
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      console.log("Registration success:", response.data.message);
      setuserMessage(response.data.message);
      setisLoading(false)
      navigate("/login")
    } catch (err) {
      console.log("Registration error:", err.response?.data?.message);
      setisLoading(false)
      setuserError(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-16 max-w-2xl">
        <h1 className="text-main text-2xl font-bold mb-6">Register Now:</h1>
        
        {userError && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {userError}
          </div>
        )}
        
        {userMessage && (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            {userMessage}
          </div>
        )}
        
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="my-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input 
              name='name' 
              type="text" 
              onChange={formik.handleChange} 
              value={formik.values.name} 
              onBlur={formik.handleBlur} 
              id="name" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="my-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input 
              name='email' 
              type="email" 
              onChange={formik.handleChange} 
              value={formik.values.email} 
              onBlur={formik.handleBlur} 
              id="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="my-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input 
              name='password' 
              type="password" 
              onChange={formik.handleChange} 
              value={formik.values.password} 
              onBlur={formik.handleBlur} 
              id="password" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password (min 6 characters)"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="my-4">
            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirm Password
            </label>
            <input 
              name='rePassword' 
              type="password" 
              onChange={formik.handleChange} 
              value={formik.values.rePassword}  
              onBlur={formik.handleBlur} 
              id="rePassword" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm your password"
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.rePassword}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="my-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input 
              name='phone' 
              type="tel" 
              onChange={formik.handleChange} 
              value={formik.values.phone} 
              onBlur={formik.handleBlur} 
              id="phone" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g., 01012345678"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.phone}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-end my-6">
            {isLoading ? (
              <button type='button' className="bg-main text-white px-8 py-3 rounded-lg opacity-70 cursor-not-allowed">
                <i className="fa fa-spinner fa-spin me-2"></i>
                Registering...
              </button>
            ) : (
              <button 
                type='submit' 
                className="bg-main text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}