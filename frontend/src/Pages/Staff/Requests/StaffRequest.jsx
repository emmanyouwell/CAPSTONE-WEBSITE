import React, { useState, useEffect } from 'react'
import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Typography } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { EyeIcon, CheckCheck } from 'lucide-react'
import { formatDate, getUser } from '../../../utils/helper'
import { inpatientDispense, outpatientDispense } from '../../../redux/actions/requestActions'
import { toast } from 'react-toastify'
const StaffRequest = ({ requests }) => {

    return (
        <>
           
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
                                <th className="border-b p-4">View Details</th>
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
                                        <Link to={`/dashboard/request/${request._id}`}>
                                            <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                                        </Link>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

            </div>
        </>
    )
}

export default StaffRequest