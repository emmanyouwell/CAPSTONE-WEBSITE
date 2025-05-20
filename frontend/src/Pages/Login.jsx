import React, { useState, useEffect } from 'react'
import img1 from '../assets/image/milk-letting-event-1.jpg'
import img2 from '../assets/image/droplet.jpg'
import StickyNavbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Input, Button } from '@material-tailwind/react'
import logo from '../assets/image/TCHMB-logo.png'

import { DefaultGallery } from '../Components/Gallery'
import { toast } from 'react-toastify'
import { resetError } from '../redux/slices/userSlice'

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

    if (isLoggedIn) {
      navigate('/');
    }
    if (error) {
      toast.error("Invalid Employee ID or Password", { position: "top-right" });
      dispatch(resetError());
    }
  }, [isLoggedIn, userDetails, error])
  useEffect(() => {
    if (userDetails) {
      console.log("user: ", userDetails);
    }
  }, [userDetails])
  return (
    <>
      <StickyNavbar />

      <section

        className="bg-white hero flex w-full h-screen items-center justify-center p-4">

        <div className="flex flex-col w-full items-center justify-start  h-full">
          <div className="p-4 flex flex-col items-center justify-center ">
            <img src={logo} alt="logo" className="w-40 h-40 lg:w-52 lg:h-52" />
            <p className='font-dm text-3xl text-center text-white'>Welcome to TCHMB Portal!</p>
          </div>


          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <div className="w-full">
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



                {/* Signup Link */}
                <p className="text-gray-900 mt-4">
                  Are you an employee?{" "}
                  <Link to="/employee/login" className="text-sm text-secondary hover:underline mt-4">
                    Login here.
                  </Link>
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



        </div>


      </section>

    </>

  )
}

export default Login