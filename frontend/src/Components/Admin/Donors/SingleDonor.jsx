import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleDonor } from '../../../redux/actions/donorActions'
import { Typography } from '@material-tailwind/react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
import DonationList from './DonationList'
import { formatDate } from '../../../utils/helper'
const SingleDonor = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { donorDetails, loading, error } = useSelector((state) => state.donors);

    useEffect(() => {
        dispatch(getSingleDonor(id));
    }, [dispatch, id])

    useEffect(() => {
        if (donorDetails) {
            console.log("donor: ", donorDetails);
        }
    }, [donorDetails])
    return (
        <>
            <div className=" w-full h-full p-4">
                <Link to="/dashboard/donors">
                    <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                        <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                    </div>
                </Link>
                <div className="flex flex-col h-max gap-10">
                    <div className="w-full flex flex-col gap-4">
                        <Typography color="black" variant="h1">{donorDetails && donorDetails.user && donorDetails.user.name && `${donorDetails.user.name.first} ${donorDetails.user.name.middle} ${donorDetails.user.name.last}`}</Typography>
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Donor Type</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.donorType}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Address</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.home_address && `${donorDetails.home_address.street}, ${donorDetails.home_address.brgy}, ${donorDetails.home_address.city}`}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Phone</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.user && donorDetails.user.phone}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Email</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.user && donorDetails.user.email}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Birthday</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && formatDate(donorDetails.birthday)}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Age</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.age && donorDetails.age.value} {donorDetails && donorDetails.age && donorDetails.age.unit}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Occupation</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails && donorDetails.occupation}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Eligibility</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{donorDetails ? donorDetails.eligibility : '--'}</dd>
                                </div>

                                {/* <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Date tested:</dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                        --
                                    </dd>
                                </div> */}
                            </dl>
                        </div>
                    </div>
                    {donorDetails && donorDetails.donation && <DonationList donations={donorDetails.donation} />}

                </div>


            </div>

        </>
    )
}

export default SingleDonor