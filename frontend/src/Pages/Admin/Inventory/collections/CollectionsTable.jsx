import React, { useState, useEffect } from 'react'
import { Card } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { getAllCollections } from '../../../../redux/actions/collectionActions'
const CollectionsTable = ({currentPage, totalPages}) => {
    const dispatch = useDispatch()
    const {collections, loading, error} = useSelector(state => state.collections)
    useEffect(() => {
        dispatch(getAllCollections())
    }, [dispatch])
    
    return (
        <div className="w-full h-full p-8">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full table-auto text-left">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="border-b p-4">Collection Date</th>
                            <th className="border-b p-4">Collection Type</th>
                            <th className="border-b p-4">Details</th>
                            <th className="border-b p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections && collections.map(({ _id, collectionDate, collectionType, privDetails, pubDetails }, index) => (
                            <tr key={_id}>
                                
                                <td className="p-4">{new Date(collectionDate).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                })}</td>
                                <td className="p-4">{collectionType}</td>
                                <td className="p-4">
                                    <Link to={`/admin/collections/details/${pubDetails?._id || privDetails?._id}`} state={{type: collectionType}} className="text-blue-500">View Details</Link>
                                </td>
                                <td className="p-4 flex items-center gap-2">
                                    <div className="bg-blue-500 p-2 rounded-lg text-white w-max hover:cursor-pointer">
                                        <PencilSquareIcon className="w-5 h-5" />
                                    </div>
                                    <div className="bg-red-500 p-2 rounded-lg text-white w-max hover:cursor-pointer">
                                        <TrashIcon className="w-5 h-5" />
                                    </div>
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