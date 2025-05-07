import React, { useState, useEffect } from 'react'
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { EyeIcon, CheckCheck } from 'lucide-react'
import { formatDate, getUser } from '../../../../utils/helper'
import { inpatientDispense, outpatientDispense } from '../../../../redux/actions/requestActions'
import { toast } from 'react-toastify'
const RequestTable = ({ currentPage, totalPages, requests }) => {
    const dispatch = useDispatch();
    const [items, setItems] = useState([
        { label: "Insulated Bag w/ Ice Pack", value: "Insulated Bag w/ Ice Pack" },
        { label: "Cooler w/ Ice Pack", value: "Cooler w/ Ice Pack" },
        { label: "Styro box w/ Ice Pack", value: "Styro box w/ Ice Pack" },
    ]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [openTransport, setOpenTransport] = useState(false);
    const [formError, setFormError] = useState(() => ({
        transport: { status: false, message: "" }
    }));
    const [reservedRequest, setReservedRequest] = useState([]);
    const [filteredRequest, setFilteredRequest] = useState([]);
    const [id, setId] = useState(null);
    const handleTransport = (id) => {
        setOpenTransport(!openTransport);
        setId(id);
    }
    const handleChange = (e) => {
        setFormError((prev) => ({
            ...prev,
            transport: { status: false, message: "" }
        }))
        setSelectedOption(e.target.value);
    }
    const handleSubmit = () => {
        if (!selectedOption) {
            setFormError((prev) => ({
                ...prev,
                transport: { status: true, message: "Please select a transport type" }
            }))
            return;
        }
        if (id) {
            const data = {
                transport: selectedOption,
                request: id,
                approvedBy: getUser()._id
            }
            console.log(data);

            dispatch(outpatientDispense(data)).then(() => {
                setOpenTransport(false);
                setId(null);
                setSelectedOption(null);
                toast.success("Request Dispensed successfully", { position: 'bottom-right' });
            })
        }
        else if (reservedRequest.length === filteredRequest.length) {

            const data = {
                transport: selectedOption,
                request: reservedRequest,
                approvedBy: getUser()._id
            }
            dispatch(inpatientDispense(data)).then(() => {
                setOpenTransport(false);
                setId(null);
                setSelectedOption(null);
                setReservedRequest([]);
                setFilteredRequest([]);
                toast.success("Request Dispensed successfully", { position: 'bottom-right' });
            })
        }

    }

    const dispenseInpatient = () => {
        setOpenTransport(true);
        console.log(reservedRequest);
    }
    useEffect(() => {
        const filteredRequest = requests.filter(
            (req) =>
                req.patient &&
                req.patient.patientType === "Inpatient" &&
                req.status !== "Done" &&
                req.status !== "Canceled"
        );
        const reservedRequest = filteredRequest.filter(
            (req) => req.status === "Reserved" && req.tchmb.ebm.length > 0
        );
        setFilteredRequest(filteredRequest);
        setReservedRequest(reservedRequest);
    }, [requests])

    return (
        <div className="w-full h-full">


            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="border-b p-4">Date</th>
                            <th className="border-b p-4">Patient Name</th>
                            <th className="border-b p-4">Patient Type</th>
                            <th className="border-b p-4">Requested Volume</th>
                            <th className="border-b p-4">Days</th>
                            <th className="border-b p-4">Prescribed by</th>
                            <th className="border-b p-4">Status</th>
                            <th className="border-b p-4">  {reservedRequest.length > 0 && reservedRequest.length === filteredRequest.length ? <Button color="green" onClick={dispenseInpatient}>
                                <CheckCheck className="h-5 w-5" />
                            </Button> : 'View Details'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={index}>
                                <td className="p-4">
                                    {formatDate(request.date)}
                                </td>
                                <td className="p-4">{request.patient?.name}</td>
                                <td className="p-4">{request.patient?.patientType}</td>
                                <td className="p-4">{request.volumeRequested.volume} ml</td>
                                <td className="p-4">{request.volumeRequested.days}</td>
                                <td className="p-4">{request.doctor}</td>
                                <td className="p-4">{request.status}</td>
                                <td className="p-4 flex items-center gap-2">
                                    {request.status === "Reserved" && request.patient.patientType === "Outpatient" ?
                                        <Button className="bg-secondary" onClick={() => handleTransport(request)}><CheckCheck className="h-5 w-5" /></Button>
                                        : <Link to={`/dashboard/request/${request._id}`}>
                                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                                        </Link>}

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <Dialog size="sm" open={openTransport} handler={handleTransport} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Choose Transport Type
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-600">
                        Please select the transport type you would like to store the milk in.
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={handleTransport}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody>
                    <div className="space-y-4">

                        {items?.length > 0 && items.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={item.label}
                                    name={item.label}
                                    value={item.value}
                                    className="peer hidden"
                                    required
                                    checked={selectedOption === item.value}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor={item.label}
                                    className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
                                >
                                    <div className="block">
                                        <Typography className="font-semibold">
                                            {item.label}
                                        </Typography>

                                    </div>
                                </label>
                            </div>
                        ))}
                        {formError?.transport?.status && <Typography color="red" variant="small">
                            {formError?.transport?.message}
                        </Typography>}
                    </div>
                    <DialogFooter>
                        <div className="flex items-start justify-end pt-4">
                            <Button color="green" onClick={handleSubmit}>
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogBody>
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

export default RequestTable