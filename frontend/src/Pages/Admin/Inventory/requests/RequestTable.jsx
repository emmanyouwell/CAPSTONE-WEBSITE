import React, { useState, useEffect } from 'react'
import { Button, Card } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from 'lucide-react'
import { formatDate } from '../../../../utils/helper'
const RequestTable = ({ currentPage, totalPages, requests }) => {

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
                                    <Link to={`/admin/inventory/fridge/pasteurized/`}>
                                        <Button className="bg-secondary"><EyeIcon className="h-5 w-5" /></Button>
                                    </Link>
                                </td>

                            </tr>
                        ))}
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
        </div>
    )
}

export default RequestTable