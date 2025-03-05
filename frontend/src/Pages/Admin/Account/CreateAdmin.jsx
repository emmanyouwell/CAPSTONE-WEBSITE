import React, { useEffect } from "react";

// @material-tailwind/react
import {
  Input,
  Typography,
  Button
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/actions/userActions";
import { resetRegister } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


const CreateAdmin = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isRegistered, user } = useSelector((state) => state.users);

  const validationSchema = Yup.object({
    employeeID: Yup.string()
      .matches(/^\d+$/, "Employee ID must be a number") // Ensures only digits are allowed
      .required("Employee ID is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Emails must match")
      .required("Confirm Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      employeeID: "",
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      phoneNumber: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
      console.log("Form submitted", values);
    },
  });
  useEffect(() => {
    if (isRegistered) {
      console.log('User registered successfully');
      dispatch(resetRegister());
      navigation('/admin/account');
    }
  }, [dispatch, isRegistered, navigation])
  useEffect(() => {
    console.log('isRegistered changed:', isRegistered);
  }, [isRegistered]);
  return (
    <section className="px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray">
        Create Employee Account
      </Typography>
      <Typography
        variant="small"
        className="text-gray-600 font-normal mt-1"
      >
        Create a new employee account and assign a role to them.
      </Typography>
      <div className="flex flex-col mt-8">
        <form onSubmit={formik.handleSubmit} className="flex flex-col mt-8">
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Employee ID
              </Typography>
              <Input
                name="employeeID"
                size="lg"
                placeholder="123456"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employeeID}
              />
              {formik.touched.employeeID && formik.errors.employeeID && (
                <div className="text-red-500 text-sm">{formik.errors.employeeID}</div>
              )}
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Phone Number
              </Typography>
              <Input
                name="phoneNumber"
                size="lg"
                placeholder="+123 0123 456 789"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
              )}
            </div>
          </div>

          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                First Name
              </Typography>
              <Input
                name="firstName"
                size="lg"
                placeholder="Emma"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
              )}
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Last Name
              </Typography>
              <Input
                name="lastName"
                size="lg"
                placeholder="Roberts"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
              )}
            </div>
          </div>

          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Email
              </Typography>
              <Input
                name="email"
                type="email"
                size="lg"
                placeholder="emma@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Confirm Email
              </Typography>
              <Input
                name="confirmEmail"
                type="email"
                size="lg"
                placeholder="emma@mail.com"
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmEmail}
              />
              {formik.touched.confirmEmail && formik.errors.confirmEmail && (
                <div className="text-red-500 text-sm">{formik.errors.confirmEmail}</div>
              )}
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="mb-6 w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                Role
              </Typography>
              <select
                name="role"
                className="w-full p-3 border border-blue-gray-200 rounded-lg focus:border-primary"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
              >
                <option value="" label="Select Role" />
                <option value="Admin" label="Admin" />
                <option value="Staff" label="Staff" />
              </select>
              {formik.touched.role && formik.errors.role && (
                <div className="text-red-500 text-sm">{formik.errors.role}</div>
              )}
            </div>
            <div className="w-full"></div>
          </div>
          <Button type="submit" className="mt-6 bg-secondary w-max">
            Add new
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CreateAdmin;