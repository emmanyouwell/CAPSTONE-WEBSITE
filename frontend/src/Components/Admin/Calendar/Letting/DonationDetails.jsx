import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDonors } from '../../../../redux/actions/donorActions'

import {
    Menu,
    MenuHandler,
    Button,
    MenuList,
    MenuItem,
    Input,
    Card,
    List,
    ListItem,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import DonorCards from '../../../../Components/Admin/Donors/DonorCards'
import { ArrowLongLeftIcon, ArrowLongRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { markAttendance } from '../../../../redux/actions/lettingActions';
import { resetSuccess } from '../../../../redux/slices/lettingSlice';
import Select from 'react-select';
import { object } from 'yup';
import { Check, SquarePen, Trash, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
const DonationDetails = () => {
    const dispatch = useDispatch();
    const { donors, loading, error } = useSelector((state) => state.donors);
    const { loading: submitLoading, success } = useSelector((state) => state.lettings);
    const [search, setSearch] = useState('');
    const navigate = useNavigate()
    const [bagDetails, setBagDetails] = useState(() => ({
        volume: "",
        quantity: ""
    }))

    const [selectedDonor, setSelectedDonor] = useState(null); // State to store selected donor

    const { id } = useParams();
    const [bags, setBags] = useState([]);
    const resetStates = () => {
        setSelectedDonor(null);
        setDonorType("");
        setLastDonation(null);
        setBagDetails({
            volume: "",
            quantity: ""
        });
        setBags([]);
        setSearch("");
    }

    const [donorType, setDonorType] = useState("");
    const [lastDonation, setLastDonation] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null); // track which row is being edited
    const [editedBag, setEditedBag] = useState({ volume: "", quantity: "" });

    const handleChange = (e) => {
        setDonorType(e.target.value)
    }

    const addBag = () => {
        const { volume, quantity } = bagDetails;

        if (!volume || !quantity) {
            toast.error("Please fill out volume and quantity", { position: "bottom-right" })
            return;
        }

        const newBags = {
            volume: Number(volume),
            quantity: Number(quantity),
        };

        setBags([...bags, newBags]);
        setBagDetails({
            ...bagDetails,
            volume: "",
            quantity: "",
        });
    }

    const handleDelete = (index) => {
        const updatedBags = bags.filter((_, i) => i !== index);
        setBags(updatedBags);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditedBag(bags[index]);
    };

    const handleSave = () => {
        const updatedBags = [...bags];
        updatedBags[editingIndex] = editedBag;
        setBags(updatedBags);
        setEditingIndex(null);
    };

    const handleCancel = () => {
        setEditingIndex(null);
    };
    const submitAttendance = async () => {
        if (!donorType || !selectedDonor) {
            toast.error("Please choose a Donor.", { position: "bottom-right" });
            return;
        }
        if (!bags.length > 0) {
            toast.error("Enter at least 1 milk bag.", { position: "bottom-right" });
            return;
        }
        if (!id) {
            toast.error("Milk letting event not found.", { position: "bottom-right" });
            return;
        }
        let newData;
        if (lastDonation) {
            newData = {
                lettingId: id,
                donorId: selectedDonor,
                donorType: donorType,
                bags: bags,
                lastDonation
            };
        }
        else {
            newData = {
                lettingId: id,
                donorId: selectedDonor,
                donorType: donorType,
                bags: bags,
            }
        }


        dispatch(markAttendance(newData))
            .then((res) => {
                toast.success("Attendance recorded.", { position: "bottom-right" });

            })
            .catch((error) => {
                console.error("Error adding inventory:", error);
                toast.error("Failed to add attendance.", { position: "bottom-right" });
            });
    };
    useEffect(() => {
        if (success) {
            dispatch(resetSuccess());
            navigate(`/dashboard/events/attendance/${id}`, { state: { from: 'host' } });
            resetStates();
        }
    }, [dispatch, success])
    useEffect(() => {
        dispatch(getDonors({ search: search }))
    }, [dispatch])
    const options = [
        ...donors.map((donor) => ({
            value: donor, label: `${donor.user.name.first} ${donor.user.name.last} | ${donor.user.phone}`, donor
        }))
    ];
    return (
        <div className="p-8 h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex w-full items-center justify-between gap-4">
                <Link to={`/dashboard/events/attendance/${id}`} state={{ from: 'host' }}>
                    <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                        <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                    </div>
                </Link>
            </div>
            <div className="flex h-[calc(100vh-15rem)] items-start justify-center gap-4">
                <Card className='flex flex-col justify-start items-center w-full gap-2 border-l-8 border-secondary p-4'>
                    <CardBody className="w-full h-full p-0">
                        <div className="w-full">
                            <div className="mb-4">
                                <div className="font-parkinsans text-xl font-bold mb-2 text-primary">Search Donors</div>
                                <div className="flex items-center justify-between">
                                    <Select
                                        className="w-full select-border-black"
                                        value={selectedDonor ? options.find(opt => opt.value._id === selectedDonor._id) : null}
                                        onChange={(selected) => setSelectedDonor(selected.value)}
                                        options={options}
                                        isSearchable
                                        formatOptionLabel={(option) =>
                                        (
                                            <div className="flex flex-col text-lg">
                                                <span className="font-semibold">
                                                    {option.value.user.name.first} {option.value.user.name.last} | {option.value.user.phone}
                                                </span>
                                                <span className="text-md">
                                                    {option.value.home_address.street}, {option.value.home_address.brgy}, {option.value.home_address.city}
                                                </span>
                                            </div>
                                        )
                                        }
                                    />

                                </div>
                            </div>
                            <div className="mb-4">
                                {selectedDonor ? (<>
                                    <div className="font-parkinsans text-xl font-bold text-primary mb-2">Select Donor Type</div>
                                    <div className="space-y-4 w-full">
                                        <div>
                                            <input
                                                type="radio"
                                                id="new"
                                                name="new"
                                                value="New Donor"
                                                className="peer hidden"
                                                required
                                                checked={donorType === "New Donor"}
                                                onChange={handleChange}
                                            />
                                            <label
                                                htmlFor="new"
                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-secondary peer-checked:ring-secondary peer-checked:text-secondary"
                                            >
                                                <div className="block">
                                                    <Typography className="font-semibold">
                                                        New Donor
                                                    </Typography>
                                                    <Typography className="font-normal text-gray-600 ">
                                                        This is the first time I'm donating breast milk.

                                                    </Typography>
                                                </div>
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"

                                                id="old"
                                                name="old"
                                                value="Old Donor"
                                                className="peer hidden"
                                                required
                                                checked={donorType === "Old Donor"}
                                                onChange={handleChange}
                                            />
                                            <label
                                                htmlFor="old"
                                                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-secondary peer-checked:ring-secondary peer-checked:text-secondary"
                                            >
                                                <div className="block">
                                                    <Typography className="font-semibold">
                                                        Old donor
                                                    </Typography>
                                                    <Typography className="font-normal text-gray-600">
                                                        I've donated breast milk in the past.
                                                    </Typography>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </>) : (<div className="h-full">Select donor to continue</div>)}
                            </div>
                            <div className="">
                                {donorType && donorType === "Old Donor" && (
                                    <>
                                        <div className="font-parkinsans text-xl text-primary font-bold mb-2">Last Breast Milk Donation</div>
                                        <div className="flex items-center justify-between">
                                            <List className="w-full p-0 mb-4">
                                                <DatePicker
                                                    selected={lastDonation}
                                                    onChange={(date) => setLastDonation(date)}

                                                    dateFormat="MMMM d, yyyy"

                                                    className={`w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800`}
                                                    placeholderText="Select a date and time"
                                                    shouldCloseOnSelect={true}
                                                    popperPlacement="bottom-start"
                                                />
                                            </List>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="w-full">
                            {selectedDonor && (
                                <>
                                    <div className="font-parkinsans text-xl font-bold mb-2 text-primary">Add Bag Details</div>
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <Input
                                            label="Volume"
                                            containerProps={{
                                                className: "w-full",
                                            }}
                                            onChange={(e) => setBagDetails({ ...bagDetails, volume: Number(e.target.value) })}
                                            value={bagDetails.volume}
                                            className="sticky top-0"
                                        />
                                        <Input
                                            label="Quantity"
                                            containerProps={{
                                                className: "w-full",
                                            }}
                                            onChange={(e) => setBagDetails({ ...bagDetails, quantity: Number(e.target.value) })}
                                            value={bagDetails.quantity}
                                            className="sticky top-0"
                                        />
                                        <Button className="bg-secondary" onClick={addBag} fullWidth>Add bag</Button>
                                    </div>
                                </>
                            )}

                        </div>
                    </CardBody>
                    <CardFooter className="w-full p-0">
                        <Button disabled={submitLoading} className="bg-success" onClick={submitAttendance} fullWidth>Save Attendance</Button>
                    </CardFooter>
                </Card>
                <Card className='w-full min-h-[210px] gap-4 border-l-8 border-secondary p-4 mb-4'>
                    <div>
                        <div className="font-parkinsans text-xl font-bold mb-2 text-primary">Donor Bags</div>
                    </div>
                    <Card className="h-full w-full overflow-y-scroll shadow-none">
                        <table className="w-full table-fixed text-left">
                            <thead>

                                <th className="border-b border-blue-gray-100 bg-secondary-light p-4">
                                    <Typography variant="paragraph" color="white" className="font-normal leading-none">
                                        Volume
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-secondary-light p-4">
                                    <Typography variant="paragraph" color="white" className="font-normal leading-none">
                                        Quantity
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-secondary-light p-4">
                                    <Typography variant="paragraph" color="white" className="font-normal leading-none">
                                        Action
                                    </Typography>
                                </th>
                            </thead>
                            <tbody>
                                {bags.map((bag, index) => (
                                    <tr key={index} className="border-b border-blue-gray-50">
                                        {editingIndex === index ? (
                                            <>
                                                <td className="px-4 py-2 text-md text-blue-gray-900">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={editedBag.volume}
                                                        onChange={(e) => setEditedBag({ ...editedBag, volume: Number(e.target.value < 1 ? 1 : e.target.value) })}
                                                        className="rounded-lg h-10"

                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-md text-blue-gray-900">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={editedBag.quantity}
                                                        onChange={(e) => setEditedBag({ ...editedBag, quantity: Number(e.target.value < 1 ? 1 : e.target.value) })}
                                                        className="rounded-lg h-10"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 text-md text-blue-gray-900">
                                                    <div className="flex items-center gap-2">
                                                        <Check className="text-green-600 cursor-pointer" onClick={handleSave} />
                                                        <X className="text-red-500 cursor-pointer" onClick={handleCancel} />
                                                    </div>

                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-4 py-2 text-md text-blue-gray-900">{bag.volume} ml</td>
                                                <td className="px-4 py-2 text-md text-blue-gray-900">{bag.quantity} pc(s)</td>
                                                <td className="flex items-center gap-4 p-4">
                                                    <SquarePen size={20} className="text-primary cursor-pointer" onClick={() => handleEdit(index)} />
                                                    <Trash size={20} className="text-danger cursor-pointer" onClick={() => handleDelete(index)} />
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </Card>
                </Card>
            </div>

        </div>
    )
}

export default DonationDetails