import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Drawer,
    IconButton,
    Input,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLongLeftIcon, HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getFridges, openFridge } from "../../../redux/actions/fridgeActions";
import { CheckIcon, CheckSquare, Milk, PlusSquare, SquareCheck } from 'lucide-react'
import { getUserDetails } from "../../../redux/actions/userActions";
import { toast } from "react-toastify";
import { updateBag } from "../../../redux/actions/bagActions";
import { addInventory } from "../../../redux/actions/inventoryActions";
import { createColumnHelper } from "@tanstack/react-table";
import DataTable from "../../../Components/DataTables/tanstack/DataTable";
import DatePicker from "react-datepicker";
function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}
const UnpasteurizedMilk = ({ currentPage, totalPages }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalVolume, setTotalVolume] = useState(0);
    const [selectedBags, setSelectedBags] = useState([]);
    const [batchDetails, setBatchDetails] = useState(() => ({
        batch: "",
        pool: "",
        pasteurizationDate: "",
        qty: 0,
    }))
    const [formError, setFormError] = useState(() => ({
        batch: false,
        pool: false,
        fridge: false,
        qty: false,
        date: false
    }));
    const { fridges, fridgeContent, allBags, loading, error } = useSelector(state => state.fridges)
    const { userDetails } = useSelector(state => state.users);
    const handleOpen = () => setOpen(!open);
    const handleChange = (e) => {
        setFormError((prev) => ({
            ...prev,
            fridge: false
        }))
        setSelectedOption(e.target.value)
    }
    const handleBatch = (e) => {
        setFormError((prev) => ({
            ...prev,
            batch: false
        }))
        setBatchDetails((prev) => ({
            ...prev,
            batch: e.target.value
        }))
    }
    const handlePool = (e) => {
        setFormError((prev) => ({
            ...prev,
            pool: false
        }))
        setBatchDetails((prev) => ({
            ...prev,
            pool: e.target.value
        }))
    }
    const handleQty = (e) => {
        const newValue = Number(e.target.value); // Convert input value to a number
        setFormError((prev) => ({
            ...prev,
            qty: false
        }))
        setBatchDetails((prev) => ({
            ...prev,
            qty: newValue > 20 ? 20 : newValue // Ensure the value does not exceed 20
        }));
    }
    const handleDateChange = (date) => {
        setFormError((prev) => ({
            ...prev,
            date: false
        }))
        setBatchDetails({
            ...batchDetails,
            pasteurizationDate: date
        })
    }
    const pasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Pasteurized') : [];
    const formatDate = (date, type) => {
        if (type === "full") {
            return new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        }
        if (type === "short") {
            return new Date(date).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
        if (type === "time") {
            return new Date(date).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });
        }

    }

    const handleCheckboxChange = (bag) => {

        setSelectedRows((prevSelected) => {

            const isAlreadySelected = prevSelected.some((item) => item === bag._id);

            if (isAlreadySelected) {
                setTotalVolume((prevTotal) => {
                    if (prevTotal - bag.volume < 0) {
                        return 0; // Prevent negative total volume
                    } else {
                        return prevTotal - bag.volume; // Subtract current bag volume
                    }
                })
                setSelectedBags((prevSelected) => prevSelected.filter((item) => item._id !== bag._id))
                return prevSelected.filter((item) => item !== bag._id); // Remove if unchecked

            } else {
                setTotalVolume((prevTotal) => {
                    if (prevTotal === 0) {
                        return bag.volume; // If no previous selection, set to current bag volume
                    } else {
                        return prevTotal + bag.volume; // Add current bag volume
                    }
                })
                setSelectedBags((prevSelected) => ([...prevSelected, bag]))
                return [...prevSelected, bag._id]; // Add if checked
            }
        });


    };
    const resetStates = () => {
        setBatchDetails(() => ({
            batch: "",
            pool: "",
            qty: 0,
        }))
        setTotalVolume(0)
        setSelectedRows([])
        setSelectedBags([])
        setSelectedOption('')
        setFormError(() => ({
            batch: false,
            pool: false,
            fridge: false,
            qty: false,
        }))
        setOpen(false)


    }
    const pasteurize = () => {
        console.log("Errors: ", formError)
        if (totalVolume <= 0) {

            return;
        }
        if (totalVolume > 4000) {

            return;
        }
        if (!selectedOption || selectedOption === "") {
            setFormError((prev) => ({
                ...prev,
                fridge: true
            }))

        }

        if (!batchDetails.batch || batchDetails.batch === "") {
            setFormError((prev) => ({
                ...prev,
                batch: true
            }))

        }

        if (!batchDetails.pool || batchDetails.pool === "") {
            setFormError((prev) => ({
                ...prev,
                pool: true
            }))

        }
        if (!batchDetails.qty || batchDetails.qty === 0) {
            setFormError((prev) => ({
                ...prev,
                qty: true
            }))
        }
        if (!batchDetails.pasteurizationDate || batchDetails.pasteurizationDate === "") {
            setFormError((prev) => ({
                ...prev,
                date: true
            }))
        }
        if (!selectedOption || !batchDetails.pasteurizationDate || !batchDetails.batch || !batchDetails.pool || totalVolume <= 0 || totalVolume > 4000 || !batchDetails.qty) {
            return;
        }
        const userInfo = [
            ...new Set(selectedBags.map(bag => bag.donor._id)) // Extract unique donor IDs
        ];
        const data = {
            fridgeId: selectedOption,
            pasteurizedDetails: {
                batch: batchDetails.batch,
                pool: batchDetails.pool,
                donors: userInfo,
                bottleType: totalVolume === 2000 ? 100 : totalVolume === 4000 ? 200 : 100,
                bottleQty: batchDetails.qty,
                pasteurizationDate: batchDetails.pasteurizationDate,
            },
            userId: userDetails._id
        }
        dispatch(addInventory(data)).then(async () => {
            for (const bags of selectedBags) {
                dispatch(updateBag({ id: bags._id, status: "Pasteurized" }))
            }
            toast.success("Milk pasteurized successfully", { position: "bottom-right" })
        }).catch((error) => {
            toast.error("Failed to pasteurized milk. Please try again.", { position: "bottom-right" });
            console.error(error);

        })
        resetStates();
        console.log("data: ", data);
        console.log("donors: ", selectedBags);
    }


    useEffect(() => {
        dispatch(openFridge(id));
        dispatch(getFridges())
        dispatch(getUserDetails());
    }, [dispatch])
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor(row => `${row.donor.user.name.first} ${row.donor.user.name.last}`, {
            id: 'donorName',
            header: 'Donor Name',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => `${formatDate(row.expressDate, "full")}`, {
            id: 'expressDate',
            header: 'Express Date',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.volume, {
            id: 'totalVolume',
            header: 'Total Volume (ml)',
            cell: info => info.getValue(),
        }),

        columnHelper.display({
            id: 'actions',
            header: 'Select Milk',
            cell: ({ row }) => {
                const id = row.original._id
                return (
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={selectedRows.some((item) => item === id)}
                            onChange={() => handleCheckboxChange(row.original)}
                        />
                    </div>
                );
            },
        }),
    ];
    return (
        <div className="w-full h-[calc(100vh-2rem)] overflow-y-scroll p-8" >
            <div className="flex justify-between items-center mb-4">
                <Link to={`/dashboard/inventory/refrigerator`}>
                    <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                        <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                    </div>
                </Link>
                {totalVolume > 0 && <div className="flex justify-center items-center gap-4">
                    <Typography variant="h2">Selected milk: {totalVolume && totalVolume} ml</Typography>
                    {selectedRows.length > 0 && (
                        <Button variant="outlined" color="pink" onClick={handleOpen} size="sm">Choose fridge</Button>)}

                </div>}
                <Drawer open={open} onClose={handleOpen} size={500} className="p-4">
                    <div className="overflow-y-auto h-[calc(100vh-5rem)] pr-2 space-y-4">
                        <Typography variant="h4" color="blue-gray">
                            Choose Refrigerator
                        </Typography>
                        <Typography className="mt-1 font-normal text-gray-600">
                            Please select the fridge you would like to store the milk in.
                        </Typography>
                        <div className="space-y-4">
                            {pasteurizedFridges?.length > 0 && pasteurizedFridges.map((fridge, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={fridge.name}
                                        name={fridge.name}
                                        value={fridge._id}
                                        className="peer hidden"
                                        required
                                        checked={selectedOption === fridge._id}
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor={fridge.name}
                                        className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
                                    >
                                        <div className="block">
                                            <Typography className="font-semibold">
                                                {fridge.name}
                                            </Typography>
                                            <Typography className="font-normal text-gray-600">
                                                {fridge.fridgeType}
                                            </Typography>
                                        </div>
                                    </label>
                                </div>
                            ))}

                            {formError.fridge && <span className="text-sm text-red-500 p-4">Please choose a fridge</span>}
                        </div>
                        <span className="flex items-center my-4">
                            <span className="h-px flex-1 bg-gray-500"></span>
                        </span>
                        <div className="space-y-4">
                            <div>
                                <Typography variant="h4" color="blue-gray">
                                    Enter pasteurization details
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    Enter the Batch number, Pool number, and number of available bottles.
                                </Typography>
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Express date
                                </Typography>
                                <div className="add-event w-full">
                                    <DatePicker
                                        selected={batchDetails.pasteurizationDate}
                                        onChange={(date) => handleDateChange(date)}

                                        dateFormat="MMMM d, yyyy h:mm aa"
                                        showTimeSelect
                                        className={`w-full p-2 border ${formError.date
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                                        placeholderText="Select a date and time"
                                        shouldCloseOnSelect={true}
                                        popperPlacement="left-end"
                                        timeIntervals={10}
                                    />
                                </div>

                                {formError.date && <span className="text-sm text-red-500">Please enter pasteurization date</span>}
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Batch number
                                </Typography>
                                <Input
                                    type="text"
                                    name="batch"
                                    onChange={handleBatch}
                                    value={batchDetails.batch} />
                                {formError.batch && <span className="text-sm text-red-500">Please enter batch number</span>}
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Pool number
                                </Typography>
                                <Input
                                    type="text"
                                    name="pool"
                                    onChange={handlePool}
                                    value={batchDetails.pool} />
                                {formError.pool && <span className="text-sm text-red-500">Please enter pool number</span>}
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    No. of available bottle
                                </Typography>
                                <div className="relative w-full">
                                    <Input
                                        type="number"
                                        value={batchDetails.qty}
                                        onChange={handleQty}
                                        className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                        min="0"
                                        max="20"
                                    />
                                    <div className="absolute right-1 top-1 flex gap-0.5">
                                        <IconButton
                                            size="sm"
                                            className="rounded"
                                            onClick={() => {
                                                if (batchDetails.qty === 0) {
                                                    setFormError((prev) => ({
                                                        ...prev,
                                                        qty: true
                                                    }))
                                                }
                                                else if (batchDetails.qty > 0) {
                                                    setFormError((prev) => ({
                                                        ...prev,
                                                        qty: false
                                                    }))
                                                }
                                                setBatchDetails((cur) => ({ ...cur, qty: cur.qty === 0 ? 0 : cur.qty - 1 }))
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                            </svg>
                                        </IconButton>
                                        <IconButton
                                            size="sm"
                                            className="rounded"
                                            onClick={() => {
                                                setFormError((prev) => ({
                                                    ...prev,
                                                    qty: false
                                                }))

                                                setBatchDetails((cur) => ({ ...cur, qty: cur.qty === 20 ? 20 : cur.qty + 1 }))
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                            </svg>
                                        </IconButton>
                                    </div>
                                </div>
                                {formError.qty && <span className="text-sm text-red-500">Please enter quantity</span>}
                            </div>
                            <div className="w-full">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Bottle Type
                                </Typography>
                                <Input
                                    type="text"
                                    name="pool"
                                    disabled
                                    value={totalVolume === 2000 || totalVolume < 2000 ? "100 ml" : totalVolume === 4000 || (totalVolume > 2000 && totalVolume < 4000) ? "200 ml" : "Select at least 2000 ml of milk"} />

                            </div>
                        </div>
                    </div>
                    <div className="py-4">
                        <Button className="ml-auto" onClick={pasteurize}>
                            Pasteurize
                        </Button>
                    </div>
                </Drawer>
            </div>
            <DataTable data={allBags} columns={columns} pageSize={15} />
        </div >
    )
}

export default UnpasteurizedMilk