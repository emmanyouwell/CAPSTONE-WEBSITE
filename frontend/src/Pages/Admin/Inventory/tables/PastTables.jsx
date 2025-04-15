import React, { useState, useEffect } from 'react'
import { Card } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { getFridges } from '../../../../redux/actions/fridgeActions'
import { Link } from 'react-router-dom'
import { PencilIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
const PastTables = ({ currentPage, totalPages, pasteurizedFridges }) => {
    
    return (
        <div className="w-full h-full">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead className="bg-secondary text-white">
                        <tr>
                            <th className="border-b p-4">Fridge Name</th>
                            <th className="border-b p-4">Fridge Type</th>
                            <th className="border-b p-4">Total Volume</th>
                            <th className="border-b p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pasteurizedFridges.map(({ _id, name, fridgeType, totalVolume }, index) => (
                            <tr key={index}>
                                <td className="p-4">
                                    <Link to={`/admin/inventory/fridge/pasteurized/${_id}`} className="text-blue-500">{name}</Link></td>
                                <td className="p-4">{fridgeType}</td>
                                <td className="p-4">{totalVolume || 0} ml</td>
                                <td className="p-4 flex items-center gap-2">
                                    <div className="bg-blue-500 p-2 rounded-lg text-white w-max hover:cursor-pointer">
                                        <PencilSquareIcon className="w-5 h-5"/>
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

export default PastTables