import React, { useState, useEffect } from 'react'
import img1 from '../assets/image/milk-letting-event-1.jpg'
import img2 from '../assets/image/droplet.jpg'
import StickyNavbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { Typography, Input, Button } from '@material-tailwind/react'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn, userDetails, loading, error } = useSelector(state => state.users)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      // Add your login logic here
      const formData = new FormData();
      formData.set('email', values.email);
      formData.set('password', values.password);
      dispatch(loginUser(formData));
    },
  });
  useEffect(() => {

    if (isLoggedIn && (userDetails.role === 'Admin' || userDetails.role === 'SuperAdmin')) {
      navigate('/admin/dashboard');

    }
    else if (isLoggedIn) {
      navigate('/');
    }

  }, [isLoggedIn, userDetails])
  useEffect(() => {
    if (userDetails) {
      console.log("user: ", userDetails);
    }
  }, [userDetails])
  return (
    <>
      <StickyNavbar />

      <section className="bg-white flex w-full h-screen items-center justify-center">

        <div className="flex flex-col w-full items-center justify-center h-full">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
            {/* Formik Form */}
            <form className="flex flex-col" onSubmit={formik.handleSubmit}>
              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-secondary transition ease-in-out duration-150"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mb-2">{formik.errors.email}</p>
              )}

              {/* Password Input */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-2 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-secondary transition ease-in-out duration-150"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mb-2">{formik.errors.password}</p>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between flex-wrap mt-2">
                <label htmlFor="remember-me" className="text-sm text-gray-900 cursor-pointer">
                  <input type="checkbox" id="remember-me" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-secondary hover:underline mb-0.5">
                  Forgot password?
                </a>
              </div>

              {/* Signup Link */}
              <p className="text-gray-900 mt-4">
                Don't have an account?{" "}
                <a href="#" className="text-sm text-secondary hover:underline mt-4">
                  Signup
                </a>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-secondary text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-secondary-dark transition ease-in-out duration-150"
              >
                Login
              </button>
            </form>
          </div>
        </div>

      </section>

    </>

  )
}

export default Login