import React, { useState, useEffect } from 'react'
import { Button, Card } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { getAllCollections } from '../../../../redux/actions/collectionActions'
import { EyeIcon } from 'lucide-react'
const CollectionsTable = ({ currentPage, totalPages }) => {
    const dispatch = useDispatch()
    const { collections, loading, error } = useSelector(state => state.collections)
    useEffect(() => {
        dispatch(getAllCollections())
    }, [dispatch])

    return (
        <div className="w-full h-full p-8">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full table-auto text-left">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="border-b p-4">Event Name</th>
                            <th className="border-b p-4">Collection Date</th>
                            <th className="border-b p-4">Collection Type</th>
                            <th className="border-b p-4">Status</th>
                            <th className="border-b p-4">Details</th>

                        </tr>
                    </thead>
                    <tbody>
                        {collections && collections.map(({ _id, collectionDate, status, collectionType, privDetails, pubDetails }, index) => (
                            <tr key={_id}>
                                <td className="p-4">{pubDetails?.activity || `${privDetails?.donorDetails.donorId.user.name.first} ${privDetails?.donorDetails.donorId.user.name.last}`}</td>
                                <td className="p-4">{new Date(collectionDate).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}</td>
                                <td className="p-4">{collectionType}</td>
                                <td className="p-4">{status}</td>
                                <td className="p-4">
                                    <Link to={`/dashboard/collections/details/${pubDetails?._id || privDetails?._id}`} state={{ type: collectionType, collectionId: _id, status: status }} className="text-blue-500">

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

export default CollectionsTable