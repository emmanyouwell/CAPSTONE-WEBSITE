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
import { createColumnHelper } from '@tanstack/react-table';
import DataTable from '../../../DataTables/tanstack/DataTable';
import { formatDate } from '../../../../utils/helper';
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
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.display({
            id: 'index',
            header: 'No.',
            cell: ({ row }) => row.index + 1, // starts from 1 instead of 0
        }),
        columnHelper.accessor(row => `${row.donor.user.name.first} ${row.donor.user.name.last}`, {
            id: 'name',
            header: 'Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.lastDonation ? `${formatDate(row.lastDonation)}` : 'New Donor', {
            id: 'lastDonation',
            header: 'Last Breast Milk Donation / New Donor',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => getTotalVolume(row.bags), {
            id: 'expressedMilk',
            header: 'Expressed Breast Milk',
            cell: info => `${info.getValue()} ml`
        }),
        columnHelper.accessor(row => row.additionalBags ? getTotalVolume(row.additionalBags) : 0, {
            id: 'additionalBags',
            header: 'Additional bags',
            cell: info => `${info.getValue()} ml`
        }),
        columnHelper.accessor(row => `${row.donor.home_address.street}, ${row.donor.home_address.brgy} ${row.donor.home_address.city}`, {
            id: 'address',
            header: 'Address',
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.donor.user.phone, {
            id: 'phone',
            header: 'Phone',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const attendees = row.original;
                const name = `${attendees.donor.user.name.first} ${attendees.donor.user.name.middle} ${attendees.donor.user.name.last}`

                return (
                    <div className="flex gap-2">
                        <Button size="sm" color="blue" className="text-white" onClick={() => handleOpen(attendees.donor._id, name)}>
                            Add bags
                        </Button>
                    </div>
                );
            },
        }),
    ];
    return (
        <div className="w-full h-full">
            <DataTable data={attendance} columns={columns} pageSize={10} />
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

        </div>
    )
}

export default AttendanceTable