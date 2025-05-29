import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPatientDetails } from '../../../redux/actions/recipientActions'
import { Typography } from '@material-tailwind/react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'
// import DonationList from './DonationList'
import { formatDate } from '../../../utils/helper'
import RequestList from './RequestList'
const SingleRecipient = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { patientDetails, loading, error } = useSelector((state) => state.recipients);

    useEffect(() => {
        dispatch(getPatientDetails(id));
    }, [dispatch, id])

    useEffect(() => {
        if (patientDetails) {
            console.log("patient: ", patientDetails);
        }
    }, [patientDetails])
    return (
        <>
            <div className=" w-full h-full p-4">
                <Link to="/dashboard/recipients">
                    <div className="mb-4 h-10 w-max bg-gray-200 rounded-lg p-4 flex justify-start items-center text-gray-700/50 hover:text-gray-700 transition-all hover:cursor-pointer">
                        <ArrowLongLeftIcon className="h-8 w-8" /> <span className="font-semibold text-md ml-2">Back</span>
                    </div>
                </Link>
                <div className="flex flex-col h-max gap-10">
                    <div className="w-full flex flex-col gap-4">
                        <Typography color="black" variant="h1">{patientDetails && patientDetails.name}</Typography>
                        <div className="flow-root">
                            <dl className="-my-3 divide-y divide-gray-100 text-lg">
                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Patient Type</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && patientDetails.patientType}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Address</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && patientDetails.home_address && `${patientDetails.home_address.street} ${patientDetails.home_address.brgy} ${patientDetails.home_address.city}`}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Phone</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && patientDetails.phone}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Mother's name</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && patientDetails.motherName}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Staff in-charge:</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && patientDetails.staff && patientDetails.staff.name && `${patientDetails.staff.name.first} ${patientDetails.staff.name.middle} ${patientDetails.staff.name.last}`}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Date admitted:</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{patientDetails && formatDate(patientDetails.createdAt)}</dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                    {patientDetails && patientDetails.requested && <RequestList requests={patientDetails.requested} />}

                </div>


            </div>

        </>
    )
}

export default SingleRecipient