import React, { useState, useEffect } from "react";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { addEvents, getEvents } from "../../../redux/actions/eventActions";
import { getUser } from "../../../utils/helper";
import { resetSuccess } from "../../../redux/slices/eventSlice";
import { createLetting, getLettings } from "../../../redux/actions/lettingActions";
export function AddEvent() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {success} = useSelector(state => state.lettings);
    const handleOpen = () => setOpen(!open);
    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string(),
        venue: Yup.string(),
        status: Yup.string().required("Status is required"),

        start: Yup.date().required("Start date is required"),
        end: Yup.date()
            .required("End date is required")
            .min(Yup.ref("start"), "End date must be after start date"),
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            venue: "",
            status: "",
            start: "",
            end: "",

            user: getUser()._id
        },
        validationSchema,
        onSubmit: (values) => {
            const localStart = new Date(values.start);
            const localEnd = new Date(values.end);
            const formData = {
                activity: values.title,
                venue: values.venue,
                actDetails: {
                    start: localStart,
                    end: localEnd,
                },
                status: values.status,
                description: values.description,
                admin: getUser()._id
            }
            console.log("formData", formData)
            dispatch(createLetting(formData));
            handleOpen();
        },
    });
    useEffect(() => {
        if (success) {
            formik.setValues({
                title: "",
                description: "",
                status: "",
                start: "",
                venue: "",

                end: "",
                user: getUser()._id
            })
            dispatch(resetSuccess());
            dispatch(getLettings());
        }
    }, [success])
    return (
        <>
            <Button onClick={handleOpen} className="flex items-center gap-2 bg-secondary" size="sm">
                <PlusIcon className="h-5 w-5" strokeWidth={2} /> Add Event
            </Button>
            <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                <form onSubmit={formik.handleSubmit}>
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Add a new event
                        </Typography>
                        <Typography className="mt-1 font-normal text-gray-600">
                            Enter the details of the event.
                        </Typography>
                        <IconButton
                            size="sm"
                            variant="text"
                            className="!absolute right-3.5 top-3.5"
                            onClick={handleOpen}
                        >
                            <XMarkIcon className="h-4 w-4 stroke-2" />
                        </IconButton>
                    </DialogHeader>
                    <DialogBody className="space-y-4 pb-6">
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
                        <div>
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Venue
                            </Typography>
                            <Input
                                name="venue"
                                placeholder="e.g. Taguig City"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.venue}
                                error={formik.touched.venue && Boolean(formik.errors.venue)}
                            />
                            {formik.touched.venue && formik.errors.venue && (
                                <Typography color="red" variant="small">
                                    {formik.errors.venue}
                                </Typography>
                            )}
                        </div>
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

                        </div>


                        <div className="flex gap-4">
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
                    </DialogBody>
                    <DialogFooter>
                        <Button type="submit" className="ml-auto">
                            Add Event
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}