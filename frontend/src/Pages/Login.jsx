import React, { useState, useEffect } from 'react'
import img1 from '../assets/image/milk-letting-event-1.jpg'
import StickyNavbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/actions/userActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoggedIn, loading, error } = useSelector(state => state.users)
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
  }, [isLoggedIn])
  return (
    <>

      <div className="flex justify-center items-center flex-col mt-24 container mx-auto bg-slate-600">

        <Card color="transparent" shadow={false} className="border border-r-2 border-blue-gray-300 p-10">
          <Typography variant="h4" color="blue-gray">
            Log in to your account
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your credentials to access your account
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                name="email"
                size="lg"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
              {formik.touched.email && formik.errors.email && (
                <Typography color="red">{formik.errors.email}</Typography>
              )}
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                name="password"
                size="lg"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography color="red">{formik.errors.password}</Typography>
              )}
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Log in
            </Button>

          </form>
        </Card>
      </div>
    </>

  )
}

export default Login