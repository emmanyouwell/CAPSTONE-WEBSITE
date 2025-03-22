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
import { Select, Option } from '@material-tailwind/react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { markAttendance } from '../../../../redux/actions/lettingActions';
const DonationDetails = () => {
    const dispatch = useDispatch();
    const { donors, pageSize, totalDonors, totalPages, loading, error } = useSelector((state) => state.donors);
    const { loading: submitLoading } = useSelector((state) => state.lettings);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const [bagDetails, setBagDetails] = useState(() => ({
        volume: "",
        quantity: ""
    }))

    const [selectedDonor, setSelectedDonor] = useState(null); // State to store selected donor
    const { id } = useParams();
    const [bags, setBags] = useState([]);
    const handleSelect = (donor) => {
        setSelectedDonor(donor); // Update state with selected donor
        setMenuOpen(false); // Close the menu
    };
    const [donorType, setDonorType] = useState("");
    const [lastDonation, setLastDonation] = useState(null);
    const handleDateChange = (e) => {
        setLastDonation(new Date(e.target.value));
    }
    const handleChange = (e) => {
        setDonorType(e.target.value)
    }
    const handleTextChange = (e) => {
        setSearch(e.target.value);
    }

    const searchDonor = () => {
        dispatch(getDonors({ search: search }))
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
    return (
        <div className="p-8">
            <Link to={`/admin/events/attendance/${id}`}>
                <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                    <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                </div>
            </Link>
            <div className="w-1/2 mx-auto flex flex-col justify-center items-center gap-4">


                <div className="font-parkinsans text-2xl text-center">Search Donors</div>
                <Card className='w-full border-l-8 border-secondary p-4 mx-auto mb-4'>
                    <div className="flex items-center justify-between">
                        <List className="w-full">
                            <div className="relative flex w-full gap-2">
                                <Input
                                    label="Search"
                                    containerProps={{
                                        className: "mb-4",
                                    }}
                                    onChange={handleTextChange}
                                    className="sticky top-0"
                                    onKeyDown={(e) => e.key === 'Enter' && searchDonor()}
                                />
                                <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={searchDonor} />
                            </div>

                            {loading ? <p>Loading...</p> : donors && donors.map((donor, index) => (
                                <ListItem key={index}
                                    className="border-b-2"
                                    onClick={() => handleSelect(donor)} >{`${donor.user.name.first} ${donor.user.name.middle} ${donor.user.name.last} | ${donor.user.phone} | (${donor.home_address.street}, ${donor.home_address.brgy}, ${donor.home_address.city})`}</ListItem>
                            ))}
                        </List>
                    </div>
                </Card>
                {selectedDonor &&
                    (<>
                        <div className="font-parkinsans text-2xl text-center">Select Donor Type</div>
                        <Card className='w-full border-l-8 border-secondary p-4 mx-auto mb-4 gap-4'>

                            <div className="space-y-4">
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
                        </Card>
                    </>)}
                {donorType && donorType === "Old Donor" && (
                    <>
                        <div className="font-parkinsans text-2xl text-center">Last Breast Milk Donation</div>
                        <Card className='w-full border-l-8 border-secondary p-4 mx-auto mb-4'>
                            <div className="flex items-center justify-between">
                                <List className="w-full">
                                    <div className="relative flex w-full gap-2">
                                        <Input
                                            type="date"
                                            label="Date"
                                            containerProps={{
                                                className: "mb-4",
                                            }}
                                            onChange={handleDateChange}
                                            className="sticky top-0"

                                        />

                                    </div>

                                </List>
                            </div>
                        </Card>
                    </>
                )}
                <div className="font-parkinsans text-2xl text-center">Bag details</div>
                <Card className='w-full border-l-8 border-secondary p-4 mx-auto'>

                    {/* Display selected donor info */}
                    <div>
                        {selectedDonor && (
                            <>
                                <p className="font-parkinsans text-primary text-2xl text-center font-semibold">{`${selectedDonor.user.name.first} ${selectedDonor.user.name.middle} ${selectedDonor.user.name.last}`}</p>
                                <p className="font-parkinsans text-primary text-center text-md">{selectedDonor.user.phone}</p>
                                <p className="font-parkinsans text-primary text-center text-md">{`${selectedDonor.home_address.street}, ${selectedDonor.home_address.brgy}, ${selectedDonor.home_address.city}`}</p>
                            </>
                        )}
                    </div>
                    <CardBody>
                        <div className="font-bold my-4">Add bag details</div>
                        <Input
                            label="Volume"
                            containerProps={{
                                className: "mb-4",
                            }}
                            onChange={(e) => setBagDetails({ ...bagDetails, volume: Number(e.target.value) })}
                            className="sticky top-0"
                        />
                        <Input
                            label="Quantity"
                            containerProps={{
                                className: "mb-4",
                            }}
                            onChange={(e) => setBagDetails({ ...bagDetails, quantity: Number(e.target.value) })}
                            className="sticky top-0"
                        />
                        <Button className="bg-secondary" onClick={addBag}>Add bag</Button>
                    </CardBody>
                    <CardFooter className="flex items-stretch gap-4 max-w-screen-2xl overflow-x-auto whitespace-nowrap">
                        {bags && bags.length > 0 && bags.map((bag, index) => (
                            <div className="border-4 border-secondary w-max rounded-md my-4 p-4 flex justify-center items-center flex-col">
                                <p className="text-2xl text-secondary font-bold font-parkinsans">{bag.volume} ml</p>
                                <p className="font-parkinsans">{bag.quantity}pc(s)</p>
                            </div>
                        ))
                        }
                    </CardFooter>
                </Card>
                <div className="flex justify-end w-full my-4">
                    <Button disabled={submitLoading} className="bg-success" onClick={submitAttendance}>Save Attendance</Button>
                </div>

            </div>
        </div>
    )
}

export default DonationDetails