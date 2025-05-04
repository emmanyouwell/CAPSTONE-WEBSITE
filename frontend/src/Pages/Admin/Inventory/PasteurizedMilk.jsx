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
    IconButton,
    Input,
    Typography,
} from "@material-tailwind/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLongLeftIcon, HandThumbUpIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { getFridges, openFridge } from "../../../redux/actions/fridgeActions";
import { CheckIcon, CheckSquare, EyeIcon, Milk, PlusSquare, SquareCheck } from 'lucide-react'
import { getUserDetails } from "../../../redux/actions/userActions";
import { toast } from "react-toastify";
import { updateBag } from "../../../redux/actions/bagActions";
import { addInventory } from "../../../redux/actions/inventoryActions";
import { setId } from "@material-tailwind/react/components/Tabs/TabsContext";
import { formatDate } from "../../../utils/helper";
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
const PasteurizedMilk = ({ currentPage, totalPages }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [totalVolume, setTotalVolume] = useState(0);
    const [selectedBags, setSelectedBags] = useState([]);
    const [inventory, setInventory] = useState({})
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
    const handleOpen = (id) => {
        setInventory(id)
        setOpen(!open)
    };
    const handleChange = (e) => {
        setFormError((prev) => ({
            ...prev,
            fridge: false
        }))
        setSelectedOption(e.target.value)
    }

    const pasteurizedFridges = fridges ? fridges.filter((f) => f.fridgeType === 'Pasteurized') : [];
    

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



    useEffect(() => {
        dispatch(openFridge(id));
        dispatch(getFridges())
        dispatch(getUserDetails());
    }, [dispatch])
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
                    {selectedRows.length > 0 && (<SquareCheck onClick={handleOpen} className="h-10 w-10 font-semibold hover:text-green-500 hover:cursor-pointer" />)}

                </div>}

                <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
                    <DialogHeader className="relative m-0 block">
                        <Typography variant="h4" color="blue-gray">
                            Pasteurization Details
                        </Typography>
                        <Typography className="mt-1 font-normal text-gray-800">
                            Date: {" "}
                            {inventory?.pasteurizedDetails?.pasteurizationDate ? formatDate(inventory?.pasteurizedDetails?.pasteurizationDate, "full") : ""}
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
                    <DialogBody>

                        <div className="grid grid-cols-2 place-items-baseline space-y-4">
                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Batch number
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {inventory?.pasteurizedDetails?.batch}
                                </Typography>
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Pool number
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {inventory?.pasteurizedDetails?.pool}
                                </Typography>
                            </div>

                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Available bottles
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {inventory?.pasteurizedDetails?.bottles.map(b=>b.status).filter(b=>b === "Available").length}
                                </Typography>

                            </div>


                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Batch Volume
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {inventory?.pasteurizedDetails?.batchVolume} ml
                                </Typography>

                            </div>
                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Bottle Type
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {`${inventory?.pasteurizedDetails?.bottleType} ml`}
                                </Typography>
                            </div>
                            <div className="w-full">
                                <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                    Expiration Date
                                </Typography>
                                <Typography className="mt-1 font-normal text-gray-600">
                                    {inventory?.pasteurizedDetails?.expiration ? formatDate(inventory?.pasteurizedDetails?.expiration, "full") : ""}
                                </Typography>
                            </div>

                        </div>
                        <span className="flex items-center my-4">
                            <span className="h-px flex-1 bg-gray-500"></span>
                        </span>
                        <div className="space-y-4 mt-4">
                            <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
                                Donors
                            </Typography>
                            <div className="grid grid-cols-3 gap-4">
                                {inventory?.pasteurizedDetails?.donors.map((donor, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md">
                                        <div className="flex items-center space-x-2">

                                            <Typography variant="h6" color="blue-gray" className="font-medium">{`${donor.user.name.first} ${donor.user.name.last}`}</Typography>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button className="ml-auto" onClick={() => setOpen(!open)}>
                            Close
                        </Button>
                    </DialogFooter>
                </Dialog>

            </div>

            <Card className="h-[calc(100vh-2rem)] w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-4">Pasteurization Date</th>
                            <th className="border-b p-4">Batch Number</th>
                            <th className="border-b p-4">Pool Number</th>
                            <th className="border-b p-4">Batch Volume (ml)</th>
                            <th className="border-b p-4">Available Volume (ml)</th>
                            <th className="border-b p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fridgeContent.filter((f)=>f.status === "Available")?.map((inv, index) => {
                            console.log(inv)
                            const item = inv.pasteurizedDetails;
                            const availableVolume = item.bottles.map(b => b.status).filter(b => b === "Available").length * item.bottleType;
                            return (
                                <tr key={index}>
                                    <td className="p-4">{formatDate(item.pasteurizationDate, "full")}</td>
                                    <td className="p-4">{item.batch}</td>
                                    <td className="p-4">{item.pool}</td>
                                    <td className="p-4">{item.batchVolume} ml</td>
                                    <td className="p-4">{availableVolume} ml</td>
                                    <td className="p-4">
                                        <div className="bg-secondary w-max p-3 rounded-lg">
                                            <EyeIcon className="h-5 w-5 text-white hover:cursor-pointer" onClick={() => handleOpen(inv)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Card>

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
        </div >
    )
}

export default PasteurizedMilk