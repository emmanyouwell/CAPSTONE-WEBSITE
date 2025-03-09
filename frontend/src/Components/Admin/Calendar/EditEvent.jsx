import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventDetails } from '../../../redux/actions/eventActions'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Textarea, Button, IconButton, Select, Option } from "@material-tailwind/react";
import { XMarkIcon, TrashIcon, ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { getUser } from "../../../utils/helper";
import { useParams } from 'react-router-dom';
import { editEvents, deleteEvents } from '../../../redux/actions/eventActions';
import { useNavigate } from 'react-router-dom';
import { resetDelete, resetUpdate } from '../../../redux/slices/eventSlice';
import { Link } from 'react-router-dom';
const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { eventDetails, loading, isUpdated, isDeleted, error } = useSelector((state) => state.events);
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string(),
        status: Yup.string().required("Status is required"),
        type: Yup.string().required("Type is required"),
        start: Yup.date().required("Start date is required"),
        end: Yup.date()
            .required("End date is required")
            .min(Yup.ref("start"), "End date must be after start date"),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            status: '',
            start: '',
            type: '',
            end: '',
            user: getUser()._id
        },
        validationSchema,
        onSubmit: (values) => {
            const localStart = new Date(values.start)
            const localEnd = new Date(values.end)


            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('status', values.status)
            formData.append('type', values.type)
            formData.append('start', localStart)
            formData.append('end', localEnd)
            formData.append('user', getUser()._id)
            formData.append('id', id)
            dispatch(editEvents(formData));


        },
    });
    const handleDelete = () => {
        dispatch(deleteEvents(id));
    }
    useEffect(() => {
        const getDetails = async () => {
            await dispatch(getEventDetails(id));
        };

        getDetails();
    }, [dispatch, id]); // Depend on `id` to fetch when it changes

    useEffect(() => {
        if (eventDetails && eventDetails.eventDetails) {
            const start = new Date(eventDetails.eventDetails.start)
            const end = new Date(eventDetails.eventDetails.end)

            formik.setValues({
                title: eventDetails.title,
                description: eventDetails.description,
                status: eventDetails.eventStatus,
                type: eventDetails.eventType,
                start: new Date(start.getTime() - start.getTimezoneOffset() * 60000).toISOString().slice(0, 16), // Format for datetime-local
                end: new Date(end.getTime() - end.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
            });
        }
    }, [eventDetails]); // Run when `eventDetails` updates

    useEffect(() => {
        if (isUpdated) {
            dispatch(resetUpdate());
            navigate('/admin/schedules');
        }
        if (isDeleted) {
            dispatch(resetDelete());
            navigate('/admin/schedules');
        }

    }, [isUpdated, isDeleted, navigate])
    return (
        <>
            <div className="p-8">
                <Link to="/admin/schedules">
                    <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                        <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                    </div>
                </Link>
                <Card className="w-full p-4 shadow-lg">
                    {/* Card Header */}
                    <CardHeader floated={false} shadow={false} className="relative mb-4 p-0">
                        <div className="flex gap-4 justify-between">
                            <Typography variant="h4" color="blue-gray">
                                Edit Event Details
                            </Typography>
                            <Button onClick={handleDelete} variant="filled" color="red" size="sm">
                                <TrashIcon className="h-5 w-5" />
                            </Button>
                        </div>

                        <Typography className="mt-1 font-normal text-gray-600">
                            Enter the updated details of the event.
                        </Typography>

                    </CardHeader>

                    {/* Card Body */}
                    <form onSubmit={formik.handleSubmit}>
                        <CardBody className="space-y-4">
                            {/* Title */}
                            <div>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Title
                                </Typography>
                                <Input
                                    name="title"
                                    placeholder="e.g. Breastfeeding Awareness Month"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <Typography color="red" variant="small">
                                        {formik.errors.title}
                                    </Typography>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Description (Optional)
                                </Typography>
                                <Textarea
                                    name="description"
                                    placeholder="e.g. Hold a seminar on the importance of breastfeeding."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                            </div>

                            {/* Status */}
                            <div className="flex gap-4">
                                <div className="w-full">
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Status
                                    </Typography>
                                    <Select
                                        name="status"
                                        onChange={(val) => formik.setFieldValue("status", val)}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.status}
                                        error={formik.touched.status && Boolean(formik.errors.status)}
                                    >
                                        <Option value="Not-Due">Not-Due</Option>
                                        <Option value="On-Going">On-Going</Option>
                                        <Option value="Done">Done</Option>
                                    </Select>
                                    {formik.touched.status && formik.errors.status && (
                                        <Typography color="red" variant="small">
                                            {formik.errors.status}
                                        </Typography>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Type
                                    </Typography>
                                    <Select
                                        name="type"
                                        onChange={(val) => formik.setFieldValue("type", val)}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.type}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                    >
                                        <Option value="Regular Milk Letting">Regular Milk Letting</Option>
                                        <Option value="Grand Milk Letting">Grand Milk Letting</Option>
                                        <Option value="Other">Other</Option>

                                    </Select>
                                    {formik.touched.type && formik.errors.type && (
                                        <Typography color="red" variant="small">
                                            {formik.errors.type}
                                        </Typography>
                                    )}
                                </div>
                            </div>

                            {/* Date Fields */}
                            <div className="flex gap-4">
                                {/* Start Date */}
                                <div className="w-full">
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        Start Date
                                    </Typography>
                                    <Input
                                        type="datetime-local"
                                        name="start"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.start}
                                        error={formik.touched.start && Boolean(formik.errors.start)}
                                    />
                                    {formik.touched.start && formik.errors.start && (
                                        <Typography color="red" variant="small">
                                            {formik.errors.start}
                                        </Typography>
                                    )}
                                </div>

                                {/* End Date */}
                                <div className="w-full">
                                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                        End Date
                                    </Typography>
                                    <Input
                                        type="datetime-local"
                                        name="end"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.end}
                                        error={formik.touched.end && Boolean(formik.errors.end)}
                                    />
                                    {formik.touched.end && formik.errors.end && (
                                        <Typography color="red" variant="small">
                                            {formik.errors.end}
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </CardBody>

                        {/* Card Footer */}
                        <CardFooter className="pt-4 flex justify-end gap-4">
                            <Button type="submit">
                                Update
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>

        </>
    )
}

export default EditEvent