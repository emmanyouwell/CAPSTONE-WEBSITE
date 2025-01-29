import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDonors } from '../../../redux/actions/donorActions'
import { Input, Button } from '@material-tailwind/react'
import DonorCards from '../../../Components/Admin/Donors/DonorCards'
import { ArrowLongLeftIcon, ArrowLongRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Select, Option } from '@material-tailwind/react'
const DonorsPage = () => {
    const dispatch = useDispatch();
    const { donors, pageSize, totalDonors, totalPages, loading, error } = useSelector((state) => state.donors);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [brgy, setBrgy] = useState('');
    const [type, setType] = useState('');

    const handleBrgy = (value) => {
        setBrgy(value);
    }
    const handleType = (value) => {
        setType(value);
    }
    const handleReset = () => {
        setSearch('');
        setBrgy('');
        setType('');
    }
    const locations = [
        "Bagumbayan",
        "Bambang",
        "Calzada",
        "Cembo",
        "Central Bicutan",
        "Central Signal Village",
        "Comembo",
        "East Rembo",
        "Fort Bonifacio",
        "Hagonoy",
        "Ibayo Tipas",
        "Katuparan",
        "Ligid Tipas",
        "Lower Bicutan",
        "Maharlika Village",
        "Miguel",
        "Napindan",
        "New Lower Bicutan",
        "North Daang Hari",
        "North Signal Village",
        "Northside",
        "Palingon",
        "Pembo",
        "Pinagsama",
        "Pitogo",
        "Rizal",
        "Santa Ana",
        "South Cembo",
        "South Daang Hari",
        "South Signal Village",
        "Southside",
        "Tanyag",
        "Tuktukan",
        "Upper Bicutan",
        "Ususan",
        "Wawa",
        "West Rembo",
        "Western Bicutan"
    ];

    const donorTypes = [
        "Community",
        "Private",
        "Employee",
        "Network Office/Agency"
    ]


    const handleTextChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = () => {
        setCurrentPage(0);
        dispatch(getDonors({ search: search }));
    }
    const nextPageHandler = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }
    const prevPageHandler = () => {
        if (currentPage > 0) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }
    useEffect(() => {
        dispatch(getDonors({ search: search, brgy: brgy, type: type, page: currentPage + 1, pageSize: pageSize }))
            .unwrap()
            .then((data) => console.log('Donors fetched:', data))
            .catch((err) => console.error('Error fetching donors:', err));
    }, [dispatch, search, currentPage, brgy, type])
    return (
        <div className="p-4 flex flex-col justify-between h-full gap-4">
            <div className="flex items-center gap-4 w-1/2 mt-4">
                <div className="relative flex w-full gap-2 md:w-max">
                    <Input
                        type="search"
                        color="gray"
                        label="Search for donors..."
                        className="pr-10"
                        onChange={handleTextChange}
                        containerProps={{
                            className: "min-w-[288px]",
                        }}
                    />
                    <MagnifyingGlassIcon className="h-8 w-8 !absolute right-1 top-1 rounded text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={handleSubmit} />

                </div>
                <div className="w-max">
                    <Select label="Filter by Barangay" color="pink" variant="standard" value={brgy} onChange={(value) => handleBrgy(value)}>
                        {locations.map((location, index) => (
                            <Option key={index} value={location}>{location}</Option>
                        ))}
                    </Select>
                </div>
                <div className="w-max">
                    <Select label="Filter by Donor Type" color="pink" variant="standard" value={type} onChange={(value) => handleType(value)}>
                        {donorTypes.map((donorType, index) => (
                            <Option key={index} value={donorType}>{donorType}</Option>
                        ))}
                    </Select>
                </div>

                <div className="w-full">
                    <Button color="pink" onClick={handleReset} className='w-max'>Delete filters</Button>
                </div>



            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                {currentPage > 0 ? <div className="h-20 w-full bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer " onClick={prevPageHandler}>
                    <ArrowLongLeftIcon className="h-14 w-14" /> <span className="font-semibold text-2xl">Previous Page</span>
                </div> : <div></div>}
                {currentPage < totalPages - 1 ?
                    <div className="h-20 w-full bg-gray-200 rounded-lg p-4 flex justify-end items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={nextPageHandler}>
                        <span className="font-semibold text-2xl">Next Page</span><ArrowLongRightIcon className="h-14 w-14" />
                    </div> : <div></div>}
            </div>
            <div className="grid grid-cols-4 gap-4 w-full h-full">
                {donors.map((donor, index) => (
                    <div className="w-1/4" key={index}>
                        <DonorCards donor={donor} />
                    </div>
                ))}
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                {currentPage > 0 ? <div className="h-20 w-full bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer " onClick={prevPageHandler}>
                    <ArrowLongLeftIcon className="h-14 w-14" /> <span className="font-semibold text-2xl">Previous Page</span>
                </div> : <div></div>}
                {currentPage < totalPages - 1 ?
                    <div className="h-20 w-full bg-gray-200 rounded-lg p-4 flex justify-end items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer" onClick={nextPageHandler}>
                        <span className="font-semibold text-2xl">Next Page</span><ArrowLongRightIcon className="h-14 w-14" />
                    </div> : <div></div>}
            </div>
        </div>
    )
}

export default DonorsPage