import React, { useState, useEffect } from 'react'
import { Card, Typography } from "@material-tailwind/react";


const AccountTable = ({ users, currentPage, totalPages }) => {

    return (
        <div className="w-full h-full p-8">
            <Card className="h-full w-full overflow-scroll">
                <table className="w-full table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b p-4">Employee ID</th>
                            <th className="border-b p-4">First Name</th>
                            <th className="border-b p-4">Last Name</th>
                            <th className="border-b p-4">Middle Name</th>
                            <th className="border-b p-4">Phone</th>
                            <th className="border-b p-4">Email</th>
                            <th className="border-b p-4">Role</th>
                            <th className="border-b p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ employeeID,name, phone, email, role }, index) => (
                            <tr key={employeeID}>
                                <td className="p-4">{employeeID}</td>
                                <td className="p-4">{name && name.first}</td>
                                <td className="p-4">{name && name.last}</td>
                                <td className="p-4">{name && name.middle ? name.middle : "--"}</td>
                                <td className="p-4">{phone}</td>
                                <td className="p-4">{email}</td>
                                <td className="p-4">{role}</td>
                                <td className="p-4">
                                    <a href="#" className="text-blue-500">Edit</a>
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

export default AccountTable