import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { updateAttendance } from '../../../../redux/actions/lettingActions';
const AttendanceTable = ({ attendance, currentPage, totalPages, lettingId }) => {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('')
    const handleOpen = (id, name) => {
        setId(id);
        setName(name);
        setOpen((cur) => !cur)
    };
    const getTotalVolume = (bags) => {
        return bags.reduce((acc, bag) => acc + bag.volume, 0)
    }
    const dispatch = useDispatch();
    const [bagDetails, setBagDetails] = useState(() => ({
        volume: "",
        expressDate: null
    }))
    const resetStates = () => {
        setBagDetails({
            volume: "",
            expressDate: "",
        });
        setBags([]);

    }
    const [bags, setBags] = useState([]);
    const submitUpdate = () => {
        const data = {
            lettingId,
            donorId: id,
            bags
        }
        dispatch(updateAttendance(data))
            .then(() => {
                location.reload();
                toast.success("Attendance updated", { position: "bottom-right" });
                
            })
            .catch((error) => {
                toast.error("Failed to update attendance", { position: "bottom-right" });
                console.error(error);
            });
        resetStates();
        setOpen(false);
    }
    const handleDateChange = (e) => {
        setBagDetails({
            ...bagDetails,
            expressDate: e.target.value
        })
    }
    const handleVolumeChange = (e) => {
        setBagDetails({
            ...bagDetails,
            volume: e.target.value
        })
    }

    const addBag = () => {
        const { volume, expressDate } = bagDetails;

        if (!volume || !expressDate) {
            toast.error("Please fill out volume and express date", { position: "bottom-right" })
            return;
        }

        const newBags = {
            volume: Number(volume),
            expressDate: expressDate,
        };

        setBags([...bags, newBags]);
        setBagDetails({
            ...bagDetails,
            volume: "",
            expressDate: "",
        });
    }
    return (
        <div className="w-full h-full">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-4">No.</th>
                            <th className="border-b p-4">Name</th>
                            <th className="border-b p-4">Last Breast Milk Donation / New Donor</th>
                            <th className="border-b p-4">Total Volume of Breast Milk</th>
                            <th className="border-b p-4">Additional bags</th>

                            <th className="border-b p-4">Complete Address</th>
                            <th className="border-b p-4">Phone</th>
                            <th className="border-b p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance && attendance.map((attendees, index) => {
                            const name = `${attendees.donor.user.name.first} ${attendees.donor.user.name.middle} ${attendees.donor.user.name.last}`

                            return (
                                <tr key={attendees._id}>
                                    <td className="p-4">{index + 1}</td>
                                    <td className="p-4">{name}</td>
                                    <td className="p-4">{attendees.lastDonation ? new Date(attendees.lastDonation).toLocaleString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour12: true, // Ensures AM/PM format
                                    }) : "New Donor"}</td>
                                    <td className="p-4">{getTotalVolume(attendees.bags)} ml</td>
                                    <td className="p-4">{attendees.additionalBags ? getTotalVolume(attendees.additionalBags) : 0} ml</td>

                                    <td className="p-4">{`${attendees.donor.home_address.street} ${attendees.donor.home_address.brgy} ${attendees.donor.home_address.city}`}</td>
                                    <td className="p-4">{attendees.donor.user.phone}</td>
                                    <td className="p-4">
                                        <Button size="sm" color="blue" className="text-white" onClick={() => handleOpen(attendees.donor._id, name)}>
                                            Add bags
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">

                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Add more bags
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                           Donor: {name}
                        </Typography>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Express date
                            </Typography>
                            <Input
                                type="datetime-local"
                                name="expressDate"
                                onChange={handleDateChange}
                                value={bagDetails.expressDate || ""}
                            />

                        </div>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                Volume
                            </Typography>
                            <Input
                                type="text"
                                name="volume"
                                onChange={handleVolumeChange}
                                value={bagDetails.volume}

                            />

                        </div>


                        <div className="w-full p-2 h-24 overflow-y-auto border-2 border-gray-500">
                            {bags.length > 0 && bags.map((bag, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <Typography variant="small" color="blue-gray">
                                        Bag {index + 1}
                                    </Typography>
                                    <Typography variant="small" color="blue-gray">
                                        {bag.volume} ml
                                    </Typography>
                                    <Typography variant="small" color="blue-gray">
                                        {new Date(bag.expressDate).toLocaleString("en-US", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                        })}
                                    </Typography>
                                    <XMarkIcon className="h-5 w-5 text-red-500 hover:cursor-pointer" onClick={() => setBags(bags.filter((_, i) => i !== index))} />
                                </div>
                            ))}
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0 flex items-center justify-between gap-4">
                        <Button variant="gradient" onClick={addBag} fullWidth>
                            Add bags
                        </Button>
                        <Button variant="gradient" color="deep-orange" onClick={submitUpdate} fullWidth>
                            Update
                        </Button>
                    </CardFooter>

                </Card>
            </Dialog>
            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default AttendanceTable