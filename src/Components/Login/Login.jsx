import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  let { token, setToken } = useContext(TokenContext)
  const [userMessage, setUserMessage] = useState(null)
  const [userError, setUserError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  let navigate = useNavigate()

  // **FIXED: Removed restrictive password regex**
  let mySchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  })

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    }
  })

  async function loginForm(values) {
    setIsLoading(true)
    setUserError(null) // Clear previous errors
    setUserMessage(null) // Clear previous messages
    
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      console.log("Login success:", response.data.message);
      setUserMessage(response.data.message);
      
      // Set token on local storage
      localStorage.setItem("userToken", response.data.token)
      // Set token to all components  
      setToken(response.data.token)
      setIsLoading(false)
      navigate("/")
    } catch (err) {
      console.log("Login error:", err.response?.data?.message);
      setIsLoading(false)
      setUserError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-12 max-w-2xl">
        <h1 className="text-main text-2xl font-bold mb-6">Login Now:</h1>
        
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
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-end my-6">
            {isLoading ? (
              <button type='button' className="bg-main text-white px-8 py-3 rounded-lg opacity-70 cursor-not-allowed">
                <i className="fa fa-spinner fa-spin me-2"></i>
                Logging in...
              </button>
            ) : (
              <button 
                type='submit' 
                className="bg-main text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!(formik.isValid && formik.dirty)}
              >
                Login
              </button>
            )}
          </div>

          {/* Register Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account? 
              <Link to="/register" className="text-main font-semibold ml-2 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  )
}